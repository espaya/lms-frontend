import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";
import SignatureCanvas from "react-signature-canvas";
import Cookies from "js-cookie";
import { useState, useRef } from "react";

export default function EmployeeAgreementForm({ fullname }) {
  const [currentStep, setCurrentStep] = useState(1);
  const sigCanvas = useRef(null);
  const signatureDataRef = useRef(""); // Use ref for signature data
  const companySigCanvas = useRef(null);
  const companyDataRef = useRef("");
  const agencyRepCanvas = useRef(null);
  const agencyRepDataRef = useRef("");
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company_contacted: "",
    employer_name: "",
    from_date: "",
    to_date: "",
    eligible_for_hire: "",
    comments: "",
    received_by: "",
    name_of_company: "",
    time_off: "",
    rep_title: "",
  });
  const apiBase = import.meta.env.VITE_API_URL;

  const clearSignature = () => {
    sigCanvas.current.clear();
    signatureDataRef.current = ""; // Clear the ref instead of state
  };

  const clearCompanySignature = () => {
    companySigCanvas.current.clear();
    companyDataRef.current = "";
  };

  const clearAgencyRepSignature = () => {
    agencyRepCanvas.current.clear();
    agencyRepDataRef.current = "";
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

    if (formData.received_by === "Fax" && companySigCanvas.current.isEmpty()) {
      setErrors({ company_signature: "Company signature if required" });
    }

    // Get signature data only when submitting
    const signatureData = sigCanvas.current.toDataURL("image/png");
    signatureDataRef.current = signatureData;

    const companySignatureData =
      companySigCanvas.current.toDataUrl("image/png");
    companyDataRef.current = companySignatureData;

    const agencyRepSignatureData =
      agencyRepCanvas.current.toDataURL("image/png");
    agencyRepDataRef.current = agencyRepSignatureData;

    try {
      const response = await fetch(
        `${apiBase}/api/user/employee-reference-check-forms`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            ...formData,
            signature: signatureDataRef.current, // Use the ref value
            company_signature: companyDataRef.current,
            rep_signature: agencyRepDataRef.current,
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
    "Reference Check",
    "Information Recipient",
    "Agency Representative",
    "Signature",
    "Success",
  ];

  return (
    <>
      <title>Employee Reference Check - 1staccess Home Care</title>

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
                      <h3>Employee Reference Check</h3>
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
                      <Link to={PATHS.USER_EMPLOYEE_REFERENCE_CHECK_FORM}>
                        Employee Reference Check
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
                            <h4 className="step-title">Reference Check</h4>
                            <div className="row">
                              <div className="col-md-12">
                                <p>Employee Name: {fullname}</p>
                              </div>
                              <div className="col-md-6 mt-20">
                                <div className="form-group">
                                  <label for="inputAddress" class="form-label">
                                    Company Contacted
                                  </label>
                                  <div class="form-control-wrap">
                                    <input
                                      name="company_contacted"
                                      value=""
                                      type="text"
                                      className="form-control"
                                      autocomplete="off"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 mt-20">
                                <div className="form-group">
                                  <label for="inputAddress" class="form-label">
                                    Mr/Mrs
                                  </label>
                                  <div class="form-control-wrap">
                                    <input
                                      name="employer_name"
                                      value=""
                                      type="text"
                                      className="form-control "
                                      autocomplete="off"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12 mt-20">
                                <div className="form-group">
                                  <div className="form-control-wrap">
                                    <p>
                                      Is checking employment with our company.
                                      It is our policy to ask for references
                                      prior to employment. Please complete this
                                      form for our records and sign below.
                                      <br /> We would greatly appreciate your
                                      assistance.
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12 mt-20">
                                <div className="form-group">
                                  <h5>Please Verify Employment Dates</h5>
                                </div>
                              </div>
                              <div className="col-md-4 mt-20">
                                <div className="form-group">
                                  <label for="inputCity" className="form-label">
                                    From
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      name="from_date"
                                      value=""
                                      type="date"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4 mt-20">
                                <div className="form-group">
                                  <label for="inputCity" className="form-label">
                                    To
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      name="to_date"
                                      value=""
                                      type="date"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4 mt-20">
                                <div className="form-group">
                                  <label
                                    for="inputState"
                                    className="form-label"
                                  >
                                    Eligible For Hire?
                                  </label>
                                  <div className="form-control-wrap">
                                    <select
                                      name="eligible_for_hire"
                                      className="form-select"
                                    >
                                      <option value="">Choose...</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12 mt-20">
                                <div className="form-group">
                                  <label for="inputZip" className="form-label">
                                    Comments
                                  </label>
                                  <div className="form-control-wrap">
                                    <textarea
                                      name="comments"
                                      className="form-control"
                                      aria-label="With textarea"
                                    />
                                  </div>
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
                              Information Recipient
                            </h4>
                            <div className="row">
                              <div className="col-md-6 mt-20">
                                <div className="form-group">
                                  <label
                                    for="inputState"
                                    className="form-label"
                                  >
                                    Information Was Received By
                                  </label>
                                  <div className="form-control-wrap">
                                    <select
                                      name="received_by"
                                      className="form-select"
                                      onChange={handleOnChange}
                                    >
                                      <option value="">Choose...</option>
                                      <option value="Phone">Phone</option>
                                      <option value="Mail">Mail</option>
                                      <option value="Fax">Fax</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 mt-20">
                                <div className="form-group">
                                  <label for="inputZip" className="form-label">
                                    Name of Company
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      name="name_of_company"
                                      value=""
                                      type="text"
                                      className="form-control"
                                      autocomplete="off"
                                    />
                                  </div>
                                </div>
                              </div>
                              {formData.received_by === "Fax" && (
                                <div className="col-md-12 mt-20">
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
                                            ref={companySigCanvas}
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
                                          onClick={clearCompanySignature}
                                        >
                                          <span>Clear Signature</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
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
                            <h4 className="step-title">
                              Agency Representative
                            </h4>
                            <div className="row">
                              <div className="col-md-12 mt-20">
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
                                          ref={agencyRepCanvas}
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
                                        onClick={clearAgencyRepSignature}
                                      >
                                        <span>Clear Signature</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12 mt-20">
                                <div className="form-group">
                                  <label for="inputZip" className="form-label">
                                    Agency Representative's Title
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      name="rep_title"
                                      value=""
                                      type="text"
                                      className="form-control"
                                      autocomplete="off"
                                    />
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
