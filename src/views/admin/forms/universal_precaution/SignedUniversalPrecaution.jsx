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

export default function SignedUniversalPrecautionForms() {
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
  const data = allForms?.universal_precaution;

  return (
    <>
      <title>
        Universal Precautions Training Document - 1staccess Home Care
      </title>
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
                          width={150}
                          alt="Company Logo"
                        />
                        <h5>1st Access Home Care Incorporated</h5>
                        <p>
                          6600 Fieldtan Trail, Moseley, VA, 23120 <br />
                          Agency Phone: (+1) 804-818-3216
                        </p>
                        <h6 className="">
                          Universal Precautions Training Document
                        </h6>
                      </div>
                      <div className="step-content">
                        Employee Name: <u> {fullname ?? "N/A"} </u>
                        <div className="row">
                          <h5 style={{ fontSize: "12px" }}>
                            LESSON 1 - BLOOD BORNE INFECTION
                          </h5>
                          <p>
                            Definition of Exposure. <br />
                            Spread of HIV infection in the general population.
                            <br />
                            Symptoms and effects of HIV infection. <br />
                            Spread of Hepatitis B, including number of
                            infections, hospitalization, and deaths caused by
                            HBV each year. <br />
                            Symptoms of effects of HBV infection and HBV
                            vaccination. <br />
                            The hepatitis B virus HIV virus can be transmitted
                            in the workplace.
                            <br />
                            It is estimated that there are 1and ½ million HIV
                            carriers in the US <br />
                            There may be as many as one million carriers of HBV
                          </p>
                          <h5 style={{ fontSize: "12px" }}>
                            LESSON 2 - TRANSMISSION OF BLOOD BORNE INFECTION
                          </h5>
                          <p>
                            Sources of blood borne infections in the workplace.{" "}
                            <br />
                            Four primary ways of getting blood borne infections
                            outside the workplace. <br />
                            Three primary ways of getting blood borne infections
                            at work. <br />
                            Risky jobs, tasks and work practices.
                          </p>
                          <h5 style={{ fontSize: "12px" }}>
                            LESSON 3 - EXPOSURE CONTROL
                          </h5>
                          <p>
                            The HBV vaccine for all workers who come into
                            contact with blood or other potentially infectious
                            body fluids on the job. <br />
                            The definition of Universal Precautions. <br />
                            The steps that should be taken after an exposure
                            incident in order to prevent infection.
                            <br />
                            My right in case of exposure and/or infection.
                            <br />I have the right to have HBV vaccinations
                            provided to me free of charge if I am at risk for
                            infection. If I refuse it at this time, I have the
                            right to be vaccinated free of charge at any time in
                            the future provided I am still at risk for
                            infection.
                          </p>
                          <h5 style={{ fontSize: "12px" }}>
                            LESSON 4 - USING PERSONAL PROTECTIVE EQUIPMENT
                          </h5>
                          <p>
                            Types of Personal Protective Equipment (PPE)
                            required for different tasks or situations.
                            <br />
                            Key requirements for selecting, providing, using,
                            and disposing of or cleaning PPE.
                            <br />
                            Limitations of personal protective equipment.
                          </p>
                          <h5 style={{ fontSize: "12px" }}>
                            LESSON 5 - WORK PRACTICE CONTROLS
                          </h5>
                          <p>
                            Disposing of used needles or other sharps. <br />
                            Working with lab materials.
                            <br />
                            Decontaminating work areas, instruments, and
                            equipment.
                            <br />
                            Identifying and handling regulated waste.
                            <br />
                            Hand washing and other personal hygiene and health
                            practices. <br />
                            <strong>
                              *I have received training covering all of the
                              above topics and been informed of my rights
                              accordingly.
                            </strong>
                          </p>
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
                                  style={{ width: "250px" }}
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
                                        style={{ width: "250px" }}
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
