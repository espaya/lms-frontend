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

export default function SignedUniversalPrecautionForms() {
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
  const data = allForms?.universal_precaution;
  const title = "Universal Precautions Training Document";

  return (
    <>
      <title>
        Universal Precautions Training Document - 1staccess Home Care
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
                            6600 Fieldtan Trail, Moseley, VA, 23120<br />
                            Agency Phone: (+1) 804-818-3216
                          </p>
                          <h4 style={{ fontSize: "14pt", margin: "20px 0", fontWeight: "bold" }}>
                            Universal Precautions Training Document
                          </h4>
                        </div>

                        {/* Body */}
                        <div className="col-12" style={{ padding: 0 }}>
                          <p style={{ marginBottom: "20px" }}>
                            Employee Name: <strong><u>{fullname ?? "N/A"}</u></strong>
                          </p>

                          <h6 style={{ fontSize: "12pt", fontWeight: "bold", marginTop: "20px", marginBottom: "10px" }}>
                            LESSON 1 - BLOOD BORNE INFECTION
                          </h6>
                          <ul style={{ paddingLeft: "40px", marginBottom: "20px" }}>
                            <li>Definition of Exposure.</li>
                            <li>Spread of HIV infection in the general population.</li>
                            <li>Symptoms and effects of HIV infection.</li>
                            <li>Spread of Hepatitis B, including number of infections, hospitalization, and deaths caused by HBV each year.</li>
                            <li>Symptoms of effects of HBV infection and HBV vaccination.</li>
                            <li>The hepatitis B virus HIV virus can be transmitted in the workplace.</li>
                            <li>It is estimated that there are 1 and ½ million HIV carriers in the US.</li>
                            <li>There may be as many as one million carriers of HBV.</li>
                          </ul>

                          <h6 style={{ fontSize: "12pt", fontWeight: "bold", marginTop: "20px", marginBottom: "10px" }}>
                            LESSON 2 - TRANSMISSION OF BLOOD BORNE INFECTION
                          </h6>
                          <ul style={{ paddingLeft: "40px", marginBottom: "20px" }}>
                            <li>Sources of blood borne infections in the workplace.</li>
                            <li>Four primary ways of getting blood borne infections outside the workplace.</li>
                            <li>Three primary ways of getting blood borne infections at work.</li>
                            <li>Risky jobs, tasks and work practices.</li>
                          </ul>

                          <h6 style={{ fontSize: "12pt", fontWeight: "bold", marginTop: "20px", marginBottom: "10px" }}>
                            LESSON 3 - EXPOSURE CONTROL
                          </h6>
                          <ul style={{ paddingLeft: "40px", marginBottom: "20px" }}>
                            <li>The HBV vaccine for all workers who come into contact with blood or other potentially infectious body fluids on the job.</li>
                            <li>The definition of Universal Precautions.</li>
                            <li>The steps that should be taken after an exposure incident in order to prevent infection.</li>
                            <li>My right in case of exposure and/or infection.</li>
                            <li>I have the right to have HBV vaccinations provided to me free of charge if I am at risk for infection. If I refuse it at this time, I have the right to be vaccinated free of charge at any time in the future provided I am still at risk for infection.</li>
                          </ul>

                          <h6 style={{ fontSize: "12pt", fontWeight: "bold", marginTop: "20px", marginBottom: "10px" }}>
                            LESSON 4 - USING PERSONAL PROTECTIVE EQUIPMENT
                          </h6>
                          <ul style={{ paddingLeft: "40px", marginBottom: "20px" }}>
                            <li>Types of Personal Protective Equipment (PPE) required for different tasks or situations.</li>
                            <li>Key requirements for selecting, providing, using, and disposing of or cleaning PPE.</li>
                            <li>Limitations of personal protective equipment.</li>
                          </ul>

                          <h6 style={{ fontSize: "12pt", fontWeight: "bold", marginTop: "20px", marginBottom: "10px" }}>
                            LESSON 5 - WORK PRACTICE CONTROLS
                          </h6>
                          <ul style={{ paddingLeft: "40px", marginBottom: "20px" }}>
                            <li>Disposing of used needles or other sharps.</li>
                            <li>Working with lab materials.</li>
                            <li>Decontaminating work areas, instruments, and equipment.</li>
                            <li>Identifying and handling regulated waste.</li>
                            <li>Hand washing and other personal hygiene and health practices.</li>
                          </ul>

                          <p style={{ marginTop: "30px" }}>
                            <strong>
                              *I have received training covering all of the
                              above topics and been informed of my rights
                              accordingly.
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
        .word-doc ul, .word-doc ol {
          margin-bottom: 16px;
          padding-left: 40px;
        }
        .word-doc li {
          margin-bottom: 8px;
          text-align: justify;
        }
        .word-doc ul {
          list-style-type: disc; /* Standard Word bullet point */
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