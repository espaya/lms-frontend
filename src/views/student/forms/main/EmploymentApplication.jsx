import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";
import { formatDate } from "../../../../utils/DateFormatter";

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
                          <div className="col-md-12">
                            <p>
                              <strong>Name:</strong>{" "}
                              {data.profileData.full_name}
                            </p>
                            <p>
                              <strong>Email:</strong> {data?.email}
                            </p>
                            <p>
                              <strong>Phone:</strong> {data?.profileData?.phone}
                            </p>
                            <p>
                              <strong>Present Address: </strong>
                              {`${data.employmentApplication.present_address.present_address}  ${data.employmentApplication.present_address.present_city} ${data.employmentApplication.present_address.present_state} ${data.employmentApplication.present_address.present_zip}`}
                            </p>
                            <p>
                              <strong>Permanent Address: </strong>
                              {`${data.employmentApplication.permanent_address.permanent_address}  ${data.employmentApplication.permanent_address.permanent_city} ${data.employmentApplication.permanent_address.permanent_state} ${data.employmentApplication.permanent_address.permanent_zip}`}
                            </p>
                            <p>
                              <strong>Employee Hire Date: </strong>
                              {formatDate(
                                data.employmentApplication?.employee_hire_date
                              )}
                            </p>
                          </div>
                        </div>
                      </section>

                      {/* Employment Info */}
                      <section className="mt-20">
                        <h5 className="mb-3">Employment Details</h5>

                        <div className="row">
                          <div className="col-md-12">
                            <p>
                              <strong>Are you 18 and older: </strong>
                              {data.employmentApplication?.furnish_work}
                            </p>
                          </div>
                          <div className="col-md-12">
                            <p>
                              <strong>Employment Desired: </strong>
                              {data.employmentApplication?.employment_desired}
                            </p>
                          </div>

                          <div className="col-md-12">
                            <p>
                              <strong>Date You Can Start: </strong>
                              {formatDate(
                                data.employmentApplication?.date_start
                              )}
                            </p>
                          </div>
                          <div className="col-md-12">
                            <p>
                              <strong>Position: </strong>
                              {data.employmentApplication?.position}
                            </p>
                          </div>

                          <div className="col-md-12">
                            <p>
                              <strong>Salary: </strong>
                              {data.employmentApplication?.salary}
                            </p>
                          </div>
                          <div className="col-md-12">
                            <p>
                              <strong>Are You Employed Now: </strong>
                              {data.employmentApplication?.employed_now}
                            </p>
                          </div>

                          {data.employmentApplication?.employed_now && (
                            <div className="col-md-12">
                              <p>
                                <strong>
                                  If So May We Inquire Your Present Employer?:{" "}
                                </strong>
                                {
                                  data.employmentApplication
                                    ?.inqure_present_employer
                                }
                              </p>
                            </div>
                          )}

                          <div className="col-md-12">
                            <p>
                              <strong>
                                Ever Applied For This Company Before?:{" "}
                              </strong>
                              {data.employmentApplication?.applied_before}
                            </p>
                          </div>

                          <div className="col-md-12">
                            {data.employmentApplication?.applied_before ==
                              "Yes" && (
                              <>
                                <p>
                                  <strong>Where?: </strong>
                                  {data.employmentApplication?.where}
                                </p>
                                <p>
                                  <strong>When?: </strong>
                                  {data.employmentApplication?.when}
                                </p>
                              </>
                            )}
                          </div>

                          <div className="col-md-12">
                            <p>
                              <strong>
                                Are You On Layoff And Subject To Recall?:{" "}
                              </strong>
                              {
                                data.employmentApplication
                                  ?.on_layoff_subject_to_recall
                              }
                            </p>
                          </div>
                          <div className="col-md-12">
                            <p>
                              <strong>Will You Travel If Required?: </strong>
                              {data.employmentApplication?.travel_if_required}
                            </p>
                          </div>

                          <div className="col-md-12">
                            <p>
                              <strong>
                                Will You Relocate If The Job Requires It?:{" "}
                              </strong>
                              {data.employmentApplication?.relocate_if_required}
                            </p>
                          </div>

                          <div className="col-md-12">
                            <p>
                              <strong>
                                Will You Work Overtime if Required:{" "}
                              </strong>
                              {data.employmentApplication?.overtime_if_required}
                            </p>
                          </div>

                          <div className="col-md-12">
                            <p>
                              <strong>
                                Are you able to meet the attendance requirements
                                of this position?:{" "}
                              </strong>
                              {
                                data.employmentApplication
                                  ?.attendance_requirements_position
                              }
                            </p>
                          </div>

                          <div className="col-md-12">
                            <p>
                              <strong>Have you ever been Bonded?: </strong>
                              {data.employmentApplication?.bonded}
                            </p>
                          </div>

                          <div className="col-md-12">
                            <p>
                              <strong>
                                Have you ever been convicted of a felony in the
                                past 7years?:{" "}
                              </strong>
                              {data.employmentApplication?.convicted}
                            </p>
                          </div>

                          {data.employmentApplication?.convicted === "Yes" && (
                            <div className="col-md-6">
                              <p>
                                <strong>
                                  Such conviction may be relevant if job
                                  related, but does not bar you from employment.
                                  If yes - explain:
                                </strong>
                                {data.employmentApplication?.explain_convicted}
                              </p>
                            </div>
                          )}

                          <div className="col-md-6">
                            <p>
                              <strong>Driver's License NUmber: </strong>
                              {data.employmentApplication?.drivers_license}
                            </p>
                          </div>

                          <div className="col-md-6">
                            <p>
                              <strong>State: </strong>
                              {
                                data.employmentApplication
                                  ?.drivers_license_state
                              }
                            </p>
                          </div>
                        </div>
                      </section>

                      {/* Education */}
                      <section className="mt-20">
                        <h5 className="mb-3">Education</h5>
                        <div className="table-responsive">
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
                                  {
                                    data.employmentApplication.academic
                                      ?.edu_current_name_location_school
                                  }
                                </td>
                                <td>
                                  {
                                    data.employmentApplication.academic
                                      ?.edu_current_number_years
                                  }
                                </td>
                                <td>
                                  {
                                    data.employmentApplication.academic
                                      ?.edu_current_did_graduate
                                  }
                                </td>
                                <td>
                                  {
                                    data.employmentApplication.academic
                                      ?.edu_current_subjects_studied
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td>Last Academic</td>
                                <td>
                                  {
                                    data.employmentApplication.academic
                                      ?.edu_last_name_location_school
                                  }
                                </td>
                                <td>
                                  {
                                    data.employmentApplication.academic
                                      ?.edu_last_number_years
                                  }
                                </td>
                                <td>
                                  {
                                    data.employmentApplication.academic
                                      ?.edu_last_did_graduate
                                  }
                                </td>
                                <td>
                                  {
                                    data.employmentApplication.academic
                                      ?.edu_last_subjects_studied
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td>Current Trades</td>
                                <td>
                                  {
                                    data.employmentApplication.academic
                                      ?.trades_current_name_location_school
                                  }
                                </td>
                                <td>
                                  {
                                    data.employmentApplication.academic
                                      ?.trades_current_number_years
                                  }
                                </td>
                                <td>
                                  {
                                    data.employmentApplication.academic
                                      ?.trades_current_did_graduate
                                  }
                                </td>
                                <td>
                                  {
                                    data.employmentApplication.academic
                                      ?.trades_current_subjects_studied
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td>Last Trades</td>
                                <td>
                                  {
                                    data.employmentApplication.academic
                                      ?.trades_last_current_name_location_school
                                  }
                                </td>
                                <td>
                                  {
                                    data.employmentApplication.academic
                                      ?.trades_last_current_number_years
                                  }
                                </td>
                                <td>
                                  {
                                    data.employmentApplication.academic
                                      ?.trades_last_current_did_graduate
                                  }
                                </td>
                                <td>
                                  {
                                    data.employmentApplication.academic
                                      ?.trades_last_subjects_studied
                                  }
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </section>

                      <section className="mt-20">
                        <div className="col-md-12">
                          Summarize special skills and qualifications required
                          from employment or other experiences that may qualify
                          you to work with this company:{" "}
                          <b> {data.special_skills_qualifications} </b>{" "}
                        </div>
                      </section>

                      {/* Past Employement Info */}
                      <section className="mt-20">
                        <h5 className="mb-3">Past Employment Info</h5>
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>From</th>
                              <th>To</th>
                              <th>Name and Address of Employer</th>
                              <th>Phone Number</th>
                              <th>Salary</th>
                              <th>Job</th>
                              <th>Reason for Leaving</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                {formatDate(
                                  data.employmentApplication.past_emp_info
                                    ?.from_date_1
                                )}
                              </td>
                              <td>
                                {formatDate(
                                  data.employmentApplication.past_emp_info
                                    ?.to_date_1
                                )}
                              </td>
                              <td>
                                {
                                  data.employmentApplication.past_emp_info
                                    ?.name_address_employer_1
                                }
                              </td>
                              <td>
                                {
                                  data.employmentApplication.past_emp_info
                                    ?.phone_number_1
                                }
                              </td>
                              <td>
                                {
                                  data.employmentApplication.past_emp_info
                                    ?.job_1
                                }
                              </td>
                              <td>
                                $
                                {
                                  data.employmentApplication.past_emp_info
                                    ?.salary_1
                                }
                              </td>
                              <td>
                                {
                                  data.employmentApplication.past_emp_info
                                    ?.reason_leaving_1
                                }
                              </td>
                            </tr>
                            {data.employmentApplication.past_emp_info
                              ?.from_date_2 && (
                              <tr>
                                <td>
                                  {formatDate(
                                    data.employmentApplication.past_emp_info
                                      ?.from_date_2
                                  )}
                                </td>
                                <td>
                                  {formatDate(
                                    data.employmentApplication.past_emp_info
                                      ?.to_date_2
                                  )}
                                </td>
                                <td>
                                  {
                                    data.employmentApplication.past_emp_info
                                      ?.name_address_employer_2
                                  }
                                </td>
                                <td>
                                  {
                                    data.employmentApplication.past_emp_info
                                      ?.phone_number_2
                                  }
                                </td>
                                <td>
                                  {
                                    data.employmentApplication.past_emp_info
                                      ?.job_2
                                  }
                                </td>
                                <td>
                                  $
                                  {
                                    data.employmentApplication.past_emp_info
                                      ?.salary_2
                                  }
                                </td>
                                <td>
                                  {
                                    data.employmentApplication.past_emp_info
                                      ?.reason_leaving_2
                                  }
                                </td>
                              </tr>
                            )}
                            {data.employmentApplication.past_emp_info
                              ?.from_date_3 && (
                              <tr>
                                <td>
                                  {formatDate(
                                    data.employmentApplication.past_emp_info
                                      ?.from_date_3
                                  )}
                                </td>
                                <td>
                                  {formatDate(
                                    data.employmentApplication.past_emp_info
                                      ?.to_date_3
                                  )}
                                </td>
                                <td>
                                  {
                                    data.employmentApplication.past_emp_info
                                      ?.name_address_employer_3
                                  }
                                </td>
                                <td>
                                  {
                                    data.employmentApplication.past_emp_info
                                      ?.phone_number_3
                                  }
                                </td>
                                <td>
                                  {
                                    data.employmentApplication.past_emp_info
                                      ?.job_3
                                  }
                                </td>
                                <td>
                                  $
                                  {
                                    data.employmentApplication.past_emp_info
                                      ?.salary_3
                                  }
                                </td>
                                <td>
                                  {
                                    data.employmentApplication.past_emp_info
                                      ?.reason_leaving_3
                                  }
                                </td>
                              </tr>
                            )}
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
                              <td>
                                {
                                  data.employmentApplication.reference
                                    ?.reference_name_1
                                }
                              </td>
                              <td>
                                {
                                  data.employmentApplication.reference
                                    ?.reference_address_1
                                }
                              </td>
                              <td>
                                {
                                  data.employmentApplication.reference
                                    ?.reference_phone_1
                                }
                              </td>
                              <td>
                                {
                                  data.employmentApplication.reference
                                    ?.reference_years_acquainted_1
                                }
                              </td>
                            </tr>
                            <tr>
                              <td>
                                {
                                  data.employmentApplication.reference
                                    ?.reference_name_2
                                }
                              </td>
                              <td>
                                {
                                  data.employmentApplication.reference
                                    ?.reference_address_2
                                }
                              </td>
                              <td>
                                {
                                  data.employmentApplication.reference
                                    ?.reference_phone_2
                                }
                              </td>
                              <td>
                                {
                                  data.employmentApplication.reference
                                    ?.reference_years_acquainted_2
                                }
                              </td>
                            </tr>
                            <tr>
                              <td>
                                {
                                  data.employmentApplication.reference
                                    ?.reference_name_3
                                }
                              </td>
                              <td>
                                {
                                  data.employmentApplication.reference
                                    ?.reference_address_3
                                }
                              </td>
                              <td>
                                {
                                  data.employmentApplication.reference
                                    ?.reference_phone_3
                                }
                              </td>
                              <td>
                                {
                                  data.employmentApplication.reference
                                    ?.reference_years_acquainted_3
                                }
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </section>

                      {/* Languages */}
                      <section className="mt-20">
                        <h5 className="mb-3">Languages</h5>
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Language</th>
                              <th>Read and Write</th>
                              <th>Read and Speak</th>
                              <th>Speak Only</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                {
                                  data.employmentApplication.language
                                    ?.language_1
                                }
                              </td>
                              <td>
                                {
                                  data.employmentApplication.language
                                    ?.read_write_1
                                }
                              </td>
                              <td>
                                {
                                  data.employmentApplication.language
                                    ?.read_speak_1
                                }
                              </td>
                              <td>
                                {
                                  data.employmentApplication.language
                                    ?.speak_only_1
                                }
                              </td>
                            </tr>

                            {data?.language?.language_2 && (
                              <tr>
                                <td>
                                  {
                                    data.employmentApplication.language
                                      ?.language_2
                                  }
                                </td>
                                <td>
                                  {
                                    data.employmentApplication.language
                                      ?.read_write_2
                                  }
                                </td>
                                <td>
                                  {
                                    data.employmentApplication.language
                                      ?.read_speak_2
                                  }
                                </td>
                                <td>
                                  {
                                    data.employmentApplication.language
                                      ?.speak_only_2
                                  }
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </section>

                      {/* Emergency Address */}
                      <section className="mt-20">
                        <h5 className="mb-3">Emergency Address</h5>
                        <div className="col-md-20">
                          <p>
                            {`${data.employmentApplication.emergency_address.emergency_address}, ${data.employmentApplication.emergency_address.emergency_city}, ${data.employmentApplication.emergency_address.emergency_city}, ${data.employmentApplication.emergency_address.emergency_state}, ${data.employmentApplication.emergency_address.emergency_zip}`}
                          </p>
                        </div>
                      </section>

                      {/* Signature */}
                      <section className="mt-50">
                        <h5 className="mb-3">Acknowledgement</h5>

                        <div className="row">
                          <div className="col-md-6">
                            <p>Signature:</p>
                            {data.employmentApplication.signature?.signature ? (
                              <img
                                src={`${apiBase}/storage/signature/${data.employmentApplication.signature.signature}`}
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
                            <p>
                              Date Signed:{" "}
                              {formatDate(
                                data.employmentApplication.signature?.created_at
                              )}
                            </p>
                          </div>
                        </div>
                      </section>
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
    </>
  );
}
