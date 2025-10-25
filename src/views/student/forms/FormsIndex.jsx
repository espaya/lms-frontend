import UserHeader from "../../../components/users/UserHeader";
import UserSidebar from "../../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../../router";
import { useEffect, useState } from "react";
import fetchApplicationForms from "../../../controller/user/forms/EmploymentApplication";
import FetchAttendance from "../../../controller/user/forms/AttendanceController";
import FetchCellularUse from "../../../controller/user/forms/CellularUseController";
import FetchConfidentiality from "../../../controller/user/forms/ConfidentialityController";
import FetchCriminal from "../../../controller/user/forms/CriminalController";
import FetchDisclaimer from "../../../controller/user/forms/DisclaimerController";
import FetchEmployeeDisclosure from "../../../controller/user/forms/DisclosureController";
import FetchEmployeeDressCode from "../../../controller/user/forms/DressCodeController";
import FetchDrugTesting from "../../../controller/user/forms/DrugTestingController";
import FetchEmployeeAgreement from "../../../controller/user/forms/AgreementController";
import FetchEmployeeConduct from "../../../controller/user/forms/EmployeeConductController";
import FetchEmployeeOrientation from "../../../controller/user/forms/OrientationController";
import FetchEmployeeHealthSafety from "../../../controller/user/forms/HealthSafetyController";
import FetchEmployeeHHA from "../../../controller/user/forms/HHAController";
import FetchEmployeeInfection from "../../../controller/user/forms/InfectionController";
import FetchEmployeeNonCompete from "../../../controller/user/forms/NonCompeteController";
import FetchEmployeePolicyProcedure from "../../../controller/user/forms/PolicyprocedureController";
import FetchEmployeeReference from "../../../controller/user/forms/EmployeeReferenceController";
import FetchEmployeeReporting from "../../../controller/user/forms/ReportingController";
import FetchEmployeeSexualHarassment from "../../../controller/user/forms/SexualHarassmentController";
import FetchEmployeeSmoking from "../../../controller/user/forms/SmokingController";
import FetchEmployeeUniversalPrecautions from "../../../controller/user/forms/UniversalPrecautionsController";
import FetchEmployeeVerification from "../../../controller/user/forms/VerificationController";
import { formatDate } from "../../../utils/DateFormatter";

