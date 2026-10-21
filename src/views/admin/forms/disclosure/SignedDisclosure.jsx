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

export default function SignedDisclosureForms() {
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
  const data = allForms?.sworn_disclosure;
  const position = allForms?.application_form?.position;
  const title = "Sworn Disclosure Statement";

  return (
    <>
      <title>Sworn Disclosure Statement - 1staccess Home Care</title>
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
                            Sworn Disclosure Statement
                          </h4>
                        </div>

                        {/* Body */}
                        <div className="col-12" style={{ padding: 0 }}>
                          <p style={{ marginBottom: "20px" }}>
                            Employee Name: <strong><u>{fullname ?? "N/A"}</u></strong>
                          </p>

                          <p>
                            Section 32.1-162.9:1 of the Code of Virginia
                            requires that a sworn disclosure statement or
                            affirmation be completed for each prospective
                            employee for a home care organization. Employment
                            or volunteering is prohibited if a person has been
                            convicted of any of the offenses specified on the
                            reverse side or has been the subject of a founded
                            complaint of child abuse or neglect. Convictions
                            include adult convictions and juvenile convictions
                            and adjudications of delinquency based on an
                            offense that would have been at the time of
                            conviction a felony, conviction if committed by an
                            adult within or outside the commonwealth. Any
                            person making a materially false statement
                            regarding any such offense shall be guilty of a
                            Class 1 misdemeanor. This statement must be
                            provided to and maintained at the exempt facility
                            for prospective employees and volunteers.
                          </p>
                          
                          <p>
                            Mailing Address: <strong>{data?.mailing_address || "N/A"}</strong>
                            <br />
                            Position: <strong>{position || "N/A"}</strong>
                          </p>

                          <p>
                            1. Have you ever been convicted of or are you the
                            subject of pending charges for any of the
                            following offenses: murder; malicious wounding by
                            mob; abduction; abduction for immoral purposes;
                            assault and bodily wounding; robbery; carjacking;
                            extortion by threat; any felony stalking
                            violation; sexual assault; arson; burglary; any
                            felony violation relating to possession or
                            distribution of drugs; drive by shooting; use of a
                            machine gun in a crime of violence; aggressive use
                            of a machine gun; use of a sawed-off shotgun in a
                            crime of violence; pandering; crimes against
                            nature involving children; incest; taking indecent
                            liberties with children; abuse and neglect of
                            children, including failing to secure medical
                            attention for an injured child; obscenity
                            offenses; possession of child pornography;
                            electronic facilitation of pornography; abuse and
                            neglect of incapacitated adults; employing or
                            permitting a minor to assist in an act
                            constituting an obscenity or related offence;
                            delivery of drugs to prisoners; escape from jail;
                            felonies by prisoners; within the Commonwealth or
                            any equivalent offense outside the Commonwealth?:{" "}
                            <strong>{data?.convicted_outside_commonwealth || "N/A"}</strong>
                          </p>

                          {(data?.convicted_outside_commonwealth === "Yes (Convicted)" || data?.convicted_outside_commonwealth === "Yes (Pending)") && (
                            <p style={{ marginLeft: "20px" }}>
                              If Yes Specify Crimes: <strong>{data?.outside_commonwealth_specify}</strong>
                            </p>
                          )}

                          <p>
                            2. Have you been convicted of or are you the
                            subject of a pending charge for any other felony
                            in the five(5) years prior to the date of
                            employment or volunteering?:
                            <strong> {data?.convicted_pending || "N/A"}</strong>
                          </p>

                          {(data?.convicted_pending === "Yes (Convicted)" || data?.convicted_pending === "Yes (Pending)") && (
                            <p style={{ marginLeft: "20px" }}>
                              If Yes, Specify Crime(s): <strong>{data?.convicted_pending_specify}</strong>
                            </p>
                          )}

                          <p>
                            3. Have you ever been the subject of a founded
                            complaint of child abuse or neglect within or
                            outside the Commonwealth?
                            <strong> {data?.child_abuse || "N/A"}</strong>
                          </p>
                        </div>

                        {/* Signatures Block */}
                        <div style={{ marginTop: "60px", pageBreakInside: "avoid" }}>
                          {/* Witness Signature */}
                          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "40px" }}>
                            <tbody>
                              <tr>
                                <td style={{ width: "50%", paddingBottom: "40px", verticalAlign: "bottom" }}>
                                  <p style={{ margin: 0 }}>Witness Signature:</p>
                                  <div style={{ borderBottom: "1px solid #000", paddingBottom: "5px", marginTop: "5px", height: "40px", display: "flex", alignItems: "flex-end" }}>
                                    {data?.wit_signature ? (
                                      <img
                                        className="signature"
                                        src={`${apiBase}/storage/signature/${data.wit_signature}`}
                                        alt="Witness Signature"
                                        style={{ maxHeight: "50px", maxWidth: "100%" }}
                                      />
                                    ) : (
                                      <em>No signature provided</em>
                                    )}
                                  </div>
                                </td>
                                <td style={{ width: "50%", paddingBottom: "40px", paddingLeft: "20px", verticalAlign: "bottom" }}>
                                  <p style={{ margin: 0 }}>Date:</p>
                                  <div style={{ borderBottom: "1px solid #000", paddingBottom: "5px", marginTop: "5px" }}>
                                    <strong>{formatDate(data?.created_at)}</strong>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          {/* Applicant Signature */}
                          <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <tbody>
                              <tr>
                                <td style={{ width: "50%", paddingBottom: "40px", verticalAlign: "bottom" }}>
                                  <p style={{ margin: 0 }}>Applicant Signature:</p>
                                  <div style={{ borderBottom: "1px solid #000", paddingBottom: "5px", marginTop: "5px", height: "40px", display: "flex", alignItems: "flex-end" }}>
                                    {data?.signature ? (
                                      <img
                                        className="signature"
                                        src={`${apiBase}/storage/signature/${data.signature}`}
                                        alt="Applicant Signature"
                                        style={{ maxHeight: "50px", maxWidth: "100%" }}
                                      />
                                    ) : (
                                      <em>No signature provided</em>
                                    )}
                                  </div>
                                </td>
                                <td style={{ width: "50%", paddingBottom: "40px", paddingLeft: "20px", verticalAlign: "bottom" }}>
                                  <p style={{ margin: 0 }}>Date:</p>
                                  <div style={{ borderBottom: "1px solid #000", paddingBottom: "5px", marginTop: "5px" }}>
                                    <strong>{formatDate(data?.created_at)}</strong>
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