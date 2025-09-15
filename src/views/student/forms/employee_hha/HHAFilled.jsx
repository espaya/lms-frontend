import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";

export default function HHAFilled({ data, fullname }) {
  const apiBase = import.meta.env.VITE_API_URL;

  const printContent = () => {
    var printArea = document.getElementById("printArea");
    var printContents = printArea.innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  return (
    <>
      <title>Home Health Aide - 1staccess Home Care</title>

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
                      <h3>Home Health Aide</h3>
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
                      <Link to={PATHS.USER_HHA_FORM}>HHA</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
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
                              Employee Name: <u>{fullname}</u>
                            </p>
                            <h6> REPORTS TO: SUPERVISING REGISTERED NURSE</h6>
                            <h6>DEPARTMENT: CLINICAL</h6>
                            <p>
                              <strong>POSITION SUMMARY:</strong>
                            </p>
                            <p>
                              Works under the supervision of the designated
                              Registered Nurse. Provides direct client care as
                              assigned by the registered nurse. Provides quality
                              and delivery of home care services. Assist in the
                              home care services that reflect the home care
                              agency philosophy and standards of home health
                              nursing care of assigned clients.
                            </p>
                          </div>
                          <div className="col-12">
                            <p>
                              <strong>POSITION QUALIFICATIONS:</strong>
                            </p>
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
                          </div>
                          <div className="col-12">
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
                          </div>
                          <div className="col-12">
                            <p>
                              <strong>PHYSICAL REQUIREMENTS:</strong>
                            </p>
                            <p>
                              <strong>
                                The appropriate and safe techniques in personal
                                hygiene and grooming include:
                              </strong>
                            </p>

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
                          </div>
                          <div className="col-12">
                            <p>
                              <strong>DUTIES:</strong>
                            </p>
                            <p>
                              {" "}
                              1. Ensure quality and safe delivery of home care
                              services.
                            </p>
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

                            <p>
                              {" "}
                              2. Implement current Home Health Aide services.{" "}
                            </p>
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
                          <div className="col-12">
                            <p>
                              <strong>ACKNOWLEDGEMENT:</strong>
                            </p>
                            <p>
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
                        <div className="row">
                          <div className="col-md-6 mt-20">
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
                          <div className="col-md-6 mt-50">
                            <p>Date Signed: </p>
                            <p>
                              {data?.created_at
                                ? new Date(data.created_at).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }
                                  )
                                : "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md3 mt-20">
                      <button
                        onClick={printContent}
                        className="btn btn-primary btn-lg"
                      >
                        Print
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
