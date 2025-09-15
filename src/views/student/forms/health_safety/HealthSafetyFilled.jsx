import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";

export default function HealthSafetyFilled({ data, fullname }) {
  const apiBase = import.meta.env.VITE_API_URL;

  console.log(data);

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
      <title>Health & Safety Agreement - 1staccess Home Care</title>

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
                      <h3>Health & Safety Agreement</h3>
                      <p className="mb-2">Fill all required(*) fields</p>
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
                      <Link to={PATHS.USER_EMPLOYEE_HEALTH_SAFETY_FORM}>
                        Health & Safety Agreement
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
                        <h4 className="mt-4 mb-3">Health & Safety Agreement</h4>
                      </div>
                      {/*  */}
                      <div className="col-md-12">
                        <p>
                          Employee Name: <u>{fullname}</u>
                        </p>
                        <p>
                          I do understand the physical requirements of my job
                          and understand proper lifting and moving techniques
                          which I am expected to use in moving and lifting
                          objects and/or patients.
                        </p>
                        <p>
                          I have been informed and do fully understand that any
                          injury claimed by me while on the job must be reported
                          immediately to my Supervisor and documented on an
                          Accident/Incident Report Form. I understand that
                          unless an incident report is completed immediately and
                          signed by me,the Agency may not consider a voluntary
                          payment of any medical bills or any other benefits as
                          a result of my injury. I further understand that if
                          the accident/injury is proven to be a result of my
                          failing to follow policy/procedure, the Agency may not
                          be expected to cover medical payments.
                        </p>
                        <p>
                          I do fully understand that I am not encouraged to lift
                          or transfer any object or patient by myself unless I
                          know that I can safely lift or transfer alone. If I
                          believe there is no one readily available to assist me
                          in lifting or moving patients or equipment while on
                          duty, I am to wait until I can obtain assistance
                          before moving or lifting.
                        </p>
                        <p>
                          <em>
                            I have had the opportunity to review and have all
                            questions answered regarding Health and Safety
                          </em>
                        </p>
                      </div>
                      {/*  */}
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
      </body>
    </>
  );
}
