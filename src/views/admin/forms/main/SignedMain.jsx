import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MyHeader from "../../../../components/MyHeader";
import Sidebar from "../../../../components/Sidebar";
import Nav from "../../single_user/Nav";
import { Link } from "react-router-dom";
import { formatDate } from "../../../../utils/DateFormatter";
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
        }
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
  }, [username, apiBase]);

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
                  <div className="card">
                    
                    {/* MS Word Style Container */}
                    <div id="printArea" className="card-body p-0 bg-secondary-light">
                      <div className="word-doc">
                        
                        {/* Header */}
                        <div style={{ textAlign: "center", marginBottom: "40px" }}>
                          <img
                            src="/assets/images/main_logo.png"
                            width={150}
                            alt="Company Logo"
                            style={{ marginBottom: "20px" }}
                          />
                          <h5 style={{ fontSize: "14pt", margin: "0 0 10px 0", fontWeight: "bold" }}>
                            1st Access Home Care Incorporated
                          </h5>
                          <p style={{ margin: "5px 0", fontSize: "12pt" }}>
                            6600 Fieldtan Trail, Moseley, VA, 23120<br />
                            Agency Phone: (+1) 804-818-3216
                          </p>
                          <h4 style={{ fontSize: "14pt", margin: "20px 0", fontWeight: "bold" }}>
                            Application For Employment
                          </h4>
                        </div>

                        {errors.general && (
                          <div className="alert alert-danger">{errors.general}</div>
                        )}

                        {/* Personal Info */}
                        <section style={{ marginBottom: "30px" }}>
                          <h5 style={{ fontSize: "12pt", fontWeight: "bold", borderBottom: "1px solid #000", paddingBottom: "5px", marginBottom: "15px" }}>
                            Personal Information
                          </h5>
                          <div className="row" style={{ marginBottom: "10px" }}>
                            <div className="col-md-6">
                              <p style={{ margin: 0 }}><strong>Name:</strong> {fullname ?? "N/A"}</p>
                              <p style={{ margin: 0 }}><strong>Email:</strong> {data?.email || "N/A"}</p>
                              <p style={{ margin: 0 }}><strong>Phone:</strong> {data?.profile?.phone || "N/A"}</p>
                            </div>
                            <div className="col-md-6">
                              <p style={{ margin: 0 }}><strong>Employee Hire Date:</strong> {formatDate(data?.employee_hire_date)}</p>
                              <p style={{ margin: 0 }}>
                                <strong>Present Address:</strong>{" "}
                                {`${data?.present_address?.present_address || ""} ${data?.present_address?.present_city || ""} ${data?.present_address?.present_state || ""} ${data?.present_address?.present_zip || ""}`}
                              </p>
                              <p style={{ margin: 0 }}>
                                <strong>Permanent Address:</strong>{" "}
                                {`${data?.permanent_address?.permanent_address || ""} ${data?.permanent_address?.permanent_city || ""} ${data?.permanent_address?.permanent_state || ""} ${data?.permanent_address?.permanent_zip || ""}`}
                              </p>
                            </div>
                          </div>
                        </section>

                        {/* Employment Details */}
                        <section style={{ marginBottom: "30px" }}>
                          <h5 style={{ fontSize: "12pt", fontWeight: "bold", borderBottom: "1px solid #000", paddingBottom: "5px", marginBottom: "15px" }}>
                            Employment Details
                          </h5>
                          <div className="row">
                            <div className="col-md-6">
                              <p style={{ margin: "0 0 8px 0" }}><strong>Are you 18 and older:</strong> {data?.furnish_work || "N/A"}</p>
                              <p style={{ margin: "0 0 8px 0" }}><strong>Employment Desired:</strong> {data?.employment_desired || "N/A"}</p>
                              <p style={{ margin: "0 0 8px 0" }}><strong>Date You Can Start:</strong> {formatDate(data?.date_start)}</p>
                              <p style={{ margin: "0 0 8px 0" }}><strong>Position:</strong> {data?.position || "N/A"}</p>
                              <p style={{ margin: "0 0 8px 0" }}><strong>Salary:</strong> {data?.salary || "N/A"}</p>
                            </div>
                            <div className="col-md-6">
                              <p style={{ margin: "0 0 8px 0" }}><strong>Are You Employed Now:</strong> {data?.employed_now || "N/A"}</p>
                              {data?.employed_now && (
                                <p style={{ margin: "0 0 8px 0" }}><strong>If So May We Inquire Your Present Employer?:</strong> {data?.inqure_present_employer || "N/A"}</p>
                              )}
                              <p style={{ margin: "0 0 8px 0" }}><strong>Ever Applied For This Company Before?:</strong> {data?.applied_before || "N/A"}</p>
                              {data?.applied_before === "Yes" && (
                                <>
                                  <p style={{ margin: "0 0 8px 0" }}><strong>Where?:</strong> {data?.where || "N/A"}</p>
                                  <p style={{ margin: "0 0 8px 0" }}><strong>When?:</strong> {data?.when || "N/A"}</p>
                                </>
                              )}
                            </div>
                            <div className="col-md-12 mt-2">
                              <p style={{ margin: "0 0 8px 0" }}><strong>Are You On Layoff And Subject To Recall?:</strong> {data?.on_layoff_subject_to_recall || "N/A"}</p>
                              <p style={{ margin: "0 0 8px 0" }}><strong>Will You Travel If Required?:</strong> {data?.travel_if_required || "N/A"}</p>
                              <p style={{ margin: "0 0 8px 0" }}><strong>Will You Relocate If The Job Requires It?:</strong> {data?.relocate_if_required || "N/A"}</p>
                              <p style={{ margin: "0 0 8px 0" }}><strong>Will You Work Overtime if Required:</strong> {data?.overtime_if_required || "N/A"}</p>
                              <p style={{ margin: "0 0 8px 0" }}><strong>Are you able to meet the attendance requirements of this position?:</strong> {data?.attendance_requirements_position || "N/A"}</p>
                              <p style={{ margin: "0 0 8px 0" }}><strong>Have you ever been Bonded?:</strong> {data?.bonded || "N/A"}</p>
                              <p style={{ margin: "0 0 8px 0" }}><strong>Have you ever been convicted of a felony in the past 7years?:</strong> {data?.convicted || "N/A"}</p>
                              {data?.convicted === "Yes" && (
                                <p style={{ margin: "0 0 8px 0" }}><strong>Such conviction may be relevant if job related, but does not bar you from employment. If yes - explain:</strong> {data?.explain_convicted || "N/A"}</p>
                              )}
                              <div className="row mt-2">
                                <div className="col-md-6">
                                  <p style={{ margin: 0 }}><strong>Driver's License Number:</strong> {data?.drivers_license || "N/A"}</p>
                                </div>
                                <div className="col-md-6">
                                  <p style={{ margin: 0 }}><strong>State:</strong> {data?.drivers_license_state || "N/A"}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>

                        {/* Education */}
                        <section style={{ marginBottom: "30px" }}>
                          <h5 style={{ fontSize: "12pt", fontWeight: "bold", borderBottom: "1px solid #000", paddingBottom: "5px", marginBottom: "15px" }}>
                            Education
                          </h5>
                          <table className="word-table">
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
                                <td>{data?.academic?.edu_current_name_location_school || "-"}</td>
                                <td>{data?.academic?.edu_current_number_years || "-"}</td>
                                <td>{data?.academic?.edu_current_did_graduate || "-"}</td>
                                <td>{data?.academic?.edu_current_subjects_studied || "-"}</td>
                              </tr>
                              <tr>
                                <td>Last Academic</td>
                                <td>{data?.academic?.edu_last_name_location_school || "-"}</td>
                                <td>{data?.academic?.edu_last_number_years || "-"}</td>
                                <td>{data?.academic?.edu_last_did_graduate || "-"}</td>
                                <td>{data?.academic?.edu_last_subjects_studied || "-"}</td>
                              </tr>
                              <tr>
                                <td>Current Trades</td>
                                <td>{data?.academic?.trades_current_name_location_school || "-"}</td>
                                <td>{data?.academic?.trades_current_number_years || "-"}</td>
                                <td>{data?.academic?.trades_current_did_graduate || "-"}</td>
                                <td>{data?.academic?.trades_current_subjects_studied || "-"}</td>
                              </tr>
                              <tr>
                                <td>Last Trades</td>
                                <td>{data?.academic?.trades_last_current_name_location_school || "-"}</td>
                                <td>{data?.academic?.trades_last_current_number_years || "-"}</td>
                                <td>{data?.academic?.trades_last_current_did_graduate || "-"}</td>
                                <td>{data?.academic?.trades_last_subjects_studied || "-"}</td>
                              </tr>
                            </tbody>
                          </table>
                        </section>

                        <section style={{ marginBottom: "30px" }}>
                          <p>
                            <strong>Summarize special skills and qualifications required from employment or other experiences that may qualify you to work with this company:</strong>
                            <br />
                            {data?.special_skills_qualifications || "N/A"}
                          </p>
                        </section>

                        {/* Past Employment Info */}
                        <section style={{ marginBottom: "30px" }}>
                          <h5 style={{ fontSize: "12pt", fontWeight: "bold", borderBottom: "1px solid #000", paddingBottom: "5px", marginBottom: "15px" }}>
                            Past Employment Info
                          </h5>
                          <table className="word-table">
                            <thead>
                              <tr>
                                <th>From</th>
                                <th>To</th>
                                <th>Name and Address of Employer</th>
                                <th>Phone</th>
                                <th>Salary</th>
                                <th>Job</th>
                                <th>Reason for Leaving</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{formatDate(data?.past_emp_info?.from_date_1)}</td>
                                <td>{formatDate(data?.past_emp_info?.to_date_1)}</td>
                                <td>{data?.past_emp_info?.name_address_employer_1 || "-"}</td>
                                <td>{data?.past_emp_info?.phone_number_1 || "-"}</td>
                                <td>{data?.past_emp_info?.salary_1 ? `$${data.past_emp_info.salary_1}` : "-"}</td>
                                <td>{data?.past_emp_info?.job_1 || "-"}</td>
                                <td>{data?.past_emp_info?.reason_leaving_1 || "-"}</td>
                              </tr>
                              {data?.past_emp_info?.from_date_2 && (
                                <tr>
                                  <td>{formatDate(data?.past_emp_info?.from_date_2)}</td>
                                  <td>{formatDate(data?.past_emp_info?.to_date_2)}</td>
                                  <td>{data?.past_emp_info?.name_address_employer_2 || "-"}</td>
                                  <td>{data?.past_emp_info?.phone_number_2 || "-"}</td>
                                  <td>{data?.past_emp_info?.salary_2 ? `$${data.past_emp_info.salary_2}` : "-"}</td>
                                  <td>{data?.past_emp_info?.job_2 || "-"}</td>
                                  <td>{data?.past_emp_info?.reason_leaving_2 || "-"}</td>
                                </tr>
                              )}
                              {data?.past_emp_info?.from_date_3 && (
                                <tr>
                                  <td>{formatDate(data?.past_emp_info?.from_date_3)}</td>
                                  <td>{formatDate(data?.past_emp_info?.to_date_3)}</td>
                                  <td>{data?.past_emp_info?.name_address_employer_3 || "-"}</td>
                                  <td>{data?.past_emp_info?.phone_number_3 || "-"}</td>
                                  <td>{data?.past_emp_info?.salary_3 ? `$${data.past_emp_info.salary_3}` : "-"}</td>
                                  <td>{data?.past_emp_info?.job_3 || "-"}</td>
                                  <td>{data?.past_emp_info?.reason_leaving_3 || "-"}</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </section>

                        {/* References */}
                        <section style={{ marginBottom: "30px" }}>
                          <h5 style={{ fontSize: "12pt", fontWeight: "bold", borderBottom: "1px solid #000", paddingBottom: "5px", marginBottom: "15px" }}>
                            References
                          </h5>
                          <table className="word-table">
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
                                <td>{data?.reference?.reference_name_1 || "-"}</td>
                                <td>{data?.reference?.reference_address_1 || "-"}</td>
                                <td>{data?.reference?.reference_phone_1 || "-"}</td>
                                <td>{data?.reference?.reference_years_acquainted_1 || "-"}</td>
                              </tr>
                              <tr>
                                <td>{data?.reference?.reference_name_2 || "-"}</td>
                                <td>{data?.reference?.reference_address_2 || "-"}</td>
                                <td>{data?.reference?.reference_phone_2 || "-"}</td>
                                <td>{data?.reference?.reference_years_acquainted_2 || "-"}</td>
                              </tr>
                              <tr>
                                <td>{data?.reference?.reference_name_3 || "-"}</td>
                                <td>{data?.reference?.reference_address_3 || "-"}</td>
                                <td>{data?.reference?.reference_phone_3 || "-"}</td>
                                <td>{data?.reference?.reference_years_acquainted_3 || "-"}</td>
                              </tr>
                            </tbody>
                          </table>
                        </section>

                        {/* Languages */}
                        <section style={{ marginBottom: "30px" }}>
                          <h5 style={{ fontSize: "12pt", fontWeight: "bold", borderBottom: "1px solid #000", paddingBottom: "5px", marginBottom: "15px" }}>
                            Languages
                          </h5>
                          <table className="word-table">
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
                                <td>{data?.language?.language_1 || "-"}</td>
                                <td>{data?.language?.read_write_1 || "-"}</td>
                                <td>{data?.language?.read_speak_1 || "-"}</td>
                                <td>{data?.language?.speak_only_1 || "-"}</td>
                              </tr>
                              {data?.language?.language_2 && (
                                <tr>
                                  <td>{data?.language?.language_2}</td>
                                  <td>{data?.language?.read_write_2 || "-"}</td>
                                  <td>{data?.language?.read_speak_2 || "-"}</td>
                                  <td>{data?.language?.speak_only_2 || "-"}</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </section>

                        {/* Emergency Address */}
                        <section style={{ marginBottom: "30px" }}>
                          <h5 style={{ fontSize: "12pt", fontWeight: "bold", borderBottom: "1px solid #000", paddingBottom: "5px", marginBottom: "15px" }}>
                            Emergency Address
                          </h5>
                          <p>
                            {`${data?.emergency_address?.emergency_address || ""}, ${data?.emergency_address?.emergency_city || ""}, ${data?.emergency_address?.emergency_state || ""} ${data?.emergency_address?.emergency_zip || ""}`}
                          </p>
                        </section>

                        {/* Signature Block */}
                        <div style={{ marginTop: "60px", pageBreakInside: "avoid" }}>
                          <h5 style={{ fontSize: "12pt", fontWeight: "bold", marginBottom: "15px" }}>
                            Acknowledgement
                          </h5>
                          <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <tbody>
                              <tr>
                                <td style={{ width: "50%", paddingBottom: "40px", verticalAlign: "bottom" }}>
                                  <p style={{ margin: 0 }}>Employee Name:</p>
                                  <div style={{ borderBottom: "1px solid #000", paddingBottom: "5px", marginTop: "5px" }}>
                                    <strong>{fullname ?? "N/A"}</strong>
                                  </div>
                                </td>
                                <td style={{ width: "50%", paddingBottom: "40px", paddingLeft: "20px", verticalAlign: "bottom" }}>
                                  <p style={{ margin: 0 }}>Employee Signature:</p>
                                  <div style={{ borderBottom: "1px solid #000", paddingBottom: "5px", marginTop: "5px", height: "40px", display: "flex", alignItems: "flex-end" }}>
                                    {signature ? (
                                      <img
                                        className="signature"
                                        src={`${apiBase}/storage/signature/${signature}`}
                                        alt="Signature"
                                        style={{ maxHeight: "50px", maxWidth: "100%" }}
                                      />
                                    ) : (
                                      <em>No signature provided</em>
                                    )}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td style={{ paddingTop: "20px" }}>
                                  <p style={{ margin: 0 }}>Date:</p>
                                  <div style={{ borderBottom: "1px solid #000", paddingBottom: "5px", marginTop: "5px", display: "inline-block", minWidth: "150px" }}>
                                    <strong>{formatDate(data?.created_at)}</strong>
                                  </div>
                                </td>
                                <td style={{ paddingTop: "20px", paddingLeft: "20px" }}>
                                  <p style={{ margin: 0 }}>Administrator/Designee Signature:</p>
                                  <div style={{ borderBottom: "1px solid #000", paddingBottom: "5px", marginTop: "5px", height: "40px" }}>
                                    &nbsp;
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                      </div>
                    </div>
                    
                    {/* Action Buttons (Outside the Word Document style) */}
                    <div className="card-footer bg-white border-top-0 pt-0 pb-3 px-3">
                      <button
                        onClick={() => exportToWord({ fullname, title })}
                        className="btn btn-primary btn-lg me-2"
                      >
                        Print / Export to Word
                      </button>
                      <Link
                        onClick={() => window.history.back()}
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

      {/* CSS specific to rendering the MS Word Document look */}
      <style jsx="true">{`
        .bg-secondary-light {
          background-color: #f4f4f4; /* Grayish backdrop to highlight the "paper" */
        }
        .word-doc {
          font-family: 'Times New Roman', Times, serif;
          font-size: 12pt;
          line-height: 2.0;
          color: #000;
          background-color: #fff;
          max-width: 850px; /* Simulates A4/Letter width */
          margin: 0 auto;
          padding: 1in; /* Standard Word margins */
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          min-height: 1100px; /* Gives it a paper-like appearance */
        }
        .word-doc h1, .word-doc h2, .word-doc h3, .word-doc h4, .word-doc h5, .word-doc h6 {
          color: #000;
          font-family: 'Times New Roman', Times, serif;
        }
          .word-doc p, .word-doc li, .word-doc td, .word-doc strong, .word-doc u {
          font-family: 'Times New Roman', Times, serif !important;
        }
        .word-doc p {
          text-align: justify;
          margin-bottom: 12px;
        }
        
        /* MS Word Table Styling */
        .word-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          font-size: 11pt; /* Tables are usually slightly smaller */
        }
        .word-table th, .word-table td {
          border: 1px solid #000;
          padding: 8px;
          text-align: left;
          vertical-align: top;
        }
        .word-table th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
        
        @media print {
          body * {
            visibility: hidden;
          }
          .word-doc, .word-doc * {
            visibility: visible;
          }
          .word-doc {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
            box-shadow: none;
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
}