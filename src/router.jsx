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
import AttendanceForms from "./views/student/forms/attendance/AttendanceForm";
import Confidentiality from "./views/student/forms/Confidentiality";
import Criminal from "./views/student/forms/Criminal";
import Disclaimer from "./views/student/forms/Disclaimer";
import DrugTesting from "./views/student/forms/DrugTesting";
import EmployeeConduct from "./views/student/forms/EmployeeConduct";
import DressCode from "./views/student/forms/DressCode";
import EmployeeOrientation from "./views/student/forms/EmployeeOrientation";
import EmployeeAgreement from "./views/student/forms/EmployeeAgreement";

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
    element: <MainApplication />,
    name: "Employee Reference Check",
    isProtected: true,
    roles: ["USER"],
  },

  USER_EMPLOYEE_CELLULAR_USE_FORM: {
    path: "/user/dashboard/forms/employee-safety-cellular-phone-use-forms",
    element: <MainApplication />,
    name: "Employee Cellular Use",
    isProtected: true,
    roles: ["USER"],
  },

  USER_EMPLOYEE_HEALTH_SAFETY_FORM: {
    path: "/user/dashboard/forms/employee-health-safety-agreement-forms",
    element: <MainApplication />,
    name: "Employee Health and Safety",
    isProtected: true,
    roles: ["USER"],
  },

  USER_HHA_CNA_FORM: {
    path: "/user/dashboard/forms/hha-cna-forms",
    element: <MainApplication />,
    name: "HHA CNA",
    isProtected: true,
    roles: ["USER"],
  },

  USER_HHA_FORM: {
    path: "/user/dashboard/forms/hha-forms",
    element: <MainApplication />,
    name: "HHA",
    isProtected: true,
    roles: ["USER"],
  },

  USER_INFECTION_CONTROL_FORM: {
    path: "/user/dashboard/forms/infection-control-agreement-forms",
    element: <MainApplication />,
    name: "Infection Control",
    isProtected: true,
    roles: ["USER"],
  },

  USER_NON_COMPETE_FORM: {
    path: "/user/dashboard/forms/non-compete-agreement-forms",
    element: <MainApplication />,
    name: "None Compete",
    isProtected: true,
    roles: ["USER"],
  },

  USER_POLICIES_PROCEDURES_FORM: {
    path: "/user/dashboard/forms/policies-and-procedures-orientation-acknowledgement-forms",
    element: <MainApplication />,
    name: "None Compete",
    isProtected: true,
    roles: ["USER"],
  },

  USER_REPORTING_FORM: {
    path: "/user/dashboard/forms/reporting-abuse-neglect-exploitation-forms",
    element: <MainApplication />,
    name: "Reporting",
    isProtected: true,
    roles: ["USER"],
  },

  USER_SEXUAL_HARASSMENT_FORM: {
    path: "/user/dashboard/forms/sexual-harassment-forms",
    element: <MainApplication />,
    name: "Sexual Harassment",
    isProtected: true,
    roles: ["USER"],
  },

  USER_SMOKING_FORM: {
    path: "/user/dashboard/forms/employee-notification-of-policy-smoking-in-the-workplace-forms",
    element: <MainApplication />,
    name: "Smoking in The Workplace",
    isProtected: true,
    roles: ["USER"],
  },

  USER_DISCLOSURE_FORM: {
    path: "/user/dashboard/forms/sworn-disclosure-statement-forms",
    element: <MainApplication />,
    name: "Sworn Disclosure",
    isProtected: true,
    roles: ["USER"],
  },

  USER_UNIVERSAL_PRECAUTIONS_FORM: {
    path: "/user/dashboard/forms/universal-precautions-training-document-forms",
    element: <MainApplication />,
    name: "Universal Precautions",
    isProtected: true,
    roles: ["USER"],
  },

  USER_VERIFICATION_FORM: {
    path: "/user/dashboard/forms/verification-of-professional-license-forms",
    element: <MainApplication />,
    name: "Verification",
    isProtected: true,
    roles: ["USER"],
  },

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
