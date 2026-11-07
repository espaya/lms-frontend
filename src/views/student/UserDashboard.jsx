import UserHeader from "../../components/users/UserHeader";
import UserSidebar from "../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { formatDate } from "../../utils/DateFormatter";

// Import all form controllers
import fetchApplicationForms from "../../controller/user/forms/EmploymentApplication";
import FetchAttendance from "../../controller/user/forms/AttendanceController";
import FetchCellularUse from "../../controller/user/forms/CellularUseController";
import FetchConfidentiality from "../../controller/user/forms/ConfidentialityController";
import FetchCriminal from "../../controller/user/forms/CriminalController";
import FetchDisclaimer from "../../controller/user/forms/DisclaimerController";
import FetchEmployeeDisclosure from "../../controller/user/forms/DisclosureController";
import FetchEmployeeDressCode from "../../controller/user/forms/DressCodeController";
import FetchDrugTesting from "../../controller/user/forms/DrugTestingController";
import FetchEmployeeAgreement from "../../controller/user/forms/AgreementController";
import FetchEmployeeConduct from "../../controller/user/forms/EmployeeConductController";
import FetchEmployeeOrientation from "../../controller/user/forms/OrientationController";
import FetchEmployeeHealthSafety from "../../controller/user/forms/HealthSafetyController";
import FetchEmployeeHHA from "../../controller/user/forms/HHAController";
import FetchEmployeeInfection from "../../controller/user/forms/InfectionController";
import FetchEmployeeNonCompete from "../../controller/user/forms/NonCompeteController";
import FetchEmployeePolicyProcedure from "../../controller/user/forms/PolicyprocedureController";
import FetchEmployeeReference from "../../controller/user/forms/EmployeeReferenceController";
import FetchEmployeeReporting from "../../controller/user/forms/ReportingController";
import FetchEmployeeSexualHarassment from "../../controller/user/forms/SexualHarassmentController";
import FetchEmployeeSmoking from "../../controller/user/forms/SmokingController";
import FetchEmployeeUniversalPrecautions from "../../controller/user/forms/UniversalPrecautionsController";
import FetchEmployeeVerification from "../../controller/user/forms/VerificationController";
import FetechEmployeeHandbook from "../../controller/user/forms/EmployeeHandbookController";

