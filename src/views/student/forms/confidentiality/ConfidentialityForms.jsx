import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";
import { useEffect, useState, useRef } from "react";
import FetchConfidentiality from "../../../../controller/user/forms/ConfidentialityController";
import SignatureCanvas from "react-signature-canvas";
import Cookies from "js-cookie";

export default function ConfidentialityForms() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;
  const [confidentiality, setConfidentiality] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const sigCanvas = useRef({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    FetchConfidentiality(setLoading, setErrors, apiBase, setConfidentiality);
  }, []);

  const fullname = confidentiality?.profileData?.full_name;

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
        `${apiBase}/api/user/confidentiality-forms`,
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
        setCurrentStep(5); // Success step
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
  const steps = [
    "Confidentiality",
    "What We Can Do",
    "Declaration",
    "Signature",
    "Success",
  ];

  return (
    <>
      <title>
        Confidentiality of Information Agreement - 1staccess Home Care
      </title>

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
                      <h3>Confidentiality of Information Agreement</h3>
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
                      <Link to={PATHS.USER_CONFIDENTIALITY_FORM}>
                        Confidentiality of Information Agreement
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

              {successMsg && currentStep === 4 && (
                <p className="alert alert-success"> {successMsg} </p>
              )}

              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <form onSubmit={handleFormSubmit}>
                        {currentStep === 1 && (
                          <div className="step-content">
                            <h4 className="step-title">
                              Confidentiality of Information
                            </h4>
                            <div className="row">
                              <div className="col-12">
                                <p>
                                  Employee Name: <u> {fullname} </u>
                                </p>
                                <br />
                                <ol>
                                  <li>
                                    1. All information designated confidential
                                    that is obtained or generated as a result of
                                    any or all of the operations of the Agency
                                    will be dealt with in a confidential manner.
                                  </li>

                                  <li>
                                    2. All information that is gathered,
                                    maintained or stored by the Agency becomes
                                    the Agency’s property and cannot be released
                                    without proper authorization from the
                                    administration.
                                  </li>

                                  <li>
                                    3. Altering information is prohibited by the
                                    Agency and by law. Correction of any
                                    identified erroneous information must be
                                    done according to Agency policy
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

                        {/* Step 2: What We Can Do */}
                        {currentStep === 2 && (
                          <div className="step-content">
                            <h4 className="step-title">
                              Confidentiality of Information
                            </h4>
                            <div className="row">
                              <div className="col-12">
                                <h5>
                                  What we can do to maintain the confidentiality
                                  of Information
                                </h5>
                                <ol>
                                  <li>
                                    1. In order to protect any individual from
                                    invasion of privacy and to protect the
                                    interest of the Agency, any information
                                    gathered for client care or operations will
                                    be gathered, maintained and stored in such a
                                    manner as to ensure confidentiality.
                                  </li>

                                  <li>
                                    2. Access to information will be limited to
                                    a need to know basis to perform the scope of
                                    one’s duties and responsibilities.
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

                        {/* Step 3: Declaration */}
                        {currentStep === 3 && (
                          <div className="step-content">
                            <h4 className="step-title">
                              Confidentiality of Information
                            </h4>
                            <div className="row">
                              <div className="col-12">
                                <h5>DECLARATION:</h5>

                                <p>
                                  I understand that I am responsible for
                                  following this Confidentiality Policy
                                  Agreement & The Guidelines, both written and
                                  verbal
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

                        {/* Step 5: Success */}
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
