import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";

export default function InfectionControlFilled({ data, fullname }) {
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
      <title>Infection Control Agreement - 1staccess Home Care</title>

      <body class="dashboard">
        <div id="main-wrapper">
          <UserHeader />
          <UserSidebar />

          <div class="content-body">
            <div class="container">
              <div className="page-title">
                <div className="row align-items-center justify-content-between">
                  <div className="col-md-6">
                    <div className="page-title-content">
                      <h3>Infection Control Agreement</h3>
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
                      <Link to={PATHS.USER_INFECTION_CONTROL_FORM}>
                        Infection Control Agreement
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
                        <h4 className="mt-4 mb-3">
                          Infection Control Agreement
                        </h4>
                      </div>
                      {/*  */}
                      <div className="step-content">
                        <div className="row">
                          <div className="col-md-12">
                            <p>
                              Employee Name: <u>{fullname}</u>
                            </p>
                            <p>
                              1st Access Home Care wants to improve client
                              outcomes by identifying and reducing the risk of
                              infection in clients and Agency staff.
                            </p>
                            <p>
                              The Agency will document infections that are
                              acquired while the client is receiving services
                              from the Agency. The documentation will include at
                              a minimum the date that the infection was
                              detected, the client’s name or number, primary
                              diagnosis, signs/symptoms, type of infection,
                              pathogens identified and treatment.
                            </p>
                            <p>
                              The infection control program will include
                              surveillance, identification, prevention, control
                              and reporting. Targeted surveillance of infections
                              will focus on specific client population or
                              procedures.
                            </p>
                            <p>
                              Infection Control Standards are established in
                              compliance with the recommendations of the
                              National Center for Disease Control. All staff are
                              educated on these standards and they are practiced
                              consistently. Any incidents of infection related
                              to care and service are reported.
                            </p>
                            <p>
                              <em>
                                I recognize and I am fully aware of the fact
                                that any client may be contagious at any time
                                and that this may not always be a known fact
                                while care is being provided. I will follow all
                                Infection Control and Universal Precautions
                                Procedures of the Agency. I also state that
                                currently I am in excellent health and have no
                                impairments that may alter my job performance.
                              </em>
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
      </body>
    </>
  );
}
