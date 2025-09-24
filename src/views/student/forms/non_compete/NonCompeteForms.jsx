import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";
import SignatureCanvas from "react-signature-canvas";
import Cookies from "js-cookie";
import { useState, useRef } from "react";

export default function NonCompeteForms({ fullname }) {
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
      const response = await fetch(
        `${apiBase}/api/user/non-compete-agreement-forms`,
        {
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
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || { general: data.message });
        return;
      }
      setErrors({});
      setSuccessMsg(data.message);
      setCurrentStep(5); // Success step
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
    "Agreement",
    "Agreement",
    "Declaration",
    "Signature",
    "Success",
  ];
  return (
    <>
      <title>Non-Compete Agreement - 1staccess Home Care</title>

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
                      <h3>Non-Compete Agreement</h3>
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
                      <Link to={PATHS.USER_NON_COMPETE_FORM}>
                        Non-Compete Agreement
                      </Link>
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
                            <h4 className="step-title">AGREEMENT</h4>
                            <div className="row">
                              <div className="col-md-12">
                                <p>
                                  Employee Name: <u>{fullname}</u>
                                </p>

                                <p>
                                  As an employee of 1st Access Home Care, the
                                  employee acknowledges that they will be in
                                  receipt of confidential information. This
                                  information shall include but not limited to,
                                  procedures manuals, in-house policies, patient
                                  lists, patient’s medical records, financial
                                  information and billing records,
                                  certifications and applications, actual and
                                  prospective markets and patient’s, business
                                  plans and marketing strategies, customer
                                  lists, sales and marketing data, operating
                                  systems, income statements, asset and
                                  liability information, financial projections
                                  and any other confidential information
                                  gathered, revealed, acquired or generated by
                                  or for 1st Access Home Care. Each employee
                                  shall protect and hold in confidence the
                                  confidential information to anyone except with
                                  the express written consent of Clarissa
                                  Ayensu(Administrator). The employee
                                  acknowledges and understands the competitive
                                  sensitivity of the confidential information
                                  and the potential for significant material
                                  harm that could result to 1st Access Home Care
                                  in the event that confidential information is
                                  disseminated to others, in particular
                                  competitors. Therefore the employee agrees
                                  that the appropriate remedy would be an
                                  immediate injunction against the violating
                                  employee in joining and prohibiting the use
                                  and continued dissemination of the
                                  confidential information. Further, each
                                  employee agrees that the dissemination of the
                                  confidential information would cause damages
                                  for which damages could not be readily
                                  ascertained and would constitute a breach of
                                  duty owed by the employee to 1st Access Home
                                  Care. Each employee agrees to pay 1st Access
                                  Home Care in any action to enforce this
                                  confidentiality agreement or cost of
                                  litigation, including attorney’s fees and
                                  other damages found by the trier fact.
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
                            <h4 className="step-title">AGREEMENT</h4>
                            <div className="row">
                              <div className="col-12">
                                <p>
                                  {" "}
                                  As consideration for employment and for the
                                  release of this confidential information, the
                                  employee agrees not to compete against 1st
                                  Access Home Care or to utilize any of the
                                  confidential information for a period of two
                                  (2) years from the date of their employment
                                  terminated with 1st Access Home Care. This
                                  Non-Compete Agreement shall be limited to
                                  Prince William County and contiguous counties.
                                  This Non-Compete Agreement is not intended to
                                  prohibit from working as a nurse, therapist or
                                  other position in the health service
                                  industries but is intended to prohibit
                                  employee from working with a competitor of 1st
                                  Access Home Care in the home health industry
                                  and utilizing any of the confidential
                                  information of 1st Access Home Care or
                                  contacting any of 1st Access Home Care
                                  patients. Employees agree and warrant that
                                  they will not contact, engage, discuss,
                                  negotiate or contract with any patient or
                                  family member of a patient for those purposes
                                  of developing or promoting home health care
                                  services of said patient. All parties
                                  acknowledge that this confidential information
                                  is of a proprietary nature to 1st Access Home
                                  Care and if the confidential information was
                                  revealed to the general public or to a
                                  competitor, the revelation would destroy or
                                  impair the expected success of 1st Access Home
                                  Care.
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
                        {currentStep === 3 && (
                          <div className="step-content">
                            <h4 className="step-title">DECLARATION</h4>
                            <div className="row">
                              <div className="col-12">
                                <p>
                                  <strong>
                                    *ANY CONTROVERSY OR CLAIM ARISING OUT OF OR
                                    RELATING TO THIS AGREEMENT SHALL BE
                                    SUBMITTED TO ARBITRATION BEFORE ONE(1)
                                    ARBITRATOR IN RICHMOND, VIRGINIA IN
                                    ACCORDANCE WITH THE COMMERCIAL ARBITRATION
                                    RULES OF THE AMERICAN ARBITRATION
                                    ASSOCIATION JUDGEMENT UPON THE AWARD
                                    RENDERED BY THE ARBITRATOR MAY BE ENTERED BY
                                    ANY COURT HAVING JURISDICTION THEREOF.
                                    ARBITRATION SHALL BE THE EXCLUSIVE,FINAL AND
                                    BINDING METHOD OF RESOLUTION OF ANY CLAIM OR
                                    CONTROVERSY BETWEEN 1st Access Home Care AND
                                    EMPLOYEE ARISING FROM THIS AGREEMENT
                                  </strong>
                                </p>
                                <p>
                                  I HAVE READ AND UNDERSTAND THE ABOVE AND WILL
                                  COMPLY WITH THIS AGREEMENT.
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
                        {currentStep === 4 && (
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

                        {currentStep === 5 && (
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

        .progress-container {
          width: 100%;
          overflow-x: auto; /* allow horizontal scroll on very small screens */
        }

        .progress-steps {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem; /* spacing between steps */
          flex-wrap: wrap; /* wrap on small screens */
        }

        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 60px; /* ensures step doesn't shrink too much */
          flex: 1; /* steps grow evenly */
          text-align: center;
        }

        .step-number {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: #ddd;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .progress-step.active .step-number {
          background: #007bff;
          color: #fff;
        }

        .progress-step.completed .step-number {
          background: #28a745;
          color: #fff;
        }

        .step-label {
          font-size: 0.85rem;
          word-wrap: break-word; /* break long words */
        }

        /* Responsive tweaks */
        @media (max-width: 768px) {
          .progress-steps {
            gap: 0.5rem;
          }
          .step-label {
            font-size: 0.75rem;
          }
          .step-number {
            width: 28px;
            height: 28px;
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .progress-steps {
            flex-wrap: nowrap;
            overflow-x: auto;
          }
          .progress-step {
            min-width: 70px; /* wider for readability */
          }
        }
      `}</style>
    </>
  );
}
