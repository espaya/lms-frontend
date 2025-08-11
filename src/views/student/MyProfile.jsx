import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import UserHeader from "../../components/users/UserHeader";
import UserSidebar from "../../components/users/UserSidebar";
import { AuthContext } from "../../auth/AuthContext";

export default function MyProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;
  const { username } = useParams();
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
          `${apiBase}/api/user/my-profile/${user.name}`,
          {
            credentials: "include",
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
              Accept: "application/json",
              "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          if (data.message) {
            setErrors({ general: data.message });
          }
        } else {
          setFormData({
            name: data.name || "",
            email: data.email || "",
          });
        }
      } catch (err) {
        setErrors({ general: err.message });
      } finally {
        setLoading(false);
      }
    };
    getProfile();
  }, []);

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    setErrors({});
    setButtonLoading(true);

    try {
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const csrfToken = Cookies.get("XSRF-TOKEN");
      const authToken = localStorage.getItem("auth_token");

      const response = await fetch(
        `${apiBase}/api/user/update-my-profile/${user.id}`,
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
        }
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
          email: formData.email || "", // repopulate
          name: formData.name || "", // repopulate
          old_password: "",
          new_password: "",
          confirm_password: "",
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
      setButtonLoading(false);
    }
  };

  return (
    <>
      <title>Profile - 1staccess Home Care</title>

      <div id="main-wrapper">
        <UserHeader />
        <UserSidebar />
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
                    <a href="#">Users </a>
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
              <div class="col-md-3 active">
                <ul class="settings-menu show">
                  <li class="active">
                    <a href="#" class="active">
                      <i class="ri-arrow-right-s-line"></i>
                      Profile
                    </a>
                  </li>
                  <li class="">
                    <a href="#">
                      <i class="ri-arrow-right-s-line"></i>
                      Quiz
                    </a>
                  </li>
                </ul>
              </div>
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
                            </div>
                            <div className="mt-16">
                              <button
                                type="submit"
                                className="btn btn-primary mr-2"
                              >
                                {buttonLoading ? "Updating profile..." : "Update Profile"}
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
