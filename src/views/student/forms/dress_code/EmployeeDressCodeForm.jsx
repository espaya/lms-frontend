import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";
import { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import Cookies from "js-cookie";

export default function EmployeeDressCodeForm({ fullname }) {
  const [currentStep, setCurrentStep] = useState(1);
  const sigCanvas = useRef({});
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;

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
        `${apiBase}/api/user/employee-dress-code-form`,
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
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ general: data.message });
        }
      } else {
        setSuccessMsg(data.message);
        setCurrentStep(3); // Success step
        //delay for 5sec then relaod page
        setTimeout(() => window.location.reload(), 4000);
      }
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Progress steps
  const steps = ["Dress Code", "Signature", "Success"];

  return (
    <>
      <title>Employee Dress Code - 1staccess Home Care</title>

      <body className="dashboard">
        <div id="main-wrapper">
          <UserHeader />
          <UserSidebar />
          <div className="content-body">
            <div className="container">
              <div className="page-title">
                <div className="row align-items-center justify-content-between">
                  <div className="col-md-6">
                    <div className="page-title-content">
                      <h3>Employee Dress Code</h3>
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
                      <Link to={PATHS.USER_EMPLOYEE_DRESS_CODE_FORM}>
                        Employee Dress Code
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

              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <form onSubmit={handleFormSubmit}>
                        {/*  */}
                        {currentStep === 1 && (
                          <div className="step-content">
                            <h4 className="step-title">Employee Dress Code</h4>
                            <div className="row">
                              <div className="col-12">
                                <p>
                                  Employee Name: <u> {fullname} </u>
                                </p>

                                <p>
                                  <strong>
                                    1st Access Home Care Incorporated strives to
                                    present a professional and safe health care
                                    image to patients’ families, the community,
                                    and other health care professionals. 1st
                                    Access Home Care Incorporated staff members
                                    adhere to the following standards in their
                                    dress appearance.
                                  </strong>
                                </p>

                                <ul>
                                  <li>
                                    1. All staff will wear an approved 1st
                                    Access Home Care incorporated name badge
                                    when providing patient care
                                  </li>
                                  <li>
                                    2. Clothing shall be clean, neat, and well
                                    maintained. Allowed Clothing: Scrubs must be
                                    worn at all times.
                                  </li>
                                  <li>
                                    3. Shoes should be conservative and
                                    comfortable. Closed toed shoes will be worn
                                    at all times for personal safety and
                                    infection control while providing client
                                    care.
                                  </li>

                                  <li>
                                    5. Employees are expected to keep their hair
                                    dry, neat, and clean. Long hair must be
                                    styled so it does not come in contact with
                                    the patient. Mustaches and beards must be
                                    clean and trimmed
                                  </li>
                                  <li>
                                    6. Perfume should be conservative. Strong
                                    odors can be offensive to patients.
                                  </li>
                                  <li>
                                    7. Jewelry represents a safety hazard, so it
                                    must be worn in discretion, i.e. wedding
                                    rings, rings without large mountings, small
                                    earrings or studs. Visible piercing, except
                                    for earrings, should be removed when
                                    providing patient care. Both professionalism
                                    and safety should be considered when wearing
                                    jewelry.
                                  </li>
                                  <li>
                                    8. Fingernails are to be kept clean, trimmed
                                    and moderately short for patient safety.
                                  </li>
                                </ul>
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
                        {/*  */}
                        {currentStep === 2 && (
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

                        {currentStep === 3 && (
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
      </body>
      <style jsx>{`
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
