import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // Make sure this path is correct

const GuestRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // If user is already logged in, redirect to account page (or wherever you want)
  if (user) return <Navigate to="/account" />;

  return children;
};

export default GuestRoute;
