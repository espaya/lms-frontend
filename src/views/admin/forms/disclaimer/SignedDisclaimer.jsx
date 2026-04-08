import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MyHeader from "../../../../components/MyHeader";
import Sidebar from "../../../../components/Sidebar";
import Nav from "../../single_user/Nav";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";
import { formatDate } from "../../../../utils/DateFormatter";
import FetchAllEmployeeForms from "../../../../controller/admin/AllFormsController";
import printContent from "../../../../utils/printContent";
import Spinner from "../../../../components/Spinner";
import exportToWord from "../../../../utils/exportToWord";

export default function SignedDisclaimerForms() {
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
  const data = allForms.disclaimer_waiver_liability;
  const title = "Disclaimer And Waiver Of Liability";

  return (
    <>
      <title>Disclaimer And Waiver Of Liability - 1staccess Home Care</title>
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
                        <h4 className="mt-4 mb-3">
                          Disclaimer And Waiver Of Liability
                        </h4>
                      </div>

                      <div className="step-content">
                        <div className="row">
                          <div className="col-12">
                            <p>
                              Employee Name: <u> {fullname ?? "N/A"} </u>
                            </p>

                            <p>
                              I acknowledge and will adhere to the rules and
                              regulations as set forth by the Office of
                              Licensure and Certification. I understand that the
                              falsification of documents, particularly those
                              pertaining to the submission of visit notes where
                              in fact no visits was made, is considered to be
                              fraud and is subject to filing of a criminal
                              grievance, civil and/or criminal prosecution, and
                              immediate termination. I therefore hold the home
                              health care agency, its shareholders, directors
                              and officers, harmless from any falsified
                              documents.
                            </p>
                            <p>
                              <strong>
                                I have read and understand the above
                                information. I understand that the falsification
                                of documents, particularly those pertaining to
                                the submission of visit notes where in fact no
                                visits was made, is considered to be fraud and
                                is subject to filing of a criminal grievance,
                                civil and/or criminal prosecution, and immediate
                                termination.
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
                          </div>
                          <div className="col-md-6 d-print-none">
                            <p>Date Signed: </p>
                            <p>{formatDate(data?.created_at)}</p>
                          </div>

                          {/* Print-only layout */}
                          {/* <div
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
                          </div> */}
                        </div>
                      </div>

                      {/*  */}
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
