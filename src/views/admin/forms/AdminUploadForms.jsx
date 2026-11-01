import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../../components/Sidebar";
import Cookies from "js-cookie";
import MyHeader from "../../../components/MyHeader";
import { Link } from "react-router-dom";
import { PATHS } from "../../../router";

export default function AdminUploadForms() {
  const [filesData, setFilesData] = useState([]);
  // filesData structure: { file, name, progress, status: 'pending' | 'uploading' | 'success' | 'error', errorMessage: string | null }

  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;
  const fileInputRef = useRef(null);

  // ---- Drag & Drop Handlers ----
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processSelectedFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processSelectedFiles(Array.from(e.target.files));
    }
  };

  // ---- File Processing ----
  const processSelectedFiles = (selectedFiles) => {
    // Filter for Word docs and PDFs only
    const validFiles = selectedFiles.filter(
      (file) =>
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type === "application/msword" ||
        file.type === "application/pdf" ||
        file.name.endsWith(".docx") ||
        file.name.endsWith(".doc") ||
        file.name.endsWith(".pdf"),
    );

    if (validFiles.length === 0) {
      setErrors({
        general: "Please upload valid Word documents (.doc, .docx) or PDFs.",
      });
      return;
    }

    setErrors({});

    const newFilesData = validFiles.map((file) => {
      // Extract name without extension
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      return {
        file,
        name: nameWithoutExt,
        progress: 0,
        status: "pending",
        errorMessage: null,
      };
    });

    // Append to existing files
    setFilesData((prev) => [...prev, ...newFilesData]);

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ---- Input Changes ----
  const handleNameChange = (index, newName) => {
    setFilesData((prev) => {
      const updated = [...prev];
      updated[index].name = newName;
      return updated;
    });
  };

  const removeFile = (index) => {
    setFilesData((prev) => prev.filter((_, i) => i !== index));
  };

  // ---- Upload Logic ----
  const handleUpload = async () => {
    if (filesData.length === 0) return;

    // Validate that all have names
    if (filesData.some((f) => !f.name.trim())) {
      setErrors({ general: "All documents must have a name." });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const csrfToken = Cookies.get("XSRF-TOKEN");
      const authToken = localStorage.getItem("auth_token");

      // Upload sequentially to allow the user to see the progress bar per file
      for (let i = 0; i < filesData.length; i++) {
        if (filesData[i].status === "success") continue;

        // Set status to uploading & clear previous errors
        setFilesData((prev) => {
          const updated = [...prev];
          updated[i].status = "uploading";
          updated[i].errorMessage = null;
          return updated;
        });

        const formData = new FormData();
        formData.append("form_name", filesData[i].name);
        formData.append("document", filesData[i].file);

        const xhr = new XMLHttpRequest();

        const uploadPromise = new Promise((resolve, reject) => {
          xhr.open("POST", `${apiBase}/api/admin/dashboard/upload-forms`);

          xhr.setRequestHeader("Authorization", `Bearer ${authToken}`);
          xhr.setRequestHeader("Accept", "application/json");
          if (csrfToken) {
            xhr.setRequestHeader("X-XSRF-TOKEN", decodeURIComponent(csrfToken));
          }

          xhr.withCredentials = true;

          // Progress event
          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const percentComplete = Math.round(
                (event.loaded / event.total) * 100,
              );
              setFilesData((prev) => {
                const updated = [...prev];
                updated[i].progress = percentComplete;
                return updated;
              });
            }
          };

          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve(JSON.parse(xhr.responseText));
            } else {
              // ⬇ Extract specific Laravel error messages
              let errorMessage = "Upload failed. Please try again.";
              try {
                const responseData = JSON.parse(xhr.responseText);
                if (responseData.errors) {
                  // Flattens validation errors like: {"document": ["The document must be a file..."]}
                  errorMessage = Object.values(responseData.errors)
                    .flat()
                    .join(" | ");
                } else if (responseData.message) {
                  errorMessage = responseData.message;
                }
              } catch (e) {
                console.error(
                  "Could not parse error response",
                  xhr.responseText,
                );
              }
              reject(new Error(errorMessage));
            }
          };

          xhr.onerror = () =>
            reject(new Error("Network error. Please check your connection."));
          xhr.send(formData);
        });

        try {
          await uploadPromise;
          // Mark as success
          setFilesData((prev) => {
            const updated = [...prev];
            updated[i].status = "success";
            updated[i].progress = 100;
            return updated;
          });
        } catch (err) {
          // ⬇ Mark as error and save the specific error message
          setFilesData((prev) => {
            const updated = [...prev];
            updated[i].status = "error";
            updated[i].progress = 0;
            updated[i].errorMessage = err.message;
            return updated;
          });
        }
      }
    } catch (err) {
      setErrors({ general: "An error occurred during the upload process." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Upload Forms & Documents - 1staccess Home Care</title>
      <div id="main-wrapper">
        <MyHeader />
        <Sidebar />
        <div className="content-body">
          <div className="container">
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>Upload Forms & Documents</h3>
                    <p className="mb-2">
                      Manage and upload employee forms here
                    </p>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="breadcrumbs">
                    <a href="#">Home </a>
                    <span>
                      <i className="ri-arrow-right-s-line" />
                    </span>
                    <a href="#">Upload Forms & Documents</a>
                  </div>
                  <Link
                    to={PATHS.ADMIN_FORMS}
                    className="btn btn-primary mt-10"
                  >
                    Back
                  </Link>
                </div>
              </div>
            </div>

            {errors?.general && (
              <div className="alert alert-danger">{errors?.general}</div>
            )}

            <div className="row">
              <div className="col-xl-8 col-lg-10 mx-auto">
                <div className="card transparent">
                  <div className="card-body bg-white rounded shadow-sm p-4">
                    {/* ⬇ Drag & Drop Area */}
                    <div
                      onDragOver={handleDragOver}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current.click()}
                      className={`border border-2 border-dashed rounded p-5 text-center mb-4 ${
                        isDragging ? "bg-light border-primary" : ""
                      }`}
                      style={{ cursor: "pointer", transition: "all 0.2s ease" }}
                    >
                      <i className="ri-upload-cloud-2-line fs-48 text-primary mb-3 d-block" />
                      <h5>Drag & Drop Word Documents or PDFs here</h5>
                      <p className="text-muted mb-0">
                        or click to browse. Multiple files are supported.
                      </p>
                      <input
                        type="file"
                        multiple
                        accept=".doc,.docx,.pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        style={{ display: "none" }}
                      />
                    </div>

                    {/* ⬇ File List */}
                    {filesData.length > 0 && (
                      <div className="mt-4">
                        <h5 className="mb-3">Selected Documents</h5>
                        {filesData.map((data, index) => (
                          <div
                            key={index}
                            className={`border rounded p-3 mb-3 position-relative ${data.status === "error" ? "bg-danger-subtle border-danger" : "bg-light"}`}
                          >
                            <div className="row align-items-center">
                              <div className="col-md-5 mb-2 mb-md-0">
                                <label className="form-label fw-bold text-muted small mb-1">
                                  Form Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={data.name}
                                  onChange={(e) =>
                                    handleNameChange(index, e.target.value)
                                  }
                                  disabled={
                                    data.status === "uploading" ||
                                    data.status === "success"
                                  }
                                />
                              </div>

                              <div className="col-md-5 mb-2 mb-md-0">
                                <label className="form-label fw-bold text-muted small mb-1">
                                  Upload Progress
                                </label>
                                <div className="d-flex align-items-center">
                                  <div
                                    className="progress flex-grow-1 me-2"
                                    style={{ height: "10px" }}
                                  >
                                    <div
                                      className={`progress-bar ${
                                        data.status === "error"
                                          ? "bg-danger"
                                          : data.status === "success"
                                            ? "bg-success"
                                            : "bg-primary progress-bar-striped progress-bar-animated"
                                      }`}
                                      role="progressbar"
                                      style={{ width: `${data.progress}%` }}
                                    ></div>
                                  </div>
                                  <span className="small fw-bold">
                                    {data.progress}%
                                  </span>
                                </div>
                                <small className="text-muted d-block mt-1">
                                  {data.file.name} (
                                  {(data.file.size / 1024 / 1024).toFixed(2)}{" "}
                                  MB)
                                </small>
                                {/* ⬇ NEW: Display the backend error if it exists */}
                                {data.errorMessage && (
                                  <small className="text-danger fw-bold d-block mt-1">
                                    {data.errorMessage}
                                  </small>
                                )}
                              </div>

                              <div className="col-md-2 text-end">
                                {data.status === "success" ? (
                                  <span className="badge bg-success p-2">
                                    <i className="ri-check-line me-1" /> Done
                                  </span>
                                ) : (
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-danger"
                                    onClick={() => removeFile(index)}
                                    disabled={data.status === "uploading"}
                                  >
                                    <i className="ri-delete-bin-line" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="text-end mt-4">
                          <button
                            className="btn btn-primary btn-lg"
                            onClick={handleUpload}
                            disabled={
                              loading ||
                              filesData.length === 0 ||
                              filesData.every((f) => f.status === "success")
                            }
                          >
                            {loading ? (
                              <>
                                <span
                                  className="spinner-border spinner-border-sm me-2"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                Processing...
                              </>
                            ) : (
                              "Upload & Process"
                            )}
                          </button>
                        </div>
                      </div>
                    )}
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
