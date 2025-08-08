import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const GuestRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) {
    // User is logged in - redirect based on role
    return (
      <Navigate
        to={user.role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard"}
        replace
      />
    );
  }

  // User is not logged in - show the guest content (login page)
  return children;
};

export default GuestRoute;
