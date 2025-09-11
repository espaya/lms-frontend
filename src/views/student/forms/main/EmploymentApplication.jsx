import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";

export default function EmploymentApplication({ data }) {
  const app = data?.employmentApplication || {};
  const profile = data?.profileData?.[0] || {};
  const signature = app?.signature;
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
      <title>Application Form - 1st Access Home Care</title>

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
                      <h3>Application Form</h3>
                      <p className="mb-2">
                        Review your submitted employment details
                      </p>
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
                      <Link to={PATHS.USER_APPLICATION_FORM}>
                        Application Form
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div id="printArea" className="card">
                    <div className="card-body">
                      {/* Header */}
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
                          Application For Employment
                        </h4>
                      </div>

                      {/* Personal Info */}
                      <section className="mt-20">
                        <h5 className="mb-3">Personal Information</h5>
                        <div className="row">
                          <div className="col-md-3">
                            <p>
                              <strong>Name:</strong> {profile.full_name}
                            </p>
                          </div>
                          <div className="col-md-3">
                            <p>
                              <strong>Email:</strong> {app.email}
                            </p>
                          </div>
                          <div className="col-md-3">
                            <p>
                              <strong>Phone:</strong> {profile.phone}
                            </p>
                          </div>
                          <div className="col-md-3">
                            <p>
                              <strong>Present Address:</strong>
                              {profile.user_avatar || " N/A"}
                            </p>
                          </div>
                          <div className="col-md-3">
                            <p>
                              <strong>Employee Hire Date: </strong>
                              {app.application_form?.employee_hire_date}
                            </p>
                          </div>
                        </div>
                      </section>

                      {/* Employment Info */}
                      <section className="mt-20">
                        <h5 className="mb-3">Employment Details</h5>

                        <div className="row">
                          <div className="col-md-3">
                            <p>
                              <strong>Employment Desired: </strong>
                              {app.application_form?.employment_desired}
                            </p>
                          </div>

                          <div className="col-md-3">
                            <p>
                              <strong>Position: </strong>
                              {app.application_form?.position}
                            </p>
                          </div>

                          <div className="col-md-3">
                            <p>
                              <strong>Date Start: </strong>
                              {app.application_form?.date_start}
                            </p>
                          </div>

                          <div className="col-md-3">
                            <p>
                              <strong>Salary: </strong>
                              {app.application_form?.salary}
                            </p>
                          </div>

                          <div className="col-md-3">
                            <p>
                              <strong>Currently Employed: </strong>
                              {app.application_form?.employed_now}
                            </p>
                          </div>

                          <div className="col-md-3">
                            <p>
                              <strong>Applied Before: </strong>
                              {app.application_form?.applied_before}
                            </p>
                          </div>

                          <div className="col-md-3">
                            <p>
                              <strong>On Layoff Subject to Recall: </strong>
                              {
                                app.application_form
                                  ?.on_layoff_subject_to_recall
                              }
                            </p>
                          </div>

                          <div className="col-md-3">
                            <p>
                              <strong>Willing to Travel: </strong>
                              {app.application_form?.travel_if_required}
                            </p>
                          </div>

                          <div className="col-md-3">
                            <p>
                              <strong>Willing to Relocate: </strong>
                              {app.application_form?.relocate_if_required}
                            </p>
                          </div>

                          <div className="col-md-3">
                            <p>
                              <strong>Work Overtime if Required: </strong>
                              {app.application_form?.overtime_if_required}
                            </p>
                          </div>

                          <div className="col-md-3">
                            <p>
                              <strong>Attendance Requirements: </strong>
                              {
                                app.application_form
                                  ?.attendance_requirements_position
                              }
                            </p>
                          </div>

                          <div className="col-md-3">
                            <p>
                              <strong>Bonded: </strong>
                              {app.application_form?.bonded}
                            </p>
                          </div>

                          <div className="col-md-3">
                            <p>
                              <strong>Convicted: </strong>
                              {app.application_form?.convicted}
                            </p>
                          </div>

                          <div className="col-md-3">
                            {app.application_form?.explain_convicted && (
                              <p>
                                <strong>Conviction Explanation: </strong>
                                {app.application_form.explain_convicted}
                              </p>
                            )}
                          </div>

                          <div className="col-md-3">
                            <p>
                              <strong>Driver's License: </strong>
                              {app.application_form?.drivers_license}
                            </p>
                          </div>

                          <div className="col-md-3">
                            <p>
                              <strong>State: </strong>
                              {app.application_form?.drivers_license_state}
                            </p>
                          </div>
                        </div>
                      </section>

                      {/* Education */}
                      <section className="mt-20">
                        <h5 className="mb-3">Education</h5>
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Level</th>
                              <th>Name / Location</th>
                              <th>Years</th>
                              <th>Graduated</th>
                              <th>Subjects</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Current Academic</td>
                              <td>
                                {app.academic?.edu_current_name_location_school}
                              </td>
                              <td>{app.academic?.edu_current_number_years}</td>
                              <td>{app.academic?.edu_current_did_graduate}</td>
                              <td>
                                {app.academic?.edu_current_subjects_studied}
                              </td>
                            </tr>
                            <tr>
                              <td>Last Academic</td>
                              <td>
                                {app.academic?.edu_last_name_location_school}
                              </td>
                              <td>{app.academic?.edu_last_number_years}</td>
                              <td>{app.academic?.edu_last_did_graduate}</td>
                              <td>{app.academic?.edu_last_subjects_studied}</td>
                            </tr>
                            <tr>
                              <td>Current Trades</td>
                              <td>
                                {
                                  app.academic
                                    ?.trades_current_name_location_school
                                }
                              </td>
                              <td>
                                {app.academic?.trades_current_number_years}
                              </td>
                              <td>
                                {app.academic?.trades_current_did_graduate}
                              </td>
                              <td>
                                {app.academic?.trades_current_subjects_studied}
                              </td>
                            </tr>
                            <tr>
                              <td>Last Trades</td>
                              <td>
                                {
                                  app.academic
                                    ?.trades_last_current_name_location_school
                                }
                              </td>
                              <td>
                                {app.academic?.trades_last_current_number_years}
                              </td>
                              <td>
                                {app.academic?.trades_last_current_did_graduate}
                              </td>
                              <td>
                                {app.academic?.trades_last_subjects_studied}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </section>

                      {/* References */}
                      <section className="mt-20">
                        <h5 className="mb-3">References</h5>
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Address</th>
                              <th>Phone</th>
                              <th>Years Acquainted</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{app.reference?.reference_name_1}</td>
                              <td>{app.reference?.reference_address_1}</td>
                              <td>{app.reference?.reference_phone_1}</td>
                              <td>
                                {app.reference?.reference_years_acquainted_1}
                              </td>
                            </tr>
                            <tr>
                              <td>{app.reference?.reference_name_2}</td>
                              <td>{app.reference?.reference_address_2}</td>
                              <td>{app.reference?.reference_phone_2}</td>
                              <td>
                                {app.reference?.reference_years_acquainted_2}
                              </td>
                            </tr>
                            <tr>
                              <td>{app.reference?.reference_name_3}</td>
                              <td>{app.reference?.reference_address_3}</td>
                              <td>{app.reference?.reference_phone_3}</td>
                              <td>
                                {app.reference?.reference_years_acquainted_3}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </section>

                      {/* Signature */}
                      <section className="mt-50">
                        <h5 className="mb-3">Acknowledgement</h5>

                        <div className="row">
                          <div className="col-md-6">
                            <p>Signature:</p>
                            {signature?.signature ? (
                              <img
                                src={`${apiBase}/storage/signature/${signature.signature}`}
                                alt="Signature"
                                style={{ width: "200px" }}
                              />
                            ) : (
                              <p>
                                <em>No signature provided</em>
                              </p>
                            )}
                          </div>
                          <div className="col-md-6">
                            <p>Date Signed: {signature?.date_signed}</p>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={printContent}
                    className="btn btn-primary btn-lg mx-auto"
                  >
                    <i className="li li-print" /> Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}
