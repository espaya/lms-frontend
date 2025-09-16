import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";
import SignatureCanvas from "react-signature-canvas";
import Cookies from "js-cookie";
import { useState, useRef } from "react";

export default function EmployeeAgreementForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const sigCanvas = useRef(null);
  const signatureDataRef = useRef(""); // Use ref for signature data
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    monday_hour: "",
    tuesday_hour: "",
    wednesday_hour: "",
    thursday_hour: "",
    friday_hour: "",
    saturday_hour: "",
    sunday_hour: "",
    other_agreements: "",
    time_off: "",
  });
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
        `${apiBase}/api/user/employee-agreement-form`,
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

      setSuccessMsg(data.message);
      setCurrentStep(6); // Success step
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
    "Preamble",
    "Hours",
    "The Agreement",
    "Other Benefits",
    "Signature",
    "Success",
  ];

  return (
    <>
      <title>Employee Agreement - 1staccess Home Care</title>

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
                      <h3>Employee Agreement</h3>
                      <p className="mb-2">Fill all required (*) fields</p>
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
                      <Link to={PATHS.USER_EMPLOYEE_AGREEMENT_FORM}>
                        Employee Agreement
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
                            <h4 className="step-title">Preamble</h4>
                            <div className="row">
                              <div className="col-md-12">
                                <p>
                                  1. The employee will carry out the duties and
                                  responsibilities listed in the job
                                  description/list of assigned tasks ,and signed
                                  by employee and employer
                                </p>
                              </div>
                              <div className="col-md-12">
                                <p>
                                  2. Following are the hours the employee will
                                  work:
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
                            <h4 className="step-title">HOURS</h4>
                            <div className="row">
                              <div className="col-md-4 mt-20">
                                <div class="form-group">
                                  <label for="inputEmail4" class="form-label">
                                    Monday
                                  </label>
                                  <div class="form-control-wrap">
                                    <input
                                      name="monday_hour"
                                      value={formData.monday_hour}
                                      type="number"
                                      class="form-control"
                                      autocomplete="off"
                                      onChange={handleOnChange}
                                    />
                                    {errors.monday_hour && (
                                      <small className="text-danger">
                                        {errors.monday_hour[0]}
                                      </small>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-4 mt-20">
                                <div class="form-group">
                                  <label
                                    for="inputPassword4"
                                    class="form-label"
                                  >
                                    Tuesday
                                  </label>
                                  <div class="form-control-wrap">
                                    <input
                                      name="tuesday_hour"
                                      value={formData.tuesday_hour}
                                      type="number"
                                      class="form-control"
                                      autocomplete="off"
                                      onChange={handleOnChange}
                                    />
                                    {errors.tuesday_hour && (
                                      <small className="text-danger">
                                        {errors.tuesday_hour[0]}
                                      </small>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-4 mt-20">
                                <div class="form-group">
                                  <label for="inputAddress" class="form-label">
                                    Wednesday
                                  </label>
                                  <div class="form-control-wrap">
                                    <input
                                      name="wednesday_hour"
                                      value={formData.wednesday_hour}
                                      type="number"
                                      class="form-control"
                                      autocomplete="off"
                                      onChange={handleOnChange}
                                    />
                                    {errors.wednesday_hour && (
                                      <small className="text-danger">
                                        {errors.wednesday_hour[0]}
                                      </small>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-3 mt-20">
                                <div class="form-group">
                                  <label for="inputAddress" class="form-label">
                                    Thursday
                                  </label>
                                  <div class="form-control-wrap">
                                    <input
                                      name="thursday_hour"
                                      value={formData.thursday_hour}
                                      type="number"
                                      class="form-control"
                                      autocomplete="off"
                                      onChange={handleOnChange}
                                    />
                                    {errors.thursday_hour && (
                                      <small className="text-danger">
                                        {errors.thursday_hour[0]}
                                      </small>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-3 mt-20">
                                <div class="form-group">
                                  <label for="inputAddress" class="form-label">
                                    Friday
                                  </label>
                                  <div class="form-control-wrap">
                                    <input
                                      name="friday_hour"
                                      value={formData.friday_hour}
                                      type="number"
                                      class="form-control"
                                      autocomplete="off"
                                      onChange={handleOnChange}
                                    />
                                    {errors.friday_hour && (
                                      <small className="text-danger">
                                        {errors.friday_hour[0]}
                                      </small>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-3 mt-20">
                                <div class="form-group">
                                  <label for="inputAddress" class="form-label">
                                    Saturday
                                  </label>
                                  <div class="form-control-wrap">
                                    <input
                                      name="saturday_hour"
                                      value={formData.saturday_hour}
                                      type="number"
                                      class="form-control"
                                      autocomplete="off"
                                      onChange={handleOnChange}
                                    />
                                    {errors.saturday_hour && (
                                      <small className="text-danger">
                                        {errors.saturday_hour[0]}
                                      </small>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-3 mt-20">
                                <div class="form-group">
                                  <label for="inputAddress" class="form-label">
                                    Sunday
                                  </label>
                                  <div class="form-control-wrap">
                                    <input
                                      name="sunday_hour"
                                      value={formData.sunday_hour}
                                      type="number"
                                      class="form-control"
                                      autocomplete="off"
                                      onChange={handleOnChange}
                                    />
                                    {errors.sunday_hour && (
                                      <small className="text-danger">
                                        {errors.sunday_hour[0]}
                                      </small>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="step-actions mt-20">
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
                            <h4 className="step-title">The Agreement</h4>
                            <div className="row">
                              <div className="col-md-12">
                                <div class="form-group">
                                  <label for="inputEmail4" class="form-label">
                                    3. The employee will have the following time
                                    off:
                                  </label>
                                  <div class="form-control-wrap">
                                    <input
                                      name="time_off"
                                      value={formData.time_off}
                                      type="text"
                                      class="form-control"
                                      autocomplete="off"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.time_off && (
                                    <small className="text-danger">
                                      {errors.time_off[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-12 mt-20">
                                <div class="form-group">
                                  <label for="inputEmail4" class="form-label">
                                    4. The employer will pay the employee per
                                    hour.
                                  </label>
                                  <div class="form-control-wrap">
                                    <input
                                      name="pay_per_hour"
                                      value={formData.pay_per_hour}
                                      type="number"
                                      class="form-control"
                                      autocomplete="off"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.pay_per_hour && (
                                    <small className="text-danger">
                                      {errors.pay_per_hour[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-12 mt-20">
                                <p>
                                  5. When leaving the employee will give the
                                  approximate time of return, and if possible,
                                  leave a phone number where he/she can reach.
                                  <br /> Also, when the employee will be late in
                                  returning, he/she will call to let the
                                  employer know.
                                </p>
                              </div>
                              <div className="col-12">
                                <p>
                                  6. The employee is responsible for paying for
                                  long-distance telephone calls made/received by
                                  the employee.
                                </p>
                              </div>
                              <div className="col-12">
                                <p>
                                  7. The employee will not be paid for scheduled
                                  hours not worked unless the time not worked is
                                  covered by a benefit as provided by the
                                  employer.
                                </p>
                              </div>
                              <div className="col-12">
                                <p>
                                  8. Both parties to this agreement will respect
                                  each other’s individuality and treat each
                                  other accordingly. Both will attempt to be
                                  flexible and work at solving problems as they
                                  arise.
                                </p>
                              </div>
                              <div className="col-12">
                                <p>
                                  9. At least 2 weeks’ notice will be given by
                                  the employee regarding termination of this
                                  agreement.
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
                            <h4 className="step-title">
                              Othe Agreement/Benefits
                            </h4>
                            <div className="row">
                              <div className="col-md-12">
                                <div class="form-group">
                                  <label for="inputEmail4" class="form-label">
                                    Other Agreements/Benefits
                                  </label>
                                  <div class="form-control-wrap">
                                    <textarea
                                      name="other_agreements"
                                      value={formData.other_agreements}
                                      type="number"
                                      class="form-control"
                                      autocomplete="off"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.other_agreements && (
                                    <small className="text-danger">
                                      {errors.other_agreements[0]}
                                    </small>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="step-actions  mt-20">
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
                        {currentStep === 6 && (
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
