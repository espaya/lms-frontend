import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MyHeader from "../../../../components/MyHeader";
import Sidebar from "../../../../components/Sidebar";
import Nav from "../../single_user/Nav";
import { Link } from "react-router-dom";
import { formatDate } from "../../../../utils/DateFormatter";
import printContent from "../../../../utils/printContent";
import Spinner from "../../../../components/Spinner";
import exportToWord from "../../../../utils/exportToWord";

export default function SignedMainForms() {
  const { username } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;
  const [allForms, setAllForms] = useState({});

  const getApplication = async () => {
    setLoading(true);
    setErrors({});
    try {
      const response = await fetch(
        `${apiBase}/api/admin/dashboard/all-forms/${username}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors({ general: data.message || "Failed to fetch forms." });
        return;
      }

      setAllForms(data);
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApplication();
  }, []);

  const fullname = allForms?.application_form?.profile?.full_name;
  const title = "Application For Employment";
  const data = allForms?.application_form;

  const signature = data?.signature?.signature;

  return (
    <>
      <title>Application For Employment - 1staccess Home Care</title>
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
                              <strong>Name:</strong> {fullname ?? "N/A"}
                            </p>
                            <p>
                              <strong>Email:</strong> {data?.email}
                            </p>
                            <p>
                              <strong>Phone:</strong> {data?.profile?.phone}
                            </p>
                            <p>
                              <strong>Present Address: </strong>
                              {`${data?.present_address?.present_address}  ${data?.present_address?.present_city} ${data?.present_address?.present_state} ${data?.present_address?.present_zip}`}
                            </p>
                            <p>
                              <strong>Permanent Address: </strong>
                              {`${data?.permanent_address?.permanent_address}  ${data?.permanent_address?.permanent_city} ${data?.permanent_address?.permanent_state} ${data?.permanent_address?.permanent_zip}`}
                            </p>
                            <p>
                              <strong>Employee Hire Date: </strong>
                              {formatDate(data?.employee_hire_date)}
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
                              {data?.furnish_work}
                            </p>
                          </div>
                          <div className="col-md-12">
                            <p>
                              <strong>Employment Desired: </strong>
                              {data?.employment_desired}
                            </p>
                          </div>

                          <div className="col-md-12">
                            <p>
                              <strong>Date You Can Start: </strong>
                              {formatDate(data?.date_start)}
                            </p>
                          </div>
                          <div className="col-md-12">
                            <p>
                              <strong>Position: </strong>
                              {data?.position}
                            </p>
                          </div>

                          <div className="col-md-12">
                            <p>
                              <strong>Salary: </strong>
                              {data?.salary}
                            </p>
                          </div>
                          <div className="col-md-12">
                            <p>
                              <strong>Are You Employed Now: </strong>
                              {data?.employed_now}
                            </p>
                          </div>

                          {data?.employed_now && (
                            <div className="col-md-12">
                              <p>
                                <strong>
                                  If So May We Inquire Your Present
                                  Employer?:{" "}
                                </strong>
                                {data?.inqure_present_employer}
                              </p>
                            </div>
                          )}

                          <div className="col-md-12">
                            <p>
                              <strong>
                                Ever Applied For This Company Before?:{" "}
                              </strong>
                              {data?.applied_before}
                            </p>
                          </div>

                          <div className="col-md-12">
                            {data?.applied_before == "Yes" && (
                              <>
                                <p>
                                  <strong>Where?: </strong>
                                  {data?.where}
                                </p>
                                <p>
                                  <strong>When?: </strong>
                                  {data?.when}
                                </p>
                              </>
                            )}
                          </div>

                          <div className="col-md-12">
                            <p>
                              <strong>
                                Are You On Layoff And Subject To Recall?:{" "}
                              </strong>
                              {data?.on_layoff_subject_to_recall}
                            </p>
                          </div>
                          <div className="col-md-12">
                            <p>
                              <strong>Will You Travel If Required?: </strong>
                              {data?.travel_if_required}
                            </p>
                          </div>

                          <div className="col-md-12">
                            <p>
                              <strong>
                                Will You Relocate If The Job Requires It?:{" "}
                              </strong>
                              {data?.relocate_if_required}
                            </p>
                          </div>

                          <div className="col-md-12">
                            <p>
                              <strong>
                                Will You Work Overtime if Required:{" "}
                              </strong>
                              {data?.overtime_if_required}
                            </p>
                          </div>

                          <div className="col-md-12">
                            <p>
                              <strong>
                                Are you able to meet the attendance requirements
                                of this position?:{" "}
                              </strong>
                              {data?.attendance_requirements_position}
                            </p>
                          </div>

                          <div className="col-md-12">
                            <p>
                              <strong>Have you ever been Bonded?: </strong>
                              {data?.bonded}
                            </p>
                          </div>

                          <div className="col-md-12">
                            <p>
                              <strong>
                                Have you ever been convicted of a felony in the
                                past 7years?:{" "}
                              </strong>
                              {data?.convicted}
                            </p>
                          </div>

                          {data?.convicted === "Yes" && (
                            <div className="col-md-6">
                              <p>
                                <strong>
                                  Such conviction may be relevant if job
                                  related, but does not bar you from employment.
                                  If yes - explain:
                                </strong>
                                {data?.explain_convicted}
                              </p>
                            </div>
                          )}

                          <div className="col-md-6">
                            <p>
                              <strong>Driver's License Number: </strong>
                              {data?.drivers_license}
                            </p>
                          </div>

                          <div className="col-md-6">
                            <p>
                              <strong>State: </strong>
                              {data?.drivers_license_state}
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
                                {
                                  data?.academic
                                    ?.edu_current_name_location_school
                                }
                              </td>
                              <td>
                                {data?.academic?.edu_current_number_years}
                              </td>
                              <td>
                                {data?.academic?.edu_current_did_graduate}
                              </td>
                              <td>
                                {data?.academic?.edu_current_subjects_studied}
                              </td>
                            </tr>
                            <tr>
                              <td>Last Academic</td>
                              <td>
                                {data?.academic?.edu_last_name_location_school}
                              </td>
                              <td>{data?.academic?.edu_last_number_years}</td>
                              <td>{data?.academic?.edu_last_did_graduate}</td>
                              <td>
                                {data?.academic?.edu_last_subjects_studied}
                              </td>
                            </tr>
                            <tr>
                              <td>Current Trades</td>
                              <td>
                                {
                                  data?.academic
                                    ?.trades_current_name_location_school
                                }
                              </td>
                              <td>
                                {data?.academic?.trades_current_number_years}
                              </td>
                              <td>
                                {data?.academic?.trades_current_did_graduate}
                              </td>
                              <td>
                                {
                                  data?.academic
                                    ?.trades_current_subjects_studied
                                }
                              </td>
                            </tr>
                            <tr>
                              <td>Last Trades</td>
                              <td>
                                {
                                  data?.academic
                                    ?.trades_last_current_name_location_school
                                }
                              </td>
                              <td>
                                {
                                  data?.academic
                                    ?.trades_last_current_number_years
                                }
                              </td>
                              <td>
                                {
                                  data?.academic
                                    ?.trades_last_current_did_graduate
                                }
                              </td>
                              <td>
                                {data?.academic?.trades_last_subjects_studied}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </section>

                      <section className="mt-20">
                        <div className="col-md-12">
                          Summarize special skills and qualifications required
                          from employment or other experiences that may qualify
                          you to work with this company:{" "}
                          <b> {data?.special_skills_qualifications} </b>{" "}
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
                                {formatDate(data?.past_emp_info?.from_date_1)}
                              </td>
                              <td>
                                {formatDate(data?.past_emp_info?.to_date_1)}
                              </td>
                              <td>
                                {data?.past_emp_info?.name_address_employer_1}
                              </td>
                              <td>{data?.past_emp_info?.phone_number_1}</td>
                              <td>{data?.past_emp_info?.job_1}</td>
                              <td>${data?.past_emp_info?.salary_1}</td>
                              <td>{data?.past_emp_info?.reason_leaving_1}</td>
                            </tr>
                            {data?.past_emp_info?.from_date_2 && (
                              <tr>
                                <td>
                                  {formatDate(data?.past_emp_info?.from_date_2)}
                                </td>
                                <td>
                                  {formatDate(data?.past_emp_info?.to_date_2)}
                                </td>
                                <td>
                                  {data?.past_emp_info?.name_address_employer_2}
                                </td>
                                <td>{data?.past_emp_info?.phone_number_2}</td>
                                <td>{data?.past_emp_info?.job_2}</td>
                                <td>${data?.past_emp_info?.salary_2}</td>
                                <td>{data?.past_emp_info?.reason_leaving_2}</td>
                              </tr>
                            )}
                            {data?.past_emp_info?.from_date_3 && (
                              <tr>
                                <td>
                                  {formatDate(data?.past_emp_info?.from_date_3)}
                                </td>
                                <td>
                                  {formatDate(data?.past_emp_info?.to_date_3)}
                                </td>
                                <td>
                                  {data?.past_emp_info?.name_address_employer_3}
                                </td>
                                <td>{data?.past_emp_info?.phone_number_3}</td>
                                <td>{data?.past_emp_info?.job_3}</td>
                                <td>${data?.past_emp_info?.salary_3}</td>
                                <td>{data?.past_emp_info?.reason_leaving_3}</td>
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
                              <td>{data?.reference?.reference_name_1}</td>
                              <td>{data?.reference?.reference_address_1}</td>
                              <td>{data?.reference?.reference_phone_1}</td>
                              <td>
                                {data?.reference?.reference_years_acquainted_1}
                              </td>
                            </tr>
                            <tr>
                              <td>{data?.reference?.reference_name_2}</td>
                              <td>{data?.reference?.reference_address_2}</td>
                              <td>{data?.reference?.reference_phone_2}</td>
                              <td>
                                {data?.reference?.reference_years_acquainted_2}
                              </td>
                            </tr>
                            <tr>
                              <td>{data?.reference?.reference_name_3}</td>
                              <td>{data?.reference?.reference_address_3}</td>
                              <td>{data?.reference?.reference_phone_3}</td>
                              <td>
                                {data?.reference?.reference_years_acquainted_3}
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
                              <td>{data?.language?.language_1}</td>
                              <td>{data?.language?.read_write_1}</td>
                              <td>{data?.language?.read_speak_1}</td>
                              <td>{data?.language?.speak_only_1}</td>
                            </tr>

                            {data?.language?.language_2 && (
                              <tr>
                                <td>{data?.language?.language_2}</td>
                                <td>{data?.language?.read_write_2}</td>
                                <td>{data?.language?.read_speak_2}</td>
                                <td>{data?.language?.speak_only_2}</td>
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
                            {`${data?.emergency_address?.emergency_address}, ${data?.emergency_address?.emergency_city}, ${data?.emergency_address?.emergency_city}, ${data?.emergency_address?.emergency_state}, ${data?.emergency_address?.emergency_zip}`}
                          </p>
                        </div>
                      </section>

                      {/* Signature */}
                      <section className="mt-50">
                        <h5 className="mb-3">Acknowledgement</h5>

                        <div id="signature-wrapper" className="no-break">
                          <div id="signature-row" className="row">
                            {/* Normal layout for screen */}
                            <div className="col-md-6 d-print-none">
                              <p>Signature:</p>
                              {signature ? (
                                <img
                                  className="signature"
                                  src={`${apiBase}/storage/signature/${signature}`}
                                  alt="Signature"
                                  style={{ width: "150px" }}
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
                            {/* <div
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
                                    {signature ? (
                                      <img
                                        src={`${apiBase}/storage/signature/${signature}`}
                                        alt="Signature"
                                        style={{ width: "100px" }}
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
                            </div> */}
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                  <div className="col-md-3 mt-20">
                    <button
                      onClick={() => exportToWord({ fullname, title })}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
