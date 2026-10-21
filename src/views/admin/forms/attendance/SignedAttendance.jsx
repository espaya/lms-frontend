import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MyHeader from "../../../../components/MyHeader";
import Sidebar from "../../../../components/Sidebar";
import Nav from "../../single_user/Nav";
import { Link } from "react-router-dom";
import Spinner from "../../../../components/Spinner";
import { formatDate } from "../../../../utils/DateFormatter";
import FetchAllEmployeeForms from "../../../../controller/admin/AllFormsController";
import exportToWord from "../../../../utils/exportToWord";

export default function SignedAttendanceForms() {
  const { username } = useParams();
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;
  const [errors, setErrors] = useState({});
  const [allForms, setAllForms] = useState({});

  useEffect(() => {
    FetchAllEmployeeForms(
      setLoading,
      setErrors,
      setAllForms,
      apiBase,
      username
    );
  }, [username, apiBase]);

  const fullname = allForms?.application_form?.profile?.full_name;
  const data = allForms?.attendance_tardiness;
  const title = "Employee Notification of Policy - Attendance, Tardiness, Absenteeism and Leave";

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
          <div className="container">
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>{username}</h3>
                    <p className="mb-2">Manage all forms signed by user</p>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="breadcrumbs">
                    <a href="#">Profile </a>
                    <span>
                      <i className="ri-arrow-right-s-line"></i>
                    </span>
                    <a href="#">Forms</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <Nav username={username} />
              {loading ? (
                <Spinner />
              ) : (
                <div className="col-md-9">
                  <div className="card">
                    
                    {/* MS Word Style Container */}
                    <div id="printArea" className="card-body p-0 bg-secondary-light">
                      <div className="word-doc">
                        
                        {/* Header */}
                        <div style={{ textAlign: "center", marginBottom: "40px" }}>
                          <img
                            src="/assets/images/main_logo.png"
                            width={150}
                            alt="Company Logo"
                            style={{ marginBottom: "20px" }}
                          />
                          <h5 style={{ fontSize: "14pt", margin: "0 0 10px 0", fontWeight: "bold" }}>
                            1st Access Home Care Incorporated
                          </h5>
                          <p style={{ margin: "5px 0", fontSize: "12pt" }}>
                            6600 Fieldtan Trail, Moseley, VA, 23120 | Agency Phone: (+1) 804-818-3216
                          </p>
                          <h5 style={{ fontSize: "14pt", margin: "20px 0", fontWeight: "bold", lineHeight: "1.4" }}>
                            Employee Notification of Policy:<br />Attendance, Tardiness, Absenteeism and Leave
                          </h5>
                        </div>

                        {/* Body */}
                        <div className="col-12" style={{ padding: 0 }}>
                          <p style={{ marginBottom: "20px" }}>
                            Employee Name: <strong><u>{fullname ?? "N/A"}</u></strong>
                          </p>
                          
                          <p>
                            Exempt employees are owners, officers, management and
                            supervisors. All full time employees are required to
                            put in a full day's work and a full 40 hour work week.
                            All employees regardless of classification, are
                            required to arrive on time and appropriately complete
                            their designated hours and tasks as assigned.
                          </p>

                          <h6 style={{ fontSize: "12pt", fontWeight: "bold", marginTop: "20px", marginBottom: "10px" }}>
                            ATTENDANCE:
                          </h6>
                          <ol style={{ paddingLeft: "40px", marginBottom: "20px" }}>
                            <li>
                              The employee must notify the Supervisor in all
                              events of tardiness. If the office is closed, call the
                              answering service to have on-call Supervisor paged and
                              relay information to him or her. Only 3 tardiness in a
                              calendar month will be accepted unless very
                              extenuating circumstances are present and approved by
                              the Supervisor. More than 3 tardiness within a given
                              month may result in counselling with Supervisor and
                              every effort made to avoid further tardiness. A copy
                              of counselling will be placed in the personnel file.
                              Two consecutive months of written warnings for
                              excessive tardiness may result in dismissal or
                              termination.
                            </li>
                            <li>
                              No show/no call situations are not tolerated and
                              may result in termination.
                            </li>
                            <li>
                              Perfect attendance throughout the year may be
                              rewarded at year-end at the discretion of supervisor
                              and/or administrator.
                            </li>
                          </ol>

                          <h6 style={{ fontSize: "12pt", fontWeight: "bold", marginTop: "20px", marginBottom: "10px" }}>
                            ABSENTEEISM:
                          </h6>
                          <ol style={{ paddingLeft: "40px", marginBottom: "20px" }}>
                            <li>
                              Employees are required to inform the Supervisor as
                              soon as possible when absenteeism is known, to allow
                              the Agency time to cover assignments. The employee is
                              not excused from work until the Supervisor approves
                              the absence or verified he/she is aware.
                            </li>
                            <li>
                              Illness and or injury that requires a physician's
                              treatment and that may take more than a day for
                              recovery will need to be called in and discussed with
                              the Supervisor. When the office is closed, request the
                              answering service to contact the person on call with
                              the information and give your phone number for
                              follow-up.
                            </li>
                            <li>
                              If an employee needs to be absent for reasons other
                              than illness, he/she must submit a Leave Request Form
                              at least 14 days prior to time requested.
                            </li>
                            <li>
                              More than 3 consecutive days of absenteeism
                              requires a physician's note for illness or injury
                              sustained. Medically verified illness may be excused.
                              Failure to provide proper notice will result in
                              counselling and a written warning will be placed in
                              the personnel file.
                            </li>
                            <li>
                              Excessive absenteeism without just cause or
                              physician's excuse is reason for dismissal.
                            </li>
                            <li>
                              <strong>No shows / no calls are not tolerated.</strong>{" "}
                              The need to follow policy and procedure is a courtesy
                              to other employees. Disciplinary action may be
                              supervised in an effort to avoid any further
                              complications.
                            </li>
                            <li>
                              Notice to your Supervisor in writing for
                              consideration on a requested leave of absence must be
                              submitted at least 14 days to leave, unless there is a
                              cause of emergency or illness.
                            </li>
                          </ol>

                          <p style={{ marginTop: "30px" }}>
                            <strong>I</strong> acknowledge that I have been
                            oriented to the Agency's policy regarding{" "}
                            <strong>ATTENDANCE</strong> and{" "}
                            <strong>ABSENTEEISM,</strong> and I agree to follow
                            all guidelines, both written and verbal. I understand
                            that, if the guidelines, policies and procedures are
                            not followed, that I may be immediately terminated. I
                            also had the opportunity to ask questions regarding
                            this policy and I know where it's located for future
                            reference.
                          </p>
                        </div>

                        {/* Signature Block */}
                        <div style={{ marginTop: "60px", pageBreakInside: "avoid" }}>
                          <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <tbody>
                              <tr>
                                <td style={{ width: "50%", paddingBottom: "40px", verticalAlign: "bottom" }}>
                                  <p style={{ margin: 0 }}>Employee Name:</p>
                                  <div style={{ borderBottom: "1px solid #000", paddingBottom: "5px", marginTop: "5px" }}>
                                    <strong>{fullname ?? "N/A"}</strong>
                                  </div>
                                </td>
                                <td style={{ width: "50%", paddingBottom: "40px", paddingLeft: "20px", verticalAlign: "bottom" }}>
                                  <p style={{ margin: 0 }}>Employee Signature:</p>
                                  <div style={{ borderBottom: "1px solid #000", paddingBottom: "5px", marginTop: "5px", height: "40px", display: "flex", alignItems: "flex-end" }}>
                                    {data?.signature ? (
                                      <img
                                        className="signature"
                                        src={`${apiBase}/storage/signature/${data.signature}`}
                                        alt="Signature"
                                        style={{ maxHeight: "50px", maxWidth: "100%" }}
                                      />
                                    ) : (
                                      <em>No signature provided</em>
                                    )}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td style={{ paddingTop: "20px" }}>
                                  <p style={{ margin: 0 }}>Date:</p>
                                  <div style={{ borderBottom: "1px solid #000", paddingBottom: "5px", marginTop: "5px", display: "inline-block", minWidth: "150px" }}>
                                    <strong>{formatDate(data?.created_at)}</strong>
                                  </div>
                                </td>
                                <td style={{ paddingTop: "20px", paddingLeft: "20px" }}>
                                  <p style={{ margin: 0 }}>Administrator/Designee Signature:</p>
                                  <div style={{ borderBottom: "1px solid #000", paddingBottom: "5px", marginTop: "5px", height: "40px" }}>
                                    &nbsp;
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        
                      </div>
                    </div>
                    
                    {/* Action Buttons (Outside the Word Document style) */}
                    <div className="card-footer bg-white border-top-0 pt-0 pb-3 px-3">
                      <button
                        onClick={() => exportToWord({ fullname, title })}
                        className="btn btn-primary btn-lg me-2"
                      >
                        Print / Export to Word
                      </button>
                      <Link
                        onClick={() => window.history.back()}
                        className="btn btn-info btn-lg"
                      >
                        Back
                      </Link>
                    </div>

                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CSS specific to rendering the MS Word Document look */}
      <style jsx="true">{`
        .bg-secondary-light {
          background-color: #f4f4f4; /* Grayish backdrop to highlight the "paper" */
        }
        .word-doc {
          font-family: 'Times New Roman', Times, serif;
          font-size: 12pt;
          line-height: 1.5;
          color: #000;
          background-color: #fff;
          max-width: 850px; /* Simulates A4/Letter width */
          margin: 0 auto;
          padding: 1in; /* Standard Word margins */
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          min-height: 1100px; /* Gives it a paper-like appearance */
        }
        .word-doc h1, .word-doc h2, .word-doc h3, .word-doc h4, .word-doc h5, .word-doc h6 {
          color: #000;
          font-family: 'Times New Roman', Times, serif;
        }
        .word-doc p {
          text-align: justify;
          margin-bottom: 12px;
        }
        .word-doc ul, .word-doc ol {
          margin-bottom: 16px;
          padding-left: 40px;
        }
        .word-doc li {
          margin-bottom: 8px;
          text-align: justify;
        }
        
        @media print {
          body * {
            visibility: hidden;
          }
          .word-doc, .word-doc * {
            visibility: visible;
          }
          .word-doc {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
            box-shadow: none;
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
}