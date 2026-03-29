export default function RecentUsers() {
  return (
    <>
      <div className="col-lg-6 col-xl-8 ">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Recent Users</h5>
          </div>
          <div className="card-body">
            <div
              className="students-queries ps ps--active-y"
              style={{ height: 305, position: "relative" }}
            >
              <div className="scrollbar-container ps">
                <div className="student-query-inner d-flex justify-content-between align-items-start">
                  <img
                    className="me-20 rounded-circle"
                    src="images/avatar/7.jpg"
                    alt=""
                  />
                  <div className="student-query-details flex-basis-50 flex-grow-1 me-20">
                    <h6 className="mb-5">Machine Learning Bootcamp</h6>
                    <p>
                      By
                      {/* */}Brandon Taylor
                    </p>
                  </div>
                  <div className="d-flex flex-wrap justify-content-end mb-3">
                    <a
                      className="icon mx-16 my-16 py-8 px-8 rounded-circle bg-primary-lighten"
                      href="#"
                    >
                      <i className="ri-check-line fs-18 text-primary" />
                    </a>
                    <a
                      className="icon mx-16 my-16 py-8 px-8 rounded-circle bg-danger-lighten"
                      href="#"
                    >
                      <i className="ri-close-line fs-18 text-danger" />
                    </a>
                  </div>
                </div>
                <div className="student-query-inner d-flex justify-content-between align-items-start">
                  <img
                    className="me-20 rounded-circle"
                    src="images/avatar/8.jpg"
                    alt=""
                  />
                  <div className="student-query-details flex-basis-50 flex-grow-1 me-20">
                    <h6 className="mb-5">Python Bootcamp from Zero to Hero</h6>
                    <p>
                      By
                      {/* */}Stweart Mark
                    </p>
                  </div>
                  <div className="d-flex flex-wrap justify-content-end mb-3">
                    <a
                      className="icon mx-16 my-16 py-8 px-8 rounded-circle bg-primary-lighten"
                      href="#"
                    >
                      <i className="ri-check-line fs-18 text-primary" />
                    </a>
                    <a
                      className="icon mx-16 my-16 py-8 px-8 rounded-circle bg-danger-lighten"
                      href="#"
                    >
                      <i className="ri-close-line fs-18 text-danger" />
                    </a>
                  </div>
                </div>
                <div className="student-query-inner d-flex justify-content-between align-items-start">
                  <img
                    className="me-20 rounded-circle"
                    src="images/avatar/9.jpg"
                    alt=""
                  />
                  <div className="student-query-details flex-basis-50 flex-grow-1 me-20">
                    <h6 className="mb-5">Amazon Web Services Certification</h6>
                    <p>
                      By
                      {/* */}Jhon Cane
                    </p>
                  </div>
                  <div className="d-flex flex-wrap justify-content-end mb-3">
                    <a
                      className="icon mx-16 my-16 py-8 px-8 rounded-circle bg-primary-lighten"
                      href="#"
                    >
                      <i className="ri-check-line fs-18 text-primary" />
                    </a>
                    <a
                      className="icon mx-16 my-16 py-8 px-8 rounded-circle bg-danger-lighten"
                      href="#"
                    >
                      <i className="ri-close-line fs-18 text-danger" />
                    </a>
                  </div>
                </div>
                <div className="student-query-inner d-flex justify-content-between align-items-start">
                  <img
                    className="me-20 rounded-circle"
                    src="images/avatar/10.jpg"
                    alt=""
                  />
                  <div className="student-query-details flex-basis-50 flex-grow-1 me-20">
                    <h6 className="mb-5">The Web Developer Bootcamp 2021</h6>
                    <p>
                      By
                      {/* */}Nicky Bonje
                    </p>
                  </div>
                  <div className="d-flex flex-wrap justify-content-end mb-3">
                    <a
                      className="icon mx-16 my-16 py-8 px-8 rounded-circle bg-primary-lighten"
                      href="#"
                    >
                      <i className="ri-check-line fs-18 text-primary" />
                    </a>
                    <a
                      className="icon mx-16 my-16 py-8 px-8 rounded-circle bg-danger-lighten"
                      href="#"
                    >
                      <i className="ri-close-line fs-18 text-danger" />
                    </a>
                  </div>
                </div>
                <div className="ps__rail-x" style={{ left: 0, top: 0 }}>
                  <div
                    className="ps__thumb-x"
                    tabIndex={0}
                    style={{ left: 0, width: 0 }}
                  />
                </div>
                <div className="ps__rail-y" style={{ top: 0, left: 0 }}>
                  <div
                    className="ps__thumb-y"
                    tabIndex={0}
                    style={{ top: 0, height: 0 }}
                  />
                </div>
              </div>
              <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
                <div
                  className="ps__thumb-x"
                  tabIndex={0}
                  style={{ left: 0, width: 0 }}
                />
              </div>
              <div
                className="ps__rail-y"
                style={{ top: 0, height: 305, right: 0 }}
              >
                <div
                  className="ps__thumb-y"
                  tabIndex={0}
                  style={{ top: 0, height: 255 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
