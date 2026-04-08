import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MyHeader from "../../../../components/MyHeader";
import Sidebar from "../../../../components/Sidebar";
import Nav from "../../single_user/Nav";
import { Link } from "react-router-dom";
import { formatDate } from "../../../../utils/DateFormatter";
import printContent from "../../../../utils/printContent";
import FetchAllEmployeeForms from "../../../../controller/admin/AllFormsController";
import Spinner from "../../../../components/Spinner";
import exportToWord from "../../../../utils/exportToWord";

export default function SignedCriminalForms() {
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
  const data = allForms.criminal_history_search;
  const title = "Criminal History Search";

  return (
    <>
      <title>Criminal History Search - 1staccess Home Care</title>
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
                              Employee Name: <u> {fullname ?? "N/A"} </u>
                            </p>
                            <p>
                              I, <u> {fullname ?? "N/A"}</u> have had no prior
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

                      <div id="signature-wrapper" className="no-break">
                        <div id="signature-row" className="row">
                          {/* Normal layout for screen */}
                          <div className="col-md-6 d-print-none">
                            <p>Signature:</p>
                            {data?.signature ? (
                              <img
                                src={`${apiBase}/storage/signature/${data.signature}`}
                                alt="Signature"
                                style={{ width: "100px" }}
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
                                    className="signature"
                                      src={`${apiBase}/storage/signature/${data.signature}`}
                                      alt="Signature"
                                      style={{ width: "100px" }}
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
                    <div className="col-md-3 mt-20">
                      <button
                        onClick={() => exportToWord({ fullname, title })}
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
