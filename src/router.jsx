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

  USER_QUESTION: {
    path: "/user/dashboard/questions",
    element: <Questions />,
    name: "User Dashboard",
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
