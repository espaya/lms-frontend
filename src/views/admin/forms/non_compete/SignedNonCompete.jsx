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

export default function SignedNonCompeteForms() {
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
  const data = allForms?.non_compete_agreement;
  const title = "Non Compete Agreement";

  return (
    <>
      <title>Non Compete Agreement - 1staccess Home Care</title>
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
                            Non-Compete Agreement
                          </h4>
                        </div>

                        {/* Body */}
                        <div className="col-12" style={{ padding: 0 }}>
                          <p style={{ marginBottom: "20px" }}>
                            Employee Name: <strong><u>{fullname ?? "N/A"}</u></strong>
                          </p>

                          <p>
                            As an employee of 1st Access Home Care, the
                            employee acknowledges that they will be in receipt
                            of confidential information. This information
                            shall include but not limited to, procedures
                            manuals, in-house policies, patient lists,
                            patient’s medical records, financial information
                            and billing records, certifications and
                            applications, actual and prospective markets and
                            patient’s, business plans and marketing
                            strategies, customer lists, sales and marketing
                            data, operating systems, income statements, asset
                            and liability information, financial projections
                            and any other confidential information gathered,
                            revealed, acquired or generated by or for 1st
                            Access Home Care. Each employee shall protect and
                            hold in confidence the confidential information to
                            anyone except with the express written consent of
                            Clarissa Ayensu (Administrator).
                          </p>

                          <p>
                            The employee acknowledges and understands the competitive
                            sensitivity of the confidential information and
                            the potential for significant material harm that
                            could result to 1st Access Home Care in the event
                            that confidential information is disseminated to
                            others, in particular competitors. Therefore the
                            employee agrees that the appropriate remedy would
                            be an immediate injunction against the violating
                            employee in joining and prohibiting the use and
                            continued dissemination of the confidential
                            information. Further, each employee agrees that
                            the dissemination of the confidential information
                            would cause damages for which damages could not be
                            readily ascertained and would constitute a breach
                            of duty owed by the employee to 1st Access Home
                            Care. Each employee agrees to pay 1st Access Home
                            Care in any action to enforce this confidentiality
                            agreement or cost of litigation, including
                            attorney’s fees and other damages found by the
                            trier fact.
                          </p>

                          <p>
                            As consideration for employment and for the
                            release of this confidential information, the
                            employee agrees not to compete against 1st Access
                            Home Care or to utilize any of the confidential
                            information for a period of two (2) years from the
                            date of their employment terminated with 1st
                            Access Home Care. This Non-Compete Agreement shall
                            be limited to Prince William County and contiguous
                            counties. This Non-Compete Agreement is not
                            intended to prohibit from working as a nurse,
                            therapist or other position in the health service
                            industries but is intended to prohibit employee
                            from working with a competitor of 1st Access Home
                            Care in the home health industry and utilizing any
                            of the confidential information of 1st Access Home
                            Care or contacting any of 1st Access Home Care
                            patients. Employees agree and warrant that they
                            will not contact, engage, discuss, negotiate or
                            contract with any patient or family member of a
                            patient for those purposes of developing or
                            promoting home health care services of said
                            patient. All parties acknowledge that this
                            confidential information is of a proprietary
                            nature to 1st Access Home Care and if the
                            confidential information was revealed to the
                            general public or to a competitor, the revelation
                            would destroy or impair the expected success of
                            1st Access Home Care.
                          </p>

                          <p style={{ marginTop: "20px", fontSize: "10pt" }}>
                            <strong>
                              *ANY CONTROVERSY OR CLAIM ARISING OUT OF OR
                              RELATING TO THIS AGREEMENT SHALL BE SUBMITTED TO
                              ARBITRATION BEFORE ONE(1) ARBITRATOR IN
                              RICHMOND, VIRGINIA IN ACCORDANCE WITH THE
                              COMMERCIAL ARBITRATION RULES OF THE AMERICAN
                              ARBITRATION ASSOCIATION JUDGEMENT UPON THE AWARD
                              RENDERED BY THE ARBITRATOR MAY BE ENTERED BY ANY
                              COURT HAVING JURISDICTION THEREOF. ARBITRATION
                              SHALL BE THE EXCLUSIVE, FINAL AND BINDING METHOD
                              OF RESOLUTION OF ANY CLAIM OR CONTROVERSY
                              BETWEEN 1st Access Home Care AND EMPLOYEE
                              ARISING FROM THIS AGREEMENT.
                            </strong>
                          </p>

                          <p style={{ marginTop: "20px" }}>
                            <strong>
                              I HAVE READ AND UNDERSTAND THE ABOVE AND WILL
                              COMPLY WITH THIS AGREEMENT.
                            </strong>
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