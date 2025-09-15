import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";

export default function EmployeeAgreementFilled({ agreement, fullname }) {
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
      <title>Employee Agreement - 1staccess Home Care</title>

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
                      <h3>Employee Agreement</h3>
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
                      <Link to={PATHS.USER_EMPLOYEE_AGREEMENT_FORM}>
                        Employee Agreement
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
                        <h4 className="mt-4 mb-3">Employee Agreement</h4>
                      </div>
                      {/*  */}
                      <div className="step-content">
                        <div className="row">
                          <div className="col-12">
                            <p>
                              Employee Name: <u> {fullname} </u>
                            </p>
                            <p>
                              1. The employee will carry out the duties and
                              responsibilities listed in the job
                              description/list of assigned tasks ,and signed by
                              employee and employer
                            </p>
                            <p>
                              2. Following are the hours the employee will work:
                            </p>
                            <ol>
                              <li>
                                Monday: <b> {agreement.monday_hour} hour(s)</b>
                              </li>
                              <li>
                                Tuesday:
                                <b> {agreement.tuesday_hour} hour(s)</b>
                              </li>
                              <li>
                                Wednesday:
                                <b> {agreement.wednesday_hour} hour(s)</b>
                              </li>
                              <li>
                                Thursday:
                                <b> {agreement.thursday_hour} hour(s)</b>
                              </li>
                              <li>
                                Friday: <b> {agreement.friday_hour} hour(s)</b>
                              </li>
                              <li>
                                Saturday:
                                <b> {agreement.saturday_hour} hour(s)</b>
                              </li>
                              <li>
                                Sunday: <b> {agreement.sunday_hour} hour(s)</b>
                              </li>
                            </ol>
                            <p>
                              3. The employee will have the following time off:{" "}
                              <b>{agreement.time_off}</b>
                            </p>
                            <p>
                              4. The employer will pay the employee per hour:{" "}
                              <b> {agreement.pay_per_hour} </b>
                            </p>
                            <p>
                              {" "}
                              5. When leaving the employee will give the
                              approximate time of return, and if possible, leave
                              a phone number where he/she can reach.
                              <br /> Also, when the employee will be late in
                              returning, he/she will call to let the employer
                              know.
                            </p>
                            <p>
                              {" "}
                              6. The employee is responsible for paying for
                              long-distance telephone calls made/received by the
                              employee.
                            </p>
                            <p>
                              {" "}
                              7. The employee will not be paid for scheduled
                              hours not worked unless the time not worked is
                              covered by a benefit as provided by the employer.
                            </p>
                            <p>
                              8. Both parties to this agreement will respect
                              each other’s individuality and treat each other
                              accordingly. Both will attempt to be flexible and
                              work at solving problems as they arise.
                            </p>
                            <p>
                              9. At least 2 weeks’ notice will be given by the
                              employee regarding termination of this agreement.
                            </p>
                            <p>
                              Other agreements/benefits:{" "}
                              <b> {agreement.other_agreements} </b>
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 mt-20">
                            <p>Signature:</p>
                            {agreement?.signature ? (
                              <img
                                src={`${apiBase}/storage/signature/${agreement.signature}`}
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
                              {agreement?.created_at
                                ? new Date(
                                    agreement.created_at
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
