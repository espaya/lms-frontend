import { useState } from "react";
import Cookies from "js-cookie";
import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";

export default function ConfidentialityFilled({ data }) {
  const confidentiality = data?.confidentiality || {};
  const fullname = data?.profileData?.full_name || {};
  const apiBase = import.meta.env.VITE_API_URL;

  const printContent = () => {
    var printArea = document.getElementById("printArea");
    var printContents = printArea.innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  return (
    <>
      <title>
        Confidentiality of Information Agreement - 1staccess Home Care
      </title>

      <div className="dashboard">
        <div id="main-wrapper">
          <UserHeader />

          <UserSidebar />

          <div className="content-body">
            <div className="container">
              <div className="page-title">
                <div className="row align-items-center justify-content-between">
                  <div className="col-md-6">
                    <div className="page-title-content">
                      <h3>Confidentiality of Information Agreement</h3>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="breadcrumbs">
                      <Link to={PATHS.USER_DASHBOARD}>Home</Link>
                      <span>
                        <i className="ri-arrow-right-s-line"></i>
                      </span>
                      <Link to={PATHS.USER_FORMS}>Forms</Link>
                      <span>
                        <i className="ri-arrow-right-s-line"></i>
                      </span>
                      <Link to={PATHS.USER_CONFIDENTIALITY_FORM}>
                        Confidentiality of Information Agreement
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div id="printArea" className="card-body">
                      <div style={{ textAlign: "center" }}>
                        <img
                          src="/assets/images/main_logo.png"
                          width={200}
                          alt="Company Logo"
                        />
                        <h5 className="mt-10">
                          1st Access Home Care Incorporated
                        </h5>
                        <p>
                          6600 Fieldtan Trail, Moseley, VA, 23120 <br />
                          Agency Phone: (+1) 804-818-3216
                        </p>
                        <h4 className="mt-4 mb-3">
                          Confidentiality of Information
                        </h4>
                      </div>

                      <div className="step-content">
                        <div className="row">
                          <div className="col-12">
                            <p>
                              Employee Name: <u> {fullname} </u>
                            </p>
                            <br />
                            <ol>
                              <li>
                                1. All information designated confidential that
                                is obtained or generated as a result of any or
                                all of the operations of the Agency will be
                                dealt with in a confidential manner.
                              </li>

                              <li>
                                2. All information that is gathered, maintained
                                or stored by the Agency becomes the Agency’s
                                property and cannot be released without proper
                                authorization from the administration.
                              </li>

                              <li>
                                3. Altering information is prohibited by the
                                Agency and by law. Correction of any identified
                                erroneous information must be done according to
                                Agency policy
                              </li>
                            </ol>
                          </div>
                        </div>
                      </div>

                      <div className="step-content">
                        <div className="row">
                          <div className="col-12">
                            <h5>
                              What we can do to maintain the confidentiality of
                              Information
                            </h5>
                            <ol>
                              <li>
                                1. In order to protect any individual from
                                invasion of privacy and to protect the interest
                                of the Agency, any information gathered for
                                client care or operations will be gathered,
                                maintained and stored in such a manner as to
                                ensure confidentiality.
                              </li>

                              <li>
                                2. Access to information will be limited to a
                                need to know basis to perform the scope of one’s
                                duties and responsibilities.
                              </li>
                            </ol>
                          </div>
                        </div>
                      </div>

                      <div className="step-content">
                        <div className="row">
                          <div className="col-12">
                            <p>
                              I understand that I am responsible for following
                              this Confidentiality Policy Agreement & The
                              Guidelines, both written and verbal
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mt-20">
                          <p>Signature:</p>
                          {confidentiality?.signature ? (
                            <img
                              src={`${apiBase}/storage/signature/${confidentiality.signature}`}
                              alt="Signature"
                              style={{ width: "300px" }}
                            />
                          ) : (
                            <p>
                              <em>No signature provided</em>
                            </p>
                          )}
                        </div>
                        <div className="col-md-6 mt-50">
                          <p>Date Signed: </p>
                          <p>
                            {confidentiality?.created_at
                              ? new Date(
                                  confidentiality.created_at
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md3 mt-20">
                      <button
                        onClick={printContent}
                        className="btn btn-primary btn-lg"
                      >
                        Print
                      </button>
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
