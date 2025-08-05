export default function Home() {
  return (
    <>
      <title>Login - 1staccess</title>
      <div className="authincation section-padding">
        <div className="container h-100">
          <div className="row justify-content-center h-100 align-items-center">
            <div className="col-xl-5 col-md-6">
              <div className="mini-logo text-center mb-35">
                <a href="index.html">
                  <img src="images/logo.png" alt="" />
                </a>
              </div>
              <div className="card">
                <div className="card-header justify-content-center">
                  <h4 className="card-title">Sign in</h4>
                </div>
                <div className="card-body">
                  <form action="#">
                    <div className="row">
                      <div className="col-12 mb-16">
                        <label className="form-label">Email</label>
                        <input
                          name="email"
                          type="text"
                          className="form-control"
                          value=""
                          autoComplete="off"
                          placeholder="example@email.com"
                        />
                      </div>
                      <div className="col-12 mb-16">
                        <label className="form-label">Password</label>
                        <input
                          name="password"
                          type="password"
                          className="form-control"
                          value=""
                          autoComplete="off"
                        />
                      </div>
                      <div className="col-6">
                        <div className="form-check">
                          <input
                            name="acceptTerms"
                            type="checkbox"
                            className="form-check-input "
                            value=""
                          />
                          <label className="form-check-label">
                            Remember me
                          </label>
                        </div>
                      </div>
                      <div className="col-6 text-end">
                        <a href="reset.html">Forgot Password?</a>
                      </div>
                    </div>
                    <div className="mt-16 d-grid gap-2">
                      <button type="submit" className="btn btn-primary mr-2">
                        Sign In
                      </button>
                    </div>
                  </form>
                  <p className="mt-16 mb-0">
                    Don't have an account?
                    <a className="text-primary" href="signup.html">
                      Sign up
                    </a>
                  </p>
                </div>
              </div>
              <div className="privacy-link">
                {/* <a href="#">Have an issue with 2-factor authentication?</a> */}
                {/* <br /> */}
                {/* <a href="#">Privacy Policy</a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
