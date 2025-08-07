import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const GuestRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) {
    // Redirect based on user role
    switch (user.role) {
      case "admin":
        return <Navigate to="/admin/dashboard" />;
      case "teacher":
        return <Navigate to="/user/dashboard" />;
      default:
        return <Navigate to="/" />;
    }
  }

  return children;
};

export default GuestRoute;
