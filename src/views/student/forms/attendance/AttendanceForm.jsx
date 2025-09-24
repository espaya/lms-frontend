import { useEffect, useState, useRef } from "react";
import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import FetchAttendance from "../../../../controller/user/forms/AttendanceController";
import SignatureCanvas from "react-signature-canvas";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";

export default function AttendanceForms() {
  const apiBase = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [formData, setFormData] = useState({});
  const [attendance, getAttendance] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const sigCanvas = useRef({});

  useEffect(() => {
    FetchAttendance(apiBase, setLoading, setErrors, getAttendance);
  }, []);

  const fullname = attendance?.profileData?.full_name;

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
      const response = await fetch(`${apiBase}/api/user/attendance-forms`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ ...formData, signature: signatureData }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN") || ""),
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || { general: data.message });
        return;
      }
      setSuccessMsg(data.message);
      setCurrentStep(5); // Success step
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Progress steps
  const steps = [
    "Policy Overview",
    "Attendance Policy",
    "Absenteeism Policy",
    "Signature",
    "Success",
  ];

  return (
    <>
      <title>
        Employee Notification of Policy: Attendance, Tardiness, Absenteeism and
        Leave - 1staccess Home Care
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
                      <h3>Attendance, Tardiness, Absenteeism and Leave</h3>
                      <p className="mb-2">Fill all required (*) fields</p>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="breadcrumbs">
                      <Link to={{ pathname: PATHS.USER_DASHBOARD }}>Home</Link>
                      <span>
                        <i className="ri-arrow-right-s-line"></i>
                      </span>
                      <Link to={{ pathname: PATHS.USER_FORMS }}>Forms</Link>
                      <span>
                        <i className="ri-arrow-right-s-line"></i>
                      </span>
                      <Link to={PATHS.USER_ATTENDANCE_FORM}>
                        Attendance, Tardiness, Absenteeism and Leave
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
                        {/* Step 1: Policy Overview */}
                        {currentStep === 1 && (
                          <div className="step-content">
                            <h4 className="step-title">Policy Overview</h4>
                            <div className="row">
                              <div className="col-12">
                                <p>
                                  Employee Name: <u> {fullname} </u>
                                </p>
                                <br />
                                <p>
                                  Exempt employees are owners, officers,
                                  management and supervisors. All full time
                                  employees are required to put in a full day's
                                  work and a full 40 hour work week. All
                                  employees regardless of classification, are
                                  required to arrive on time and appropriately
                                  complete their designated hours and tasks as
                                  assigned.
                                </p>
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

                        {/* Step 2: Attendance Policy */}
                        {currentStep === 2 && (
                          <div className="step-content">
                            <h4 className="step-title">Attendance Policy</h4>
                            <div className="row">
                              <div className="col-12">
                                <h5>ATTENDANCE:</h5>
                                <ul>
                                  <li>
                                    1. The employee must notify the Supervisor
                                    in all events of tardiness. If the office is
                                    closed, call the answering service to have
                                    on-call Supervisor paged and relay
                                    information to him or her. Only 3 tardiness
                                    in a calendar month will be accepted unless
                                    very extenuating circumstances are present
                                    and approved by the Supervisor. More than 3
                                    tardiness within a given month may result in
                                    counselling with Supervisor and every effort
                                    made to avoid further tardiness. A copy of
                                    counselling will be placed in the personnel
                                    file. Two consecutive months of written
                                    warnings for excessive tardiness may result
                                    in dismissal or termination
                                  </li>
                                  <li>
                                    2. No show/no call situations are not
                                    tolerated and may result in termination.
                                  </li>
                                  <li>
                                    3. Perfect attendance throughout the year
                                    may be rewarded at year - end at the
                                    discretion of supervisor and/or
                                    administrator.
                                  </li>
                                </ul>
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

                        {/* Step 3: Absenteeism Policy */}
                        {currentStep === 3 && (
                          <div className="step-content">
                            <h4 className="step-title">Absenteeism Policy</h4>
                            <div className="row">
                              <div className="col-12">
                                <h5>ABSENTEEISM:</h5>
                                <ul>
                                  <li>
                                    1. Employees are required to inform the
                                    Supervisor as soon as possible when
                                    absenteeism is known, to allow the Agency
                                    time to cover assignments. The employee is
                                    not excused from work until the Supervisor
                                    approves the absence or verified he/she is
                                    aware.
                                  </li>
                                  <li>
                                    2. Illness and or injury that requires a
                                    physician's treatment and that may take more
                                    than a day for recovery will need to be
                                    called in and discussed with the Supervisor.
                                    When the office is closed, request the
                                    answering service to contact the person on
                                    call with the information and give your
                                    phone number for follow-up.
                                  </li>
                                  <li>
                                    3. If an employee needs to be absent for
                                    reasons other than illness, he/she must
                                    submit a Leave Request Form at least 14 days
                                    prior to time requested.
                                  </li>
                                  <li>
                                    4. More than 3 consecutive days of
                                    absenteeism requires a physician's note for
                                    illness or injury sustained. Medically
                                    verified illness may be excused. Failure to
                                    provide proper notice will result in
                                    counselling and a written warning will be
                                    placed in the personnel file.
                                  </li>
                                  <li>
                                    5. Excessive absenteeism without just cause
                                    or physician's excuse is reason for
                                    dismissal.
                                  </li>
                                  <li>
                                    6.{" "}
                                    <strong>
                                      No shows / no calls are not tolerated.
                                    </strong>{" "}
                                    The need to follow policy and procedure is a
                                    courtesy to other employees. Disciplinary
                                    action may be supervised in an effort to
                                    avoid any further complications.
                                  </li>
                                  <li>
                                    7. Notice to your Supervisor in writing for
                                    consideration on a requested leave of
                                    absence must be submitted at least 14 days
                                    to leave, unless there is a cause of
                                    emergency or illness.
                                  </li>
                                </ul>
                                <br />
                                <p>
                                  <strong>I</strong> acknowledge that I have
                                  been oriented to the Agency's policy regarding{" "}
                                  <strong>ATTENDANCE</strong> and{" "}
                                  <strong>ABSENTEEISM,</strong> and I agree to
                                  follow all guidelines, both written and
                                  verbal. I understand that, if the guidelines,
                                  policies and procedures are not followed, that
                                  I may be immediately terminated. I also had
                                  the opportunity to ask questions regarding
                                  this policy and I know where it's located for
                                  future reference.
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
