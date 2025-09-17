import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { PATHS } from "../../../../router";
import { Link } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import Cookies from "js-cookie";
import { useState, useRef } from "react";
import Swal from "sweetalert2";

export default function VerificationForms({ fullname }) {
  const [successMsg, setSuccessMsg] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const sigCanvas = useRef({});
  const [formData, setFormData] = useState({
    comments: "",
    actionOutstanding: "",
    licenseVerifiedBy: "",
    dateVerified: "",
    expirationDate: "",
    licenseNumber: "",
    disciplines: [],
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;

  const clearSignature = () => {
    sigCanvas.current.clear();
    setFormData((prev) => ({
      ...prev,
      signature: "",
    }));
  };

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      // Handle checkbox inputs for disciplines
      if (name === "disciplines[]") {
        setFormData((prev) => {
          const newDisciplines = checked
            ? [...prev.disciplines, value]
            : prev.disciplines.filter((d) => d !== value);

          return {
            ...prev,
            disciplines: newDisciplines,
          };
        });
      }
    } else {
      // Handle all other inputs
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const nextStep = () => {
    setErrors({});
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

    // Only validate signature (as requested)
    if (sigCanvas.current.isEmpty()) {
      setErrors({ signature: "Signature is required" });
      setLoading(false);
      return;
    }

    const signatureData = sigCanvas.current.toDataURL("image/png");

    try {
      const response = await fetch(
        `${apiBase}/api/user/verification-of-professional-license-forms`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            ...formData,
            signature: signatureData,
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
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Failed to submit form",
        });
        return;
      }

      setSuccessMsg(data.message);
      setCurrentStep(3); // Success step
      setTimeout(() => window.location.reload(), 4000);
    } catch (err) {
      setErrors({ general: err.message || "An error occurred" });
    } finally {
      setLoading(false);
    }
  };

  // Progress steps
  const steps = ["Form", "Signature", "Success"];

  return (
    <>
      <title>Verification of Professional License - 1staccess Home Care</title>

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
                      <h3>Verification of Professional License</h3>
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
                      <Link to={PATHS.USER_UNIVERSAL_PRECAUTIONS_FORM}>
                        Verification of Professional License
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
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label className="form-label">
                                    Check Off Discipline Needing Verification
                                  </label>
                                  <br />
                                  <div className="form-check form-check-inline">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="checkboxRN"
                                      name="disciplines[]"
                                      value="RN"
                                      checked={formData.disciplines.includes(
                                        "RN"
                                      )}
                                      onChange={handleOnChange}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="checkboxRN"
                                    >
                                      RN
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="checkboxLPN"
                                      name="disciplines[]"
                                      value="LPN"
                                      checked={formData.disciplines.includes(
                                        "LPN"
                                      )}
                                      onChange={handleOnChange}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="checkboxLPN"
                                    >
                                      LPN
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="checkboxHHA"
                                      name="disciplines[]"
                                      value="HHA"
                                      checked={formData.disciplines.includes(
                                        "HHA"
                                      )}
                                      onChange={handleOnChange}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="checkboxHHA"
                                    >
                                      HHA
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="checkboxCNA"
                                      name="disciplines[]"
                                      value="CNA"
                                      checked={formData.disciplines.includes(
                                        "CNA"
                                      )}
                                      onChange={handleOnChange}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="checkboxCNA"
                                    >
                                      CNA
                                    </label>
                                    {errors.disciplines && (
                                      <small className="text-danger">
                                        {errors.disciplines[0]}
                                      </small>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    License Number
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      onChange={handleOnChange}
                                      name="licenseNumber"
                                      value={formData.licenseNumber}
                                      type="text"
                                      className="form-control"
                                      autoComplete="off"
                                    />
                                  </div>
                                  {errors.licenseNumber && (
                                    <small className="text-danger">
                                      {errors.licenseNumber[0]}
                                    </small>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-4 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Expiration Date Of License
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      name="expirationDate"
                                      value={formData.expirationDate}
                                      onChange={handleOnChange}
                                      type="date"
                                      className="form-control"
                                      autoComplete="off"
                                    />
                                  </div>
                                  {errors.expirationDate && (
                                    <small className="text-danger">
                                      {errors.expirationDate[0]}
                                    </small>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-4 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Date Verified
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      name="dateVerified"
                                      value={formData.dateVerified}
                                      type="date"
                                      className="form-control"
                                      autoComplete="off"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.dateVerified && (
                                    <small className="text-danger">
                                      {errors.dateVerified[0]}
                                    </small>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-6 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    License Verified By
                                  </label>
                                  <div className="form-control-wrap">
                                    <select
                                      name="licenseVerifiedBy"
                                      className="form-select"
                                      value={formData.licenseVerifiedBy}
                                      onChange={handleOnChange}
                                    >
                                      <option value="">Choose...</option>
                                      <option value="written">Written</option>
                                      <option value="phone">Phone</option>
                                      <option value="fax">Fax</option>
                                    </select>
                                  </div>
                                  {errors.licenseVerifiedBy && (
                                    <small className="text-danger">
                                      {errors.licenseVerifiedBy[0]}
                                    </small>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-6 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Action Outstanding
                                  </label>
                                  <div className="form-control-wrap">
                                    <select
                                      onChange={handleOnChange}
                                      name="actionOutstanding"
                                      className="form-select"
                                      value={formData.actionOutstanding}
                                    >
                                      <option value="">Choose...</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                  </div>
                                  {errors.actionOutstanding && (
                                    <small className="text-danger">
                                      {errors.actionOutstanding[0]}
                                    </small>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-12 mt-20">
                                <div className="form-group">
                                  <label
                                    htmlFor="textarea"
                                    className="form-label"
                                  >
                                    Comments
                                  </label>
                                  <div className="form-control-wrap">
                                    <textarea
                                      name="comments"
                                      value={formData.comments}
                                      onChange={handleOnChange}
                                      className="form-control"
                                    />
                                  </div>
                                  {errors.comments && (
                                    <small className="text-danger">
                                      {" "}
                                      {errors.comments[0]}{" "}
                                    </small>
                                  )}
                                </div>
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
                              Signature of Agency Representative
                            </h4>
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
                        {/* Step 3: Success */}
                        {currentStep === 3 && (
                          <div className="step-content text-center py-5">
                            <div className="success-icon mb-4">
                              <i
                                className="ri-checkbox-circle-fill text-success"
                                style={{ fontSize: "4rem" }}
                              ></i>
                            </div>
                            <h3 className="text-success">
                              {successMsg
                                ? successMsg
                                : "Form submitted successfully!"}
                            </h3>
                            <p className="mb-4">
                              Thank you for submitting your verification form.
                              We will review it and contact you soon.
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
          background-color: "✓";
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

        .mt-20 {
          margin-top: 20px;
        }
      `}</style>
    </>
  );
}
