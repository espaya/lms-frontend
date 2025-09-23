import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { PATHS } from "../router";

export default function ResetPassword() {
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
  });

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const response = await fetch(`${apiBase}/api/password/reset`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          token,
          email,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || { general: data.message });
        return;
      }

      setSuccessMsg(data.message);
      setFormData({ password: "", password_confirmation: "" });

      setTimeout(() => {
        window.location.href = "/";
      }, 3500);
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Reset Password</title>
      <div className="authincation section-padding">
        <div className="container h-100">
          <div className="row justify-content-center h-100 align-items-center">
            {successMsg && (
              <small className="alert alert-success">{successMsg}</small>
            )}
            {errors.general && (
              <small className="alert alert-danger">{errors.general}</small>
            )}
            {errors.email && (
              <small className="alert alert-danger">{errors.email[0]}</small>
            )}
            <div className="col-xl-5 col-md-6">
              <div className="card mt-10">
                <div className="card-header justify-content-center">
                  <h4 className="card-title">Reset Password</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleOnSubmit}>
                    <div className="mb-16">
                      <label className="form-label">New Password</label>
                      <input
                        name="password"
                        type="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleOnChange}
                      />
                      {errors.password && (
                        <small className="text-danger">
                          {errors.password[0]}
                        </small>
                      )}
                    </div>

                    <div className="mb-16">
                      <label className="form-label">Confirm New Password</label>
                      <input
                        name="password_confirmation"
                        type="password"
                        className="form-control"
                        value={formData.password_confirmation}
                        onChange={handleOnChange}
                      />
                      {errors.password_confirmation && (
                        <small className="text-danger">
                          {errors.password_confirmation[0]}
                        </small>
                      )}
                    </div>

                    <div className="mt-16 d-grid gap-2">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                      >
                        {loading ? "Processing..." : "Reset Password"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="text-center mt-3">
                <Link to={PATHS.HOME}>Back to Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
