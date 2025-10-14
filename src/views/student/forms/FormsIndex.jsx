import UserHeader from "../../../components/users/UserHeader";
import UserSidebar from "../../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../../router";

export default function FormsIndex() {
  const forms = [
    {
      application: {
        name: "Application For Employment",
        url: PATHS.USER_APPLICATION_FORM,
      },

      attendace: {
        name: "Attendance, Tardiness, Absenteeism & Leave",
        url: PATHS.USER_ATTENDANCE_FORM,
      },

      cellular_use: {
        name: "Employee Safety (Cellular Phone Use)",
        url: PATHS.USER_EMPLOYEE_CELLULAR_USE_FORM,
      },

      confidentiality: {
        name: "Confidentiality of Information Agreement",
        url: PATHS.USER_CONFIDENTIALITY_FORM,
      },

      criminal: {
        name: "Criminal History Search",
        url: PATHS.USER_CRIMINAL_FORM,
      },

      disclaimer: {
        name: "Disclaimer And Waiver Of Liability",
        url: PATHS.USER_DISCLAIMER_FORM,
      },

      disclosure: {
        name: "Sworn Disclosure Statement",
        url: PATHS.USER_DISCLOSURE_FORM,
      },

      dress_code: {
        name: "Employee Dress Code",
        url: PATHS.USER_EMPLOYEE_DRESS_CODE_FORM,
      },

      drug_testing: {
        name: "Drug Testing Policy",
        url: PATHS.USER_DRUG_TESTING_FORM,
      },

      employee_agreement: {
        name: "Employee Agreement",
        url: PATHS.USER_EMPLOYEE_AGREEMENT_FORM,
      },

      employee_conduct: {
        name: "Employee Notification of Policy: Employee Conduct",
        url: PATHS.USER_EMPLOYEE_CONDUCT_FORM,
      },

      employee_orientation: {
        name: "Employee Orientation",
        url: PATHS.USER_EMPLOYEE_ORIENTATION_FORM,
      },

      health_safety: {
        name: "Health & Safety Agreement",
        url: PATHS.USER_EMPLOYEE_HEALTH_SAFETY_FORM,
      },

      hha: {
        name: "Home Health Aide",
        url: PATHS.USER_HHA_FORM,
      },

      infection_control: {
        name: "Infection Control Agreement",
        url: PATHS.USER_INFECTION_CONTROL_FORM,
      },

      non_compete: {
        name: "Non-Compete Agreement",
        url: PATHS.USER_NON_COMPETE_FORM,
      },

      policy_procedure: {
        name: "Policies And Procedures Orientation Acknowledgement",
        url: PATHS.USER_POLICIES_PROCEDURES_FORM,
      },

      reference_check: {
        name: "Employee Reference Check",
        url: PATHS.USER_EMPLOYEE_REFERENCE_CHECK_FORM,
      },

      reporting: {
        name: "Reporting: Abuse/Neglect/Exploitation",
        url: PATHS.USER_REPORTING_FORM,
      },

      sexual_harassment: {
        name: "Sexual Harassment",
        url: PATHS.USER_SEXUAL_HARASSMENT_FORM,
      },

      smoking: {
        name: "Employee Notification of Policy: Smoking in The Workplace",
        url: PATHS.USER_SMOKING_FORM,
      },

      universal_precautions: {
        name: "Universal Precautions Training Document",
        url: PATHS.USER_UNIVERSAL_PRECAUTIONS_FORM,
      },

      verification: {
        name: "Verification of Professional License",
        url: PATHS.USER_VERIFICATION_FORM,
      },
    },
  ];

  // flatten the object into an array
  const formList = Object.values(forms[0]);

  return (
    <>
      <title>Forms - 1staccess Home Care</title>

      <div id="main-wrapper">
        <UserHeader />
        <UserSidebar />
        <div className="content-body">
          <div className="container">
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>Forms</h3>
                    <p className="mb-2">
                      Fill all available forms here, they are mandatory
                    </p>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="breadcrumbs">
                    <a href="#">Home </a>
                    <span>
                      <i className="ri-arrow-right-s-line" />
                    </span>
                    <a href="#">Forms</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card transparent">
                  <div className="card-body">
                    <div className="rtable rtable--5cols rtable--collapse">
                      <div className="rtable-row rtable-row--head bg-transparent">
                        <div className="rtable-cell topic-cell column-heading text-dark">
                          <strong>Form Name</strong>
                        </div>
                        <div className="rtable-cell impression-cell column-heading text-dark">
                          <strong>Signature</strong>
                        </div>
                        <div className="rtable-cell sales-cell column-heading text-dark">
                          <strong>Date Signed</strong>
                        </div>
                        <div className="rtable-cell earning-cell column-heading text-dark">
                          <strong>Action</strong>
                        </div>
                      </div>

                      {formList.map((f, index) => (
                        <div className="rtable-row" key={index}>
                          <div className="rtable-cell topic-cell">
                            <div className="rtable-cell--content title-content d-flex align-items-center">
                              <i
                                style={{ marginRight: "10px" }}
                                className="ri-file-list-3-fill"
                              ></i>
                              <span className="topic-cell-span">{f.name}</span>
                            </div>
                          </div>
                          <div className="rtable-cell impression-cell">
                            <div className="rtable-cell--heading">
                              Signature
                            </div>
                            <div className="rtable-cell--content replay-link-content">
                              N/A
                            </div>
                          </div>
                          <div className="rtable-cell rtable-cell--foot sales-cell">
                            <div className="rtable-cell--heading">
                              Date Signed
                            </div>
                            <div className="rtable-cell--content earning-content">
                              N/A
                            </div>
                          </div>
                          <div className="rtable-cell rtable-cell--foot earning-cell">
                            <div className="rtable-cell--heading">Actions</div>
                            <div className="rtable-cell--content earning-content">
                              {f.url ? (
                                <Link
                                  to={{ pathname: f.url }}
                                  className="icon-link payout-icon sm-success-lighten text-success"
                                  title="View"
                                >
                                  <i
                                    className="ri-eye-line"
                                    style={{ fontSize: "18px" }}
                                  ></i>
                                </Link>
                              ) : (
                                <span className="text-muted">N/A</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
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
