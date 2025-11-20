import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MyHeader from "../../../../components/MyHeader";
import Sidebar from "../../../../components/Sidebar";
import Nav from "../../single_user/Nav";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";
import { formatDate } from "../../../../utils/DateFormatter";
import printContent from "../../../../utils/printContent";
import FetchAllEmployeeForms from "../../../../controller/admin/AllFormsController";
import Spinner from "../../../../components/Spinner";

export default function SignedInfectionControlForms() {
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
  const data = allForms?.infection_control;

  return (
    <>
      <title>Infection Control Agreement - 1staccess Home Care</title>
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
                              Employee Name: <u>{fullname ?? "N/A"}</u>
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

                        <div id="signature-wrapper" className="no-break">
                          <div id="signature-row" className="row">
                            {/* Normal layout for screen */}
                            <div className="col-md-6 d-print-none">
                              <p>Signature:</p>
                              {data?.signature ? (
                                <img
                                  src={`${apiBase}/storage/signature/${data.signature}`}
                                  alt="Signature"
                                  style={{ width: "200px" }}
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
                                        src={`${apiBase}/storage/signature/${data.signature}`}
                                        alt="Signature"
                                        style={{ width: "200px" }}
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
