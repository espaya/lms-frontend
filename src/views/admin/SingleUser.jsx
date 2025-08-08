import { useEffect, useState } from "react";
import MyHeader from "../../components/MyHeader";
import Sidebar from "../../components/Sidebar";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

export default function SingleUser() {
  const [userProfile, setUserProfile] = useState([]);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;
  const { username } = useParams();

  useEffect(() => {
    const getProfile = async () => {
      setErrors({});

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
          }
        );

        const data = await response.json();

        console.log(data);

        if (!response.ok) {
          if (data.message) {
            setErrors({ general: data.message });
          }
        } else {
          setUserProfile(data);
        }
      } catch (err) {
        setErrors({ general: err.message });
      }
    };
    getProfile();
  }, []);

  return (
    <>
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="assets/images/favicon.png"
      />
      <title>Edunet - Personal LMS HTML Dashboard</title>

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
                      Welcome to Edunet Settings Profile page
                    </p>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="breadcrumbs">
                    <a href="#">Settings </a>
                    <span>
                      <i className="ri-arrow-right-s-line" />
                    </span>
                    <a href="#">Profile</a>
                  </div>
                </div>
                {errors.general && (
                  <div className="alert alert-danger">{errors.general}</div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <ul className="settings-menu">
                  <li className="active">
                    <a href="/settings-profile.html">
                      <i className="ri-arrow-right-s-line" />
                      Profile
                    </a>
                  </li>
                  <li className="">
                    <a href="/settings-application.html">
                      <i className="ri-arrow-right-s-line" />
                      Application
                    </a>
                  </li>
                  <li className="">
                    <a href="/settings-security.html">
                      <i className="ri-arrow-right-s-line" />
                      Security
                    </a>
                  </li>
                  <li className="">
                    <a href="/settings-activity.html">
                      <i className="ri-arrow-right-s-line" />
                      Activity
                    </a>
                  </li>
                  <li className="">
                    <a href="/settings-payment-method.html">
                      <i className="ri-arrow-right-s-line" />
                      Payment Method
                    </a>
                  </li>
                  <li className="">
                    <a href="/settings-api.html">
                      <i className="ri-arrow-right-s-line" /> API
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-9">
                <div className="row">
                  <div className="col-xxl-6 col-xl-6 col-lg-6">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title">User Profile</h4>
                      </div>
                      <div className="card-body">
                        <form className="user-valid" action="#" method="post">
                          <div className="form-group row">
                            <div className="col-12 mb-16">
                              <label className="form-label">Full Name</label>
                              <input
                                name="userName"
                                type="text"
                                className="form-control"
                                defaultValue=""
                              />
                            </div>
                            <div className="col-xxl-12">
                              <div className="d-flex align-items-center mb-16">
                                <img
                                  className="me-16 rounded-circle me-0 me-sm-3"
                                  src="/assets/images/avatar/1.png"
                                  width={55}
                                  height={55}
                                  alt=""
                                />
                                <div className="media-body">
                                  <h4 className="mb-0">Username</h4>
                                  <p className="mb-0">Max file size is 20mb</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-12">
                              <input
                                name="userPhoto"
                                type="file"
                                className=""
                                defaultValue=""
                              />
                            </div>
                          </div>
                          <div className="mt-16">
                            <button
                              type="submit"
                              className="btn btn-primary mr-2"
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-6 col-xl-6 col-lg-6">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title">Update Profile</h4>
                      </div>
                      <div className="card-body">
                        <form
                          className="profile-valid"
                          action="#"
                          method="post"
                        >
                          <div className="form-group row">
                            <div className="col-12 mb-16">
                              <label className="form-label">Email</label>
                              <input
                                name="email"
                                type="text"
                                className="form-control"
                                value=""
                                autoComplete="off"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="form-group col-6 mb-16">
                              <label className="form-label">Password</label>
                              <input
                                name="password"
                                type="text"
                                className="form-control"
                                value=""
                                autoComplete="off"
                              />
                            </div>
                            <div className="form-group col-6 mb-16">
                              <label className="form-label">Password</label>
                              <input
                                name="confirm_password"
                                type="text"
                                className="form-control"
                                value=""
                                autoComplete="off"
                              />
                            </div>
                          </div>
                          <div className="mt-16">
                            <button
                              type="submit"
                              className="btn btn-primary mr-2"
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-12">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title">Personal Information</h4>
                      </div>
                      <div className="card-body">
                        <form
                          className="personal-info-valid"
                          action="#"
                          method="post"
                        >
                          <div className="info-group row">
                            <div className="col-xxl-6 col-xl-6 col-lg-6 mb-16">
                              <label className="form-label">Full Name</label>
                              <input
                                name="fullName"
                                type="text"
                                className="form-control"
                                defaultValue=""
                              />
                            </div>
                            <div className="col-xxl-6 col-xl-6 col-lg-6 mb-16">
                              <label className="form-label">Email</label>
                              <input
                                name="email"
                                type="text"
                                className="form-control"
                                defaultValue=""
                              />
                            </div>
                            <div className="col-xxl-6 col-xl-6 col-lg-6 mb-16">
                              <label className="form-label">Address</label>
                              <input
                                name="address"
                                type="text"
                                className="form-control"
                                defaultValue=""
                              />
                            </div>
                            <div className="col-xxl-6 col-xl-6 col-lg-6 mb-16">
                              <label className="form-label">City</label>
                              <input
                                name="city"
                                type="text"
                                className="form-control"
                                defaultValue=""
                              />
                            </div>
                            <div className="col-xxl-6 col-xl-6 col-lg-6 mb-16">
                              <label className="form-label">Post Code</label>
                              <input
                                name="postCode"
                                type="text"
                                className="form-control"
                                defaultValue=""
                              />
                            </div>
                            <div className="col-xxl-6 col-xl-6 col-lg-6 mb-16">
                              <label className="form-label">Country</label>
                              <select name="country" className="form-control">
                                <option value="">Select your country</option>
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="United States">
                                  United States
                                </option>
                                <option value="United Kingdom">
                                  United Kingdom
                                </option>
                              </select>
                            </div>
                          </div>
                          <div className="mt-16">
                            <button
                              type="submit"
                              className="btn btn-primary mr-2"
                            >
                              Save
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
        </div>
      </div>
    </>
  );
}
