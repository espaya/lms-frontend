import { useEffect, useState } from "react";
import MyHeader from "../../components/MyHeader";
import Sidebar from "../../components/Sidebar";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid"; // npm install uuid

export default function AddUser() {
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const [formData, setFormData] = useState({
  //   name: "",
  //   password: "Welcome@1",
  //   confirm_password: "Welcome@1",
  //   email: "",
  //   privacy: "",
  //   role: "USER",
  // });

  // const handleOnChange = (e) => {
  //   const { name, value, type, checked } = e.target;

  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: type === "checkbox" ? checked : value,
  //   }));
  // };

  const [users, setUsers] = useState([
    {
      id: uuidv4(),
      name: "",
      password: "Welcome@1",
      confirm_password: "Welcome@1",
      email: "",
      privacy: "",
      role: "USER",
    },
  ]);

  const handleOnChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    setUsers((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [name]: type === "checkbox" ? checked : value,
      };
      return updated;
    });
  };

  const addNewUserForm = () => {
    setUsers((prev) => [
      ...prev,
      {
        id: uuidv4(),
        name: "",
        password: "Welcome@1",
        confirm_password: "Welcome@1",
        email: "",
        privacy: "",
        role: "USER",
      },
    ]);
  };

  const removeUserForm = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const onAddUser = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      await fetch(`${apiBase}/sanctum/csrf-cookie`, { credentials: "include" });
      const csrfToken = Cookies.get("XSRF-TOKEN");
      const authToken = localStorage.getItem("auth_token");

      const response = await fetch(`${apiBase}/api/users/add`, {
        method: "POST",
        body: JSON.stringify({ users }), // send all users
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
        }
      } else {
        setUsers([
          {
            name: "",
            password: "Welcome@1",
            confirm_password: "Welcome@1",
            email: "",
            privacy: "",
            role: "USER",
          },
        ]);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message,
          timer: 3500,
        });
      }
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  // const onAddUser = async (e) => {
  //   e.preventDefault();
  //   setErrors({});
  //   setLoading(true);

  //   try {
  //     await fetch(`${apiBase}/sanctum/csrf-cookie`, {
  //       credentials: "include",
  //     });

  //     const csrfToken = Cookies.get("XSRF-TOKEN");
  //     const authToken = localStorage.getItem("auth_token");

  //     const response = await fetch(`${apiBase}/api/users/add`, {
  //       method: "POST",
  //       body: JSON.stringify(formData),
  //       credentials: "include",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${authToken}`,
  //         "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
  //       },
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       if (data.errors) {
  //         setErrors(data.errors);
  //       } else {
  //         setErrors({ general: data.message });
  //         setTimeout(() => setErrors({ general: "" }), 3500);
  //       }
  //     } else {
  //       // clear form fields
  //       setFormData({
  //         name: "",
  //         password: "Welcome@1",
  //         confirm_password: "Welcome@1",
  //         email: "",
  //         privacy: "",
  //         role: "",
  //       });

  //       // show sweet alert
  //       Swal.fire({
  //         icon: "success",
  //         title: "Success",
  //         text: data.message,
  //         timer: 3500,
  //       });
  //     }
  //   } catch (err) {
  //     setErrors({ general: err.message });
  //     setTimeout(() => setErrors({ general: "" }), 3500);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="assets/images/favicon.png"
      />
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
                    <p className="mb-2">
                      Fill this form to manually add a user
                    </p>
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
                {errors &&
                  Object.values(errors)
                    .flat()
                    .map((errMsg, idx) => (
                      <small
                        key={idx}
                        className="alert alert-danger d-block mt-10"
                      >
                        {errMsg}
                      </small>
                    ))}
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <form
                  className="personal-info-valid"
                  onSubmit={onAddUser}
                  method="post"
                  noValidate="novalidate"
                >
                  {users.map((user, index) => (
                    <div className="card mb-30" key={user.id || index}>
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h4 className="card-title mb-0">
                          Personal Information #{index + 1}
                        </h4>
                        {users.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => removeUserForm(index)}
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="card-body">
                        <div className="info-group row">
                          {/* Username */}
                          <div className="col-xxl-6 col-xl-6 col-lg-6 mb-16">
                            <label className="form-label">Username</label>
                            <input
                              name="name"
                              type="text"
                              className="form-control"
                              value={user.name}
                              autoComplete="off"
                              onChange={(e) => handleOnChange(index, e)}
                            />
                            {errors.name && (
                              <small className="text-danger">
                                {errors.name[0]}
                              </small>
                            )}
                          </div>

                          {/* Email */}
                          <div className="col-xxl-6 col-xl-6 col-lg-6 mb-16">
                            <label className="form-label">Email</label>
                            <input
                              name="email"
                              type="text"
                              className="form-control"
                              value={user.email}
                              autoComplete="off"
                              onChange={(e) => handleOnChange(index, e)}
                            />
                            {errors.email && (
                              <small className="text-danger">
                                {errors.email[0]}
                              </small>
                            )}
                          </div>

                          {/* Password */}
                          <div className="col-xxl-6 col-xl-6 col-lg-6 mb-16 position-relative">
                            <label className="form-label">Password</label>
                            <input
                              name="password"
                              type={showPassword ? "text" : "password"}
                              className="form-control pe-5"
                              value={user.password}
                              autoComplete="off"
                              onChange={(e) => handleOnChange(index, e)}
                            />
                            <span
                              className="position-absolute top-50 end-0 translate-middle-y me-3"
                              style={{ cursor: "pointer" }}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <i className="ri-eye-off-line"></i>
                              ) : (
                                <i className="ri-eye-line"></i>
                              )}
                            </span>
                            {errors.password && (
                              <small className="text-danger">
                                {errors.password[0]}
                              </small>
                            )}
                          </div>

                          {/* Confirm Password */}
                          <div className="col-xxl-6 col-xl-6 col-lg-6 mb-16 position-relative">
                            <label className="form-label">
                              Confirm Password
                            </label>
                            <input
                              name="confirm_password"
                              type={showConfirmPassword ? "text" : "password"}
                              className="form-control pe-5"
                              value={user.confirm_password}
                              onChange={(e) => handleOnChange(index, e)}
                            />
                            <span
                              className="position-absolute top-50 end-0 translate-middle-y me-3"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
                                <i className="ri-eye-off-line"></i>
                              ) : (
                                <i className="ri-eye-line"></i>
                              )}
                            </span>
                            {errors.confirm_password && (
                              <small className="text-danger">
                                {errors.confirm_password[0]}
                              </small>
                            )}
                          </div>

                          {/* Role */}
                          <div className="col-xxl-6 col-xl-6 col-lg-6 mb-16">
                            <label className="form-label">Role</label>
                            <input
                              name="role"
                              type="text"
                              className="form-control"
                              value={user.role}
                              readOnly
                            />
                            {errors.role && (
                              <small className="text-danger">
                                {errors.role[0]}
                              </small>
                            )}
                          </div>

                          {/* Privacy Policy */}
                          <div className="col-xxl-6 col-xl-6 col-lg-6 mb-16 mt-10">
                            <label className="form-label">Privacy Policy</label>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`privacyPolicy-${index}`}
                                name="privacy"
                                value={1}
                                onChange={(e) => handleOnChange(index, e)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`privacyPolicy-${index}`}
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
                      </div>
                    </div>
                  ))}

                  {/* Buttons - Only Once */}
                  <div className="mt-16">
                    <button type="submit" className="btn btn-primary me-2">
                      {loading ? "Processing..." : "Save"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={addNewUserForm}
                    >
                      + Add Another User
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
