export default function Graph() {
  return (
    <>
      <div className="col-lg-6 col-xxl-7">
        <div id="user-activity" className="card" data-aos="fade-up">
          <div className="card-header">
            <h4 className="card-title">Earning</h4>
          </div>
          <div className="card-body">
            <div className="chartjs-size-monitor">
              <div className="chartjs-size-monitor-expand">
                <div className="" />
              </div>
              <div className="chartjs-size-monitor-shrink">
                <div className="" />
              </div>
            </div>
            <canvas
              id="EarningGraph"
              height={280}
              style={{ display: "block", width: 410, height: 280 }}
              width={410}
              className="chartjs-render-monitor"
            />
          </div>
        </div>
      </div>
    </>
  );
}
