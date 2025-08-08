import UserHeader from "../../components/users/UserHeader";
import UserSidebar from "../../components/users/UserSidebar";

export default function MyProfile() {
  return (
    <>
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
                    <p className="mb-2">Welcome to Edunet Profile page</p>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="breadcrumbs">
                    <a href="#">Home </a>
                    <span>
                      <i className="ri-arrow-right-s-line"></i>
                    </span>
                    <a href="#">Profile</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-8">
                <div className="row">
                  <div className="col-xxl-6 col-xl-6 col-lg-6">
                    <div className="card welcome-profile">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-10">
                          <img
                            src="/assets/images/avatar/1.png"
                            alt=""
                            className="me-16 rounded-circle"
                            width="75"
                          />
                          <div>
                            <h4 className="mb-2">Fiaz Abdullah</h4>
                            <p className="text-dark mb-1">UI Designer</p>
                            <p className="mb-0">michale.collin@gmail.com</p>
                          </div>
                        </div>
                        <ul>
                          <li>
                            <a href="#">
                              <span className="verified">
                                <i className="ri-check-line"></i>
                              </span>
                              Verify account
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <span className="not-verified">
                                <i className="ri-shield-check-line"></i>
                              </span>
                              Two-factor authentication (2FA)
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-6 col-xl-6 col-lg-6">
                    <div className="card">
                      <div className="card-body">
                        <div className="app-link">
                          <h5>Get Verified On Our Mobile App</h5>
                          <p>
                            Verifying your identity on our mobile app more
                            secure, faster, and reliable.
                          </p>
                          <a href="#" className="btn btn-primary">
                            <img src="/assets/images/android.svg" alt="" />
                          </a>
                          <br />
                          <div className="mt-16"></div>
                          <a href="#" className="btn btn-primary">
                            <img src="/assets/images/apple.svg" alt="" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-12">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title">Information </h4>
                        <a
                          className="btn btn-primary"
                          href="settings-profile.html"
                        >
                          Edit
                        </a>
                      </div>
                      <div className="card-body">
                        <form className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="user-info">
                              <span>USER ID</span>
                              <h5>818778</h5>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="user-info">
                              <span>USER NAME</span>
                              <h5>faiyaz_abdullah</h5>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="user-info">
                              <span>EMAIL ADDRESS</span>
                              <h5>email@example.com</h5>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="user-info">
                              <span>ADDRESS</span>
                              <h5>125 Govt College Street, Monohorpur</h5>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="user-info">
                              <span>POST CODE</span>
                              <h5>3583</h5>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="user-info">
                              <span>CITY</span>
                              <h5>Cumilla</h5>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="user-info">
                              <span>COUNTRY OF RESIDENCE</span>
                              <h5>Bangladesh</h5>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="user-info">
                              <span>JOINED SINCE</span>
                              <h5>20/10/2020</h5>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="user-info">
                              <span>WEB SITE</span>
                              <h5>http://codeefly.com</h5>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="user-info">
                              <span>TYPE</span>
                              <h5>Personal</h5>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4">
                <div className="row">
                  <div className="col-12">
                    <div className="card transparent">
                      <div className="row card-body">
                        <div className="col-md-6 col-xl-12">
                          <div className="bg-white py-12 px-12 rounded d-flex mb-20 justify-content-between align-items-center align-items-center shadow-sm">
                            <div className="profile-widget-icon me-15 fs-24 d-flex justify-content-center align-items-center rounded-circle bg-primary-lighten text-primary">
                              <i className="ri-user-settings-line"></i>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1">My Profile</h6>
                              <p className="mb-0">Account Setting Profile</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-xl-12">
                          <div className="bg-white py-12 px-12 rounded d-flex mb-20 justify-content-between align-items-center align-items-center shadow-sm">
                            <div className="profile-widget-icon me-15 fs-24 d-flex justify-content-center align-items-center rounded-circle bg-warning-lighten text-warning">
                              <i className="ri-message-2-line"></i>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1">My Message</h6>
                              <p className="mb-0">Inbox &amp; Drafts</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-xl-12">
                          <div className="bg-white py-12 px-12 rounded d-flex mb-20 justify-content-between align-items-center align-items-center shadow-sm">
                            <div className="profile-widget-icon me-15 fs-24 d-flex justify-content-center align-items-center rounded-circle bg-success-lighten text-success">
                              <i className="ri-pulse-line"></i>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1">My Activity</h6>
                              <p className="mb-0">Logs &amp; Notification</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-xl-12">
                          <div className="bg-white py-12 px-12 rounded d-flex mb-20 justify-content-between align-items-center align-items-center shadow-sm">
                            <div className="profile-widget-icon me-15 fs-24 d-flex justify-content-center align-items-center rounded-circle bg-danger-lighten text-danger">
                              <i className="ri-stack-line"></i>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1">My Course</h6>
                              <p className="mb-0">90 Courses</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="g-discussion"></div>
                  </div>
                  <div className="col-12">
                    <div className="card transparent">
                      <div className="card-header">
                        <h4 className="card-title">Top Performance Courses</h4>
                      </div>
                      <div className="card-body">
                        <div className="row g-discussion-inner">
                          <div className="col-lg-6 col-xl-12">
                            <div className="bg-white py-12 px-12 rounded d-flex mb-20 justify-content-between align-items-center align-items-center shadow-sm">
                              <img
                                src="/assets/images/courses/18.jpg"
                                width="85"
                                alt=""
                                className="rounded me-15"
                              />
                              <div className="flex-grow-1">
                                <h5 className="mb-5 fs-16">
                                  The Advanced Web Developer Bootcamp
                                </h5>
                                <p className="mb-0 fs-14">Development</p>
                              </div>
                              <div className="performance-progress">
                                <svg
                                  className="CircularProgressbar "
                                  viewbox="0 0 100 100"
                                  data-test-id="CircularProgressbar"
                                >
                                  <path
                                    className="CircularProgressbar-trail"
                                    d="
      M 50,50
      m 0,-46
      a 46,46 0 1 1 0,92
      a 46,46 0 1 1 0,-92
    "
                                    stroke-width="8"
                                    fill-opacity="0"
                                    style={{
                                      strokeDasharray: "289.027px, 289.027px",
                                      strokeDashoffset: "0px",
                                    }}
                                  ></path>
                                  <path
                                    className="CircularProgressbar-path"
                                    d="
      M 50,50
      m 0,-46
      a 46,46 0 1 1 0,92
      a 46,46 0 1 1 0,-92
    "
                                    stroke-width="8"
                                    fill-opacity="0"
                                    style={{
                                      strokeDasharray: "289.027px, 289.027px",
                                      strokeDashoffset: "28.9027px",
                                    }}
                                  ></path>
                                  <text
                                    className="CircularProgressbar-text"
                                    x="50"
                                    y="50"
                                  >
                                    90%
                                  </text>
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-xl-12">
                            <div className="bg-white py-12 px-12 rounded d-flex mb-20 justify-content-between align-items-center align-items-center shadow-sm">
                              <img
                                src="/assets/images/courses/16.jpg"
                                width="85"
                                alt=""
                                className="rounded me-15"
                              />
                              <div className="flex-grow-1">
                                <h5 className="mb-5 fs-16">
                                  Modern Javascript from The Begining
                                </h5>
                                <p className="mb-0 fs-14">Development</p>
                              </div>
                              <div className="performance-progress">
                                <svg
                                  className="CircularProgressbar "
                                  viewbox="0 0 100 100"
                                  data-test-id="CircularProgressbar"
                                >
                                  <path
                                    className="CircularProgressbar-trail"
                                    d="
      M 50,50
      m 0,-46
      a 46,46 0 1 1 0,92
      a 46,46 0 1 1 0,-92
    "
                                    stroke-width="8"
                                    fill-opacity="0"
                                    style={{
                                      strokeDasharray: "289.027px, 289.027px",
                                      strokeDashoffset: "0px",
                                    }}
                                  ></path>
                                  <path
                                    className="CircularProgressbar-path"
                                    d="
      M 50,50
      m 0,-46
      a 46,46 0 1 1 0,92
      a 46,46 0 1 1 0,-92
    "
                                    stroke-width="8"
                                    fill-opacity="0"
                                    style={{
                                      strokeDasharray: "289.027px, 289.027px",
                                      strokeDashoffset: "57.8053px",
                                    }}
                                  ></path>
                                  <text
                                    className="CircularProgressbar-text"
                                    x="50"
                                    y="50"
                                  >
                                    80%
                                  </text>
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-xl-12">
                            <div className="bg-white py-12 px-12 rounded d-flex mb-20 justify-content-between align-items-center align-items-center shadow-sm">
                              <img
                                src="/assets/images/courses/15.jpg"
                                width="85"
                                alt=""
                                className="rounded me-15"
                              />
                              <div className="flex-grow-1">
                                <h5 className="mb-5 fs-16">
                                  The Web Developer Bootcamp 2021
                                </h5>
                                <p className="mb-0 fs-14">Development</p>
                              </div>
                              <div className="performance-progress">
                                <svg
                                  className="CircularProgressbar "
                                  viewbox="0 0 100 100"
                                  data-test-id="CircularProgressbar"
                                >
                                  <path
                                    className="CircularProgressbar-trail"
                                    d="
      M 50,50
      m 0,-46
      a 46,46 0 1 1 0,92
      a 46,46 0 1 1 0,-92
    "
                                    stroke-width="8"
                                    fill-opacity="0"
                                    style={{
                                      strokeDasharray: "289.027px, 289.027px",
                                      strokeDashoffset: "0px",
                                    }}
                                  ></path>
                                  <path
                                    className="CircularProgressbar-path"
                                    d="
      M 50,50
      m 0,-46
      a 46,46 0 1 1 0,92
      a 46,46 0 1 1 0,-92
    "
                                    stroke-width="8"
                                    fill-opacity="0"
                                    style={{
                                      strokeDasharray: "289.027px, 289.027px",
                                      strokeDashoffset: "14.4513px",
                                    }}
                                  ></path>
                                  <text
                                    className="CircularProgressbar-text"
                                    x="50"
                                    y="50"
                                  >
                                    95%
                                  </text>
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-xl-12">
                            <div className="bg-white py-12 px-12 rounded d-flex mb-20 justify-content-between align-items-center align-items-center shadow-sm">
                              <img
                                src="/assets/images/courses/11.jpg"
                                width="85"
                                alt=""
                                className="rounded me-15"
                              />
                              <div className="flex-grow-1">
                                <h5 className="mb-5 fs-16">
                                  Real Life Data Science Exercises Included
                                </h5>
                                <p className="mb-0 fs-14">Development</p>
                              </div>
                              <div className="performance-progress">
                                <svg
                                  className="CircularProgressbar "
                                  viewbox="0 0 100 100"
                                  data-test-id="CircularProgressbar"
                                >
                                  <path
                                    className="CircularProgressbar-trail"
                                    d="
      M 50,50
      m 0,-46
      a 46,46 0 1 1 0,92
      a 46,46 0 1 1 0,-92
    "
                                    stroke-width="8"
                                    fill-opacity="0"
                                    style={{
                                      strokeDasharray: "289.027px, 289.027px",
                                      strokeDashoffset: "0px",
                                    }}
                                  ></path>
                                  <path
                                    className="CircularProgressbar-path"
                                    d="
      M 50,50
      m 0,-46
      a 46,46 0 1 1 0,92
      a 46,46 0 1 1 0,-92
    "
                                    stroke-width="8"
                                    fill-opacity="0"
                                    style={{
                                      strokeDasharray: "289.027px, 289.027px",
                                      strokeDashoffset: "72.2566px",
                                    }}
                                  ></path>
                                  <text
                                    className="CircularProgressbar-text"
                                    x="50"
                                    y="50"
                                  >
                                    75%
                                  </text>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
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
