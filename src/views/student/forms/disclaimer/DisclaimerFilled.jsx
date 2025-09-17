import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";

export default function DisclaimerFilled({ data, fullname }) {
  const apiBase = import.meta.env.VITE_API_URL;
  const disclaimer = data?.disclaimer;

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
      <title>Disclaimer And Waiver Of Liability - 1staccess Home Care</title>

      <body className="dashboard">
        <div id="main-wrapper">
          <UserHeader />
          <UserSidebar />

          <div className="content-body">
            <div className="container">
              <div className="page-title">
                <div className="row align-items-center justify-content-between">
                  <div className="col-md-6">
                    <div className="page-title-content">
                      <h3> Disclaimer And Waiver Of Liability</h3>
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
                      <Link to={PATHS.USER_DISCLAIMER_FORM}>
                        Disclaimer And Waiver Of Liability
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
                          Disclaimer And Waiver Of Liability
                        </h4>
                      </div>

                      <div className="step-content">
                        <h4 className="step-title">
                          Disclaimer And Waiver Of Liability
                        </h4>
                        <div className="row">
                          <div className="col-12">
                            <p>
                              Employee Name: <u> {fullname} </u>
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

                      <div className="row">
                        <div className="col-md-6 mt-20">
                          <p>Signature:</p>
                          {disclaimer?.signature ? (
                            <img
                              src={`${apiBase}/storage/signature/${disclaimer.signature}`}
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
                            {disclaimer?.created_at
                              ? new Date(
                                  disclaimer.created_at
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })
                              : "N/A"}
                          </p>
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
      </body>
    </>
  );
}
