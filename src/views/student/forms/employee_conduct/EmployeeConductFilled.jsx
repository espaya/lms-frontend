import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";
import { formatDate } from "../../../../utils/DateFormatter";

export default function EmployeeConductFilled({ data, fullname }) {
  const apiBase = import.meta.env.VITE_API_URL;
  const conduct = data?.empConduct;

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
      <title>
        Employee Notification of Policy: Employee Conduct - 1staccess Home Care
      </title>

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
                      <h3>Employee Notification of Policy: Employee Conduct</h3>
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
                      <Link to={PATHS.USER_EMPLOYEE_CONDUCT_FORM}>
                        Employee Notification of Policy: Employee Conduct
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
                        <h4 className="mt-4 mb-3">
                          Employee Notification of Policy: Employee Conduct
                        </h4>
                      </div>
                      {/*  */}
                      <div className="step-content">
                        <div className="row">
                          <div className="col-12">
                            <p>
                              Employee Name: <u> {fullname} </u>
                            </p>

                            <p>
                              The Agency expects all employees to display high
                              standards of conduct when representing the Agency
                              in any manner or capacity. Non-compliance to
                              expected standards will result in disciplinary
                              actions, termination or reporting to the
                              appropriate regulatory authorities.
                            </p>
                          </div>
                        </div>
                      </div>
                      {/*  */}
                      <div className="step-content">
                        <div className="row">
                          <div className="col-12">
                            <p>
                              Unacceptable conduct shall include but is not
                              limited to the following:
                            </p>
                            <ol>
                              <li>
                                Abuse, Neglect or Exploitation of clients.
                              </li>

                              <li>
                                Acts of fraud, abuse, or illegal remuneration.
                              </li>

                              <li>Unsafe client care practices.</li>

                              <li>Use of illegal drugs.</li>

                              <li>
                                Intoxication or use of intoxicants while
                                conducting company business.
                              </li>

                              <li>Falsification of company records.</li>

                              <li>
                                Fighting or threatening behavior toward clients
                                or other employees.
                              </li>

                              <li>Sleeping on the job.</li>

                              <li>
                                Acceptance of gifts or gratuities from clients.
                              </li>

                              <li>Reportable conduct by an employee.</li>

                              <li>Insubordination.</li>
                            </ol>
                          </div>
                        </div>
                      </div>
                      {/*  */}
                      <div className="step-content">
                        <div className="row">
                          <div className="col-12">
                            <p>
                              Method of monitoring employee behavior shall
                              include:
                            </p>
                            <ol>
                              <li>Quality Improvement Activity.</li>

                              <li>Employee performance evaluations</li>

                              <li>Clients complaints</li>

                              <li>Supervisory visits</li>

                              <li>Employee complaints</li>
                            </ol>
                          </div>
                        </div>
                      </div>
                      {/*  */}
                      <div className="step-content">
                        <div className="row">
                          <div className="col-12">
                            <p>
                              Reports of unprofessional conduct will be
                              investigated by the employee’s immediate
                              Supervisor.
                            </p>
                            <p>
                              <strong>
                                <em>
                                  The Supervisor will document the complaint and
                                  the investigation and make recommendations for
                                  disciplinary actions. Disciplinary actions may
                                  include but are not limited to:
                                </em>
                              </strong>
                            </p>
                            <ol>
                              <li>
                                Verbal warning for minor incidents, stating the
                                unacceptable conduct, expected behavior and
                                expected time frames for change.
                              </li>

                              <li>
                                Written warning for the second episode of a
                                minor incident.
                              </li>

                              <li>
                                Suspension, termination or reporting to
                                regulatory authorities as severity of the
                                behavior dictates.
                              </li>

                              <li>
                                All employees will be informed of the policy
                                related to employee conduct during the
                                orientation period.
                              </li>
                            </ol>
                          </div>
                        </div>
                      </div>
                      {/*  */}
                      <div className="step-content">
                        <div className="row">
                          <div className="col-12">
                            <p>
                              I acknowledge that I have been oriented to
                              agencies policy regarding employee conduct and
                              agree to follow all guidelines, both written and
                              verbal. I understand that, if the guidelines,
                              policies and procedures are not followed, that I
                              may be immediately terminated. I also had the
                              opportunity to ask questions regarding this policy
                              and I know where it’s located for future
                              reference.
                            </p>
                          </div>
                        </div>
                      </div>
                      {/*  */}
                      <div className="row">
                        <div className="col-md-6 mt-20">
                          <p>Signature:</p>
                          {conduct?.signature ? (
                            <img
                              src={`${apiBase}/storage/signature/${conduct.signature}`}
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
                          <p>{formatDate(conduct?.created_at)}</p>
                        </div>
                      </div>
                      {/*  */}
                    </div>
                    <div className="col-md-3 mt-20">
                      <button
                        onClick={printContent}
                        className="btn btn-primary btn-lg"
                      >
                        Print
                      </button>
                      <Link
                        to={PATHS.USER_FORMS}
                        style={{ marginLeft: "10px" }}
                        className="btn btn-info btn-lg"
                      >
                        Back
                      </Link>
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
