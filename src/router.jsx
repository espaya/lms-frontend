import { createBrowserRouter } from "react-router-dom";
import GuestRoute from "./auth/GuestRoute";
import ProtectedRoute from "./auth/ProtectedRoute";
import NotFound from "./views/NotFound";
import Account from "./views/Account";
import AdminDashboard from "./views/admin/AdminDashboard";
import UserDashboard from "./views/student/UserDashboard";
import Home from "./views/Home";
import QuestionManager from "./views/admin/QuestionManager";
import AllQuestions from "./views/admin/AllQuestions";
import Subject from "./views/admin/Subject";
import Topic from "./views/admin/Topic";
import Questions from "./views/student/Questions";
import Users from "./views/admin/Users";
import AddUser from "./views/admin/AddUser";
import SingleUser from "./views/admin/SingleUser";
import MyProfile from "./views/student/MyProfile";
import Quizzes from "./views/admin/single_user/Quizzes";
import ViewerPage from "./components/users/questions/ViewerPage";
import Reports from "./views/admin/Reports";
import PreviewReport from "./components/PreviewReport";
import EditQuestion from "./views/admin/EditQuestion";
import FormsIndex from "./views/student/forms/FormsIndex";
import MainApplication from "./views/student/forms/MainApplication";
import Attendance from "./views/student/forms/Attendance";
import Confidentiality from "./views/student/forms/Confidentiality";
import Criminal from "./views/student/forms/Criminal";
import Disclaimer from "./views/student/forms/Disclaimer";
import DrugTesting from "./views/student/forms/DrugTesting";
import EmployeeConduct from "./views/student/forms/EmployeeConduct";
import DressCode from "./views/student/forms/DressCode";
import EmployeeOrientation from "./views/student/forms/EmployeeOrientation";
import EmployeeAgreement from "./views/student/forms/EmployeeAgreement";
import EmployeeReferenceCheck from "./views/student/forms/EmployeeReferenceCheck";
import Verification from "./views/student/forms/Verification";
import UniversalPrecautions from "./views/student/forms/UniversalPrecautions";
import Disclosure from "./views/student/forms/Disclosure";
import Smoking from "./views/student/forms/Smoking";
import SexualHarassment from "./views/student/forms/SexualHarassment";
import Reporting from "./views/student/forms/Reporting";
import PolicyProcedure from "./views/student/forms/PolicyProcedure";
import NonCompete from "./views/student/forms/NonCompete";
import InfectionControl from "./views/student/forms/InfectionControl";
import HHA from "./views/student/forms/HHA";
import HealthSafety from "./views/student/forms/HealthSafety";
import CellularUse from "./views/student/forms/CellularUse";
import SingleUserForms from "./views/admin/forms/SingleUserForms";
import SignedAttendance from "./views/admin/forms/attendance/SignedAttendance";
import SignedCellularUse from "./views/admin/forms/cellular_use/SignedCellularUse";
import SignedConfidentiality from "./views/admin/forms/confidentiality/SignedConfidentiality";
import SignedCriminal from "./views/admin/forms/criminal/SignedCriminal";
import SignedDisclosure from "./views/admin/forms/disclosure/SignedDisclosure";
import SignedDressCode from "./views/admin/forms/dress_code/SignedDressCode";
import SignedDrugTesting from "./views/admin/forms/drug_testing/SignedDrugTesting";
import SignedEmployeeAgreement from "./views/admin/forms/employee_agreement/SIgnedEmployeeAgreement";
import SignedEmployeeConduct from "./views/admin/forms/employee_conduct/SIgnedEmployeeConduct";
import SignedEmployeeHHA from "./views/admin/forms/employee_hha/SignedEmployeeHHA";
import SignedEmployeeOrientation from "./views/admin/forms/employee_orientation/SignedEmployeeOrientation";
import SignedEmployeeReferenceCheck from "./views/admin/forms/employee_reference_check/SignedEmployeeReferenceCheck";
import SignedHealthSafety from "./views/admin/forms/health_safety/SignedHealthSafety";
import SignedInfectionControl from "./views/admin/forms/infection_control/SignedInfectionControl";
// import SignedMainForms from "./views/admin/forms/main/SignedMainForms";
import SignedMainForms from "./views/admin/forms/main/SignedMain";
import SignedNonCompete from "./views/admin/forms/non_compete/SignedNonCompete";
import SignedPolicyProcedure from "./views/admin/forms/policy_procedure/SignedPolicyProcedure";
import SignedReporting from "./views/admin/forms/reporting/SignedReporting";
import SignedSexualHarassment from "./views/admin/forms/sexual_harassment/SignedSexualHarassment";
import SignedSmoking from "./views/admin/forms/smoking/SignedSmoking";
import SignedUniversalPrecaution from "./views/admin/forms/universal_precaution/SignedUniversalPrecaution";
import SignedVerification from "./views/admin/forms/verification/SignedVerification";
import SignedDisclaimer from "./views/admin/forms/disclaimer/SignedDisclaimer";

