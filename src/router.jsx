import { createBrowserRouter } from "react-router-dom";
import GuestRoute from "./auth/GuestRoute";
import ProtectedRoute from "./auth/ProtectedRoute";
import NotFound from "./views/NotFound";
import Home from "./views/Home";
import Account from "./views/Account";

// Centralized route configuration with metadata
export const ROUTE_CONFIG = {
  HOME: {
    path: "/",
    element: <Home />,
    name: "Home",
    isProtected: false,
  },
  // Users route
  ACCOUNT: {
    path: "/account",
    element: <Account />,
    name: "Account",
    isProtected: true,
  },
  
  // NOT_FOUND: {
  //   path: "*",
  //   element: <NotFound />,
  //   name: "Not Found",
  //   isProtected: false,
  // },
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
