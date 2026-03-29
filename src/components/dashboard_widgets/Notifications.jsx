export default function Notification() {
  return (
    <>
      <div className="col-lg-6 col-xxl-5">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">
              Recent Notification
              {/* */}
            </h4>
            <a href="notification.html" className="btn btn-primary">
              View All
            </a>
          </div>
          <div className="card-body">
            <div
              className="recent-notification ps ps--active-y"
              style={{ height: 275, position: "relative" }}
            >
              <div className="notification-list pe-10">
                <a href="#">
                  <div className="d-flex align-items-center justify-content-start  pt-10 pb-10 border-bottom">
                    <span className="me-16 icon  bg-danger-lighten text-danger">
                      <i className="ri-close-line" />
                    </span>
                    <div className="flex-grow-1 flex-fill">
                      <h6 className="mb-5 fs-14">2FA verification failed</h6>
                      <span className="fs-13 text-muted">
                        020-11-04
                        {/* */}
                        {/* */}12:00:23
                      </span>
                    </div>
                    <div className="duration">3 min ago</div>
                  </div>
                </a>
                <a href="#">
                  <div className="d-flex align-items-center justify-content-start  pt-10 pb-10 border-bottom">
                    <span className="me-16 icon  bg-warning-lighten text-warning">
                      <i className="ri-question-mark" />
                    </span>
                    <div className="flex-grow-1 flex-fill">
                      <h6 className="mb-5 fs-14">Phone verification pending</h6>
                      <span className="fs-13 text-muted">
                        020-11-04
                        {/* */}
                        {/* */}12:00:23
                      </span>
                    </div>
                    <div className="duration">3 min ago</div>
                  </div>
                </a>
                <a href="#">
                  <div className="d-flex align-items-center justify-content-start  pt-10 pb-10 border-bottom">
                    <span className="me-16 icon  bg-danger-lighten text-danger">
                      <i className="ri-close-line" />
                    </span>
                    <div className="flex-grow-1 flex-fill">
                      <h6 className="mb-5 fs-14">
                        Dadeline over to launch the new course
                      </h6>
                      <span className="fs-13 text-muted">
                        020-11-04
                        {/* */}
                        {/* */}12:00:23
                      </span>
                    </div>
                    <div className="duration">3 min ago</div>
                  </div>
                </a>
                <a href="#">
                  <div className="d-flex align-items-center justify-content-start  pt-10 pb-10 border-bottom">
                    <span className="me-16 icon  bg-success-lighten text-success">
                      <i className="ri-check-line" />
                    </span>
                    <div className="flex-grow-1 flex-fill">
                      <h6 className="mb-5 fs-14">
                        Device confirmation completed
                      </h6>
                      <span className="fs-13 text-muted">
                        020-11-04
                        {/* */}
                        {/* */}12:00:23
                      </span>
                    </div>
                    <div className="duration">3 min ago</div>
                  </div>
                </a>
                <a href="#">
                  <div className="d-flex align-items-center justify-content-start  pt-10 pb-10 border-bottom">
                    <span className="me-16 icon  bg-warning-lighten text-warning">
                      <i className="ri-question-mark" />
                    </span>
                    <div className="flex-grow-1 flex-fill">
                      <h6 className="mb-5 fs-14">
                        New user verification is pending
                      </h6>
                      <span className="fs-13 text-muted">
                        020-11-04
                        {/* */}
                        {/* */}12:00:23
                      </span>
                    </div>
                    <div className="duration">3 min ago</div>
                  </div>
                </a>
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
                style={{ top: 0, height: 275, right: 0 }}
              >
                <div
                  className="ps__thumb-y"
                  tabIndex={0}
                  style={{ top: 0, height: 217 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
