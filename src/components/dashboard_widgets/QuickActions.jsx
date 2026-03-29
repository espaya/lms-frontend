export default function QuickQctions() {
  return (
    <>
      <div className="col-lg-6 col-xl-3">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Quick Actions</h4>
          </div>
          <div className="card-body">
            <div className="total-balance">
              <p>Available Balance</p>
              <h2>$221,478</h2>
            </div>
            <div className="row">
              <div className="col-lg-6 col-xl-12">
                <div className="balance-stats d-flex justify-content-between align-items-center active">
                  <div>
                    <p>Today's Earn</p>
                    <h3>$42,678</h3>
                  </div>
                  <span>
                    <i className="ri-arrow-right-line" />
                  </span>
                </div>
              </div>
              <div className="col-lg-6 col-xl-12">
                <div className="balance-stats d-flex justify-content-between align-items-center ">
                  <div>
                    <p>Under Review</p>
                    <h3>$1,798</h3>
                  </div>
                  <span>
                    <i className="ri-arrow-right-line" />
                  </span>
                </div>
              </div>
              <div className="col-lg-6 col-xl-12">
                <div className="balance-stats d-flex justify-content-between align-items-center ">
                  <div>
                    <p>Pending</p>
                    <h3>$255.25</h3>
                  </div>
                  <span>
                    <i className="ri-arrow-right-line" />
                  </span>
                </div>
              </div>
              <div className="col-lg-6 col-xl-12">
                <div className="balance-stats d-flex justify-content-between align-items-center ">
                  <div>
                    <p>Withdraw</p>
                    <h3>$365,478</h3>
                  </div>
                  <span>
                    <i className="ri-arrow-right-line" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
