import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";

export default function PolicyProcedureFilled({ data, fullname }) {
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
        Policies And Procedures Orientation Acknowledgement - 1staccess Home
        Care
      </title>

      <body class="dashboard">
        <div id="main-wrapper">
          <UserHeader />
          <UserSidebar />

          <div class="content-body">
            <div class="container">
              <div class="page-title">
                <div class="row align-items-center justify-content-between">
                  <div class="col-md-6">
                    <div class="page-title-content">
                      <h3>Policies And Procedures</h3>
                      <p class="mb-2">Fill all required(*) fields</p>
                    </div>
                  </div>
                  <div class="col-auto">
                    <div class="breadcrumbs">
                      <Link to={PATHS.USER_DASHBOARD}>Home</Link>
                      <span>
                        <i class="ri-arrow-right-s-line"></i>
                      </span>
                      <Link to={PATHS.USER_FORMS}>Forms</Link>
                      <span>
                        <i class="ri-arrow-right-s-line"></i>
                      </span>
                      <Link to={PATHS.USER_POLICIES_PROCEDURES_FORM}>
                        Policies And Procedures
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="card">
                    <div id="printArea" class="card-body">
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
                        <h4 className="mt-4 mb-3">Health & Safety Agreement</h4>
                      </div>
                      {/*  */}
                      <div className="step-content">
                        <h4 className="step-title">
                          Policies And Procedures Orientation Acknowledgement
                        </h4>
                        <div className="row">
                          <div className="col-md-12">
                            <p>
                              Employee Name: <u>{fullname}</u>
                            </p>

                            <p>
                              I acknowledge that I have been oriented to
                              agencies Policies and Procedures Manual and agree
                              to follow all guidelines, both written and verbal.
                              I understand that, if the guidelines, policies and
                              procedures are not followed, that I may be
                              immediately terminated. I also had the opportunity
                              to ask questions regarding the Policies and
                              Procedures Manual and I know where it’s located
                              for future reference.
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
