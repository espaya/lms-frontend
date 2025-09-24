import { useState, useEffect, useRef } from "react";
import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import Cookies from "js-cookie";
import SignatureCanvas from "react-signature-canvas";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";
import Swal from "sweetalert2";

export default function ApplicationForms() {
  const [formData, setFormData] = useState({
    employee_hire_date: "",
    full_name: "",
    SSN: "",
    present_address: "",
    present_city: "",
    present_state: "",
    present_zip: "",
    present_permanent_address: "",
    permanent_address: "",
    permanent_city: "",
    permanent_state: "",
    permanent_zip: "",
    phone: "",
    furnish_work: "",
    employment_desired: "",
    position: "",
    date_start: "",
    salary: "",
    employed_now: "",
    inqure_present_employer: "",
    applied_before: "",
    where: "",
    when: "",
    on_layoff_subject_to_recall: "",
    travel_if_required: "",
    relocate_if_required: "",
    overtime_if_required: "",
    attendance_requirements_position: "",
    bonded: "",
    convicted: "",
    explain_convicted: "",
    drivers_license: "",
    drivers_license_state: "",
    edu_current_name_location_school: "",
    edu_current_number_years: "",
    edu_current_did_graduate: "",
    edu_current_subjects_studied: "",
    edu_last_name_location_school: "",
    edu_last_number_years: "",
    edu_last_did_graduate: "",
    edu_last_subjects_studied: "",
    trades_current_name_location_school: "",
    trades_current_number_years: "",
    trades_current_did_graduate: "",
    trades_current_subjects_studied: "",
    trades_last_current_name_location_school: "",
    trades_last_current_number_years: "",
    trades_last_current_did_graduate: "",
    trades_last_subjects_studied: "",
    special_skills_qualifications: "",

    from_date_1: "",
    to_date_1: "",
    name_address_employer_1: "",
    phone_number_1: "",
    salary_1: "",
    job_1: "",
    reason_leaving_1: "",

    from_date_2: "",
    to_date_2: "",
    name_address_employer_2: "",
    phone_number_2: "",
    job_2: "",
    salary_2: "",
    reason_leaving_2: "",

    from_date_3: "",
    to_date_3: "",
    name_address_employer_3: "",
    phone_number_3: "",
    job_3: "",
    salary_3: "",
    reason_leaving_3: "",

    reference_name_1: "",
    reference_address_1: "",
    reference_phone_1: "",
    reference_years_acquainted_1: "",

    reference_name_2: "",
    reference_address_2: "",
    reference_phone_2: "",
    reference_years_acquainted_2: "",

    reference_name_3: "",
    reference_address_3: "",
    reference_phone_3: "",
    reference_years_acquainted_3: "",

    language_1: "",
    read_write_1: "",
    read_speak_1: "",
    speak_only_1: "",

    language_2: "",
    read_write_2: "",
    read_speak_2: "",
    speak_only_2: "",

    emergency_address: "",
    emergency_city: "",
    emergency_state: "",
    emergency_zip: "",
    signature: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const sigCanvas = useRef({});
  const apiBase = import.meta.env.VITE_API_URL;

  const clearSignature = () => {
    sigCanvas.current.clear();
    setFormData((prev) => ({
      ...prev,
      signature: "",
    }));
  };

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Capture signature
    if (sigCanvas.current.isEmpty()) {
      setErrors({ general: "Signature is required" });
      setLoading(false);
      return;
    }

    const signatureData = sigCanvas.current
      // .getTrimmedCanvas()
      .toDataURL("image/png");
    setFormData((prev) => ({
      ...prev,
      signature: signatureData,
    }));

    try {
      const response = await fetch(`${apiBase}/api/user/application-forms`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ ...formData, signature: signatureData }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || { general: data.message });

        Swal.fire({
          icon: "error",
          title: "An error occurred",
          text: "There are errors in the form. Fill all required fields",
          showCloseButton: true,
        });

        return;
      }

      setSuccessMsg(data.message);
      setCurrentStep(7); // Success step
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Progress steps
  const steps = [
    "Personal Information",
    "Employment Details",
    "Education & Skills",
    "Work History",
    "References & Languages",
    "Agreement & Signature",
    "Success",
  ];

  return (
    <>
      <title>Application Form - 1staccess Home Care</title>

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
                      <p className="mb-2"> Fill all the required(*) fields</p>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="breadcrumbs">
                      <Link to={{ pathname: PATHS.USER_DASHBOARD }}>Home</Link>
                      <span>
                        <i className="ri-arrow-right-s-line"></i>
                      </span>
                      <Link to={{ pathname: PATHS.USER_FORMS }}>Forms</Link>
                      <span>
                        <i className="ri-arrow-right-s-line"></i>
                      </span>
                      <Link to={{ pathname: PATHS.USER_APPLICATION_FORM }}>
                        Application Form
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="row mb-4">
                <div className="col-md-12">
                  <div className="progress-container">
                    <div className="progress-steps">
                      {steps.map((step, index) => (
                        <div
                          key={index}
                          className={`progress-step ${
                            currentStep > index + 1 ? "completed" : ""
                          } ${currentStep === index + 1 ? "active" : ""}`}
                        >
                          <div className="step-number">{index + 1}</div>
                          <div className="step-label">{step}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {errors.general && (
                <p className="alert alert-danger">{errors.general}</p>
              )}

              {successMsg && (
                <p className="alert alert-success"> {successMsg} </p>
              )}

              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <form onSubmit={handleFormSubmit} method="POST">
                        {/* Step 1: Personal Information */}
                        {currentStep === 1 && (
                          <div className="step-content">
                            <h4 className="step-title">Personal Information</h4>
                            <div className="row">
                              <div className="col-md-4 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Employee Hire Date
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="employee_hire_date"
                                      value={formData.employee_hire_date || ""}
                                      type="date"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.employee_hire_date && (
                                    <small className="text-danger mt-20">
                                      {errors.employee_hire_date[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-4 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Full Name
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="full_name"
                                      value={formData.full_name || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.full_name && (
                                    <small className="text-danger mt-20">
                                      {errors.full_name[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-4 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Social Security #
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="SSN"
                                      value={formData.SSN || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.SSN && (
                                    <small className="text-danger mt-20">
                                      {errors.SSN[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-4 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Present Address
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="present_address"
                                      value={formData.present_address || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.present_address && (
                                    <small className="text-danger mt-20">
                                      {errors.present_address[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">City</label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="present_city"
                                      value={formData.present_city || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.present_city && (
                                    <small className="text-danger mt-20">
                                      {errors.present_city[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">State</label>
                                  <div className="form-control-wrap">
                                    <select
                                      name="present_state"
                                      className="form-select"
                                      value={formData.present_state || ""}
                                      onChange={handleOnChange}
                                    >
                                      <option value="">Choose...</option>
                                      <option value="AK">AK</option>
                                      <option value="AL">AL</option>
                                      <option value="AR">AR</option>
                                      <option value="AZ">AZ</option>
                                      <option value="CA">CA</option>
                                      <option value="CO">CO</option>
                                      <option value="CT">CT</option>
                                      <option value="DC">DC</option>
                                      <option value="DE">DE</option>
                                      <option value="FL">FL</option>
                                      <option value="GA">GA</option>
                                      <option value="HI">HI</option>
                                      <option value="IA">IA</option>
                                      <option value="ID">ID</option>
                                      <option value="IL">IL</option>
                                      <option value="IN">IN</option>
                                      <option value="KS">KS</option>
                                      <option value="KY">KY</option>
                                      <option value="LA">LA</option>
                                      <option value="MA">MA</option>
                                      <option value="MD">MD</option>
                                      <option value="ME">ME</option>
                                      <option value="MI">MI</option>
                                      <option value="MN">MN</option>
                                      <option value="MO">MO</option>
                                      <option value="MS">MS</option>
                                      <option value="MT">MT</option>
                                      <option value="NC">NC</option>
                                      <option value="ND">ND</option>
                                      <option value="NE">NE</option>
                                      <option value="NH">NH</option>
                                      <option value="NJ">NJ</option>
                                      <option value="NM">NM</option>
                                      <option value="NV">NV</option>
                                      <option value="NY">NY</option>
                                      <option value="OH">OH</option>
                                      <option value="OK">OK</option>
                                      <option value="OR">OR</option>
                                      <option value="PA">PA</option>
                                      <option value="RI">RI</option>
                                      <option value="SC">SC</option>
                                      <option value="SD">SD</option>
                                      <option value="TN">TN</option>
                                      <option value="TX">TX</option>
                                      <option value="UT">UT</option>
                                      <option value="VA">VA</option>
                                      <option value="VT">VT</option>
                                      <option value="WA">WA</option>
                                      <option value="WI">WI</option>
                                      <option value="WV">WV</option>
                                      <option value="WY">WY</option>
                                    </select>
                                  </div>
                                  {errors.present_state && (
                                    <small className="text-danger mt-20">
                                      {errors.present_state[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-2 mt-20">
                                <div className="form-group">
                                  <label className="form-label">Zip</label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="present_zip"
                                      value={formData.present_zip || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.present_zip && (
                                    <small className="text-danger mt-20">
                                      {errors.present_zip[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-4 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Present address same as permanent address?
                                  </label>
                                  <div className="mb-3">
                                    <div className="row">
                                      <div className="col-md-2">
                                        <div className="form-check">
                                          <input
                                            autoComplete="off"
                                            name="present_permanent_address"
                                            value="Yes"
                                            className="form-check-input"
                                            type="radio"
                                            id="yesRadio"
                                            checked={
                                              formData.present_permanent_address ===
                                              "Yes"
                                            }
                                            onChange={handleOnChange}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="yesRadio"
                                          >
                                            Yes
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-2">
                                        <div className="form-check">
                                          <input
                                            autoComplete="off"
                                            name="present_permanent_address"
                                            value="No"
                                            className="form-check-input"
                                            type="radio"
                                            id="noRadio"
                                            checked={
                                              formData.present_permanent_address ===
                                              "No"
                                            }
                                            onChange={handleOnChange}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="noRadio"
                                          >
                                            No
                                          </label>
                                        </div>
                                      </div>
                                    </div>

                                    {errors.present_permanent_address && (
                                      <small className="text-danger mt-20">
                                        {errors.present_permanent_address[0]}
                                      </small>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {formData.present_permanent_address === "No" && (
                                <>
                                  <div className="col-md-4 mt-20">
                                    <div className="form-group">
                                      <label className="form-label">
                                        Permanent Address
                                      </label>
                                      <div className="form-control-wrap">
                                        <input
                                          autoComplete="off"
                                          name="permanent_address"
                                          value={
                                            formData.permanent_address || ""
                                          }
                                          type="text"
                                          className="form-control"
                                          onChange={handleOnChange}
                                        />
                                      </div>
                                      {errors.permanent_address && (
                                        <small className="text-danger mt-20">
                                          {errors.permanent_address[0]}
                                        </small>
                                      )}
                                    </div>
                                  </div>

                                  <div className="col-md-4 mt-20">
                                    <div className="form-group">
                                      <label className="form-label">City</label>
                                      <div className="form-control-wrap">
                                        <input
                                          autoComplete="off"
                                          name="permanent_city"
                                          value={formData.permanent_city || ""}
                                          type="text"
                                          className="form-control"
                                          onChange={handleOnChange}
                                        />
                                      </div>
                                      {errors.permanent_city && (
                                        <small className="text-danger mt-20">
                                          {errors.permanent_city[0]}
                                        </small>
                                      )}
                                    </div>
                                  </div>

                                  <div className="col-md-6 mt-20">
                                    <div className="form-group">
                                      <label className="form-label">
                                        State
                                      </label>
                                      <div className="form-control-wrap">
                                        <select
                                          name="permanent_state"
                                          className="form-select"
                                          value={formData.permanent_state || ""}
                                          onChange={handleOnChange}
                                        >
                                          <option value="">Choose...</option>
                                          <option value="AK">AK</option>
                                          <option value="AL">AL</option>
                                          <option value="AR">AR</option>
                                          <option value="AZ">AZ</option>
                                          <option value="CA">CA</option>
                                          <option value="CO">CO</option>
                                          <option value="CT">CT</option>
                                          <option value="DC">DC</option>
                                          <option value="DE">DE</option>
                                          <option value="FL">FL</option>
                                          <option value="GA">GA</option>
                                          <option value="HI">HI</option>
                                          <option value="IA">IA</option>
                                          <option value="ID">ID</option>
                                          <option value="IL">IL</option>
                                          <option value="IN">IN</option>
                                          <option value="KS">KS</option>
                                          <option value="KY">KY</option>
                                          <option value="LA">LA</option>
                                          <option value="MA">MA</option>
                                          <option value="MD">MD</option>
                                          <option value="ME">ME</option>
                                          <option value="MI">MI</option>
                                          <option value="MN">MN</option>
                                          <option value="MO">MO</option>
                                          <option value="MS">MS</option>
                                          <option value="MT">MT</option>
                                          <option value="NC">NC</option>
                                          <option value="ND">ND</option>
                                          <option value="NE">NE</option>
                                          <option value="NH">NH</option>
                                          <option value="NJ">NJ</option>
                                          <option value="NM">NM</option>
                                          <option value="NV">NV</option>
                                          <option value="NY">NY</option>
                                          <option value="OH">OH</option>
                                          <option value="OK">OK</option>
                                          <option value="OR">OR</option>
                                          <option value="PA">PA</option>
                                          <option value="RI">RI</option>
                                          <option value="SC">SC</option>
                                          <option value="SD">SD</option>
                                          <option value="TN">TN</option>
                                          <option value="TX">TX</option>
                                          <option value="UT">UT</option>
                                          <option value="VA">VA</option>
                                          <option value="VT">VT</option>
                                          <option value="WA">WA</option>
                                          <option value="WI">WI</option>
                                          <option value="WV">WV</option>
                                          <option value="WY">WY</option>
                                        </select>
                                      </div>
                                      {errors.permanent_state && (
                                        <small className="text-danger mt-20">
                                          {errors.permanent_state[0]}
                                        </small>
                                      )}
                                    </div>
                                  </div>

                                  <div className="col-md-6 mt-20">
                                    <div className="form-group">
                                      <label className="form-label">Zip</label>
                                      <div className="form-control-wrap">
                                        <input
                                          autoComplete="off"
                                          name="permanent_zip"
                                          value={formData.permanent_zip || ""}
                                          type="text"
                                          className="form-control"
                                          onChange={handleOnChange}
                                        />
                                      </div>
                                      {errors.permanent_zip && (
                                        <small className="text-danger mt-20">
                                          {errors.permanent_zip[0]}
                                        </small>
                                      )}
                                    </div>
                                  </div>
                                </>
                              )}

                              <div className="col-md-4 mt-20">
                                <div className="mb-3">
                                  <label className="form-label">Phone</label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="phone"
                                      value={formData.phone || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.phone && (
                                    <small className="text-danger mt-20">
                                      {errors.phone[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-4 mt-20">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Are you 18 or older?{" "}
                                  </label>
                                  <div className="form-control-wrap">
                                    <select
                                      name="furnish_work"
                                      className="form-select"
                                      value={formData.furnish_work || ""}
                                      onChange={handleOnChange}
                                    >
                                      <option value="">Choose...</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                  </div>
                                  {errors.furnish_work && (
                                    <small className="text-danger mt-20">
                                      {errors.furnish_work[0]}
                                    </small>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="step-actions mt-20">
                              <button
                                type="button"
                                className="btn btn-primary btn-lg"
                                onClick={nextStep}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Step 2: Employment Details */}
                        {currentStep === 2 && (
                          <div className="step-content">
                            <h4 className="step-title">Employment Details</h4>
                            <div className="row">
                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Employment Desired
                                  </label>
                                  <div className="form-control-wrap">
                                    <select
                                      name="employment_desired"
                                      className="form-select"
                                      value={formData.employment_desired || ""}
                                      onChange={handleOnChange}
                                    >
                                      <option value="">Choose...</option>
                                      <option value="Full Time">
                                        Full Time
                                      </option>
                                      <option value="Part Time">
                                        Part Time
                                      </option>
                                      <option value="Temp">Temp</option>
                                      <option value="Seasonal">Seasonal</option>
                                    </select>
                                  </div>
                                  {errors.employment_desired && (
                                    <small className="text-danger mt-20">
                                      {errors.employment_desired[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">Position</label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="position"
                                      value={formData.position || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.position && (
                                    <small className="text-danger mt-20">
                                      {errors.position[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Date You Can Start
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="date_start"
                                      value={formData.date_start || ""}
                                      type="date"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.date_start && (
                                    <small className="text-danger mt-20">
                                      {errors.date_start[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">Salary</label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="salary"
                                      value={formData.salary || ""}
                                      type="number"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.salary && (
                                    <small className="text-danger mt-20">
                                      {errors.salary[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-6 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Are You Employed Now
                                  </label>
                                  <div className="form-control-wrap">
                                    <select
                                      name="employed_now"
                                      id="employed_now"
                                      className="form-select"
                                      value={formData.employed_now || ""}
                                      onChange={handleOnChange}
                                    >
                                      <option value="">Choose...</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                  </div>
                                  {errors.employed_now && (
                                    <small className="text-danger mt-20">
                                      {errors.employed_now[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              {formData.employed_now === "Yes" && (
                                <>
                                  <div
                                    className="col-md-6 mt-20"
                                    id="inqure_present_employer"
                                  >
                                    <div className="form-group">
                                      <label className="form-label">
                                        If so, may we inquire of your present
                                        employer?
                                      </label>
                                      <div className="form-control-wrap">
                                        <select
                                          name="inqure_present_employer"
                                          id="inquire_present_employer"
                                          className="form-select"
                                          value={
                                            formData.inqure_present_employer ||
                                            ""
                                          }
                                          onChange={handleOnChange}
                                        >
                                          <option value="">Choose...</option>
                                          <option value="Yes">Yes</option>
                                          <option value="No">No</option>
                                        </select>
                                      </div>
                                      {errors.inqure_present_employer && (
                                        <small className="text-danger mt-20">
                                          {errors.inqure_present_employer[0]}
                                        </small>
                                      )}
                                    </div>
                                  </div>
                                </>
                              )}

                              <div className="col-md-6 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Ever Applied For This Company Before?
                                  </label>
                                  <div className="form-control-wrap">
                                    <select
                                      name="applied_before"
                                      id="applied_before"
                                      className="form-select"
                                      value={formData.applied_before || ""}
                                      onChange={handleOnChange}
                                    >
                                      <option value="">Choose...</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                  </div>
                                  {errors.applied_before && (
                                    <small className="text-danger mt-20">
                                      {errors.applied_before[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              {formData.applied_before === "Yes" && (
                                <>
                                  <div id="where" className="col-md-3 mt-20">
                                    <div className="form-group">
                                      <label className="form-label">
                                        Where?
                                      </label>
                                      <div className="form-control-wrap">
                                        <input
                                          autoComplete="off"
                                          name="where"
                                          value={formData.where || ""}
                                          type="text"
                                          className="form-control"
                                          id="where"
                                          onChange={handleOnChange}
                                        />
                                      </div>
                                      {errors.where && (
                                        <small className="text-danger mt-20">
                                          {errors.where[0]}
                                        </small>
                                      )}
                                    </div>
                                  </div>

                                  <div id="when" className="col-md-3 mt-20">
                                    <div className="form-group">
                                      <label className="form-label">
                                        When?
                                      </label>
                                      <div className="form-control-wrap">
                                        <input
                                          autoComplete="off"
                                          name="when"
                                          value={formData.when || ""}
                                          type="date"
                                          className="form-control"
                                          id="when"
                                          onChange={handleOnChange}
                                        />
                                      </div>
                                      {errors.when && (
                                        <small className="text-danger mt-20">
                                          {errors.when[0]}
                                        </small>
                                      )}
                                    </div>
                                  </div>
                                </>
                              )}

                              <div className="col-md-6 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Are You On Layoff And Subject To Recall?
                                  </label>
                                  <div className="form-control-wrap">
                                    <select
                                      name="on_layoff_subject_to_recall"
                                      className="form-select"
                                      value={
                                        formData.on_layoff_subject_to_recall ||
                                        ""
                                      }
                                      onChange={handleOnChange}
                                    >
                                      <option value="">Choose...</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                  </div>
                                  {errors.on_layoff_subject_to_recall && (
                                    <small className="text-danger mt-20">
                                      {errors.on_layoff_subject_to_recall[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-6 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Will You Travel if Required?
                                  </label>
                                  <div className="form-control-wrap">
                                    <select
                                      name="travel_if_required"
                                      className="form-select"
                                      value={formData.travel_if_required || ""}
                                      onChange={handleOnChange}
                                    >
                                      <option value="">Choose...</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                  </div>
                                  {errors.travel_if_required && (
                                    <small className="text-danger mt-20">
                                      {errors.travel_if_required[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-6 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Will you relocate if the job requires it?
                                  </label>
                                  <div className="form-control-wrap">
                                    <select
                                      name="relocate_if_required"
                                      className="form-select"
                                      value={
                                        formData.relocate_if_required || ""
                                      }
                                      onChange={handleOnChange}
                                    >
                                      <option value="">Choose...</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                  </div>
                                  {errors.relocate_if_required && (
                                    <small className="text-danger mt-20">
                                      {errors.relocate_if_required[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-6 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Will you work overtime if required?
                                  </label>
                                  <div className="form-control-wrap">
                                    <select
                                      name="overtime_if_required"
                                      className="form-select"
                                      value={
                                        formData.overtime_if_required || ""
                                      }
                                      onChange={handleOnChange}
                                    >
                                      <option value="">Choose...</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                  </div>
                                  {errors.overtime_if_required && (
                                    <small className="text-danger mt-20">
                                      {errors.overtime_if_required[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-8 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Are you able to meet the attendance
                                    requirements of this position?
                                  </label>
                                  <div className="form-control-wrap">
                                    <select
                                      name="attendance_requirements_position"
                                      className="form-select"
                                      value={
                                        formData.attendance_requirements_position ||
                                        ""
                                      }
                                      onChange={handleOnChange}
                                    >
                                      <option value="">Choose...</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                  </div>
                                  {errors.attendance_requirements_position && (
                                    <small className="text-danger mt-20">
                                      {
                                        errors
                                          .attendance_requirements_position[0]
                                      }
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-4 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Have you ever been Bonded?
                                  </label>
                                  <div className="form-control-wrap">
                                    <select
                                      name="bonded"
                                      className="form-select"
                                      value={formData.bonded || ""}
                                      onChange={handleOnChange}
                                    >
                                      <option value="">Choose...</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                  </div>
                                  {errors.bonded && (
                                    <small className="text-danger mt-20">
                                      {errors.bonded[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-12 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Have you ever been convicted of a felony in
                                    the past 7years?
                                  </label>
                                  <div className="form-control-wrap">
                                    <select
                                      name="convicted"
                                      id="convicted"
                                      className="form-select"
                                      value={formData.convicted || ""}
                                      onChange={handleOnChange}
                                    >
                                      <option value="">Choose...</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                  </div>
                                  {errors.convicted && (
                                    <small className="text-danger mt-20">
                                      {errors.convicted[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              {formData.convicted === "Yes" && (
                                <>
                                  <div
                                    className="col-md-12 mt-20"
                                    id="textareaDiv"
                                  >
                                    <div className="form-group">
                                      <label className="form-label">
                                        Such conviction may be relevant if job
                                        related, but does not bar you from
                                        employment. If yes - explain
                                      </label>
                                      <div className="form-control-wrap">
                                        <textarea
                                          name="explain_convicted"
                                          className="form-control"
                                          id="explain_convicted"
                                          rows="3"
                                          value={
                                            formData.explain_convicted || ""
                                          }
                                          onChange={handleOnChange}
                                        />
                                      </div>
                                      {errors.explain_convicted && (
                                        <small className="text-danger mt-20">
                                          {errors.explain_convicted[0]}
                                        </small>
                                      )}
                                    </div>
                                  </div>
                                </>
                              )}

                              <div className="col-md-6 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Driver's License #
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="drivers_license"
                                      value={formData.drivers_license || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.drivers_license && (
                                    <small className="text-danger mt-20">
                                      {errors.drivers_license[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-6 mt-20">
                                <div className="form-group">
                                  <label className="form-label">State</label>
                                  <div className="form-control-wrap">
                                    <select
                                      name="drivers_license_state"
                                      className="form-select"
                                      value={
                                        formData.drivers_license_state || ""
                                      }
                                      onChange={handleOnChange}
                                    >
                                      <option value="">Choose...</option>
                                      <option value="AK">AK</option>
                                      <option value="AL">AL</option>
                                      <option value="AR">AR</option>
                                      <option value="AZ">AZ</option>
                                      <option value="CA">CA</option>
                                      <option value="CO">CO</option>
                                      <option value="CT">CT</option>
                                      <option value="DC">DC</option>
                                      <option value="DE">DE</option>
                                      <option value="FL">FL</option>
                                      <option value="GA">GA</option>
                                      <option value="HI">HI</option>
                                      <option value="IA">IA</option>
                                      <option value="ID">ID</option>
                                      <option value="IL">IL</option>
                                      <option value="IN">IN</option>
                                      <option value="KS">KS</option>
                                      <option value="KY">KY</option>
                                      <option value="LA">LA</option>
                                      <option value="MA">MA</option>
                                      <option value="MD">MD</option>
                                      <option value="ME">ME</option>
                                      <option value="MI">MI</option>
                                      <option value="MN">MN</option>
                                      <option value="MO">MO</option>
                                      <option value="MS">MS</option>
                                      <option value="MT">MT</option>
                                      <option value="NC">NC</option>
                                      <option value="ND">ND</option>
                                      <option value="NE">NE</option>
                                      <option value="NH">NH</option>
                                      <option value="NJ">NJ</option>
                                      <option value="NM">NM</option>
                                      <option value="NV">NV</option>
                                      <option value="NY">NY</option>
                                      <option value="OH">OH</option>
                                      <option value="OK">OK</option>
                                      <option value="OR">OR</option>
                                      <option value="PA">PA</option>
                                      <option value="RI">RI</option>
                                      <option value="SC">SC</option>
                                      <option value="SD">SD</option>
                                      <option value="TN">TN</option>
                                      <option value="TX">TX</option>
                                      <option value="UT">UT</option>
                                      <option value="VA">VA</option>
                                      <option value="VT">VT</option>
                                      <option value="WA">WA</option>
                                      <option value="WI">WI</option>
                                      <option value="WV">WV</option>
                                      <option value="WY">WY</option>
                                    </select>
                                  </div>
                                  {errors.drivers_license_state && (
                                    <small className="text-danger mt-20">
                                      {errors.drivers_license_state[0]}
                                    </small>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="step-actions mt-20">
                              <button
                                type="button"
                                className="btn btn-secondary me-2"
                                onClick={prevStep}
                              >
                                Previous
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary btn-lg"
                                onClick={nextStep}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Step 3: Education & Skills */}
                        {currentStep === 3 && (
                          <div className="step-content">
                            <h4 className="step-title">Education & Skills</h4>
                            <div className="row">
                              <h4>Education</h4>
                              <p>Currently Attending</p>
                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Name and Location of School
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="edu_current_name_location_school"
                                      value={
                                        formData.edu_current_name_location_school ||
                                        ""
                                      }
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.edu_current_name_location_school && (
                                    <small className="text-danger mt-20">
                                      {
                                        errors
                                          .edu_current_name_location_school[0]
                                      }
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Number of Years Completed
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="edu_current_number_years"
                                      value={
                                        formData.edu_current_number_years || ""
                                      }
                                      type="number"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.edu_current_number_years && (
                                    <small className="text-danger mt-20">
                                      {errors.edu_current_number_years[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Did You Graduate?
                                  </label>
                                  <div className="form-control-wrap">
                                    <select
                                      name="edu_current_did_graduate"
                                      className="form-select"
                                      value={
                                        formData.edu_current_did_graduate || ""
                                      }
                                      onChange={handleOnChange}
                                    >
                                      <option value="">Choose...</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                  </div>
                                  {errors.edu_current_did_graduate && (
                                    <small className="text-danger mt-20">
                                      {errors.edu_current_did_graduate[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Subjects Studied
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="edu_current_subjects_studied"
                                      value={
                                        formData.edu_current_subjects_studied ||
                                        ""
                                      }
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.edu_current_subjects_studied && (
                                    <small className="text-danger mt-20">
                                      {errors.edu_current_subjects_studied[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="mt-30">
                                {" "}
                                <p>Last Completed</p>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Name and Location of School
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="edu_last_name_location_school"
                                      value={
                                        formData.edu_last_name_location_school ||
                                        ""
                                      }
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.edu_last_name_location_school && (
                                    <small className="text-danger mt-20">
                                      {errors.edu_last_name_location_school[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Number of Years Completed
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="edu_last_number_years"
                                      value={
                                        formData.edu_last_number_years || ""
                                      }
                                      type="number"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.edu_last_number_years && (
                                    <small className="text-danger mt-20">
                                      {errors.edu_last_number_years[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Did You Graduate?
                                  </label>
                                  <div className="form-control-wrap">
                                    <select
                                      name="edu_last_did_graduate"
                                      className="form-select"
                                      value={
                                        formData.edu_last_did_graduate || ""
                                      }
                                      onChange={handleOnChange}
                                    >
                                      <option value="">Choose...</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                  </div>
                                  {errors.edu_last_did_graduate && (
                                    <small className="text-danger mt-20">
                                      {errors.edu_last_did_graduate[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Subjects Studied
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="edu_last_subjects_studied"
                                      value={
                                        formData.edu_last_subjects_studied || ""
                                      }
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.edu_last_subjects_studied && (
                                    <small className="text-danger mt-20">
                                      {errors.edu_last_subjects_studied[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="mt-30">
                                <h4>Trades of Business</h4>
                                <p>Currently Attending</p>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Name and Location of School
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="trades_current_name_location_school"
                                      value={
                                        formData.trades_current_name_location_school ||
                                        ""
                                      }
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.trades_current_name_location_school && (
                                    <small className="text-danger mt-20">
                                      {
                                        errors
                                          .trades_current_name_location_school[0]
                                      }
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Number of Years Completed
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="trades_current_number_years"
                                      value={
                                        formData.trades_current_number_years ||
                                        ""
                                      }
                                      type="number"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.trades_current_number_years && (
                                    <small className="text-danger mt-20">
                                      {errors.trades_current_number_years[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Did You Graduate?
                                  </label>
                                  <div className="form-control-wrap">
                                    <select
                                      name="trades_current_did_graduate"
                                      className="form-select"
                                      value={
                                        formData.trades_current_did_graduate ||
                                        ""
                                      }
                                      onChange={handleOnChange}
                                    >
                                      <option value="">Choose...</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                  </div>
                                  {errors.trades_current_did_graduate && (
                                    <small className="text-danger mt-20">
                                      {errors.trades_current_did_graduate[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Subjects Studied
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="trades_current_subjects_studied"
                                      value={
                                        formData.trades_current_subjects_studied ||
                                        ""
                                      }
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.trades_current_subjects_studied && (
                                    <small className="text-danger mt-20">
                                      {
                                        errors
                                          .trades_current_subjects_studied[0]
                                      }
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="mt-20">
                                <p>Last Attended</p>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Name and Location of School
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      name="trades_last_current_name_location_school"
                                      value={
                                        formData.trades_last_current_name_location_school
                                      }
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.trades_last_current_name_location_school && (
                                    <small className="text-danger mt-20">
                                      {
                                        errors
                                          .trades_last_current_name_location_school[0]
                                      }
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Number of Years Completed
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="trades_last_current_number_years"
                                      value={
                                        formData.trades_last_current_number_years ||
                                        ""
                                      }
                                      type="number"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.trades_last_current_number_years && (
                                    <small className="text-danger mt-20">
                                      {
                                        errors
                                          .trades_last_current_number_years[0]
                                      }
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Did You Graduate?
                                  </label>
                                  <div className="form-control-wrap">
                                    <select
                                      name="trades_last_current_did_graduate"
                                      className="form-select"
                                      value={
                                        formData.trades_last_current_did_graduate ||
                                        ""
                                      }
                                      onChange={handleOnChange}
                                    >
                                      <option value="">Choose...</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                  </div>
                                  {errors.trades_last_current_did_graduate && (
                                    <small className="text-danger mt-20">
                                      {
                                        errors
                                          .trades_last_current_did_graduate[0]
                                      }
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Subjects Studied
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="trades_last_subjects_studied"
                                      value={
                                        formData.trades_last_subjects_studied ||
                                        ""
                                      }
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.trades_last_subjects_studied && (
                                    <small className="text-danger mt-20">
                                      {errors.trades_last_subjects_studied[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-12 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Summarize special skills and qualifications
                                    required from employment or other
                                    experiences that may qualify you to work
                                    with this company.
                                  </label>
                                  <div className="form-control-wrap">
                                    <textarea
                                      name="special_skills_qualifications"
                                      className="form-control"
                                      rows="3"
                                      value={
                                        formData.special_skills_qualifications ||
                                        ""
                                      }
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.special_skills_qualifications && (
                                    <small className="text-danger mt-20">
                                      {errors.special_skills_qualifications[0]}
                                    </small>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="step-actions mt-20">
                              <button
                                type="button"
                                className="btn btn-secondary me-2"
                                onClick={prevStep}
                              >
                                Previous
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary btn-lg"
                                onClick={nextStep}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Step 4: Work History */}
                        {currentStep === 4 && (
                          <div className="step-content">
                            <h4 className="step-title">Work History</h4>
                            <div className="row">
                              <div className="col-md-12 mt-20">
                                <h4>Past Employment Information</h4>
                              </div>
                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">From</label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="from_date_1"
                                      value={formData.from_date_1 || ""}
                                      type="date"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.from_date_1 && (
                                    <small className="text-danger mt-20">
                                      {errors.from_date_1[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">To</label>
                                  <div className="form-control-wrap">
                                    <input
                                      name="to_date_1"
                                      value={formData.to_date_1 || ""}
                                      type="date"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.to_date_1 && (
                                    <small className="text-danger mt-20">
                                      {errors.to_date_1[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-6 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Name and Address of Employer
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      name="name_address_employer_1"
                                      value={
                                        formData.name_address_employer_1 || ""
                                      }
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.name_address_employer_1 && (
                                    <small className="text-danger mt-20">
                                      {errors.name_address_employer_1[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Phone number
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      name="phone_number_1"
                                      value={formData.phone_number_1 || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.phone_number_1 && (
                                    <small className="text-danger mt-20">
                                      {errors.phone_number_1[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">Salary</label>
                                  <div className="form-control-wrap">
                                    <input
                                      name="salary_1"
                                      value={formData.salary_1 || ""}
                                      type="number"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.salary_1 && (
                                    <small className="text-danger mt-20">
                                      {errors.salary_1[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">Job</label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="job_1"
                                      value={formData.job_1 || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.job_1 && (
                                    <small className="text-danger mt-20">
                                      {errors.job_1[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Reason for Leaving
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="reason_leaving_1"
                                      value={formData.reason_leaving_1 || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.reason_leaving_1 && (
                                    <small className="text-danger mt-20">
                                      {errors.reason_leaving_1[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-12 mt-20">
                                <p>#2 Optional</p>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">From</label>
                                  <div className="form-control-wrap">
                                    <input
                                      name="from_date_2"
                                      value={formData.from_date_2 || ""}
                                      type="date"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.from_date_2 && (
                                    <small className="text-danger mt-20">
                                      {errors.from_date_2[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">To</label>
                                  <div className="form-control-wrap">
                                    <input
                                      name="to_date_2"
                                      value={formData.to_date_2 || ""}
                                      type="date"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.to_date_2 && (
                                    <small className="text-danger mt-20">
                                      {errors.to_date_2[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-6 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Name and Address of Employer
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      name="name_address_employer_2"
                                      value={
                                        formData.name_address_employer_2 || ""
                                      }
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.name_address_employer_2 && (
                                    <small className="text-danger mt-20">
                                      {errors.name_address_employer_2[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Phone number
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="phone_number_2"
                                      value={formData.phone_number_2 || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.phone_number_2 && (
                                    <small className="text-danger mt-20">
                                      {errors.phone_number_2[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">Job</label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="job_2"
                                      value={formData.job_2 || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.job_2 && (
                                    <small className="text-danger mt-20">
                                      {errors.job_2[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">Salary</label>
                                  <div className="form-control-wrap">
                                    <input
                                      name="salary_2"
                                      value={formData.salary_2 || ""}
                                      type="number"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.salary_2 && (
                                    <small className="text-danger mt-20">
                                      {errors.salary_2[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Reason for Leaving
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      name="reason_leaving_2"
                                      value={formData.reason_leaving_2 || ""}
                                      type="number"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.reason_leaving_2 && (
                                    <small className="text-danger mt-20">
                                      {errors.reason_leaving_2[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-12 mt-20">
                                <p>#3 Optional</p>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">From</label>
                                  <div className="form-control-wrap">
                                    <input
                                      name="from_date_3"
                                      value={formData.from_date_3 || ""}
                                      type="date"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.from_date_3 && (
                                    <small className="text-danger mt-20">
                                      {errors.from_date_3[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">To</label>
                                  <div className="form-control-wrap">
                                    <input
                                      name="to_date_3"
                                      value={formData.to_date_3 || ""}
                                      type="date"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.to_date_3 && (
                                    <small className="text-danger mt-20">
                                      {errors.to_date_3[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-6 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Name and Address of Employer
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      name="name_address_employer_3"
                                      value={
                                        formData.name_address_employer_3 || ""
                                      }
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.name_address_employer_3 && (
                                    <small className="text-danger mt-20">
                                      {errors.name_address_employer_3[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Phone number
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      name="phone_number_3"
                                      value={formData.phone_number_3 || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.phone_number_3 && (
                                    <small className="text-danger mt-20">
                                      {errors.phone_number_3[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">Job</label>
                                  <div className="form-control-wrap">
                                    <input
                                      name="job_3"
                                      value={formData.job_3 || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.job_3 && (
                                    <small className="text-danger mt-20">
                                      {errors.job_3[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">Salary</label>
                                  <div className="form-control-wrap">
                                    <input
                                      name="salary_3"
                                      value={formData.salary_3 || ""}
                                      type="number"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.salary_3 && (
                                    <small className="text-danger mt-20">
                                      {errors.salary_3[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Reason for Leaving
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="reason_leaving_3"
                                      value={formData.reason_leaving_3 || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.reason_leaving_3 && (
                                    <small className="text-danger mt-20">
                                      {errors.reason_leaving_3[0]}
                                    </small>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="step-actions mt-20">
                              <button
                                type="button"
                                className="btn btn-secondary me-2"
                                onClick={prevStep}
                              >
                                Previous
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary btn-lg"
                                onClick={nextStep}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Step 5: References & Languages */}
                        {currentStep === 5 && (
                          <div className="step-content">
                            <h4 className="step-title">
                              References & Languages
                            </h4>
                            <div className="row">
                              <div className="col-md-12 mt-20">
                                <h4>References</h4>
                                <p>
                                  Give the name of three persons not related to
                                  you to whom you have known at least 1year
                                </p>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">Name</label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="reference_name_1"
                                      value={formData.reference_name_1 || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.reference_name_1 && (
                                    <small className="text-danger mt-20">
                                      {errors.reference_name_1[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">Address</label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="reference_address_1"
                                      value={formData.reference_address_1 || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.reference_address_1 && (
                                    <small className="text-danger mt-20">
                                      {errors.reference_address_1[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">Phone</label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="reference_phone_1"
                                      value={formData.reference_phone_1 || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.reference_phone_1 && (
                                    <small className="text-danger mt-20">
                                      {errors.reference_phone_1[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Years Acquainted
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="reference_years_acquainted_1"
                                      value={
                                        formData.reference_years_acquainted_1 ||
                                        ""
                                      }
                                      type="number"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.reference_years_acquainted_1 && (
                                    <small className="text-danger mt-20">
                                      {errors.reference_years_acquainted_1[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">Name</label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="reference_name_2"
                                      value={formData.reference_name_2 || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.reference_name_2 && (
                                    <small className="text-danger mt-20">
                                      {errors.reference_name_2[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">Address</label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="reference_address_2"
                                      value={formData.reference_address_2 || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.reference_address_2 && (
                                    <small className="text-danger mt-20">
                                      {errors.reference_address_2[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">Phone</label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="reference_phone_2"
                                      value={formData.reference_phone_2 || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.reference_phone_2 && (
                                    <small className="text-danger mt-20">
                                      {errors.reference_phone_2[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Years Acquainted
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="reference_years_acquainted_2"
                                      value={
                                        formData.reference_years_acquainted_2 ||
                                        ""
                                      }
                                      type="number"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.reference_years_acquainted_2 && (
                                    <small className="text-danger mt-20">
                                      {errors.reference_years_acquainted_2[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">Name</label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="reference_name_3"
                                      value={formData.reference_name_3 || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.reference_name_3 && (
                                    <small className="text-danger mt-20">
                                      {errors.reference_name_3[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">Address</label>
                                  <div className="form-control-wrap">
                                    <input
                                      name="reference_address_3"
                                      value={formData.reference_address_3 || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.reference_address_3 && (
                                    <small className="text-danger mt-20">
                                      {errors.reference_address_3[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">Phone</label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="reference_phone_3"
                                      value={formData.reference_phone_3 || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.reference_phone_3 && (
                                    <small className="text-danger mt-20">
                                      {errors.reference_phone_3[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Years Acquainted
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="reference_years_acquainted_3"
                                      value={
                                        formData.reference_years_acquainted_3 ||
                                        ""
                                      }
                                      type="number"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.reference_years_acquainted_3 && (
                                    <small className="text-danger mt-20">
                                      {errors.reference_years_acquainted_3[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-12 mt-20">
                                <h4>Languages</h4>
                                <p>
                                  1# Required. List any foreign language(s) and
                                  check the box that best describes your skill
                                  level.
                                </p>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">Language</label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="language_1"
                                      value={formData.language_1 || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.language_1 && (
                                    <small className="text-danger mt-20">
                                      {errors.language_1[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Read and Write
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="read_write_1"
                                      value={formData.read_write_1 || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.read_write_1 && (
                                    <small className="text-danger mt-20">
                                      {errors.read_write_1[0]}
                                    </small>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Read and Speak
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="read_speak_1"
                                      value={formData.read_speak_1 || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.read_speak_1 && (
                                    <small className="text-danger mt-20">
                                      {errors.read_speak_1[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Speak Only
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="speak_only_1"
                                      value={formData.speak_only_1 || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.speak_only_1 && (
                                    <small className="text-danger mt-20">
                                      {errors.speak_only_1[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-12 mt-20">
                                <p>#2 Optional</p>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">Language</label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="language_2"
                                      value={formData.language_2 || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.language_2 && (
                                    <small className="text-danger mt-20">
                                      {errors.language_2[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Read and Write
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="read_write_2"
                                      value={formData.read_write_2 || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.read_write_2 && (
                                    <small className="text-danger mt-20">
                                      {errors.read_write_2[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Read and Speak
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="read_speak_2"
                                      value={formData.read_speak_2 || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.read_speak_2 && (
                                    <small className="text-danger mt-20">
                                      {errors.read_speak_2[0]}
                                    </small>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Speak Only
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      name="speak_only_2"
                                      value={formData.speak_only_2 || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.speak_only_2 && (
                                    <small className="text-danger mt-20">
                                      {errors.speak_only_2[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-12 mt-20">
                                <h4>Emergency</h4>
                                <p>In case of emergency notify</p>
                              </div>

                              <div className="col-md-4 mt-20">
                                <div className="form-group">
                                  <label className="form-label">Address</label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="emergency_address"
                                      value={formData.emergency_address || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.emergency_address && (
                                    <small className="text-danger mt-20">
                                      {errors.emergency_address[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">City</label>
                                  <div className="form-control-wrap">
                                    <input
                                      autoComplete="off"
                                      name="emergency_city"
                                      value={formData.emergency_city || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.emergency_city && (
                                    <small className="text-danger mt-20">
                                      {errors.emergency_city[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3 mt-20">
                                <div className="form-group">
                                  <label className="form-label">State</label>
                                  <div className="form-control-wrap">
                                    <select
                                      name="emergency_state"
                                      className="form-select"
                                      value={formData.emergency_state || ""}
                                      onChange={handleOnChange}
                                    >
                                      <option value="">Choose...</option>
                                      <option value="AK">AK</option>
                                      <option value="AL">AL</option>
                                      <option value="AR">AR</option>
                                      <option value="AZ">AZ</option>
                                      <option value="CA">CA</option>
                                      <option value="CO">CO</option>
                                      <option value="CT">CT</option>
                                      <option value="DC">DC</option>
                                      <option value="DE">DE</option>
                                      <option value="FL">FL</option>
                                      <option value="GA">GA</option>
                                      <option value="HI">HI</option>
                                      <option value="IA">IA</option>
                                      <option value="ID">ID</option>
                                      <option value="IL">IL</option>
                                      <option value="IN">IN</option>
                                      <option value="KS">KS</option>
                                      <option value="KY">KY</option>
                                      <option value="LA">LA</option>
                                      <option value="MA">MA</option>
                                      <option value="MD">MD</option>
                                      <option value="ME">ME</option>
                                      <option value="MI">MI</option>
                                      <option value="MN">MN</option>
                                      <option value="MO">MO</option>
                                      <option value="MS">MS</option>
                                      <option value="MT">MT</option>
                                      <option value="NC">NC</option>
                                      <option value="ND">ND</option>
                                      <option value="NE">NE</option>
                                      <option value="NH">NH</option>
                                      <option value="NJ">NJ</option>
                                      <option value="NM">NM</option>
                                      <option value="NV">NV</option>
                                      <option value="NY">NY</option>
                                      <option value="OH">OH</option>
                                      <option value="OK">OK</option>
                                      <option value="OR">OR</option>
                                      <option value="PA">PA</option>
                                      <option value="RI">RI</option>
                                      <option value="SC">SC</option>
                                      <option value="SD">SD</option>
                                      <option value="TN">TN</option>
                                      <option value="TX">TX</option>
                                      <option value="UT">UT</option>
                                      <option value="VA">VA</option>
                                      <option value="VT">VT</option>
                                      <option value="WA">WA</option>
                                      <option value="WI">WI</option>
                                      <option value="WV">WV</option>
                                      <option value="WY">WY</option>
                                    </select>
                                  </div>
                                  {errors.emergency_state && (
                                    <small className="text-danger mt-20">
                                      {errors.emergency_state[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-2 mt-20">
                                <div className="form-group">
                                  <label className="form-label">Zip</label>
                                  <div className="form-control-wrap">
                                    <input
                                      name="emergency_zip"
                                      value={formData.emergency_zip || ""}
                                      type="text"
                                      className="form-control"
                                      onChange={handleOnChange}
                                    />
                                  </div>
                                  {errors.emergency_zip && (
                                    <small className="text-danger mt-20">
                                      {errors.emergency_zip[0]}
                                    </small>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="step-actions mt-20">
                              <button
                                type="button"
                                className="btn btn-secondary me-2"
                                onClick={prevStep}
                              >
                                Previous
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary btn-lg"
                                onClick={nextStep}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Step 6: Agreement & Signature */}
                        {currentStep === 6 && (
                          <div className="step-content">
                            <h4 className="step-title">
                              Agreement & Signature
                            </h4>
                            <div className="row">
                              <div className="col-12 mt-30">
                                <h4>
                                  Conditions of Employment - please read
                                  carefully
                                </h4>
                                <div
                                  style={{
                                    maxHeight: "300px",
                                    overflowY: "auto",
                                    padding: "10px",
                                    border: "1px solid #eee",
                                  }}
                                >
                                  <p>
                                    Reporting to work with impaired abilities;
                                    or the possession, consumption or
                                    distribution of drugs or alcohol on company
                                    premises and/or worksites, shall be grounds
                                    for disciplinary action, including
                                    discharge. A condition of employment
                                    includes willingness on the part of
                                    applicant or employee to agree to the terms
                                    put forth by 1st Access Home Care
                                    Incorporated. We are committed to operating
                                    a drug free workplace. Violations of our
                                    drug and alcohol policy will result in
                                    dismissal.
                                  </p>
                                  <p>
                                    It is understood and agreed upon that any
                                    misrepresentation by me in this application
                                    will be sufficient cause for cancellation of
                                    this application and/or separation from the
                                    employer's service if I have been employed.
                                    Furthermore, I understand that just as I am
                                    free to resign anytime, the Employer
                                    reserves the right to terminate my contract
                                    at any time, with or without cause and
                                    without prior notice. I understand that no
                                    representative of the employer has the
                                    authority to make any assurances to the
                                    contrary.
                                  </p>
                                  <p>
                                    I give the employer the right to investigate
                                    all police, driving and personal records and
                                    references if job related. I hereby release
                                    from liability the Employer and it's
                                    representatives for seeking such information
                                    and all other persons, corporations or
                                    organizations for furnishing such
                                    information.
                                  </p>
                                  <p>
                                    The Employer is an Equal Opportunity
                                    Employer. The Employer does not discriminate
                                    in employment and no question on this
                                    application is used for the purpose of
                                    limiting or excusing any applicant's
                                    consideration for employment on a basis
                                    prohibited by local, state or Federal law
                                  </p>
                                  <p>
                                    Any controversy of any kind arising between
                                    the parties under this agreement or
                                    otherwise (or any agent, officer, director
                                    or affiliate of any party), including but
                                    not limited to common law, statutory, tort
                                    or contract claims, will be submitted to
                                    mediation and failing settlement in
                                    mediation, to binding arbitration. Unless
                                    otherwise agreed mediation and arbitration
                                    designated by staff professionals will
                                    govern any mediation and arbitration. The
                                    parties will select the mediator or
                                    arbitrator from the designated company panel
                                    of mediators and will notify the designated
                                    company, in writing, to initiate the
                                    selection process. The arbitration will be
                                    subject to and governed by the provisions of
                                    the Federal Arbitration Act. 9 U.S.C
                                    Section1-et seq. The parties hereto
                                    stipulate that this agreement involves
                                    matters affecting interstate commerce.
                                  </p>
                                  <p>
                                    This application is current for 90 days. At
                                    the conclusion of this time if I have not
                                    heard from the Employer and still wish to be
                                    considered for employment, it will be
                                    necessary to fill out a new application.
                                  </p>
                                </div>
                              </div>

                              <div className="col-md-12 mt-20">
                                <div className="form-group">
                                  <label className="form-label">
                                    Signature
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="flex-row">
                                    <div className="wrapper">
                                      <p className="text-muted small mb-2">
                                        Sign in the box below using your mouse
                                        or finger
                                      </p>
                                      <SignatureCanvas
                                        ref={sigCanvas}
                                        canvasProps={{
                                          className: "signature-canvas",
                                          style: {
                                            background: "#f8f9fa",
                                            width: "100%",
                                            height: "500px",
                                          },
                                        }}
                                        penColor="black"
                                        minWidth={2}
                                        maxWidth={3}
                                      />
                                    </div>
                                    <div className="clear-btn mt-2">
                                      <button
                                        disabled={loading}
                                        type="button"
                                        id="clear"
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={clearSignature}
                                      >
                                        <span>Clear Signature</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="step-actions mt-4">
                              <button
                                type="button"
                                className="btn btn-secondary me-2"
                                onClick={prevStep}
                                disabled={loading}
                              >
                                Previous
                              </button>
                              <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                              >
                                {loading
                                  ? "Processing..."
                                  : "Submit Application"}
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Step 7: Success */}
                        {currentStep === 7 && (
                          <div className="step-content text-center py-5">
                            <div className="success-icon mb-4">
                              <i
                                className="ri-checkbox-circle-fill text-success"
                                style={{ fontSize: "4rem" }}
                              ></i>
                            </div>
                            <h3 className="text-success">
                              {successMsg && <p> {successMsg} </p>}
                            </h3>
                            <p className="mb-4">
                              Thank you for submitting your application. We will
                              review it and contact you soon.
                            </p>
                          </div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .progress-container {
          padding: 20px 0;
        }
        .progress-steps {
          display: flex;
          justify-content: space-between;
          position: relative;
          margin-bottom: 30px;
        }
        .progress-steps::before {
          content: "";
          position: absolute;
          top: 20px;
          left: 0;
          right: 0;
          height: 4px;
          background-color: #e9ecef;
          z-index: 1;
        }
        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #e9ecef;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
          font-weight: bold;
          color: #6c757d;
        }
        .step-label {
          font-size: 0.875rem;
          text-align: center;
          color: #6c757d;
        }
        .progress-step.active .step-number {
          background-color: #0d6efd;
          color: white;
        }
        .progress-step.completed .step-number {
          background-color: #198754;
          color: white;
        }
        .progress-step.completed .step-number::after {
          content: "✓";
        }
        .step-title {
          border-bottom: 1px solid #dee2e6;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }
        .step-actions {
          display: flex;
          justify-content: flex-end;
        }
        .success-icon {
          animation: scaleUp 0.5s ease-in-out;
        }
        @keyframes scaleUp {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .progress-container {
          width: 100%;
          overflow-x: auto; /* allow horizontal scroll on very small screens */
        }

        .progress-steps {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem; /* spacing between steps */
          flex-wrap: wrap; /* wrap on small screens */
        }

        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 60px; /* ensures step doesn't shrink too much */
          flex: 1; /* steps grow evenly */
          text-align: center;
        }

        .step-number {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: #ddd;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .progress-step.active .step-number {
          background: #007bff;
          color: #fff;
        }

        .progress-step.completed .step-number {
          background: #28a745;
          color: #fff;
        }

        .step-label {
          font-size: 0.85rem;
          word-wrap: break-word; /* break long words */
        }

        /* Responsive tweaks */
        @media (max-width: 768px) {
          .progress-steps {
            gap: 0.5rem;
          }
          .step-label {
            font-size: 0.75rem;
          }
          .step-number {
            width: 28px;
            height: 28px;
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .progress-steps {
            flex-wrap: nowrap;
            overflow-x: auto;
          }
          .progress-step {
            min-width: 70px; /* wider for readability */
          }
        }
      `}</style>
    </>
  );
}
