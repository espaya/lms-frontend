import MyHeader from "../../components/MyHeader";
import UserSidebar from "../../components/users/UserSidebar";

export default function Questions() {
  return (
    <>
      <div id="main-wrapper">
        <MyHeader />

        <UserSidebar />

        <div class="content-body">
          <div class="container">
            <div class="page-title">
              <div class="row align-items-center justify-content-between">
                <div class="col-md-6">
                  <div class="page-title-content">
                    <h3>Questions</h3>
                    <p class="mb-2">Welcome to Edunet Wallet page</p>
                  </div>
                </div>
                <div class="col-auto">
                  <div class="breadcrumbs">
                    <a href="#">Home </a>
                    <span>
                      <i class="ri-arrow-right-s-line"></i>
                    </span>
                    <a href="#">Questions</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xl-8 col-lg-8 mx-auto">
                <div class="card transparent">
                  <div class="card-header">
                    <h4 class="card-title">Payout Withdrawal</h4>
                    <a href="withdraw.html">Withdrawal Method</a>
                  </div>
                  <div class="card-body">
                    <div class="bg-white py-12 px-12 rounded d-flex mb-20 justify-content-between align-items-center align-items-center shadow-sm">
                      <div class="payout-icon bg-success-lighten text-success">
                        <i class="ri-check-line"></i>
                      </div>
                      <div class="flex-grow-1">
                        <h5 class="mb-5">USD 1257</h5>
                        <p class="mb-0">June 9, 2021 09:55 PM </p>
                      </div>
                      <a class="btn btn-primary" href="index.html">
                        View Details
                      </a>
                    </div>
                    <div class="bg-white py-12 px-12 rounded d-flex mb-20 justify-content-between align-items-center align-items-center shadow-sm">
                      <div class="payout-icon bg-danger-lighten text-danger">
                        <i class="ri-close-line"></i>
                      </div>
                      <div class="flex-grow-1">
                        <h5 class="mb-5">USD 1257</h5>
                        <p class="mb-0">June 9, 2021 09:55 PM </p>
                      </div>
                      <a class="btn btn-primary" href="index.html">
                        View Details
                      </a>
                    </div>
                    <div class="bg-white py-12 px-12 rounded d-flex mb-20 justify-content-between align-items-center align-items-center shadow-sm">
                      <div class="payout-icon bg-warning-lighten text-warning">
                        <i class="ri-question-mark"></i>
                      </div>
                      <div class="flex-grow-1">
                        <h5 class="mb-5">USD 1257</h5>
                        <p class="mb-0">June 9, 2021 09:55 PM </p>
                      </div>
                      <a class="btn btn-primary" href="index.html">
                        View Details
                      </a>
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
