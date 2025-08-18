import UserHeader from "../../../components/users/UserHeader";
import UserSidebar from "../../../components/users/UserSidebar";

export default function FormsIndex() {
  return (
    <>
      <title>Forms - 1staccess Home Care</title>

      <div id="main-wrapper">
        <UserHeader />
        <UserSidebar />
        <div className="content-body">
          <div className="container">
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>Forms</h3>
                    <p className="mb-2">
                      Fill all available forms here, they are mandatory
                    </p>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="breadcrumbs">
                    <a href="#">Home </a>
                    <span>
                      <i className="ri-arrow-right-s-line" />
                    </span>
                    <a href="#">Forms</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card transparent">
                  <div className="card-body">
                    <div className="rtable rtable--5cols rtable--collapse">
                      <div className="rtable-row rtable-row--head bg-transparent">
                        <div className="rtable-cell topic-cell column-heading text-dark">
                          <strong> Form Name</strong>
                        </div>
                        <div className="rtable-cell impression-cell column-heading text-dark">
                          <strong>Signature</strong>
                        </div>
                        <div className="rtable-cell sales-cell column-heading text-dark">
                          <strong> Date Signed</strong>
                        </div>
                        <div className="rtable-cell earning-cell column-heading text-dark">
                          <strong>Action</strong>
                        </div>
                      </div>

                      <div className="rtable-row">
                        <div className="rtable-cell topic-cell">
                          <div className="rtable-cell--content title-content d-flex align-items-center">
                            <span className="topic-cell-span">
                              Application Forms
                            </span>
                          </div>
                        </div>
                        <div className="rtable-cell impression-cell">
                          <div className="rtable-cell--heading">Signature</div>
                          <div className="rtable-cell--content replay-link-content">
                            N/A
                          </div>
                        </div>
                        <div className="rtable-cell rtable-cell--foot sales-cell">
                          <div className="rtable-cell--heading">Date Signed</div>
                          <div className="rtable-cell--content earning-content">
                            N/A
                          </div>
                        </div>
                        <div className="rtable-cell rtable-cell--foot earning-cell">
                          <div className="rtable-cell--heading">Actions</div>
                          <div className="rtable-cell--content earning-content">
                            <a
                              href="#"
                              class="icon-link payout-icon sm-success-lighten text-success"
                              title="View"
                            >
                              <i
                                class="ri-eye-line"
                                style={{fontSize: "18px"}}
                              ></i>
                            </a>
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
