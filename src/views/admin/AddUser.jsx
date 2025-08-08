import { useEffect, useState } from "react";
import MyHeader from "../../components/MyHeader";
import Sidebar from "../../components/Sidebar";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default function AddUser() {
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirm_password: "",
    email: "",
    privacy: "",
    role: "",
  });

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onAddUser = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const csrfToken = Cookies.get("XSRF-TOKEN");
      const authToken = localStorage.getItem("auth_token");

      const response = await fetch(`${apiBase}/api/users/add`, {
        method: "POST",
        body: JSON.stringify(formData),
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
          "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ general: data.message });
          setTimeout(() => setErrors({ general: "" }), 3500);
        }
      } else {
        // clear form fields
        setFormData({
          name: "",
          password: "",
          confirm_password: "",
          email: "",
          privacy: "",
          role: "",
        });

        // show sweet alert
        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message,
          timer: 3500,
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
      <title>Add User - 1staccess Home Care Inc</title>

      <div id="main-wrapper">
        <MyHeader />
        <Sidebar />
        <div className="content-body">
          <div className="container">
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>Add User</h3>
                    <p className="mb-2">Fill this form to manually add a user</p>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="breadcrumbs">
                    <a href="#">Home </a>
                    <span>
                      <i className="ri-arrow-right-s-line" />
                    </span>
                    <a href="#">add user</a>
                  </div>
                </div>
                {errors.general && (
                  <small className="alert alert-danger mt-10">
                    {errors.general}
                  </small>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Personal Information</h4>
                  </div>
                  <div className="card-body">
                    <form
                      className="personal-info-valid"
                      onSubmit={onAddUser}
                      method="post"
                      noValidate="novalidate"
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
                          />
                          {errors.name && (
                            <small className="text-danger">
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
                            <small className="text-danger">
                              {errors.email[0]}
                            </small>
                          )}
                        </div>
                        <div className="col-xxl-6 col-xl-6 col-lg-6 mb-16">
                          <label className="form-label">Password</label>
                          <input
                            name="password"
                            type="password"
                            className="form-control"
                            value={formData.password}
                            autoComplete="off"
                            onChange={handleOnChange}
                          />
                          {errors.password && (
                            <small className="text-danger">
                              {errors.password[0]}
                            </small>
                          )}
                        </div>
                        <div className="col-xxl-6 col-xl-6 col-lg-6 mb-16">
                          <label className="form-label">Confirm Password</label>
                          <input
                            name="confirm_password"
                            type="password"
                            className="form-control"
                            value={formData.confirm_password}
                            onChange={handleOnChange}
                          />
                          {errors.confirm_password && (
                            <small className="text-danger">
                              {errors.confirm_password[0]}
                            </small>
                          )}
                        </div>
                        <div className="col-xxl-6 col-xl-6 col-lg-6 mb-16">
                          <label className="form-label">Role</label>
                          <select
                            onChange={handleOnChange}
                            name="role"
                            className="form-control"
                          >
                            <option value="" disabled>
                              Select a role
                            </option>
                            <option value="USER">User</option>
                          </select>
                          {errors.role && (
                            <small className="text-danger">
                              {errors.role[0]}
                            </small>
                          )}
                        </div>
                        <div className="col-xxl-6 col-xl-6 col-lg-6 mb-16 mt-10">
                          <label className="form-label">Privacy Policy</label>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="privacyPolicy"
                              name="privacy"
                              value={1}
                              onChange={handleOnChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="privacyPolicy"
                            >
                              Accept our privacy policy
                            </label>
                          </div>
                          {errors.privacy && (
                            <small className="text-danger">
                              {errors.privacy[0]}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="mt-16">
                        <button type="submit" className="btn btn-primary mr-2">
                          {loading ? "Processing..." : "Add User"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
