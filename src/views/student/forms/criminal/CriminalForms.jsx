import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";
import { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import Cookies from "js-cookie";

export default function CriminalForms({ fullname }) {
  const [successMsg, setSuccessMsg] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const sigCanvas = useRef({});
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;
  const [criminal, setCriminal] = useState([]);

  const clearSignature = () => {
    sigCanvas.current.clear();
    setFormData((prev) => ({
      ...prev,
      signature: "",
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

    const signatureData = sigCanvas.current.toDataURL("image/png");
    setFormData((prev) => ({
      ...prev,
      signature: signatureData,
    }));

    try {
      const response = await fetch(
        `${apiBase}/api/user/criminal-history-search-forms`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ ...formData, signature: signatureData }),
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
      setCurrentStep(4); // Success step
      //delay for 5sec then relaod page
      setTimeout(() => window.location.reload(), 4000);
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Progress steps
  const steps = ["Convictions of Offense", "Consent", "Signature", "Success"];

  return (
    <>
      <title>Criminal History Search - 1staccess Home Care</title>

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
                      <h3>Criminal History Search</h3>
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
                      <Link to={PATHS.USER_FORMS}>Criminal History Search</Link>
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

              {successMsg && currentStep === 4 && (
                <p className="alert alert-success"> {successMsg} </p>
              )}

              <div className="row">
                <div className="col-12">
                  <div className="card ">
                    <div className="card-body">
                      <form onSubmit={handleFormSubmit}>
                        {currentStep === 1 && (
                          <div className="step-content">
                            <h4 className="step-title">
                              Criminal History Search
                            </h4>
                            <div className="row">
                              <div className="col-12">
                                <p>
                                  Employee Name: <u> {fullname ?? 'N/A'} </u>
                                </p>
                                <p>
                                  I, <u> {fullname ?? 'N/A'} </u> have had no prior
                                  convictions of an offense described in the{" "}
                                  <strong>Health and Safety Code</strong> which
                                  would bar or potentially bar employment as
                                  listed below:
                                </p>
                                <ol>
                                  <li>CRIMINAL HOMICIDE</li>
                                  <li>INDECENCY WITH A CHILD</li>
                                  <li>SOLICITATION OF A CHILD</li>
                                  <li>ARSON</li>
                                  <li>AGGRAVATED ROBBERY</li>
                                  <li>BURGLARY AND CRIMINAL TRESPASS</li>
                                  <li>WEAPONS</li>
                                  <li>PUBLIC LEWDNESS</li>
                                  <li>PUBLIC INDECENCY</li>
                                  <li>KIDNAPPING AND FALSE IMPRISONMENT</li>
                                  <li>AGREEMENT TO ABDUCT FROM CUSTODY</li>
                                  <li>SALE OR PURCHASE OF A CHILD</li>
                                  <li>ROBBERY</li>
                                  <li>ASSAULTIVE OFFENSES</li>
                                  <li>THEFT</li>
                                  <li>FRAUD</li>
                                  <li>INDECENT EXPOSURE</li>
                                  <li>A FELONY VIOLATION OF A STATUTE</li>
                                  <li>
                                    INTENDED TO CONTROL THE POSSESSION OR
                                    DISTRIBUTION OF AN ILLEGAL SUBSTANCE
                                  </li>
                                </ol>
                              </div>
                            </div>
                            <div className="step-actions mt-4">
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
                              Confidentiality of Information
                            </h4>
                            <div className="row">
                              <div className="col-12">
                                <p>
                                  <strong>
                                    I UNDERSTAND THAT THE HOME HEALTH AGENCY IS
                                    REQUIRED TO CONDUCT A CRIMINAL HISTORY CHECK
                                    BEFORE OFFERING ME EMPLOYMENT. I, THE
                                    UNDERSIGNING, HEREBY AUTHORIZE THIS AGENCY
                                    TO CONDUCT AND VERIFY MY CRIMINAL HISTORY BY
                                    PERFORMING A CRIMINAL HISTORY CHECK.
                                  </strong>
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

                        {/* Step 4: Signature */}
                        {currentStep === 3 && (
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

                        {/* Step 5: Success */}
                        {currentStep === 4 && (
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