export default function FormsIndex() {
  const [documents, setDocument] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;
  const [errors, setErrors] = useState({});
  const [attendace, getAttendance] = useState([]);
  const [cellular, setCellular] = useState([]);
  const [confidentiality, setConfidentiality] = useState([]);
  const [criminal, setCriminal] = useState([]);
  const [disclaimer, setDisclaimer] = useState([]);
  const [disclosure, setDisclosure] = useState([]);
  const [dressCode, setDressCode] = useState([]);
  const [drugTesting, setDrugTesting] = useState([]);
  const [agreement, setAgreement] = useState([]);
  const [conduct, setConduct] = useState([]);
  const [orientation, setOrientation] = useState([]);
  const [health, setHealth] = useState([]);
  const [HHA, setHHA] = useState([]);
  const [infection, setInfection] = useState([]);
  const [nonCompete, setNonCompete] = useState([]);
  const [policy, setPolicy] = useState([]);
  const [reference, setReference] = useState([]);
  const [reporting, setReporting] = useState([]);
  const [sexual, setSexual] = useState([]);
  const [smoking, setSmoking] = useState([]);
  const [precautions, setPrecautions] = useState([]);
  const [verification, setVerification] = useState([]);

  useEffect(() => {
    fetchApplicationForms(setDocument, setLoading, apiBase, setErrors);
    FetchAttendance(apiBase, setLoading, setErrors, getAttendance);
    FetchCellularUse(setCellular, setLoading, setErrors, apiBase);
    FetchConfidentiality(setLoading, setErrors, apiBase, setConfidentiality);
    FetchCriminal(setLoading, setErrors, setCriminal, apiBase);
    FetchDisclaimer(setLoading, setDisclaimer, setErrors, apiBase);
    FetchEmployeeDisclosure(setDisclosure, setLoading, setErrors, apiBase);
    FetchEmployeeDressCode(setErrors, setLoading, setDressCode, apiBase);
    FetchDrugTesting(apiBase, setErrors, setLoading, setDrugTesting);
    FetchEmployeeAgreement(setLoading, setAgreement, setErrors, apiBase);
    FetchEmployeeConduct(setLoading, setErrors, setConduct, apiBase);
    FetchEmployeeOrientation(setLoading, apiBase, setErrors, setOrientation);
    FetchEmployeeHealthSafety(setHealth, setLoading, setErrors, apiBase);
    FetchEmployeeHHA(setHHA, setLoading, apiBase, setErrors);
    FetchEmployeeInfection(setInfection, setLoading, setErrors, apiBase);
    FetchEmployeeNonCompete(setNonCompete, setErrors, setLoading, apiBase);
    FetchEmployeePolicyProcedure(setPolicy, setErrors, setLoading, apiBase);
    FetchEmployeeReference(setReference, setErrors, setLoading, apiBase);
    FetchEmployeeReporting(setReporting, setLoading, setErrors, apiBase);
    FetchEmployeeSexualHarassment(setSexual, setErrors, setLoading, apiBase);
    FetchEmployeeSmoking(setSmoking, setLoading, setErrors, apiBase);
    FetchEmployeeUniversalPrecautions(
      setPrecautions,
      setLoading,
      setErrors,
      apiBase
    );
    FetchEmployeeVerification(setVerification, setLoading, setErrors, apiBase);
  }, []);


  const forms = [
    {
      application: {
        name: "Application For Employment",
        url: PATHS.USER_APPLICATION_FORM,
        form: documents?.employmentApplication,
        created_at: documents?.employmentApplication?.created_at,
      },

      attendace: {
        name: "Attendance, Tardiness, Absenteeism & Leave",
        url: PATHS.USER_ATTENDANCE_FORM,
        form: attendace?.attendanceData,
        created_at: attendace?.attendanceData?.created_at,
      },

      cellular_use: {
        name: "Employee Safety (Cellular Phone Use)",
        url: PATHS.USER_EMPLOYEE_CELLULAR_USE_FORM,
        form: cellular?.empSafety,
        created_at: cellular?.empSafety?.created_at,
      },

      confidentiality: {
        name: "Confidentiality of Information Agreement",
        url: PATHS.USER_CONFIDENTIALITY_FORM,
        form: confidentiality?.confidentiality,
        created_at: confidentiality?.confidentiality?.created_at,
      },

      criminal: {
        name: "Criminal History Search",
        url: PATHS.USER_CRIMINAL_FORM,
        form: criminal?.criminalHistory,
        created_at: criminal?.criminalHistory?.created_at,
      },

      disclaimer: {
        name: "Disclaimer And Waiver Of Liability",
        url: PATHS.USER_DISCLAIMER_FORM,
        form: disclaimer?.disclaimer,
        created_at: disclaimer?.disclaimer?.created_at,
      },

      disclosure: {
        name: "Sworn Disclosure Statement",
        url: PATHS.USER_DISCLOSURE_FORM,
        form: disclosure?.sworn,
        created_at: disclosure?.sworn?.created_at,
      },

      dress_code: {
        name: "Employee Dress Code",
        url: PATHS.USER_EMPLOYEE_DRESS_CODE_FORM,
        form: dressCode?.dressCode,
        created_at: dressCode?.dressCode?.created_at,
      },

      drug_testing: {
        name: "Drug Testing Policy",
        url: PATHS.USER_DRUG_TESTING_FORM,
        form: drugTesting?.drugTesting,
        created_at: drugTesting?.drugTesting?.created_at,
      },

      employee_agreement: {
        name: "Employee Agreement",
        url: PATHS.USER_EMPLOYEE_AGREEMENT_FORM,
        form: agreement?.agree,
        created_at: agreement?.agree?.created_at,
      },

      employee_conduct: {
        name: "Employee Notification of Policy: Employee Conduct",
        url: PATHS.USER_EMPLOYEE_CONDUCT_FORM,
        form: conduct?.empConduct,
        created_at: conduct?.empConduct?.created_at,
      },

      employee_orientation: {
        name: "Employee Orientation",
        url: PATHS.USER_EMPLOYEE_ORIENTATION_FORM,
        form: orientation?.employeeOrientation,
        created_at: orientation?.employeeOrientation?.created_at,
      },

      health_safety: {
        name: "Health & Safety Agreement",
        url: PATHS.USER_EMPLOYEE_HEALTH_SAFETY_FORM,
        form: health?.healthData,
        created_at: health?.healthData?.created_at,
      },

      hha: {
        name: "Home Health Aide",
        url: PATHS.USER_HHA_FORM,
        form: HHA?.homeHealthData,
        created_at: HHA?.homeHealthData?.created_at,
      },

      infection_control: {
        name: "Infection Control Agreement",
        url: PATHS.USER_INFECTION_CONTROL_FORM,
        form: infection?.infectionData,
        created_at: infection?.infectionData?.created_at,
      },

      non_compete: {
        name: "Non-Compete Agreement",
        url: PATHS.USER_NON_COMPETE_FORM,
        form: nonCompete?.nonCompete,
        created_at: nonCompete?.nonCompete?.created_at,
      },

      policy_procedure: {
        name: "Policies And Procedures Orientation Acknowledgement",
        url: PATHS.USER_POLICIES_PROCEDURES_FORM,
        form: policy?.policy,
        created_at: policy?.policy?.created_at,
      },

      reference_check: {
        name: "Employee Reference Check",
        url: PATHS.USER_EMPLOYEE_REFERENCE_CHECK_FORM,
        form: reference?.empRefCheck,
        created_at: reference?.empRefCheck?.created_at,
      },

      reporting: {
        name: "Reporting: Abuse/Neglect/Exploitation",
        url: PATHS.USER_REPORTING_FORM,
        form: reporting?.reportingData,
        created_at: reporting?.reportingData?.created_at,
      },

      sexual_harassment: {
        name: "Sexual Harassment",
        url: PATHS.USER_SEXUAL_HARASSMENT_FORM,
        form: sexual?.sexualData,
        created_at: sexual?.sexualData?.created,
      },

      smoking: {
        name: "Employee Notification of Policy: Smoking in The Workplace",
        url: PATHS.USER_SMOKING_FORM,
        form: smoking?.smoking,
        created_at: smoking?.smoking?.created_at,
      },

      universal_precautions: {
        name: "Universal Precautions Training Document",
        url: PATHS.USER_UNIVERSAL_PRECAUTIONS_FORM,
        form: precautions?.precautionsData,
        created_at: precautions?.precautionsData?.created_at,
      },

      verification: {
        name: "Verification of Professional License",
        url: PATHS.USER_VERIFICATION_FORM,
        form: verification?.verificationData,
        created_at: verification?.verificationData?.created_at,
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
                                className="ri-file-list-3-fill fs-18 text-primary rounded-circle bg-primary-lighten"
                              ></i>
                              <span className="topic-cell-span">{f.name}</span>
                            </div>
                          </div>
                          <div className="rtable-cell impression-cell">
                            <div className="rtable-cell--heading">
                              Signature
                            </div>
                            <div className="rtable-cell--content replay-link-content ">
                              {f.form ? (
                                <a
                                  className="icon mx-16 my-16 py-8 px-8 rounded-circle bg-primary-lighten"
                                  href="#"
                                >
                                  <i className="ri-check-line fs-18 text-primary"></i>
                                </a>
                              ) : (
                                <a
                                  className="icon mx-16 my-16 py-8 px-8 rounded-circle bg-danger-lighten"
                                  href="#"
                                >
                                  <i className="ri-close-line fs-18 text-danger"></i>
                                </a>
                              )}
                            </div>
                          </div>
                          <div className="rtable-cell rtable-cell--foot sales-cell">
                            <div className="rtable-cell--heading">
                              Date Signed
                            </div>
                            <div className="rtable-cell--content earning-content">
                              {formatDate(f.created_at) ?? "N/A"}
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
