import { Link } from "react-router-dom";
import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { PATHS } from "../../../../router";
import { formatDate } from "../../../../utils/DateFormatter";

export default function UniversalPrecautionsFilled({ data, fullname }) {
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
        Universal Precautions Training Document - 1staccess Home Care
      </title>

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
                      <h3> Universal Precautions Training Document</h3>
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
                      <Link to={PATHS.USER_UNIVERSAL_PRECAUTIONS_FORM}>
                        Universal Precautions Training Document
                      </Link>
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
                        <h5 className="mt-4 mb-3">
                          Universal Precautions Training Document
                        </h5>
                      </div>
                      <div className="step-content">
                        <p>
                          Employee Name: <u> {fullname} </u>
                        </p>

                        <div className="row">
                          <div className="col-12">
                            <h5 className="step-title">
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
                              There may be as many as one million carriers of
                              HBV
                            </p>
                          </div>
                          <div className="col-md-12 mt-20">
                            <h5 className="step-title">
                              LESSON 2 - TRANSMISSION OF BLOOD BORNE INFECTION
                            </h5>
                            <p>
                              Sources of blood borne infections in the
                              workplace. <br />
                              Four primary ways of getting blood borne
                              infections outside the workplace. <br />
                              Three primary ways of getting blood borne
                              infections at work. <br />
                              Risky jobs, tasks and work practices.
                            </p>
                          </div>
                          <div className="col-md-12 mt-20">
                            <h5 className="step-title">
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
                              right to be vaccinated free of charge at any time
                              in the future provided I am still at risk for
                              infection.
                            </p>
                          </div>
                          <div className="col-md-12 mt-20">
                            <h5 className="step-title">
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
                          </div>
                          <div className="col-md-12 mt-20">
                            <h5 className="step-title">
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
                              practices.
                            </p>
                            <p>
                              <strong>
                                *I have received training covering all of the
                                above topics and been informed of my rights
                                accordingly.
                              </strong>
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
                            <p>{formatDate(data?.created_at)}</p>
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
      </div>
    </>
  );
}
