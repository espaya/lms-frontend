import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";

export default function SmokingFilled({ data, fullname }) {
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
      <title>
        Employee Notification of Policy: Smoking in The Workplace - 1staccess
        Home Care
      </title>

      <div class="dashboard">
        <div id="main-wrapper">
          <UserHeader />
          <UserSidebar />

          <div class="content-body">
            <div class="container">
              <div class="page-title">
                <div class="row align-items-center justify-content-between">
                  <div class="col-md-6">
                    <div class="page-title-content">
                      <h3>Smoking in The Workplace</h3>
                    </div>
                  </div>
                  <div class="col-auto">
                    <div className="breadcrumbs">
                      <Link to={PATHS.USER_DASHBOARD}>Home</Link>
                      <span>
                        <i className="ri-arrow-right-s-line"></i>
                      </span>
                      <Link to={PATHS.USER_FORMS}>Forms</Link>
                      <span>
                        <i className="ri-arrow-right-s-line"></i>
                      </span>
                      <Link to={PATHS.USER_REPORTING_FORM}>
                        Employee Notification of Policy: Smoking in The
                        Workplace
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-12">
                  <div class="card ">
                    <div id="printArea" class="card-body">
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
                          Employee Notification of Policy: Smoking in The
                          Workplace
                        </h4>
                      </div>
                      <div className="step-content">
                        <div className="row">
                          <div className="col-md-12">
                            <p>
                              Employee Name: <u>{fullname}</u>
                            </p>

                            <p>
                              It is the policy of the Agency that smoking will
                              not be allowed in areas where that can be observed
                              by clients or the public. The employee may smoke
                              in approved areas, if any.
                            </p>
                            <p>
                              Smoking and the use of tobacco products are
                              prohibited at all times and on all property owned,
                              or under the control of 1st Access Home Care,
                              including, but not limited to indoor and outdoor
                              grounds, walkways and sidewalks, parking lots,
                              company vehicles. This policy is in effect on the
                              client's property as well.
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
