import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";
import SignatureCanvas from "react-signature-canvas";
import Cookies from "js-cookie";
import { useState, useRef, useEffect } from "react";

export default function DisclosureForms({ fullname, position }) {
  const [successMsg, setSuccessMsg] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const sigCanvas = useRef(null);
  const witnessSigCanvas = useRef(null);
  const [formData, setFormData] = useState({
    mailing_address: "",
    convicted_outside_commonwealth: "",
    outside_commonwealth_specify: "",
    convicted_pending: "",
    convicted_pending_specify: "",
    child_abuse: "",
    signature: "", // Store signature data
    wit_signature: "", // Store witness signature data
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;

  // Restore signatures when component mounts or step changes
  useEffect(() => {
    if (sigCanvas.current && formData.signature) {
      sigCanvas.current.fromDataURL(formData.signature);
    }
    if (witnessSigCanvas.current && formData.wit_signature) {
      witnessSigCanvas.current.fromDataURL(formData.wit_signature);
    }
  }, [currentStep, formData.signature, formData.wit_signature]);

  const clearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    }
    setFormData((prev) => ({
      ...prev,
      signature: "",
    }));
  };

  const clearWitnessSignature = () => {
    if (witnessSigCanvas.current) {
      witnessSigCanvas.current.clear();
    }
    setFormData((prev) => ({
      ...prev,
      wit_signature: "",
    }));
  };

  const convicted =
    formData.convicted_outside_commonwealth === "Yes (Convicted)" ||
    formData.convicted_outside_commonwealth === "Yes (Pending)";

  const convictedPending =
    formData.convicted_pending === "Yes (Convicted)" ||
    formData.convicted_pending === "Yes (Pending)";

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const captureSignature = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      const signatureData = sigCanvas.current.toDataURL("image/png");
      setFormData((prev) => ({ ...prev, signature: signatureData }));
      return true;
    }
    return false;
  };

  const captureWitnessSignature = () => {
    if (witnessSigCanvas.current && !witnessSigCanvas.current.isEmpty()) {
      const signatureData = witnessSigCanvas.current.toDataURL("image/png");
      setFormData((prev) => ({ ...prev, wit_signature: signatureData }));
      return true;
    }
    return false;
  };

  const nextStep = () => {
    // Capture signatures before moving to next step
    if (currentStep === 5) {
      captureWitnessSignature();
    }
    if (currentStep === 6) {
      captureSignature();
    }

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

    // Capture signatures before submitting
    captureSignature();
    captureWitnessSignature();

    // Validate signatures by checking the state data, not the capture function return
    if (!formData.signature) {
      setErrors({ signature: "Signature is required" });
      setLoading(false);
      return;
    }

    if (!formData.wit_signature) {
      setErrors({ wit_signature: "Witness Signature is required" });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${apiBase}/api/user/sworn-disclosure-forms`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(formData),
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
      setCurrentStep(7); // Success step
      //delay for 5sec then relaod page
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
    "Declaration",
    "Declaration",
    "Declaration",
    "Witness Signature",
    "Signature",
    "Success",
  ];

  return (
    <>
      <title>Sworn Disclosure Statement - 1staccess Home Care</title>

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
                      <h3>Sworn Disclosure Statement</h3>
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
                      <Link to={PATHS.USER_DISCLOSURE_FORM}>
                        Sworn Disclosure Statement
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
                  <div className="card ">
                    <div className="card-body">
                      <form onSubmit={handleFormSubmit}>
                        {currentStep === 1 && (
                          <div className="step-content">
                            <h4 className="step-title">PREAMBLE</h4>
                            <div className="row">
                              <div className="col-12">
                                <p>
                                  Employee Name: <u> {fullname} </u>
                                </p>

                                <p>
                                  Section 32.1-162.9:1 of the Code of Virginia
                                  requires that a sworn disclosure statement or
                                  affirmation be completed for each prospective
                                  employee for a home care organization.
                                  Employment or volunteering is prohibited if a
                                  person has been convicted of any of the
                                  offenses specified on the reverse side or has
                                  been the subject of a founded complaint of
                                  child abuse or neglect. Convictions include
                                  adult convictions and juvenile convictions and
                                  adjudications of delinquency based on an
                                  offense that would have been at the time of
                                  conviction a felony, conviction if committed
                                  by an adult within or outside the
                                  commonwealth. Any person making a materially
                                  false statement regarding any such offense
                                  shall be guilty of a Class 1 misdemeanor. This
                                  statement must be provided to and maintained
                                  at the exempt facility for prospective
                                  employees and volunteers.
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
                            <h4 className="step-title">DECLARATION</h4>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    Mailing Address
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      name="mailing_address"
                                      value={formData.mailing_address}
                                      type="text"
                                      className="form-control"
                                      placeholder="Current Mailing Adress Street, Apt No / City / State / Zip"
                                      autoComplete="off"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    Position Applied For
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      disabled
                                      value={position}
                                      type="text"
                                      className="form-control"
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
                        {currentStep === 3 && (
                          <div className="step-content">
                            <h4 className="step-title">DECLARATION</h4>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <div className="form-control-wrap">
                                    <p>
                                      1. Have you ever been convicted of or are
                                      you the subject of pending charges for any
                                      of the following offenses: murder;
                                      malicious wounding by mob; abduction;
                                      abduction for immoral purposes; assault
                                      and bodily wounding; robbery; carjacking;
                                      extortion by threat; any felony stalking
                                      violation; sexual assault; arson;
                                      burglary; any felony violation relating to
                                      possession or distribution of drugs; drive
                                      by shooting; use of a machine gun in a
                                      crime of violence; aggressive use of a
                                      machine gun; use of a sawed-off shotgun in
                                      a crime of violence; pandering; crimes
                                      against nature involving children; incest;
                                      taking indecent liberties with children;
                                      abuse and neglect of children, including
                                      failing to secure medical attention for an
                                      injured child; obscenity offenses;
                                      possession of child pornography;
                                      electronic facilitation of pornography;
                                      abuse and neglect of incapacitated adults;
                                      employing or permitting a minor to assist
                                      in an act constituting an obscenity or
                                      related offence; delivery of drugs to
                                      prisoners; escape from jail; felonies by
                                      prisoners; within the Commonwealth or any
                                      equivalent offense outside the
                                      Commonwealth?
                                    </p>
                                    <select
                                      name="convicted_outside_commonwealth"
                                      className="form-select"
                                      value={
                                        formData.convicted_outside_commonwealth
                                      }
                                      onChange={handleOnChange}
                                    >
                                      <option value="">Select</option>
                                      <option value="Yes (Convicted)">
                                        Yes (Convicted)
                                      </option>
                                      <option value="Yes (Pending)">
                                        Yes (Pending)
                                      </option>
                                      <option value="No">No</option>
                                    </select>
                                  </div>
                                </div>
                              </div>

                              {convicted && (
                                <div className="col-md-12 mt-20">
                                  <div className="form-group">
                                    <label className="form-label">
                                      If Yes Specify Crimes
                                    </label>
                                    <div className="form-control-wrap">
                                      <textarea
                                        onChange={handleOnChange}
                                        name="outside_commonwealth_specify"
                                        className="form-control"
                                        aria-label="With textarea"
                                        value={
                                          formData.outside_commonwealth_specify
                                        }
                                      />
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
                        {currentStep === 4 && (
                          <div className="step-content">
                            <h4 className="step-title">DECLARATION</h4>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <p>
                                    2. Have you been convicted of or are you the
                                    subject of a pending charge for any other
                                    felony in the five(5) years prior to the
                                    date of employment or volunteering?
                                  </p>
                                  <div className="form-control-wrap">
                                    <select
                                      name="convicted_pending"
                                      className="form-select"
                                      value={formData.convicted_pending}
                                      onChange={handleOnChange}
                                    >
                                      <option value="">Select</option>
                                      <option value="Yes (Convicted)">
                                        Yes (Convicted)
                                      </option>
                                      <option value="Yes (Pending)">
                                        Yes (Pending)
                                      </option>
                                      <option value="No">No</option>
                                    </select>
                                  </div>
                                </div>
                              </div>

                              {convictedPending && (
                                <div className="col-md-12 mt-20">
                                  <div className="form-group">
                                    <p>If Yes, Specify Crime(s)</p>
                                    <div className="form-control-wrap">
                                      <textarea
                                        name="convicted_pending_specify"
                                        className="form-control"
                                        aria-label="With textarea"
                                        value={
                                          formData.convicted_pending_specify
                                        }
                                        onChange={handleOnChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}

                              <div className="col-md-12 mt-20">
                                <div className="form-group">
                                  <p>
                                    3. Have you ever been the subject of a
                                    founded complaint of child abuse or neglect
                                    within or outside the Commonwealth?
                                  </p>
                                  <div className="form-control-wrap">
                                    <select
                                      name="child_abuse"
                                      className="form-select"
                                      value={formData.child_abuse}
                                      onChange={handleOnChange}
                                    >
                                      <option value="">Choose...</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
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
                        {/* Step 5: Witness Signature */}
                        {currentStep === 5 && (
                          <div className="step-content">
                            <h4 className="step-title">Witness Signature</h4>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label className="form-label">
                                    Witness Signature
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
                                          ref={witnessSigCanvas}
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
                                          onEnd={captureWitnessSignature}
                                        />
                                      </div>
                                      {errors.wit_signature && (
                                        <small className="text-danger mt-2">
                                          {errors.wit_signature}
                                        </small>
                                      )}
                                    </div>
                                    <div className="clear-btn mt-2">
                                      <button
                                        disabled={loading}
                                        type="button"
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={clearWitnessSignature}
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
                                type="button"
                                className="btn btn-primary"
                                onClick={nextStep}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        )}
                        {/* Step 6: Signature */}
                        {currentStep === 6 && (
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
                                          onEnd={captureSignature}
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
                        {/* Step 7: Success */}
                        {currentStep === 7 && (
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
                              Thank you for submitting your disclosure form. We
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