export default function UserDashboard() {
  const apiBase = import.meta.env.VITE_API_URL;
  const authToken = localStorage.getItem("auth_token");
  const csrfToken = Cookies.get("XSRF-TOKEN");

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  // Form States
  const [documents, setDocument] = useState(null);
  const [attendance, getAttendance] = useState(null);
  const [cellular, setCellular] = useState(null);
  const [confidentiality, setConfidentiality] = useState(null);
  const [criminal, setCriminal] = useState(null);
  const [disclaimer, setDisclaimer] = useState(null);
  const [disclosure, setDisclosure] = useState(null);
  const [dressCode, setDressCode] = useState(null);
  const [drugTesting, setDrugTesting] = useState(null);
  const [agreement, setAgreement] = useState(null);
  const [conduct, setConduct] = useState(null);
  const [orientation, setOrientation] = useState(null);
  const [health, setHealth] = useState(null);
  const [HHA, setHHA] = useState(null);
  const [infection, setInfection] = useState(null);
  const [nonCompete, setNonCompete] = useState(null);
  const [policy, setPolicy] = useState(null);
  const [reference, setReference] = useState(null);
  const [reporting, setReporting] = useState(null);
  const [sexual, setSexual] = useState(null);
  const [smoking, setSmoking] = useState(null);
  const [precautions, setPrecautions] = useState(null);
  const [verification, setVerification] = useState(null);
  const [handbook, setHandbook] = useState(null);

  // Quiz States
  const [recentQuizzes, setRecentQuizzes] = useState([]);

  // Fetch Quizzes
  // Fetch Quizzes
  const fetchQuizzes = async () => {
    try {
      const response = await fetch(`${apiBase}/api/user/quizzes?page=1`, {
        credentials: "include",
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": csrfToken ? decodeURIComponent(csrfToken) : "",
        },
      });

      const data = await response.json();

      if (response.ok && data.data) {
        // Flatten the data: Quizzes -> Topics
        const flattenedTopics = data.data.flatMap((quiz) =>
          quiz.topics.map((topic) => {
            // Check if answered (handles both boolean true and integer 1)
            const isAnswered =
              topic.is_answered === true || topic.is_answered === 1;

            // Calculate score safely
            let calculatedScore = null;
            if (isAnswered && topic.total > 0) {
              calculatedScore =
                Math.round((topic.score / topic.total) * 100) + "%";
            } else if (isAnswered) {
              calculatedScore = "0%"; // If answered but total is 0
            }

            return {
              id: topic.id,
              name: topic.name,
              date: formatDate(quiz.created_at),
              status: isAnswered ? "Completed" : "Pending",
              score: calculatedScore,
            };
          }),
        );

        setRecentQuizzes(flattenedTopics.slice(0, 5));
      }
    } catch (err) {
      console.error("Error fetching quizzes:", err);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          // Fetch Forms
          fetchApplicationForms(setDocument, setLoading, apiBase, setErrors),
          FetchAttendance(apiBase, setLoading, setErrors, getAttendance),
          FetchCellularUse(setCellular, setLoading, setErrors, apiBase),
          FetchConfidentiality(
            setLoading,
            setErrors,
            apiBase,
            setConfidentiality,
          ),
          FetchCriminal(setLoading, setErrors, setCriminal, apiBase),
          FetchDisclaimer(setLoading, setDisclaimer, setErrors, apiBase),
          FetchEmployeeDisclosure(
            setDisclosure,
            setLoading,
            setErrors,
            apiBase,
          ),
          FetchEmployeeDressCode(setErrors, setLoading, setDressCode, apiBase),
          FetchDrugTesting(apiBase, setErrors, setLoading, setDrugTesting),
          FetchEmployeeAgreement(setLoading, setAgreement, setErrors, apiBase),
          FetchEmployeeConduct(setLoading, setErrors, setConduct, apiBase),
          FetchEmployeeOrientation(
            setLoading,
            apiBase,
            setErrors,
            setOrientation,
          ),
          FetchEmployeeHealthSafety(setHealth, setLoading, setErrors, apiBase),
          FetchEmployeeHHA(setHHA, setLoading, apiBase, setErrors),
          FetchEmployeeInfection(setInfection, setLoading, setErrors, apiBase),
          FetchEmployeeNonCompete(
            setNonCompete,
            setErrors,
            setLoading,
            apiBase,
          ),
          FetchEmployeePolicyProcedure(
            setPolicy,
            setErrors,
            setLoading,
            apiBase,
          ),
          FetchEmployeeReference(setReference, setErrors, setLoading, apiBase),
          FetchEmployeeReporting(setReporting, setLoading, setErrors, apiBase),
          FetchEmployeeSexualHarassment(
            setSexual,
            setErrors,
            setLoading,
            apiBase,
          ),
          FetchEmployeeSmoking(setSmoking, setLoading, setErrors, apiBase),
          FetchEmployeeUniversalPrecautions(
            setPrecautions,
            setLoading,
            setErrors,
            apiBase,
          ),
          FetchEmployeeVerification(
            setVerification,
            setLoading,
            setErrors,
            apiBase,
          ),
          FetechEmployeeHandbook(setLoading, setErrors, setHandbook, apiBase),

          // Fetch Quizzes
          fetchQuizzes(),
        ]);
      } catch (err) {
        console.error("Dashboard fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [apiBase]);

  // Helper to check if a form is signed based on the API response structure
  const isSigned = (formState, propName) => {
    return formState && formState[propName] ? true : false;
  };

  // Define all forms and map them to their specific API response property
  const formList = [
    {
      name: "Application For Employment",
      signed: isSigned(documents, "employmentApplication"),
    },
    {
      name: "Attendance, Tardiness",
      signed: isSigned(attendance, "attendanceData"),
    },
    { name: "Cellular Phone Use", signed: isSigned(cellular, "empSafety") },
    {
      name: "Confidentiality Agreement",
      signed: isSigned(confidentiality, "confidentiality"),
    },
    {
      name: "Criminal History Search",
      signed: isSigned(criminal, "criminalHistory"),
    },
    { name: "Disclaimer & Waiver", signed: isSigned(disclaimer, "disclaimer") },
    {
      name: "Sworn Disclosure Statement",
      signed: isSigned(disclosure, "sworn"),
    },
    { name: "Dress Code", signed: isSigned(dressCode, "dressCode") },
    {
      name: "Drug Testing Policy",
      signed: isSigned(drugTesting, "drugTesting"),
    },
    { name: "Employee Agreement", signed: isSigned(agreement, "agree") },
    { name: "Employee Conduct", signed: isSigned(conduct, "empConduct") },
    {
      name: "Employee Orientation",
      signed: isSigned(orientation, "employeeOrientation"),
    },
    {
      name: "Health & Safety Agreement",
      signed: isSigned(health, "healthData"),
    },
    { name: "Home Health Aide", signed: isSigned(HHA, "homeHealthData") },
    { name: "Infection Control", signed: isSigned(infection, "infectionData") },
    {
      name: "Non-Compete Agreement",
      signed: isSigned(nonCompete, "nonCompete"),
    },
    { name: "Policies & Procedures", signed: isSigned(policy, "policy") },
    {
      name: "Employee Reference Check",
      signed: isSigned(reference, "empRefCheck"),
    },
    {
      name: "Reporting Abuse/Neglect",
      signed: isSigned(reporting, "reportingData"),
    },
    { name: "Sexual Harassment", signed: isSigned(sexual, "sexualData") },
    { name: "Smoking Policy", signed: isSigned(smoking, "smoking") },
    {
      name: "Universal Precautions",
      signed: isSigned(precautions, "precautionsData"),
    },
    {
      name: "Professional License Verification",
      signed: isSigned(verification, "verificationData"),
    },
    { name: "Employee Handbook", signed: isSigned(handbook, "handbook") },
  ];

  // Calculate Form Metrics
  const totalForms = formList.length;
  const signedFormsCount = formList.filter((f) => f.signed).length;
  const pendingFormsCount = totalForms - signedFormsCount;
  const complianceStatus = pendingFormsCount === 0 ? "Complete" : "In Progress";

  // Calculate Quiz Metrics
  const pendingQuizzesCount = recentQuizzes.filter(
    (q) => q.status === "Pending",
  ).length;

  return (
    <>
      <title>Dashboard - 1staccess Home Care</title>

      <div id="main-wrapper">
        <UserHeader />
        <UserSidebar />

        <div className="content-body">
          <div className="container">
            {/* Page Title */}
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>Welcome Back!</h3>
                    <p className="mb-2">
                      Here is an overview of your assigned tasks and compliance.
                    </p>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="breadcrumbs">
                    <a href="#">Home</a>
                    <span>
                      <i className="ri-arrow-right-s-line"></i>
                    </span>
                    <a href="#">Dashboard</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Alert if forms are pending */}
            {pendingFormsCount > 0 && (
              <div
                className="alert alert-warning alert-dismissible fade show mb-4"
                role="alert"
              >
                <i className="ri-error-warning-line me-2 fs-18"></i>
                <strong>Action Required:</strong> You have {pendingFormsCount}{" "}
                mandatory form(s) that need to be signed.
                <Link
                  to={PATHS.USER_FORMS}
                  className="alert-link ms-1 text-decoration-underline"
                >
                  Review Forms Now
                </Link>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            )}

            {/* Top Stat Widgets */}
            <div className="row">
              {/* Pending Forms */}
              <div className="col-xl-3 col-lg-6 col-sm-6">
                <div className="widget-stat card">
                  <div className="card-body p-4">
                    <div className="media ai-icon">
                      <span className="me-3 bgl-danger text-danger">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                      </span>
                      <div className="media-body">
                        <p className="mb-1">Pending Forms</p>
                        <h4 className="mb-0">
                          {loading ? "..." : pendingFormsCount}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Signed Forms */}
              <div className="col-xl-3 col-lg-6 col-sm-6">
                <div className="widget-stat card">
                  <div className="card-body p-4">
                    <div className="media ai-icon">
                      <span className="me-3 bgl-success text-success">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <path d="M9 15l2 2 4-4"></path>
                        </svg>
                      </span>
                      <div className="media-body">
                        <p className="mb-1">Signed Forms</p>
                        <h4 className="mb-0">
                          {loading ? "..." : signedFormsCount}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pending Quizzes */}
              <div className="col-xl-3 col-lg-6 col-sm-6">
                <div className="widget-stat card">
                  <div className="card-body p-4">
                    <div className="media ai-icon">
                      <span className="me-3 bgl-warning text-warning">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                      </span>
                      <div className="media-body">
                        <p className="mb-1">Pending Quizzes</p>
                        <h4 className="mb-0">
                          {loading ? "..." : pendingQuizzesCount}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compliance Status */}
              <div className="col-xl-3 col-lg-6 col-sm-6">
                <div className="widget-stat card">
                  <div className="card-body p-4">
                    <div className="media ai-icon">
                      <span
                        className={`me-3 ${complianceStatus === "Complete" ? "bgl-success text-success" : "bgl-primary text-primary"}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                      </span>
                      <div className="media-body">
                        <p className="mb-1">Compliance Status</p>
                        <h4 className="mb-0">
                          {loading ? "..." : complianceStatus}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              {/* Recent Quizzes Table */}
              <div className="col-xl-8 col-lg-12">
                <div className="card">
                  <div className="card-header border-0 pb-0">
                    <h4 className="card-title">Recent Quizzes</h4>
                    <Link
                      to={PATHS.USER_QUIZZES || "#"}
                      className="btn btn-primary btn-sm"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-responsive-md">
                        <thead>
                          <tr>
                            <th style={{ width: "80px" }}>
                              <strong>#</strong>
                            </th>
                            <th>
                              <strong>Quiz Topic Name</strong>
                            </th>
                            <th>
                              <strong>Date Assigned</strong>
                            </th>
                            <th>
                              <strong>Score</strong>
                            </th>
                            <th>
                              <strong>Status</strong>
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {loading ? (
                            <tr>
                              <td colSpan="5" className="text-center">
                                Loading quizzes...
                              </td>
                            </tr>
                          ) : recentQuizzes.length === 0 ? (
                            <tr>
                              <td
                                colSpan="5"
                                className="text-center text-muted"
                              >
                                No quizzes assigned yet.
                              </td>
                            </tr>
                          ) : (
                            recentQuizzes.map((quiz, index) => (
                              <tr key={quiz.id}>
                                <td>
                                  <strong>{index + 1}</strong>
                                </td>
                                <td>{quiz.name}</td>
                                <td>{quiz.date}</td>
                                <td>
                                  {/* Check explicitly for null/undefined so 0% shows up */}
                                  {quiz.score !== null &&
                                  quiz.score !== undefined ? (
                                    <span className="badge light badge-success">
                                      {quiz.score}
                                    </span>
                                  ) : (
                                    <span className="text-muted">-</span>
                                  )}
                                </td>
                                <td>
                                  {quiz.status === "Completed" ? (
                                    <span className="badge light badge-success">
                                      Completed
                                    </span>
                                  ) : (
                                    <span className="badge light badge-warning">
                                      Pending
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links / Handbook */}
              <div className="col-xl-4 col-lg-12">
                <div className="card">
                  <div className="card-header border-0 pb-0">
                    <h4 className="card-title">Important Documents</h4>
                  </div>
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3 p-3 border rounded">
                      <div className="me-3">
                        <i className="ri-book-read-line fs-30 text-primary"></i>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">Employee Handbook</h6>
                        <p className="mb-0 text-muted fs-12">
                          {isSigned(handbook, "handbook")
                            ? "Already Signed"
                            : "Pending Signature"}
                        </p>
                      </div>
                      <Link
                        to={PATHS.USER_EMPLOYEE_HANDBOOK_FORM}
                        className="btn btn-light btn-sm text-primary"
                      >
                        <i className="ri-arrow-right-line"></i>
                      </Link>
                    </div>

                    <div className="d-flex align-items-center mb-3 p-3 border rounded">
                      <div className="me-3">
                        <i className="ri-shield-check-line fs-30 text-success"></i>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">Signed Forms</h6>
                        <p className="mb-0 text-muted fs-12">
                          View your completed forms
                        </p>
                      </div>
                      <Link
                        to={PATHS.USER_FORMS}
                        className="btn btn-light btn-sm text-primary"
                      >
                        <i className="ri-arrow-right-line"></i>
                      </Link>
                    </div>

                    <div className="d-flex align-items-center p-3 border rounded">
                      <div className="me-3">
                        <i className="ri-question-answer-line fs-30 text-warning"></i>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">Need Help?</h6>
                        <p className="mb-0 text-muted fs-12">
                          Contact administrator
                        </p>
                      </div>
                      <a
                        href="mailto:admin@1staccesshomecareinc.com"
                        className="btn btn-light btn-sm text-primary"
                      >
                        <i className="ri-mail-line"></i>
                      </a>
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
