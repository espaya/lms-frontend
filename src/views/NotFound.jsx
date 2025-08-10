import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext"; // adjust path

export default function NotFound() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (user) {
      if (user.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (user.role === "USER") {
        navigate("/user/dashboard");
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <title>404 - Page Not Found | 1staccess Home Care</title>
      <div
        id="main-wrapper"
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <h1
          style={{ fontSize: "6rem", marginBottom: "1rem", color: "#dc3545" }}
        >
          404
        </h1>
        <h2 style={{ marginBottom: "1rem" }}>Oops! Page Not Found</h2>
        <p style={{ marginBottom: "2rem", fontSize: "1.25rem" }}>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <button className="btn btn-primary" onClick={handleGoBack}>
          Go Back Home
        </button>
      </div>
    </>
  );
}