// Centralized route configuration with metadata
export const ROUTE_CONFIG = {
  // router.js
  HOME: {
    path: "/",
    element: (
      <GuestRoute>
        <Home />
      </GuestRoute>
    ),
    name: "Home",
    isProtected: false,
  },

  ACCOUNT: {
    path: "/account",
    element: <Account />,
    name: "Account",
    isProtected: true,
    roles: ["USER", "ADMIN"], // ✅ optional
  },

  ADMIN_DASHBOARD: {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    name: "Admin Dashboard",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  QUESTION_MANAGER: {
    path: "/admin/dashboard/question-manager",
    element: <QuestionManager />,
    name: "Question Manager",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  REPORTS: {
    path: "/admin/dashboard/reports",
    element: <Reports />,
    name: "Reports",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  PREVIEW_REPORT: {
    path: "/admin/dashboard/reports/:id",
    element: <PreviewReport />,
    name: "Preview Report",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  SUBJECT: {
    path: "/admin/dashboard/subjects",
    element: <Subject />,
    name: "All Subjects",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  TOPIC: {
    path: "/admin/dashboard/topics/",
    element: <Topic />,
    name: "Single Subject",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  ADMIN_USERS: {
    path: "/admin/dashboard/users/",
    element: <Users />,
    name: "All Users ",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  SINGLE_USER: {
    path: "/admin/dashboard/users/:username",
    element: <SingleUser />,
    name: "Single User",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  SINGLE_USER_QUIZZES: {
    path: "/admin/dashboard/users/:username/quizzes",
    element: <Quizzes />,
    name: "Single User Quizzes",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  ADD_USERS: {
    path: "/admin/dashboard/users/add",
    element: <AddUser />,
    name: "All Users ",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  ALL_QUESTIONS: {
    path: "/admin/dashboard/all-questions",
    element: <AllQuestions />,
    name: "All Question",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  EDIT_QUESTION: {
    path: "/admin/dashboard/all-questions/:id",
    element: <EditQuestion />,
    name: "Edit Question",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  // Signed forms for admin
  SINGLE_USER_FORMS: {
    path: "/admin/dashboard/users/:username/forms",
    element: <SingleUserForms />,
    name: "Single User Forms",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  SIGNED_ATTENDANCE: {
    path: "/admin/dashboard/users/:username/forms/attendance",
    element: <SignedAttendance />,
    name: "Attendance",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  SIGNED_CELLULAR_USE: {
    path: "/admin/dashboard/users/:username/forms/cellular-use",
    element: <SignedCellularUse />,
    name: "Cellular Use",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  SIGNED_CONFIDENTIALITY: {
    path: "/admin/dashboard/users/:username/forms/confidentiality-agreement",
    element: <SignedConfidentiality />,
    name: "Confidentiality Agreement",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  SIGNED_CRIMINAL: {
    path: "/admin/dashboard/users/:username/forms/criminal-history-search",
    element: <SignedCriminal />,
    name: "Criminal History Search",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  SIGNED_DISCLAIMER: {
    path: "/admin/dashboard/users/:username/forms/disclaimer-and-waiver-of-liability",
    element: <SignedDisclaimer />,
    name: "Disclaimer And Waiver of Liability",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  SIGNED_DISCLOSURE: {
    path: "/admin/dashboard/users/:username/forms/sworn-disclosure-statement",
    element: <SignedDisclosure />,
    name: "Sworn Disclosure Statement",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  SIGNED_DRESS_CODE: {
    path: "/admin/dashboard/users/:username/forms/employee-dress-code",
    element: <SignedDressCode />,
    name: "Employee Dress Code",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  SIGNED_DRUG_TESTING: {
    path: "/admin/dashboard/users/:username/forms/drug-testing-policy",
    element: <SignedDrugTesting />,
    name: "Drug Testing Policy",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  SIGNED_EMPLOYEE_AGREEMENT: {
    path: "/admin/dashboard/users/:username/forms/employee-agreement",
    element: <SignedEmployeeAgreement />,
    name: "Employee Agreement",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  SIGNED_EMPLOYEE_CONDUCT: {
    path: "/admin/dashboard/users/:username/forms/employee-notification-of-policy-employee-conduct",
    element: <SignedEmployeeConduct />,
    name: "Employee Notification of Policy: Employee Conduct",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  SIGNED_EMPLOYEE_HHA: {
    path: "/admin/dashboard/users/:username/forms/employee-hha",
    element: <SignedEmployeeHHA />,
    name: "Employee Home Health Aide",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  SIGNED_EMPLOYEE_ORIENTATION: {
    path: "/admin/dashboard/users/:username/forms/employee-orientation",
    element: <SignedEmployeeOrientation />,
    name: "Employee Orientation",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  SIGNED_EMPLOYEE_REFERENCE_CHECK: {
    path: "/admin/dashboard/users/:username/forms/employee-reference-check",
    element: <SignedEmployeeReferenceCheck />,
    name: "Employee Reference Check",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  SIGNED_HEALTH_SAFETY: {
    path: "/admin/dashboard/users/:username/forms/health-safety-agreement",
    element: <SignedHealthSafety />,
    name: "Health Safety Agreement",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  SIGNED_INFECTION_CONTROL: {
    path: "/admin/dashboard/users/:username/forms/infection-control-agreement",
    element: <SignedInfectionControl />,
    name: "Infection Control Agreement",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  SIGNED_APPLICATION: {
    path: "/admin/dashboard/users/:username/forms/application-for-employment",
    element: <SignedMainForms />,
    name: "Application For Employment",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  SIGNED_NON_COMPETE: {
    path: "/admin/dashboard/users/:username/forms/non-compete-agreement",
    element: <SignedNonCompete />,
    name: "Non Compete Agreement",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  SIGNED_POLICY_PROCEDURE: {
    path: "/admin/dashboard/users/:username/forms/policies-and-procedures-orientation-acknowledgement",
    element: <SignedPolicyProcedure />,
    name: "Policies And Procedures Orientation Acknowledgement",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  SIGNED_REPORTING: {
    path: "/admin/dashboard/users/:username/forms/reporting-abuse-neglect-emploitation",
    element: <SignedReporting />,
    name: "Reporting: Abuse/neglect/Exploitation",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  SIGNED_SEXUAL_HARASSMENT: {
    path: "/admin/dashboard/users/:username/forms/sexual-harassment",
    element: <SignedSexualHarassment />,
    name: "Sexual Harassment",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  SIGNED_SMOKING: {
    path: "/admin/dashboard/users/:username/forms/smoking-in-the-workplace",
    element: <SignedSmoking />,
    name: "Smoking In The Workplace Harassment",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  SIGNED_UNIVERSAL_PRECAUTION: {
    path: "/admin/dashboard/users/:username/forms/universal-precaution",
    element: <SignedUniversalPrecaution />,
    name: "Universal Precaution",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },

  SIGNED_VERIFICATION: {
    path: "/admin/dashboard/users/:username/forms/verification-of-professional-license",
    element: <SignedVerification />,
    name: "Verification of Professional License",
    isProtected: true,
    roles: ["ADMIN"], // ✅ restrict to ADMIN only
  },
  // End signed forms for admin

  // users dashboard route
  USER_DASHBOARD: {
    path: "/user/dashboard",
    element: <UserDashboard />,
    name: "User Dashboard",
    isProtected: true,
    roles: ["USER"],
  },

  USER_PROFILE: {
    path: "/user/dashboard/profile",
    element: <MyProfile />,
    name: "User Dashboard",
    isProtected: true,
    roles: ["USER"],
  },

  VIEWER_PAGE: {
    path: "/viewer",
    element: <ViewerPage />,
    name: "Question Viewer",
    isProtected: true,
    roles: ["USER"],
  },

  USER_QUESTION: {
    path: "/user/dashboard/questions",
    element: <Questions />,
    name: "User Dashboard",
    isProtected: true,
    roles: ["USER"],
  },

  // User application forms
  USER_FORMS: {
    path: "/user/dashboard/forms",
    element: <FormsIndex />,
    name: "Forms",
    isProtected: true,
    roles: ["USER"],
  },

  USER_APPLICATION_FORM: {
    path: "/user/dashboard/forms/application-forms",
    element: <MainApplication />,
    name: "Application Form",
    isProtected: true,
    roles: ["USER"],
  },

  USER_ATTENDANCE_FORM: {
    path: "/user/dashboard/forms/attendance-tardiness-absenteeism-leave-forms",
    element: <Attendance />,
    name: "Attendance",
    isProtected: true,
    roles: ["USER"],
  },

  USER_CONFIDENTIALITY_FORM: {
    path: "/user/dashboard/forms/confidentiality-of-information-forms",
    element: <Confidentiality />,
    name: "Confidentiality",
    isProtected: true,
    roles: ["USER"],
  },

  USER_CRIMINAL_FORM: {
    path: "/user/dashboard/forms/criminal-history-search-forms",
    element: <Criminal />,
    name: "Confidentiality",
    isProtected: true,
    roles: ["USER"],
  },

  USER_DISCLAIMER_FORM: {
    path: "/user/dashboard/forms/disclaimer-and-waiver-of-liability-forms",
    element: <Disclaimer />,
    name: "Disclaimer",
    isProtected: true,
    roles: ["USER"],
  },

  USER_DRUG_TESTING_FORM: {
    path: "/user/dashboard/forms/drug-testing-policy-forms",
    element: <DrugTesting />,
    name: "Drug Testing",
    isProtected: true,
    roles: ["USER"],
  },

  USER_EMPLOYEE_CONDUCT_FORM: {
    path: "/user/dashboard/forms/employee-notification-of-policy-employee-conduct-forms",
    element: <EmployeeConduct />,
    name: "Employee Conduct",
    isProtected: true,
    roles: ["USER"],
  },

  USER_EMPLOYEE_DRESS_CODE_FORM: {
    path: "/user/dashboard/forms/employee-dress-code-forms",
    element: <DressCode />,
    name: "Employee Dress Code",
    isProtected: true,
    roles: ["USER"],
  },

  USER_EMPLOYEE_ORIENTATION_FORM: {
    path: "/user/dashboard/forms/employee-orientation-forms",
    element: <EmployeeOrientation />,
    name: "Employee orientation",
    isProtected: true,
    roles: ["USER"],
  },

  USER_EMPLOYEE_AGREEMENT_FORM: {
    path: "/user/dashboard/forms/employee-agreement-forms",
    element: <EmployeeAgreement />,
    name: "Employee Agreement",
    isProtected: true,
    roles: ["USER"],
  },

  USER_EMPLOYEE_REFERENCE_CHECK_FORM: {
    path: "/user/dashboard/forms/employee-reference-check-forms",
    element: <EmployeeReferenceCheck />,
    name: "Employee Reference Check",
    isProtected: true,
    roles: ["USER"],
  },

  USER_EMPLOYEE_CELLULAR_USE_FORM: {
    path: "/user/dashboard/forms/employee-safety-cellular-phone-use-forms",
    element: <CellularUse />,
    name: "Employee Cellular Use",
    isProtected: true,
    roles: ["USER"],
  },

  USER_EMPLOYEE_HEALTH_SAFETY_FORM: {
    path: "/user/dashboard/forms/employee-health-safety-agreement-forms",
    element: <HealthSafety />,
    name: "Employee Health and Safety",
    isProtected: true,
    roles: ["USER"],
  },

  USER_HHA_FORM: {
    path: "/user/dashboard/forms/hha-forms",
    element: <HHA />,
    name: "HHA",
    isProtected: true,
    roles: ["USER"],
  },

  USER_INFECTION_CONTROL_FORM: {
    path: "/user/dashboard/forms/infection-control-agreement-forms",
    element: <InfectionControl />,
    name: "Infection Control",
    isProtected: true,
    roles: ["USER"],
  },

  USER_NON_COMPETE_FORM: {
    path: "/user/dashboard/forms/non-compete-agreement-forms",
    element: <NonCompete />,
    name: "None Compete",
    isProtected: true,
    roles: ["USER"],
  },

  USER_POLICIES_PROCEDURES_FORM: {
    path: "/user/dashboard/forms/policies-and-procedures-orientation-acknowledgement-forms",
    element: <PolicyProcedure />,
    name: "None Compete",
    isProtected: true,
    roles: ["USER"],
  },

  USER_REPORTING_FORM: {
    path: "/user/dashboard/forms/reporting-abuse-neglect-exploitation-forms",
    element: <Reporting />,
    name: "Reporting",
    isProtected: true,
    roles: ["USER"],
  },

  USER_SEXUAL_HARASSMENT_FORM: {
    path: "/user/dashboard/forms/sexual-harassment-forms",
    element: <SexualHarassment />,
    name: "Sexual Harassment",
    isProtected: true,
    roles: ["USER"],
  },

  USER_SMOKING_FORM: {
    path: "/user/dashboard/forms/employee-notification-of-policy-smoking-in-the-workplace-forms",
    element: <Smoking />,
    name: "Smoking in The Workplace",
    isProtected: true,
    roles: ["USER"],
  },

  USER_DISCLOSURE_FORM: {
    path: "/user/dashboard/forms/sworn-disclosure-statement-forms",
    element: <Disclosure />,
    name: "Sworn Disclosure",
    isProtected: true,
    roles: ["USER"],
  },

  USER_UNIVERSAL_PRECAUTIONS_FORM: {
    path: "/user/dashboard/forms/universal-precautions-training-document-forms",
    element: <UniversalPrecautions />,
    name: "Universal Precautions",
    isProtected: true,
    roles: ["USER"],
  },

  USER_VERIFICATION_FORM: {
    path: "/user/dashboard/forms/verification-of-professional-license-forms",
    element: <Verification />,
    name: "Verification",
    isProtected: true,
    roles: ["USER"],
  },

  // User forms end here

  NOT_FOUND: {
    path: "*",
    element: <NotFound />,
    name: "Not Found",
    isProtected: false,
  },
};

// Helper functions for route access
export const getRoutePath = (routeName) => {
  const route = Object.values(ROUTE_CONFIG).find((r) => r.name === routeName);
  return route ? route.path : "/";
};

export const getRouteElement = (routeName) => {
  const route = Object.values(ROUTE_CONFIG).find((r) => r.name === routeName);
  return route ? route.element : <NotFound />;
};

// Create the router
const router = createBrowserRouter(
  Object.values(ROUTE_CONFIG).map(
    ({ path, element, isProtected, isGuestOnly, roles = [] }) => ({
      path,
      element: isProtected ? (
        <ProtectedRoute roles={roles}>{element}</ProtectedRoute>
      ) : isGuestOnly ? (
        <GuestRoute>{element}</GuestRoute>
      ) : (
        element
      ),
    })
  ),
  {
    basename: "/", // Add this if your app is at root, or "/subfolder" if applicable
  }
);

export default router;

// Path constants for direct usage
export const PATHS = Object.fromEntries(
  Object.entries(ROUTE_CONFIG).map(([key, value]) => [key, value.path])
);
