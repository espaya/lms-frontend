import { Eye, EyeOff } from "lucide-react";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import ReCAPTCHA from "react-google-recaptcha";

export default function Home() {
  const navigate = useNavigate();
  const { login, loading, successMsg, errors, setErrors, setSuccessMsg } =
    useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
    captcha_token: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const captchaRef = useRef(null);

  const isLocalhost = window.location.hostname === "localhost";

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCaptchaChange = (token) => {
    setFormData((prev) => ({
      ...prev,
      captcha_token: token || "",
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // ✅ Skip captcha validation in localhost
    if (!isLocalhost && !formData.captcha_token) {
      setErrors({ general: "Please complete the captcha" });
      return;
    }

    try {
      const userData = await login({
        ...formData,
        captcha_token: isLocalhost ? "bypass_local" : formData.captcha_token, // send bypass token for local
      });

      if (userData?.role) {
        setFormData({
          email: "",
          password: "",
          remember: false,
          captcha_token: "",
        });

        if (!isLocalhost) {
          captchaRef.current?.reset();
        }

        setTimeout(() => {
          setSuccessMsg("");
          navigate(
            userData.role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard",
            { replace: true }
          );
        }, 2000);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ general: error.message || "Login failed" });
    }
  };

  return (
    <>
      <title>Login - 1staccess Home Care</title>
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
                  <h4 className="card-title">Sign in</h4>
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

                      {/* Password + Eye Icon */}
                      <div className="col-12 mb-16 position-relative">
                        <label className="form-label">Password</label>
                        <input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          className="form-control pe-5"
                          value={formData.password}
                          autoComplete="off"
                          onChange={handleOnChange}
                        />
                        <span
                          onClick={() => setShowPassword(!showPassword)}
                          className="position-absolute top-50 translate-middle-y end-0 me-3"
                          style={{ cursor: "pointer" }}
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </span>
                        {errors.password && (
                          <small className="text-danger">
                            {errors.password[0]}
                          </small>
                        )}
                      </div>

                      {/* Remember Me */}
                      <div className="col-6">
                        <div className="form-check">
                          <input
                            name="remember"
                            type="checkbox"
                            className="form-check-input"
                            checked={formData.remember}
                            onChange={handleOnChange}
                          />
                          <label className="form-check-label">
                            Remember me
                          </label>
                        </div>
                      </div>

                      <div className="col-6 text-end">
                        <a href="#">Forgot Password?</a>
                      </div>
                    </div>

                    {/* ✅ Google reCAPTCHA */}
                    {!isLocalhost && (
                      <div className="my-3">
                        <ReCAPTCHA
                          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                          onChange={handleCaptchaChange}
                          ref={captchaRef}
                        />
                      </div>
                    )}

                    <div className="mt-16 d-grid gap-2">
                      <button
                        type="submit"
                        className="btn btn-primary mr-2"
                        disabled={loading}
                      >
                        {loading ? "Signing in..." : "Sign In"}
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
