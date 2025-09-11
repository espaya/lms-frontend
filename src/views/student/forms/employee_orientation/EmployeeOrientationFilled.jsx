import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";

export default function EmployeeOrientationFilled({
  orientation,
  fullname,
  empApp,
}) {
  //   console.log(orientation);
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
      <title>Employee Orientation - 1staccess Home Care</title>

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
                      <h3>Employee Orientation</h3>
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
                      <Link to={PATHS.USER_EMPLOYEE_ORIENTATION_FORM}>
                        Employee Orientation
                      </Link>
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
                        <h4 className="mt-4 mb-3">Employee Orientation</h4>
                      </div>
                      {/*  */}
                      <div className="col-md-4">
                        <p>
                          Employee Name: <u> {fullname} </u>
                        </p>
                      </div>
                      {/*  */}
                      <div className="col-md-4">
                        <p>
                          Postion: <u> {empApp && empApp?.position} </u>
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p>
                          Date of Hire:{" "}
                          <u> {empApp && empApp?.employee_hire_date} </u>
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p>
                          Date of Orientation:{" "}
                          <u>
                            {" "}
                            {orientation && orientation.dateOfOrientation}{" "}
                          </u>
                        </p>
                      </div>
                      <div className="step-content mt-20">
                        <h4 className="step-title">
                          GENERAL ORIENTATION WITH HUMAN RESOURCES
                        </h4>
                        <div className="row">
                          <div className="col-12">
                            <h5>
                              Unacceptable conduct shall include but is not
                              limited to the following:
                            </h5>
                            <ol>
                              <li>
                                ➢ HIPAA Privacy Regulations - Review agency’s
                                HIPAA Policy
                              </li>

                              <li>
                                ➢ Discuss policies and procedures in the
                                agency’s Policies and Procedures Manual with
                                focus on new and added updated policies and
                                review policy and procedure examination.
                              </li>

                              <li>
                                ➢ Review employee benefits as applicable to
                                various employee statuses{" "}
                              </li>

                              <li>
                                ➢ Review complaint and grievances procedures
                              </li>

                              <li>➢ Review sexual harassment policy.</li>
                            </ol>
                          </div>
                        </div>
                      </div>
                      <div className="step-content">
                        <h4 className="step-title">
                          GENERAL ORIENTATION WITH MANAGEMENT:
                        </h4>
                        <div className="row">
                          <div className="col-12">
                            <h5>
                              Unacceptable conduct shall include but is not
                              limited to the following:
                            </h5>
                            <ol>
                              <li>
                                ➢ Instructive memos from Supervisor to home care
                                staff.
                              </li>

                              <li>➢ Sample Visit Notes</li>

                              <li>➢ Quality Management Process</li>

                              <li>➢ OSHA Infection Control</li>

                              <li>➢ Skills Checklist</li>

                              <li>
                                ➢ Detecting Patient Abuse: Child Abuse and Abuse
                                of the Elderly
                              </li>
                            </ol>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mt-20">
                          <p>Signature:</p>
                          {orientation?.signature ? (
                            <img
                              src={`${apiBase}/storage/signature/${orientation.signature}`}
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
                            {orientation?.created_at
                              ? new Date(
                                  orientation.created_at
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })
                              : "N/A"}
                          </p>
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
