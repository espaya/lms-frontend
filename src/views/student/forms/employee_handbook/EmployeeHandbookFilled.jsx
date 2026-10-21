import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";
import { formatDate } from "../../../../utils/DateFormatter";
import { useEffect, useState, useRef } from "react";

import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export default function EmployeeHandbookFilled({ data, fullname }) {
  const apiBase = import.meta.env.VITE_API_URL;
  // const handbook = data?.handbook;

  const [numPages, setNumPages] = useState(null);

  const pdfContainerRef = useRef(null);
  const [pdfWidth, setPdfWidth] = useState(0);

  
  console.log("data", data);

  // Measure the container and re-render pages at that width (responsive PDF)
  useEffect(() => {
    const el = pdfContainerRef.current;
    if (!el) return;

    const measure = () => {
      const w = el.clientWidth;
      if (w > 0) setPdfWidth(Math.max(300, Math.floor(w)));
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  // Block right-click, copy, and common shortcuts while step 1 is visible
  useEffect(() => {
    const blockContext = (e) => e.preventDefault();
    const blockKeys = (e) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        ["c", "s", "p", "u", "a"].includes(e.key.toLowerCase())
      ) {
        e.preventDefault();
      }
      if (e.key === "PrintScreen") {
        navigator.clipboard?.writeText("");
      }
    };

    document.addEventListener("contextmenu", blockContext);
    document.addEventListener("keydown", blockKeys);
    return () => {
      document.removeEventListener("contextmenu", blockContext);
      document.removeEventListener("keydown", blockKeys);
    };
  }, []);

  return (
    <>
      <title>Employee Handbook - 1staccess Home Care</title>

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
                      <h3>Employee Handbook</h3>
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
                      <Link to={PATHS.USER_EMPLOYEE_HANDBOOK_FORM}>
                        Employee Handbook
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div id="printArea" className="card-body">
                      {/*  */}
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
                        <h4 className="mt-4 mb-3">Employee Handbook</h4>
                      </div>
                      {/*  */}
                      <div className="step-content">
                        <div className="row">
                          <div className="col-12">
                            <div
                              id="preview-pdf"
                              className="pdf-protected"
                              ref={pdfContainerRef}
                            >
                              <Document
                                file="/docs/employee-handbook.pdf"
                                onLoadSuccess={({ numPages }) =>
                                  setNumPages(numPages)
                                }
                                onLoadError={(err) =>
                                  console.error("PDF load error:", err)
                                }
                                loading={
                                  <p className="text-muted">
                                    Loading handbook…
                                  </p>
                                }
                                error={
                                  <p className="text-danger">
                                    Unable to load handbook.
                                  </p>
                                }
                                onContextMenu={(e) => e.preventDefault()}
                              >
                                {numPages && pdfWidth > 0
                                  ? Array.from({ length: numPages }, (_, i) => (
                                      <Page
                                        key={i + 1}
                                        pageNumber={i + 1}
                                        width={pdfWidth}
                                        devicePixelRatio={
                                          typeof window !== "undefined"
                                            ? window.devicePixelRatio
                                            : 1
                                        }
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                        onContextMenu={(e) =>
                                          e.preventDefault()
                                        }
                                      />
                                    ))
                                  : null}
                              </Document>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*  */}
                      <div className="row">
                        <div className="col-md-6 mt-20">
                          <p>Full Name:</p>
                          <p>{fullname}</p>
                        </div>
                        <div className="col-md-6 mt-20">
                          <p>Signature:</p>
                          {data?.signature ? (
                            <img
                              src={`${apiBase}/storage/signature/${data.signature}`}
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
                          <p>{formatDate(data?.created_at)}</p>
                        </div>
                      </div>
                      {/*  */}
                    </div>
                    <div className="col-md-3 mt-20">
                      <Link
                        to={PATHS.USER_FORMS}
                        style={{ marginLeft: "10px" }}
                        className="btn btn-info btn-lg"
                      >
                        Back
                      </Link>
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
