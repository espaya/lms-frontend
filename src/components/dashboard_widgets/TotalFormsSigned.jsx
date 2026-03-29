export default function TotalFormsSigned() {
  return (
    <>
      <div className="col-lg-4 col-sm-12">
        <div className="undefined stat-widget p-20 mb-160 mb-30">
          <div className="d-flex align-items-center mb-20">
            <span className="icon">
              <i className="ri-stack-line text-danger bg-danger-lighten fs-30 py-12 px-12 rounded me-20" />
            </span>
            <div>
              <p className="mb-0">
                <strong>Total Courses</strong>
              </p>
              <h3 className="mb-0">109</h3>
            </div>
          </div>
          <p className="mb-7">
            <strong>
              Free:
              {/* */}83 courses
            </strong>
          </p>
          <p>
            <strong>
              Paid:
              {/* */}26 courses
            </strong>
          </p>
          <div className="progress">
            <div
              className="progress-bar bg-danger"
              style={{ width: "65%" }}
              role="progressbar"
              aria-valuenow={65}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </div>
    </>
  );
}
