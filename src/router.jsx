import { createBrowserRouter } from "react-router-dom";
import GuestRoute from "./auth/GuestRoute";
import ProtectedRoute from "./auth/ProtectedRoute";
import NotFound from "./views/NotFound";
import Account from "./views/Account";
import AdminDashboard from "./views/admin/AdminDashboard";
import UserDashboard from "./views/student/UserDashboard";
import Home from "./views/Home";

// Centralized route configuration with metadata
export const ROUTE_CONFIG = {
  // router.js
  HOME: {
    path: "/",
    element: <Home />,
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
  USER_DASHBOARD: {
    path: "/user/dashboard",
    element: <UserDashboard />,
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
  )
);

export default router;

// Path constants for direct usage
export const PATHS = Object.fromEntries(
  Object.entries(ROUTE_CONFIG).map(([key, value]) => [key, value.path])
);
