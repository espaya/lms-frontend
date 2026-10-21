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

export default function SignedEmployeeHHAForms() {
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
  const data = allForms?.home_health_aide; 
  const title = "Home Health Aide";

  return (
    <>
      <title>Home Health Aide - 1staccess Home Care</title>
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
                            Home Health Aide
                          </h4>
                        </div>

                        {/* Body */}
                        <div className="col-12" style={{ padding: 0 }}>
                          <p style={{ marginBottom: "20px" }}>
                            Employee Name: <strong><u>{fullname ?? "N/A"}</u></strong>
                          </p>

                          <h6 style={{ fontWeight: "bold", fontSize: "12pt", marginBottom: "15px" }}>
                            REPORTS TO: SUPERVISING REGISTERED NURSE <br />
                            DEPARTMENT: CLINICAL
                          </h6>
                          
                          <p>
                            <strong>POSITION SUMMARY:</strong>
                            <br />
                            Works under the supervision of the designated
                            Registered Nurse. Provides direct client care as
                            assigned by the registered nurse. Provides quality
                            and delivery of home care services. Assist in the
                            home care services that reflect the home care
                            agency philosophy and standards of home health
                            nursing care of assigned clients.
                          </p>
                          
                          <p><strong>POSITION QUALIFICATIONS:</strong></p>
                          <ul style={{ paddingLeft: "40px", marginBottom: "24px" }}>
                            <li>High school graduation required.</li>
                            <li>Home Health Aide certification required as obtained through successful completion of and approved program.</li>
                            <li>Shall have on year-full-time experience in home health care in an institutional setting, such as a hospital or nursing home OR shall have one year-full-time experience within the last 5 years in direct client care in a home health agency setting; OR</li>
                            <li>Evidence of sympathetic attitude toward care of the sick.</li>
                            <li>Demonstrated ability to read, write, and carry out directions.</li>
                            <li>Evidence of maturity and ability to deal effectively with job demands.</li>
                            <li>Good verbal and written communications skills required.</li>
                            <li>Attends 12 hours of Aide oriented in services per year.</li>
                            <li>Participates in professional meetings when directed.</li>
                            <li>Shall have a criminal history check conducted prior to being offered permanent employment with this agency.</li>
                            <li>Is able to work closely supervised to ensure competence in providing client care.</li>
                          </ul>

                          <p><strong>PHYSICAL REQUIREMENTS:</strong></p>
                          <ul style={{ paddingLeft: "40px", marginBottom: "24px" }}>
                            <li>High school graduation required.</li>
                            <li>Visual/hearing ability sufficient to comprehend written /verbal communication.</li>
                            <li>Ability to perform tasks involving physical activity, which may include heavy lifting and extensive bending and standing.</li>
                            <li>Ability to deal effectively with stress.</li>
                            <li>Able to work a minimum of 40 hours per week.</li>
                            <li>Able to bend and stand an average of 6 hours per day.</li>
                            <li>Able to lift up to 50 - 75 pounds.</li>
                            <li>Able to write up to 3 hours per day.</li>
                            <li>Able to work in a stressful environment.</li>
                            <li>Able to drive 45 - 50 miles per day.</li>
                            <li>Able to access and communicate will ill clients, co-workers and general public.</li>
                            <li>Is neat in appearance and practice, with good personal hygiene.</li>
                          </ul>

                          <p style={{ marginTop: "20px" }}>
                            <strong>
                              May be employed by the agency if he/she has met
                              the following conditions:
                            </strong>
                          </p>
                          <p>
                            Home Health Aide is expected to pass competency
                            examination with at least a 80% or better. The
                            content of the competency evaluation of the Agency
                            will include and not limited to:
                          </p>
                          
                          <ul style={{ paddingLeft: "40px", marginBottom: "24px" }}>
                            <li>Communication skills.</li>
                            <li>Observation, reporting, and documentation of a client’s status and the care or service furnished.</li>
                            <li>Reading and recording temperatures, pulse, and respiration, and blood pressures.</li>
                            <li>Basic infection control procedures and instruction on universal precautions.</li>
                            <li>Basic elements of body functions and changes in body function that must be reported to the Supervisor.</li>
                            <li>Maintenance of a clean, healthy, and safe environment.</li>
                            <li>Recognizing emergencies and knowledge of emergency procedures.</li>
                            <li>The physical, emotional, and developmental needs of and ways to work with the populations served by the Agency including, the need for respect for the client and his or her privacy and property.</li>
                          </ul>

                          <p style={{ marginTop: "20px" }}>
                            <strong>
                              PHYSICAL REQUIREMENTS:
                              <br />
                              The appropriate and safe techniques in personal hygiene and grooming include:
                            </strong>
                          </p>
                          <ul style={{ paddingLeft: "40px", marginBottom: "24px" }}>
                            <li>Bed bath.</li>
                            <li>Sponge, tub or shower bath.</li>
                            <li>Shampoo, sink, tub or bed.</li>
                            <li>Nail and hair care.</li>
                            <li>Oral hygiene and.</li>
                            <li>Toileting and eliminating.</li>
                            <li>Safe transfer techniques and ambulation.</li>
                            <li>Normal range of motion and position.</li>
                            <li>Adequate nutrition and fluid intake.</li>
                            <li>Client rights; and</li>
                            <li>Any other task that the Agency may choose to have the home health aide perform.</li>
                          </ul>

                          <p style={{ marginTop: "20px" }}>
                            <strong>DUTIES:</strong>
                          </p>
                          <p>1. Ensure quality and safe delivery of home care services.</p>
                          <ul style={{ paddingLeft: "40px", marginBottom: "16px" }}>
                            <li>Participates in development and implementation of client plans of care per home care agency policy and procedure, as appropriate.</li>
                            <li>Participates in client case conferences according to home health care agency policy and procedure, as appropriate.</li>
                            <li>The provided home health aide services reflect client plans of care.</li>
                            <li>Information regarding client plans of care is submitted to the Home Care Registered Nurse in a timely manner.</li>
                          </ul>

                          <p>2. Implement current Home Health Aide services.</p>
                          <ul style={{ paddingLeft: "40px", marginBottom: "24px" }}>
                            <li>Client plans of care are discussed with the Home Care Registered Nurse on a regular basis.</li>
                            <li>Client clinical records are documented per Home Care agency policy and procedure.</li>
                            <li>Client assignments and reports are received from the Home Care Registered Nurse.</li>
                          </ul>

                          <p style={{ marginTop: "30px" }}>
                            <strong>ACKNOWLEDGEMENT:</strong>
                            <br />
                            * I have reviewed my job description and agree to perform
                            all duties mentioned to the best of my ability;
                            <br />
                            * I understand that my job duties may change as the
                            needs of the agency change.
                            <br /> 
                            * I further agree to notify my immediate Supervisor if
                            I am unable to complete any of my job duties in a
                            timely manner.
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
          .word-doc p, .word-doc li, .word-doc td, .word-doc strong, .word-doc u {
          font-family: 'Times New Roman', Times, serif !important;
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