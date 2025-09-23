import { useState } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../router";

export default function ForgotPassword() {
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    email: "",
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
      const response = await fetch(`${apiBase}/api/password/forgot`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(formData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json", // ✅ required
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || { general: data.message });
        return;
      }
      setSuccessMsg(data.message);
      setFormData({ email: "" });
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Forgot Password - 1staccess Home Care</title>
      <div className="authincation section-padding">
        <div className="container h-100">
          <div className="row justify-content-center h-100 align-items-center">
            {successMsg && (
              <small className="alert alert-success">{successMsg}</small>
            )}
            {errors.general && (
              <small className="alert alert-danger">{errors.general}</small>
            )}
            <div className="col-xl-5 col-md-6">
              <div className="mini-logo text-center mb-35">
                <a href="/">
                  <img
                    width={200}
                    src="/assets/images/main_logo.png"
                    alt="logo"
                  />
                </a>
              </div>
              <div className="card mt-10">
                <div className="card-header justify-content-center">
                  <h4 className="card-title">Forgot Password</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleOnSubmit}>
                    <div className="row">
                      {/* Email */}
                      <div className="col-12 mb-16">
                        <label className="form-label">Email</label>
                        <input
                          name="email"
                          type="text"
                          className="form-control"
                          value={formData.email}
                          autoComplete="off"
                          placeholder="example@email.com"
                          onChange={handleOnChange}
                        />
                        {errors.email && (
                          <small className="text-danger">
                            {errors.email[0]}
                          </small>
                        )}
                      </div>

                      {/* Remember Me */}
                      <div className="col-6">
                        <div className="form-check">
                          <label className="form-check-label">
                            Remember your password?
                          </label>
                        </div>
                      </div>

                      <div className="col-6 text-end">
                        <Link to={PATHS.HOME}>Sign In Here</Link>
                      </div>
                    </div>

                    <div className="mt-16 d-grid gap-2">
                      <button
                        type="submit"
                        className="btn btn-primary mr-2"
                        disabled={loading}
                      >
                        {loading ? "Processing..." : "Send Reset Link"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="privacy-link"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
