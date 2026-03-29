import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MyHeader from "../../../../components/MyHeader";
import Sidebar from "../../../../components/Sidebar";
import Nav from "../../single_user/Nav";
import { Link } from "react-router-dom";
import Spinner from "../../../../components/Spinner";
import { formatDate } from "../../../../utils/DateFormatter";
import printContent from "../../../../utils/printContent";
import FetchAllEmployeeForms from "../../../../controller/admin/AllFormsController";

export default function SignedAttendanceForms() {
  const { username } = useParams();
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;
  const [errors, setErrors] = useState({});
  const [allForms, setAllForms] = useState([]);

  useEffect(() => {
    FetchAllEmployeeForms(
      setLoading,
      setErrors,
      setAllForms,
      apiBase,
      username,
    );
  }, []);

  const fullname = allForms?.application_form?.profile?.full_name;
  const data = allForms.attendance_tardiness;

  return (
    <>
      <title>
        Employee Notification of Policy: Attendance, Tardiness, Absenteeism and
        Leave - 1staccess Home Care
      </title>
      <div id="main-wrapper">
        <MyHeader />
        <Sidebar />

        <div className="content-body">
          <div className="container py-4">
            {/* Page Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="fw-bold mb-1">{fullname || username}</h3>
                <p className="text-muted mb-0">Signed Policy Document</p>
              </div>

              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-success">Signed</span>
              </div>
            </div>

            <div className="row">
              <Nav username={username} />

              {loading ? (
                <div className="col-md-9">
                  <div className="card p-4">
                    <div className="placeholder-glow">
                      <span className="placeholder col-6 mb-3"></span>
                      <span className="placeholder col-12 mb-2"></span>
                      <span className="placeholder col-12 mb-2"></span>
                      <span className="placeholder col-10"></span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-md-9">
                  <div className="card shadow-sm border-0">
                    {/* Printable Area */}
                    <div id="printArea" className="card-body p-5">
                      {/* Document Header */}
                      <div className="text-center mb-4">
                        <img
                          src="/assets/images/main_logo.png"
                          width={110}
                          alt="Company Logo"
                        />

                        <h4 className="fw-bold mt-3 mb-1">
                          1st Access Home Care
                        </h4>

                        <p className="text-muted small mb-3">
                          6600 Fieldtan Trail, Moseley, VA · (+1) 804-818-3216
                        </p>

                        <div className="doc-title">
                          Attendance, Tardiness & Absenteeism Policy
                        </div>
                      </div>

                      {/* Employee Info */}
                      <div className="mb-4">
                        <p>
                          <strong>Employee Name:</strong>{" "}
                          <span className="underline">{fullname ?? "N/A"}</span>
                        </p>
                      </div>

                      {/* Intro */}
                      <p className="mb-4">
                        All employees are expected to maintain punctuality and
                        complete assigned duties efficiently. This policy
                        outlines expectations regarding attendance, tardiness,
                        absenteeism, and leave.
                      </p>

                      {/* Attendance Section */}
                      <div className="policy-section">
                        <h6>Attendance</h6>
                        <ul>
                          <li>
                            Employees must notify supervisors in cases of
                            tardiness.
                          </li>
                          <li>
                            More than 3 tardiness incidents may lead to
                            disciplinary action.
                          </li>
                          <li>No call/no show may result in termination.</li>
                          <li>Perfect attendance may be rewarded annually.</li>
                        </ul>
                      </div>

                      {/* Absenteeism Section */}
                      <div className="policy-section">
                        <h6>Absenteeism</h6>
                        <ul>
                          <li>Notify supervisor as early as possible.</li>
                          <li>
                            Medical absences must be documented if extended.
                          </li>
                          <li>
                            Leave requests must be submitted 14 days in advance.
                          </li>
                          <li>
                            3+ days absence requires physician documentation.
                          </li>
                          <li>
                            Unjustified absenteeism may lead to dismissal.
                          </li>
                        </ul>
                      </div>

                      {/* Acknowledgment */}
                      <div className="ack-box mt-4">
                        <p>
                          I acknowledge that I have read and understood the
                          company’s policies on attendance and absenteeism. I
                          agree to comply with all guidelines and understand
                          that violations may result in disciplinary action.
                        </p>
                      </div>

                      {/* Signature Section */}
                      <div className="signature-section mt-5">
                        <div className="row">
                          <div className="col-md-6">
                            <label>Employee Signature</label>
                            <div className="signature-line">
                              {data?.signature ? (
                                <img
                                  src={`${apiBase}/storage/signature/${data.signature}`}
                                  alt="Signature"
                                />
                              ) : (
                                <span className="text-muted">No signature</span>
                              )}
                            </div>
                          </div>

                          <div className="col-md-6">
                            <label>Date Signed</label>
                            <div className="signature-line">
                              {formatDate(data?.created_at)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="card-footer bg-white border-0 d-flex gap-2">
                      <button
                        onClick={printContent}
                        className="btn btn-primary px-4"
                      >
                        🖨 Print
                      </button>

                      <button
                        onClick={() => window.history.back()}
                        className="btn btn-outline-secondary px-4"
                      >
                        ← Back
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
