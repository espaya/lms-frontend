import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";

export default function EmployeeDressCodeFilled({ data, fullname }) {
  const apiBase = import.meta.env.VITE_API_URL;
  const dresscode = data?.dressCode;

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
      <title>Employee Dress Code - 1staccess Home Care</title>

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
                      <h3>Employee Dress Code</h3>
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
                      <Link to={PATHS.USER_EMPLOYEE_DRESS_CODE_FORM}>
                        Employee Dress Code
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
                        <h4 className="mt-4 mb-3">Employee Dress Code</h4>
                      </div>
                      {/*  */}
                      <div className="step-content">
                        <div className="row">
                          <div className="col-12">
                            <p>
                              Employee Name: <u> {fullname} </u>
                            </p>

                            <p>
                              <strong>
                                1st Access Home Care Incorporated strives to
                                present a professional and safe health care
                                image to patients’ families, the community, and
                                other health care professionals. 1st Access Home
                                Care Incorporated staff members adhere to the
                                following standards in their dress appearance.
                              </strong>
                            </p>

                            <ol>
                              <li>
                                1. All staff will wear an approved 1st Access
                                Home Care incorporated name badge when providing
                                patient care
                              </li>
                              <li>
                                2. Clothing shall be clean, neat, and well
                                maintained. Allowed Clothing: Scrubs must be
                                worn at all times.
                              </li>
                              <li>
                                3. Shoes should be conservative and comfortable.
                                Closed toed shoes will be worn at all times for
                                personal safety and infection control while
                                providing client care.
                              </li>

                              <li>
                                5. Employees are expected to keep their hair
                                dry, neat, and clean. Long hair must be styled
                                so it does not come in contact with the patient.
                                Mustaches and beards must be clean and trimmed
                              </li>
                              <li>
                                6. Perfume should be conservative. Strong odors
                                can be offensive to patients.
                              </li>
                              <li>
                                7. Jewelry represents a safety hazard, so it
                                must be worn in discretion, i.e. wedding rings,
                                rings without large mountings, small earrings or
                                studs. Visible piercing, except for earrings,
                                should be removed when providing patient care.
                                Both professionalism and safety should be
                                considered when wearing jewelry.
                              </li>
                              <li>
                                8. Fingernails are to be kept clean, trimmed and
                                moderately short for patient safety.
                              </li>
                            </ol>
                          </div>
                        </div>
                      </div>
                      {/*  */}
                      <div className="row">
                        <div className="col-md-6 mt-20">
                          <p>Signature:</p>
                          {dresscode?.signature ? (
                            <img
                              src={`${apiBase}/storage/signature/${dresscode.signature}`}
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
                            {dresscode?.created_at
                              ? new Date(
                                  dresscode.created_at
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
      </div>
    </>
  );
}
