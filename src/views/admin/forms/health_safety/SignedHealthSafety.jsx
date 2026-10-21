import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MyHeader from "../../../../components/MyHeader";
import Sidebar from "../../../../components/Sidebar";
import Nav from "../../single_user/Nav";
import { Link } from "react-router-dom";
import { formatDate } from "../../../../utils/DateFormatter";
import FetchAllEmployeeForms from "../../../../controller/admin/AllFormsController";
import Spinner from "../../../../components/Spinner";
import exportToWord from "../../../../utils/exportToWord";

export default function SignedHealthSafetyForms() {
  const { username } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;
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
  const data = allForms?.health_safety_agreement;
  const title = "Health & Safety Agreement";

  return (
    <>
      <title>Health & Safety Agreement - 1staccess Home Care</title>
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
                            6600 Fieldtan Trail, Moseley, VA, 23120<br />
                            Agency Phone: (+1) 804-818-3216
                          </p>
                          <h4 style={{ fontSize: "14pt", margin: "20px 0", fontWeight: "bold" }}>
                            Health & Safety Agreement
                          </h4>
                        </div>

                        {/* Body */}
                        <div className="col-12" style={{ padding: 0 }}>
                          <p style={{ marginBottom: "20px" }}>
                            Employee Name: <strong><u>{fullname ?? "N/A"}</u></strong>
                          </p>
                          
                          <p>
                            I do understand the physical requirements of my job
                            and understand proper lifting and moving techniques
                            which I am expected to use in moving and lifting
                            objects and/or patients.
                          </p>
                          
                          <p>
                            I have been informed and do fully understand that any
                            injury claimed by me while on the job must be reported
                            immediately to my Supervisor and documented on an
                            Accident/Incident Report Form. I understand that
                            unless an incident report is completed immediately and
                            signed by me, the Agency may not consider a voluntary
                            payment of any medical bills or any other benefits as
                            a result of my injury. I further understand that if
                            the accident/injury is proven to be a result of my
                            failing to follow policy/procedure, the Agency may not
                            be expected to cover medical payments.
                          </p>
                          
                          <p>
                            I do fully understand that I am not encouraged to lift
                            or transfer any object or patient by myself unless I
                            know that I can safely lift or transfer alone. If I
                            believe there is no one readily available to assist me
                            in lifting or moving patients or equipment while on
                            duty, I am to wait until I can obtain assistance
                            before moving or lifting.
                          </p>
                          
                          <p style={{ marginTop: "30px" }}>
                            <em>
                              I have had the opportunity to review and have all
                              questions answered regarding Health and Safety.
                            </em>
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