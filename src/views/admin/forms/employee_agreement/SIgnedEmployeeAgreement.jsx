import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MyHeader from "../../../../components/MyHeader";
import Sidebar from "../../../../components/Sidebar";
import Nav from "../../single_user/Nav";
import Spinner from "../../../../components/Spinner";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";
import { formatDate } from "../../../../utils/DateFormatter";
import printContent from "../../../../utils/printContent";
import FetchAllEmployeeForms from "../../../../controller/admin/AllFormsController";

export default function SignedEmployeeAgreementForms() {
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
  const data = allForms.employee_agreement;

  return (
    <>
      <title>Employee Agreement - 1staccess Home Care</title>
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
                        <h4 className="mt-4 mb-3">Employee Agreement</h4>
                      </div>
                      {/*  */}
                      <div className="step-content">
                        <div className="row">
                          <div className="col-12">
                            <p>
                              Employee Name: <u> {fullname ?? "N/A"} </u>
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
                                Monday: <b> {data.monday_hour} hour(s)</b>
                              </li>
                              <li>
                                Tuesday:
                                <b> {data.tuesday_hour} hour(s)</b>
                              </li>
                              <li>
                                Wednesday:
                                <b> {data.wednesday_hour} hour(s)</b>
                              </li>
                              <li>
                                Thursday:
                                <b> {data.thursday_hour} hour(s)</b>
                              </li>
                              <li>
                                Friday: <b> {data.friday_hour} hour(s)</b>
                              </li>
                              <li>
                                Saturday:
                                <b> {data.saturday_hour} hour(s)</b>
                              </li>
                              <li>
                                Sunday: <b> {data.sunday_hour} hour(s)</b>
                              </li>
                            </ol>
                            <p>
                              3. The employee will have the following time off:{" "}
                              <b>{data.time_off}</b>
                            </p>
                            <p>
                              4. The employer will pay the employee per hour:{" "}
                              <b> {data.pay_per_hour} </b>
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
                              <b> {data.other_agreements} </b>
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
                            <p>{formatDate(data?.created_at)}</p>
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
