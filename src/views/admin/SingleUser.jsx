import { useEffect, useState } from "react";
import MyHeader from "../../components/MyHeader";
import Sidebar from "../../components/Sidebar";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import Nav from "./single_user/Nav";
import Swal from "sweetalert2";

export default function SingleUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    old_password: "",
    new_password: "",
    confirm_password: "",
    id: "",
    activateForms: 0, // Default to 0 (unchecked)
  });
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;
  const { username } = useParams();
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      // If it's a checkbox, use 1 or 0. Otherwise, use the string value.
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  useEffect(() => {
    const getProfile = async () => {
      setErrors({});
      setLoading(true);

      try {
        await fetch(`${apiBase}/sanctum/csrf-cookie`, {
          credentials: "include",
        });

        const csrfToken = Cookies.get("XSRF-TOKEN");
        const authToken = localStorage.getItem("auth_token");

        const response = await fetch(
          `${apiBase}/api/users/single/${username}`,
          {
            credentials: "include",
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
              Accept: "application/json",
              "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          if (data.message) {
            setErrors({ general: data.message });
          }
        } else {
          sessionStorage.removeItem("activateForms"); // ⬅ Clear the cache

          setFormData({
            name: data.name || "",
            email: data.email || "",
            role: data.role || "",
            id: data.id || "",
            // Force the backend value to a number (1 or 0)
            activateForms: Number(data.activateForms) || 0,
          });
        }
      } catch (err) {
        setErrors({ general: err.message });
      } finally {
        setLoading(false);
      }
    };
    getProfile();
  }, [apiBase, username]);

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const csrfToken = Cookies.get("XSRF-TOKEN");
      const authToken = localStorage.getItem("auth_token");

      const response = await fetch(
        `${apiBase}/api/users/update/${formData.id}`,
        {
          method: "POST",
          body: JSON.stringify(formData),
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
            "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ general: data.message });
          setTimeout(() => setErrors({ general: "" }), 3500);
        }
      } else {
        setFormData({
          email: formData.email || "",
          name: formData.name || "",
          role: formData.role || "",
          old_password: "",
          new_password: "",
          confirm_password: "",
          id: formData.id || "",
          activateForms: formData.activateForms || 0,
        });

        Swal.fire({
          title: "Success",
          icon: "success",
          text: data.message,
        });
      }
    } catch (err) {
      setErrors({ general: err.message });
      setTimeout(() => setErrors({ general: "" }), 3500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Profile - 1staccess Home Care</title>

      <div id="main-wrapper">
        <MyHeader />
        <Sidebar />
        <div className="content-body">
          <div className="container">
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>Profile</h3>
                    <p className="mb-2">
                      Welcome to{" "}
                      {formData.name
                        ? formData.name.charAt(0).toUpperCase() +
                          formData.name.slice(1)
                        : ""}{" "}
                      Profile's page
                    </p>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="breadcrumbs">
                    <a href="#">Employees </a>
                    <span>
                      <i className="ri-arrow-right-s-line" />
                    </span>
                    <a href="#">
                      {formData.name
                        ? formData.name.charAt(0).toUpperCase() +
                          formData.name.slice(1)
                        : ""}
                    </a>
                  </div>
                </div>
                {errors.general && (
                  <div className="alert alert-danger">{errors.general}</div>
                )}
              </div>
            </div>
            <div className="row">
              <Nav username={formData.name} />
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="col-md-9">
                  <div className="row">
                    <div className="col-xxl-12">
                      <div className="card">
                        <div className="card-header">
                          <h4 className="card-title">Personal Information</h4>
                        </div>
                        <div className="card-body">
                          <form
                            className="personal-info-valid"
                            onSubmit={handleFormSubmission}
                            method="post"
                          >
                            <div className="info-group row">
                              <div className="col-xxl-6 col-xl-6 col-lg-6 mb-16">
                                <label className="form-label">Username</label>
                                <input
                                  name="name"
                                  type="text"
                                  className="form-control"
                                  value={formData.name}
                                  autoComplete="off"
                                  onChange={handleOnChange}
                                  readOnly
                                />
                                {errors.name && (
                                  <small className="text-danger mt-10">
                                    {errors.name[0]}
                                  </small>
                                )}
                              </div>
                              <div className="col-xxl-6 col-xl-6 col-lg-6 mb-16">
                                <label className="form-label">Email</label>
                                <input
                                  name="email"
                                  type="text"
                                  className="form-control"
                                  value={formData.email}
                                  autoComplete="off"
                                  onChange={handleOnChange}
                                />
                                {errors.email && (
                                  <small className="text-danger mt-10">
                                    {errors.email[0]}
                                  </small>
                                )}
                              </div>
                              <div className="col-xxl-4 col-xl-4 col-lg-4 mb-16">
                                <label className="form-label">
                                  Old Password
                                </label>
                                <input
                                  name="old_password"
                                  type="password"
                                  className="form-control"
                                  autoComplete="off"
                                  onChange={handleOnChange}
                                  placeholder="(Leave blank to remain unchanged)"
                                />
                                {errors.old_password && (
                                  <small className="text-danger mt-10">
                                    {errors.old_password[0]}
                                  </small>
                                )}
                              </div>
                              <div className="col-xxl-4 col-xl-4 col-lg-4 mb-16">
                                <label className="form-label">
                                  New Password
                                </label>
                                <input
                                  name="new_password"
                                  type="password"
                                  className="form-control"
                                  autoComplete="off"
                                  onChange={handleOnChange}
                                  placeholder="(Leave blank to remain unchanged)"
                                />
                                {errors.new_password && (
                                  <small className="text-danger mt-10">
                                    {errors.new_password[0]}
                                  </small>
                                )}
                              </div>
                              <div className="col-xxl-4 col-xl-4 col-lg-4 mb-16">
                                <label className="form-label">
                                  Repeat New Password
                                </label>
                                <input
                                  name="confirm_password"
                                  type="password"
                                  className="form-control"
                                  autoComplete="off"
                                  onChange={handleOnChange}
                                  placeholder="(Leave blank to remain unchanged)"
                                />
                                {errors.confirm_password && (
                                  <small className="text-danger mt-10">
                                    {errors.confirm_password[0]}
                                  </small>
                                )}
                              </div>
                              <div className="col-xxl-6 col-xl-6 col-lg-6 mb-16">
                                <label className="form-label">Role</label>
                                <input
                                  name="role"
                                  type="text"
                                  className="form-control"
                                  value={formData.role}
                                  readOnly
                                  onChange={handleOnChange}
                                />
                                {errors.role && (
                                  <small className="text-danger mt-10">
                                    {errors.role[0]}
                                  </small>
                                )}
                              </div>

                              {/* ⬇ FIXED: Activate Forms Checkbox */}
                              <div className="col-xxl-6 col-xl-6 col-lg-6 mb-16 mt-10">
                                <label className="form-label">
                                  Activate Forms
                                </label>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="activateForms"
                                    id="activateForms"
                                    // Checked if activateForms is 1 or true
                                    checked={
                                      formData.activateForms === 1 ||
                                      formData.activateForms === true
                                    }
                                    onChange={handleOnChange}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="activateForms"
                                  >
                                    Activate forms for this employee
                                  </label>
                                </div>
                                {errors.activateForms && (
                                  <small className="text-danger">
                                    {errors.activateForms[0]}
                                  </small>
                                )}
                              </div>
                            </div>
                            <div className="mt-16">
                              <button
                                type="submit"
                                className="btn btn-primary mr-2"
                              >
                                {loading
                                  ? "Updating employee..."
                                  : "Update Employee"}
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
