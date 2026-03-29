export default function TotalQuiz() {
  return (
    <>
      <div className="col-lg-4 col-sm-12">
        <div className="undefined stat-widget p-20 mb-160 mb-30">
          <div className="d-flex align-items-center mb-20">
            <span className="icon">
              <i className="ri-add-circle-line text-warning bg-warning-lighten fs-30 py-12 px-12 rounded me-20" />
            </span>
            <div>
              <p className="mb-0">
                <strong>Total Quiz</strong>
              </p>
              <h3 className="mb-0">1032</h3>
            </div>
          </div>
          <p className="mb-7">
            <strong>
              Free:
              {/* */}909 students
            </strong>
          </p>
          <p>
            <strong>
              Paid:
              {/* */}123 students
            </strong>
          </p>
          <div className="progress">
            <div
              className="progress-bar bg-warning"
              style={{ width: "80%" }}
              role="progressbar"
              aria-valuenow={80}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </div>
    </>
  );
}
