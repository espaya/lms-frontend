import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";
import { formatDate } from "../../../../utils/DateFormatter";

export default function DrugTestingFilled({ data, fullname }) {
  const drugTesting = data?.drugTesting;
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
      <title>Drug Testing Policy - 1staccess Home Care</title>

      <div className="dashboard">
        <div id="main-wrapper">
          <UserHeader />

          <UserSidebar />

          <div className="content-body">
            <div className="container">
              <div class="page-title">
                <div class="row align-items-center justify-content-between">
                  <div class="col-md-6">
                    <div class="page-title-content">
                      <h3>Drug Testing Policy</h3>
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
                      <Link to={PATHS.USER_DRUG_TESTING_FORM}>
                        Drug Testing Policy
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
                        <h4 className="mt-4 mb-3">Drug Testing Policy</h4>
                      </div>
                      {/*  */}
                      <div className="step-content">
                        <div className="row">
                          <div className="col-12">
                            <p>
                              Employee Name: <u> {fullname} </u>
                            </p>

                            <p>
                              Agency employees may not possess, distribute or
                              use alcoholic beverages or controlled substances.
                              Including inhalants while on premises of property
                              controlled by the Agency or while on the clients
                              property in the course of conducting company
                              business or engaged in any company sponsored
                              activity.
                            </p>

                            <p>
                              Patients or visitors may not possess, distribute
                              and/or use alcoholic beverages or controlled
                              substances, while on the premises of property
                              controlled by the Agency.
                            </p>

                            <p>
                              Any employee who has knowledge of a person or
                              persons violating this policy must report it to
                              his/her Supervisor immediately.
                            </p>

                            <p>
                              Based on reasonable cause, the Agency may conduct
                              searches or inspection of an employee’s personal
                              belongings and may be asked to take a drug test.
                              Refusal to consent may result in termination.
                            </p>

                            <p>
                              <strong>
                                *I HAVE READ AND UNDERSTAND THE ABOVE AND WILL
                                COMPLY WITH THIS AGREEMENT
                              </strong>
                            </p>
                          </div>
                        </div>
                      </div>
                      {/*  */}
                      <div className="row">
                        <div className="col-md-6 mt-20">
                          <p>Signature:</p>
                          {drugTesting?.signature ? (
                            <img
                              src={`${apiBase}/storage/signature/${drugTesting.signature}`}
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
                          <p>{formatDate(drugTesting?.created_at)}</p>
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
      </div>
    </>
  );
}
