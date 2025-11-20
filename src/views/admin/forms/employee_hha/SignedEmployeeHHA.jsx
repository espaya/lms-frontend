import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MyHeader from "../../../../components/MyHeader";
import Sidebar from "../../../../components/Sidebar";
import Nav from "../../single_user/Nav";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";
import { formatDate } from "../../../../utils/DateFormatter";
import printContent from "../../../../utils/printContent";
import FetchAllEmployeeForms from "../../../../controller/admin/AllFormsController";
import Spinner from "../../../../components/Spinner";

export default function SignedEmployeeHHAForms() {
  const location = useLocation();
  const { username } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;
  const [allForms, setAllForms] = useState([]);

  useEffect(() => {
    FetchAllEmployeeForms(
      setLoading,
      setErrors,
      setAllForms,
      apiBase,
      username
    );
  }, []);

  const fullname = allForms?.application_form?.profile?.full_name;
  const data = allForms.home_health_aide;

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
                    <div id="printArea" className="card-body">
                      {/*  */}
                      <div style={{ textAlign: "center" }}>
                        <img
                          src="/assets/images/main_logo.png"
                          width={200}
                          alt="Company Logo"
                        />
                        <h5 className="mt-10">
                          1st Access Home Care Incorporated
                        </h5>
                        <p>
                          6600 Fieldtan Trail, Moseley, VA, 23120 <br />
                          Agency Phone: (+1) 804-818-3216
                        </p>
                        <h4 className="mt-4 mb-3">Home Health Aide</h4>
                      </div>
                      {/*  */}
                      <div className="step-content">
                        <div className="row">
                          <div className="col-md-12">
                            <p>
                              Employee Name: <u>{fullname ?? "N/A"}</u>
                            </p>
                            <h6>
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
                            <strong>POSITION QUALIFICATIONS:</strong>
                            <ol>
                              <li> ● High school graduation required.</li>
                              <li>
                                {" "}
                                ● Home Health Aide certification required as
                                obtained through successful completion of and
                                approved program.
                              </li>
                              <li>
                                ● Shall have on year-full-time experience in
                                home health care in an institutional setting,
                                such as a hospital or nursing home OR shall have
                                one year-full-time experience within the last 5
                                years in direct client care in a home health
                                agency setting; OR{" "}
                              </li>
                              <li>
                                ● Evidence of sympathetic attitude toward care
                                of the sick.{" "}
                              </li>
                              <li>
                                ● Demonstrated ability to read, write, and carry
                                out directions.{" "}
                              </li>
                              <li>
                                {" "}
                                ● Evidence of maturity and ability to deal
                                effectively with job demands.{" "}
                              </li>
                              <li>
                                ● Good verbal and written communications skills
                                required.{" "}
                              </li>
                              <li>
                                ● Attends 12 hours of Aide oriented in services
                                per year.{" "}
                              </li>
                              <li>
                                ● Participates in professional meetings when
                                directed.{" "}
                              </li>
                              <li>
                                ● Shall have a criminal history check conducted
                                prior to being offered permanent employment with
                                this agency.
                              </li>
                              <li>
                                ● Is able to work closely supervised to ensure
                                competence in providing client care
                              </li>
                              .
                            </ol>
                            <p>
                              <strong>PHYSICAL REQUIREMENTS:</strong>
                            </p>
                            <ol>
                              <li> ● High school graduation required.</li>
                              <li>
                                ● Visual/hearing ability sufficient to
                                comprehend written /verbal communication.
                              </li>
                              <li>
                                ● Ability to perform tasks involving physical
                                activity, which may include heavy lifting and
                                extensive bending and standing.
                              </li>
                              <li>
                                ● Ability to deal effectively with stress.
                              </li>
                              <li>
                                ● Able to work a minimum of 40 hours per week
                              </li>
                              <li>
                                ● Able to bend and stand an average of 6 hours
                                per day.
                              </li>
                              <li>● Able to lift up to 50 - 75 pounds.</li>
                              <li>● Able to write up to 3 hours per day.</li>
                              <li>
                                ● Able to work in a stressful environment.
                              </li>
                              <li>● Able to drive 45 - 50 miles per day.</li>
                              <li>
                                ● Able to access and communicate will ill
                                clients, co-workers and general public.
                              </li>
                              <li>
                                {" "}
                                ● Is neat in appearance and practice,with good
                                personal hygiene.
                              </li>
                            </ol>
                            <p>
                              {" "}
                              <strong>
                                May be employed by the agency if he/she has met
                                the following conditions:
                              </strong>
                            </p>
                            <p>
                              {" "}
                              Home Health Aide is expected to pass competency
                              examination with at least a 80% or better. The
                              content of the competency evaluation of the Agency
                              will include and not limited to:
                            </p>
                            <ol>
                              <li> ● Communication skills. </li>
                              <li>
                                {" "}
                                ● Observation, reporting, and documentation of a
                                client’s status and the care or service
                                furnished.
                              </li>
                              <li>
                                ● Reading and recording temperatures, pulse, and
                                respiration, and blood pressures.
                              </li>
                              <li>
                                {" "}
                                ● Basic infection control procedures and
                                instruction on universal precautions.
                              </li>
                              <li>
                                {" "}
                                ● Basic elements of body functions and changes
                                in body function that must be reported to the
                                Supervisor.{" "}
                              </li>
                              <li>
                                {" "}
                                ● Maintenance of a clean, healthy, and safe
                                environment.
                              </li>
                              <li>
                                ● Recognizing emergencies and knowledge of
                                emergency procedures.
                              </li>{" "}
                              <li>
                                {" "}
                                ● The physical, emotional, and developmental
                                needs of and ways to work with the populations
                                served by the Agency including, the need for
                                respect for the client and his or her privacy
                                and property.
                              </li>
                            </ol>
                            <strong>
                              PHYSICAL REQUIREMENTS:
                              <br />
                              The appropriate and safe techniques in personal
                              hygiene and grooming include:
                            </strong>
                            <ol>
                              <li> - Bed bath</li>
                              <li>- Sponge, tub or shower bath;</li>
                              <li> - Shampoo, sink, tub or bed;</li>
                              <li> - Nail and hair care;</li>
                              <li> - Oral hygiene and;</li>
                              <li> - Toileting and eliminating;</li>
                              <li>
                                {" "}
                                - Safe transfer techniques and ambulation;
                              </li>
                              <li>- Normal range of motion and position;</li>
                              <li> - Adequate nutrition and fluid intake;</li>
                              <li> - Client rights; and </li>
                              <li>
                                {" "}
                                - Any other task that the Agency may choose to
                                have the home health aide perform.
                              </li>
                            </ol>
                            <strong>DUTIES:</strong>
                            <br /> 1. Ensure quality and safe delivery of home
                            care services.
                            <ol>
                              <li>
                                {" "}
                                ● Participates in development and implementation
                                of client plans of care per home care agency
                                policy and procedure, as appropriate.
                              </li>
                              <li>
                                {" "}
                                ● Participates in client case conferences
                                according to home health care agency policy and
                                procedure, as appropriate.
                              </li>
                              <li>
                                {" "}
                                ● The provided home health aide services reflect
                                client plans of care.
                              </li>
                              <li>
                                {" "}
                                ● Information regarding client plans of care is
                                submitted to the Home Care Registered Nurse in a
                                timely manner.{" "}
                              </li>
                            </ol>
                            {/* <p> */} 2. Implement current Home Health Aide
                            services. {/* </p> */}
                            <ol>
                              <li>
                                {" "}
                                ● Client plans of care are discussed with the
                                Home Care Registered Nurse on a regular basis.
                              </li>
                              <li>
                                {" "}
                                ● Client clinical records are documented per
                                Home Care agency policy and procedure.
                              </li>
                              <li>
                                ● Client assignments and reports are received
                                from the Home Care Registered Nurse.
                              </li>
                            </ol>
                          </div>

                          {/* </div> */}
                          <div className="col-12">
                            <p>
                              <strong>ACKNOWLEDGEMENT:</strong>
                              <br />
                              <span className="text-danger">*</span> I have
                              reviewed my job description and agree to perform
                              all duties mentioned to the best of my ability;{" "}
                              <br />
                              <span className="text-danger">*</span> I
                              understand that my job duties may change as the
                              needs of the agency change.
                              <br /> <span className="text-danger">*</span> I
                              further agree to notify my immediate Supervisor if
                              I am unable to complete any of my job duties in a
                              timely manner.
                            </p>
                          </div>
                        </div>
                        <div id="signature-wrapper" className="no-break">
                          <div id="signature-row" className="row">
                            {/* Normal layout for screen */}
                            <div className="col-md-6 d-print-none">
                              <p>Signature:</p>
                              {data?.signature ? (
                                <img
                                  src={`${apiBase}/storage/signature/${data.signature}`}
                                  alt="Signature"
                                  style={{ width: "300px" }}
                                />
                              ) : (
                                <p>
                                  <em>No signature provided</em>
                                </p>
                              )}
                            </div>
                            <div className="col-md-6 d-print-none">
                              <p>Date Signed: </p>
                              <p>{formatDate(data?.created_at)}</p>
                            </div>

                            {/* Print-only layout */}
                            <div
                              className="d-none d-print-block"
                              style={{ width: "100%" }}
                            >
                              <table style={{ width: "100%", border: "none" }}>
                                <tr>
                                  <td
                                    style={{
                                      width: "50%",
                                      verticalAlign: "top",
                                      padding: "10px",
                                    }}
                                  >
                                    <p>Signature:</p>
                                    {data?.signature ? (
                                      <img
                                        src={`${apiBase}/storage/signature/${data.signature}`}
                                        alt="Signature"
                                        style={{ width: "250px" }}
                                      />
                                    ) : (
                                      <p>
                                        <em>No signature provided</em>
                                      </p>
                                    )}
                                  </td>
                                  <td
                                    style={{
                                      width: "50%",
                                      verticalAlign: "top",
                                      padding: "10px",
                                    }}
                                  >
                                    <p>Date Signed: </p>
                                    <p>{formatDate(data?.created_at)}</p>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 mt-20">
                      <button
                        onClick={printContent}
                        className="btn btn-primary btn-lg"
                      >
                        Print
                      </button>
                      <Link
                        onClick={() => window.history.back()}
                        style={{ marginLeft: "10px" }}
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
    </>
  );
}
