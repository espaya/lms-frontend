import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";
import SignatureCanvas from "react-signature-canvas";
import Cookies from "js-cookie";
import { useState, useRef } from "react";

export default function HHAForm({ fullname }) {
  const [currentStep, setCurrentStep] = useState(1);
  const sigCanvas = useRef(null);
  const signatureDataRef = useRef(""); // Use ref for signature data
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;

  const clearSignature = () => {
    sigCanvas.current.clear();
    signatureDataRef.current = ""; // Clear the ref instead of state
  };

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Capture signature
    if (sigCanvas.current.isEmpty()) {
      setErrors({ signature: "Signature is required" });
      setLoading(false);
      return;
    }

    // Get signature data only when submitting
    const signatureData = sigCanvas.current.toDataURL("image/png");
    signatureDataRef.current = signatureData;

    try {
      const response = await fetch(`${apiBase}/api/user/employee/hha-forms`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          signature: signatureDataRef.current, // Use the ref value
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN") || ""),
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) setErrors(data.errors || { general: data.message });
      setSuccessMsg(data.message);
      setCurrentStep(9); // Success step
      // Delay for 4sec then reload page
      setTimeout(() => window.location.reload(), 4000);
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Progress steps
  const steps = [
    "Summary",
    "Qualification",
    "Physical Requirements",
    "Conditions",
    "Physical Requirements",
    "Duties",
    "Acknowledgement",
    "Signature",
    "Success",
  ];
  return (
    <>
      <title>Home Health Aide - 1staccess Home Care</title>

      <div className="dashboard">
        <div id="main-wrapper">
          <UserHeader />
          <UserSidebar />

          <div className="content-body">
            <div className="container">
              <div className="page-title">
                <div className="row align-items-center justify-content-between">
                  <div className="col-md-6">
                    <div className="page-title-content">
                      <h3>Home Health Aide</h3>
                      <p className="mb-2">Fill all required(*) fields</p>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="breadcrumbs">
                      <Link to={PATHS.USER_DASHBOARD}>Home</Link>
                      <span>
                        <i className="ri-arrow-right-s-line"></i>
                      </span>
                      <Link to={PATHS.USER_FORMS}>Forms</Link>
                      <span>
                        <i className="ri-arrow-right-s-line"></i>
                      </span>
                      <Link to={PATHS.USER_HHA_FORM}>HHA</Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="row mb-4">
                <div className="col-12">
                  <div className="progress-container">
                    <div className="progress-steps">
                      {steps.map((step, index) => (
                        <div
                          key={index}
                          className={`progress-step ${
                            currentStep > index + 1 ? "completed" : ""
                          } ${currentStep === index + 1 ? "active" : ""}`}
                        >
                          <div className="step-number">{index + 1}</div>
                          <div className="step-label">{step}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {errors.general && (
                <p className="alert alert-danger"> {errors.general} </p>
              )}

              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <form onSubmit={handleFormSubmit}>
                        
                        {currentStep === 1 && (
                          <div className="step-content">
                            <h4 className="step-title">
                              REPORTS TO: SUPERVISING REGISTERED NURSE
                            </h4>
                            <div className="row">
                              <div className="col-md-12">
                                <p>
                                  Employee Name: <u>{fullname}</u>
                                </p>
                                <h6>DEPARTMENT: CLINICAL</h6>

                                <p>
                                  <strong>POSITION SUMMARY:</strong>
                                </p>
                                <p>
                                  Works under the supervision of the designated
                                  Registered Nurse. Provides direct client care
                                  as assigned by the registered nurse. Provides
                                  quality and delivery of home care services.
                                  Assist in the home care services that reflect
                                  the home care agency philosophy and standards
                                  of home health nursing care of assigned
                                  clients.
                                </p>
                              </div>
                            </div>
                            <div className="step-actions mt-20">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={nextStep}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        )}

                        {currentStep === 2 && (
                          <div className="step-content">
                            <h4 className="step-title">
                              POSITION QUALIFICATIONS:
                            </h4>
                            <div className="row">
                              <div className="col-12">
                                <ol>
                                  <li> ● High school graduation required.</li>
                                  <li>
                                    {" "}
                                    ● Home Health Aide certification required as
                                    obtained through successful completion of
                                    and approved program.
                                  </li>
                                  <li>
                                    ● Shall have on year-full-time experience in
                                    home health care in an institutional
                                    setting, such as a hospital or nursing home
                                    OR shall have one year-full-time experience
                                    within the last 5 years in direct client
                                    care in a home health agency setting; OR{" "}
                                  </li>
                                  <li>
                                    ● Evidence of sympathetic attitude toward
                                    care of the sick.{" "}
                                  </li>
                                  <li>
                                    ● Demonstrated ability to read, write, and
                                    carry out directions.{" "}
                                  </li>
                                  <li>
                                    {" "}
                                    ● Evidence of maturity and ability to deal
                                    effectively with job demands.{" "}
                                  </li>
                                  <li>
                                    ● Good verbal and written communications
                                    skills required.{" "}
                                  </li>
                                  <li>
                                    ● Attends 12 hours of Aide oriented in
                                    services per year.{" "}
                                  </li>
                                  <li>
                                    ● Participates in professional meetings when
                                    directed.{" "}
                                  </li>
                                  <li>
                                    ● Shall have a criminal history check
                                    conducted prior to being offered permanent
                                    employment with this agency.
                                  </li>
                                  <li>
                                    ● Is able to work closely supervised to
                                    ensure competence in providing client care
                                  </li>
                                  .
                                </ol>
                              </div>
                            </div>
                            <div className="step-actions mt-4">
                              <button
                                type="button"
                                className="btn btn-secondary me-2"
                                onClick={prevStep}
                              >
                                Previous
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={nextStep}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        )}

                        {currentStep === 3 && (
                          <div className="step-content">
                            <h4 className="step-title">
                              PHYSICAL REQUIREMENTS:
                            </h4>
                            <div className="row">
                              <div className="col-12">
                                <ol>
                                  <li> ● High school graduation required.</li>
                                  <li>
                                    ● Visual/hearing ability sufficient to
                                    comprehend written /verbal communication.
                                  </li>
                                  <li>
                                    ● Ability to perform tasks involving
                                    physical activity, which may include heavy
                                    lifting and extensive bending and standing.
                                  </li>
                                  <li>
                                    ● Ability to deal effectively with stress.
                                  </li>
                                  <li>
                                    ● Able to work a minimum of 40 hours per
                                    week
                                  </li>
                                  <li>
                                    ● Able to bend and stand an average of 6
                                    hours per day.
                                  </li>
                                  <li>● Able to lift up to 50 - 75 pounds.</li>
                                  <li>
                                    ● Able to write up to 3 hours per day.
                                  </li>
                                  <li>
                                    ● Able to work in a stressful environment.
                                  </li>
                                  <li>
                                    ● Able to drive 45 - 50 miles per day.
                                  </li>
                                  <li>
                                    ● Able to access and communicate will ill
                                    clients, co-workers and general public.
                                  </li>
                                  <li>
                                    {" "}
                                    ● Is neat in appearance and practice,with
                                    good personal hygiene.
                                  </li>
                                </ol>
                              </div>
                            </div>
                            <div className="step-actions mt-4">
                              <button
                                type="button"
                                className="btn btn-secondary me-2"
                                onClick={prevStep}
                              >
                                Previous
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={nextStep}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        )}

                        {currentStep === 4 && (
                          <div className="step-content">
                            <h4 className="step-title">CONDITIONS:</h4>
                            <div className="row">
                              <div className="col-12">
                                <p>
                                  {" "}
                                  <strong>
                                    May be employed by the agency if he/she has
                                    met the following conditions:
                                  </strong>
                                </p>
                                <p>
                                  {" "}
                                  Home Health Aide is expected to pass
                                  competency examination with at least a 80% or
                                  better. The content of the competency
                                  evaluation of the Agency will include and not
                                  limited to:
                                </p>
                                <ol>
                                  <li> ● Communication skills. </li>
                                  <li>
                                    {" "}
                                    ● Observation, reporting, and documentation
                                    of a client’s status and the care or service
                                    furnished.
                                  </li>
                                  <li>
                                    ● Reading and recording temperatures, pulse,
                                    and respiration, and blood pressures.
                                  </li>
                                  <li>
                                    {" "}
                                    ● Basic infection control procedures and
                                    instruction on universal precautions.
                                  </li>
                                  <li>
                                    {" "}
                                    ● Basic elements of body functions and
                                    changes in body function that must be
                                    reported to the Supervisor.{" "}
                                  </li>
                                  <li>
                                    {" "}
                                    ● Maintenance of a clean, healthy, and safe
                                    environment.
                                  </li>
                                  <li>
                                    ● Recognizing emergencies and knowledge of
                                    emergency procedures.
                                  </li>{" "}
                                  <li>
                                    {" "}
                                    ● The physical, emotional, and developmental
                                    needs of and ways to work with the
                                    populations served by the Agency including,
                                    the need for respect for the client and his
                                    or her privacy and property.
                                  </li>
                                </ol>
                              </div>
                            </div>
                            <div className="step-actions mt-4">
                              <button
                                type="button"
                                className="btn btn-secondary me-2"
                                onClick={prevStep}
                              >
                                Previous
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={nextStep}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        )}

                        {currentStep === 5 && (
                          <div className="step-content">
                            <h4 className="step-title">
                              PHYSICAL REQUIREMENTS:
                            </h4>
                            <div className="row">
                              <div className="col-12">
                                <p>
                                  <strong>
                                    The appropriate and safe techniques in
                                    personal hygiene and grooming include:
                                  </strong>
                                </p>

                                <ol>
                                  <li> - Bed bath</li>
                                  <li>- Sponge, tub or shower bath;</li>
                                  <li> - Shampoo, sink, tub or bed;</li>
                                  <li> - Nail and hair care;</li>
                                  <li> - Oral hygiene and;</li>
                                  <li> - Toileting and eliminating;</li>
                                  <li>
                                    {" "}
                                    - Safe transfer techniques and ambulation;
                                  </li>
                                  <li>
                                    - Normal range of motion and position;
                                  </li>
                                  <li>
                                    {" "}
                                    - Adequate nutrition and fluid intake;
                                  </li>
                                  <li> - Client rights; and </li>
                                  <li>
                                    {" "}
                                    - Any other task that the Agency may choose
                                    to have the home health aide perform.
                                  </li>
                                </ol>
                              </div>
                            </div>
                            <div className="step-actions mt-4">
                              <button
                                type="button"
                                className="btn btn-secondary me-2"
                                onClick={prevStep}
                              >
                                Previous
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={nextStep}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        )}

                        {currentStep === 6 && (
                          <div className="step-content">
                            <h4 className="step-title">DUTIES:</h4>
                            <div className="row">
                              <div className="col-12">
                                <p>
                                  {" "}
                                  1. Ensure quality and safe delivery of home
                                  care services.
                                </p>
                                <ol>
                                  <li>
                                    {" "}
                                    ● Participates in development and
                                    implementation of client plans of care per
                                    home care agency policy and procedure, as
                                    appropriate.
                                  </li>
                                  <li>
                                    {" "}
                                    ● Participates in client case conferences
                                    according to home health care agency policy
                                    and procedure, as appropriate.
                                  </li>
                                  <li>
                                    {" "}
                                    ● The provided home health aide services
                                    reflect client plans of care.
                                  </li>
                                  <li>
                                    {" "}
                                    ● Information regarding client plans of care
                                    is submitted to the Home Care Registered
                                    Nurse in a timely manner.{" "}
                                  </li>
                                </ol>

                                <p>
                                  {" "}
                                  2. Implement current Home Health Aide
                                  services.{" "}
                                </p>
                                <ol>
                                  <li>
                                    {" "}
                                    ● Client plans of care are discussed with
                                    the Home Care Registered Nurse on a regular
                                    basis.
                                  </li>
                                  <li>
                                    {" "}
                                    ● Client clinical records are documented per
                                    Home Care agency policy and procedure.
                                  </li>
                                  <li>
                                    ● Client assignments and reports are
                                    received from the Home Care Registered
                                    Nurse.
                                  </li>
                                </ol>
                              </div>
                            </div>
                            <div className="step-actions mt-4">
                              <button
                                type="button"
                                className="btn btn-secondary me-2"
                                onClick={prevStep}
                              >
                                Previous
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={nextStep}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        )}

                        {currentStep === 7 && (
                          <div className="step-content">
                            <h4 className="step-title">ACKNOWLEDGEMENT:</h4>
                            <div className="row">
                              <div className="col-12">
                                <p>
                                  <span className="text-danger">*</span> I have
                                  reviewed my job description and agree to
                                  perform all duties mentioned to the best of my
                                  ability; <br />
                                  <span className="text-danger">*</span> I
                                  understand that my job duties may change as
                                  the needs of the agency change.
                                  <br /> <span className="text-danger">
                                    *
                                  </span>{" "}
                                  I further agree to notify my immediate
                                  Supervisor if I am unable to complete any of
                                  my job duties in a timely manner.
                                </p>
                              </div>
                            </div>
                            <div className="step-actions mt-4">
                              <button
                                type="button"
                                className="btn btn-secondary me-2"
                                onClick={prevStep}
                              >
                                Previous
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={nextStep}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        )}

                        {currentStep === 8 && (
                          <div className="step-content">
                            <h4 className="step-title">Signature</h4>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label className="form-label">
                                    Signature
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="flex-row">
                                    <div className="wrapper">
                                      <p className="text-muted small mb-2">
                                        Sign in the box below using your mouse
                                        or finger
                                      </p>
                                      <div
                                        style={{
                                          border: "1px solid #ddd",
                                          borderRadius: "4px",
                                        }}
                                      >
                                        <SignatureCanvas
                                          ref={sigCanvas}
                                          canvasProps={{
                                            className: "signature-canvas",
                                            style: {
                                              background: "#f8f9fa",
                                              width: "100%",
                                              height: "200px",
                                            },
                                          }}
                                          penColor="black"
                                          minWidth={2}
                                          maxWidth={3}
                                        />
                                      </div>
                                      {errors.signature && (
                                        <small className="text-danger mt-2">
                                          {errors.signature}
                                        </small>
                                      )}
                                    </div>
                                    <div className="clear-btn mt-2">
                                      <button
                                        disabled={loading}
                                        type="button"
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={clearSignature}
                                      >
                                        <span>Clear Signature</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="step-actions mt-4">
                              <button
                                type="button"
                                className="btn btn-secondary me-2"
                                onClick={prevStep}
                                disabled={loading}
                              >
                                Previous
                              </button>
                              <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                              >
                                {loading ? "Processing..." : "Submit"}
                              </button>
                            </div>
                          </div>
                        )}

                        {currentStep === 9 && (
                          <div className="step-content text-center py-5">
                            <div className="success-icon mb-4">
                              <i
                                className="ri-checkbox-circle-fill text-success"
                                style={{ fontSize: "4rem" }}
                              ></i>
                            </div>
                            <h3 className="text-success">
                              {successMsg ? successMsg : ""}
                            </h3>
                            <p className="mb-4">
                              Thank you for submitting your attendance form. We
                              will review it and contact you soon.
                            </p>
                          </div>
                        )}

                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx="true">{`
        .progress-container {
          padding: 20px 0;
        }
        .progress-steps {
          display: flex;
          justify-content: space-between;
          position: relative;
          margin-bottom: 30px;
        }
        .progress-steps::before {
          content: "";
          position: absolute;
          top: 20px;
          left: 0;
          right: 0;
          height: 4px;
          background-color: #e9ecef;
          z-index: 1;
        }
        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #e9ecef;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
          font-weight: bold;
          color: #6c757d;
        }
        .step-label {
          font-size: 0.875rem;
          text-align: center;
          color: #6c757d;
        }
        .progress-step.active .step-number {
          background-color: #0d6efd;
          color: white;
        }
        .progress-step.completed .step-number {
          background-color: #198754;
          color: white;
        }
        .progress-step.completed .step-number::after {
          content: "✓";
        }
        .step-title {
          border-bottom: 1px solid #dee2e6;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }
        .step-actions {
          display: flex;
          justify-content: flex-end;
        }
        .success-icon {
          animation: scaleUp 0.5s ease-in-out;
        }
        @keyframes scaleUp {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* Signature canvas styling */
        .signature-canvas {
          display: block;
          border-radius: 4px;
          cursor: crosshair;
        }

        /* Improve touch experience on mobile */
        @media (max-width: 768px) {
          .progress-steps {
            flex-wrap: wrap;
            justify-content: center;
          }
          .progress-step {
            margin: 0 5px 15px;
          }
        }
      `}</style>
    </>
  );
}
