import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";

export default function CriminalFilled({ data }) {
  const apiBase = import.meta.env.VITE_API_URL;
  const criminal = data?.criminalHistory || {};
  const fullname = data?.profileData?.full_name || {};

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
      <title>Criminal History Search - 1staccess Home Care</title>

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
                      <h3>Criminal History Search</h3>
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
                      <Link to={PATHS.USER_FORMS}>Criminal History Search</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div id="printArea" className="card-body">
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
                        <h4 className="mt-4 mb-3">Criminal History Search</h4>
                      </div>

                      <div className="step-content">
                        <h4 className="step-title">Criminal History Search</h4>
                        <div className="row">
                          <div className="col-12">
                            <p>
                              Employee Name: <u> {fullname ?? 'N/A'} </u>
                            </p>
                            <p>
                              I, <u> {fullname ?? 'N/A'}</u> have had no prior
                              convictions of an offense described in the{" "}
                              <strong>Health and Safety Code</strong> which
                              would bar or potentially bar employment as listed
                              below:
                            </p>
                            <ol>
                              <li>CRIMINAL HOMICIDE</li>
                              <li>INDECENCY WITH A CHILD</li>
                              <li>SOLICITATION OF A CHILD</li>
                              <li>ARSON</li>
                              <li>AGGRAVATED ROBBERY</li>
                              <li>BURGLARY AND CRIMINAL TRESPASS</li>
                              <li>WEAPONS</li>
                              <li>PUBLIC LEWDNESS</li>
                              <li>PUBLIC INDECENCY</li>
                              <li>KIDNAPPING AND FALSE IMPRISONMENT</li>
                              <li>AGREEMENT TO ABDUCT FROM CUSTODY</li>
                              <li>SALE OR PURCHASE OF A CHILD</li>
                              <li>ROBBERY</li>
                              <li>ASSAULTIVE OFFENSES</li>
                              <li>THEFT</li>
                              <li>FRAUD</li>
                              <li>INDECENT EXPOSURE</li>
                              <li>A FELONY VIOLATION OF A STATUTE</li>
                              <li>
                                INTENDED TO CONTROL THE POSSESSION OR
                                DISTRIBUTION OF AN ILLEGAL SUBSTANCE
                              </li>
                            </ol>
                          </div>
                        </div>
                      </div>

                      <div className="step-content">
                        <div className="row">
                          <div className="col-12">
                            <p>
                              <strong>
                                I UNDERSTAND THAT THE HOME HEALTH AGENCY IS
                                REQUIRED TO CONDUCT A CRIMINAL HISTORY CHECK
                                BEFORE OFFERING ME EMPLOYMENT. I, THE
                                UNDERSIGNING, HEREBY AUTHORIZE THIS AGENCY TO
                                CONDUCT AND VERIFY MY CRIMINAL HISTORY BY
                                PERFORMING A CRIMINAL HISTORY CHECK.
                              </strong>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mt-20">
                          <p>Signature:</p>
                          {criminal?.signature ? (
                            <img
                              src={`${apiBase}/storage/signature/${criminal.signature}`}
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
                            {criminal?.created_at
                              ? new Date(
                                  criminal.created_at
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
