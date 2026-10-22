import { useState } from "react";

export default function StepThree({
  formData,
  errors,
  loading,
  addQuestion,
  handleSubmit, // accepts optional schedule object
  removeQuestion,
  setStep,
  updateQuestionText,
  updateOption,
  updateCorrectAnswer,
  uploadedFiles,
  setUploadedFiles,
}) {
  const [isDragging, setIsDragging] = useState(false);

  // ---- Schedule modal state ----
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    startDate: "",
    endDate: "",
    durationMinutes: "",
  });
  const [scheduleError, setScheduleError] = useState("");

  // ---- Drag & Drop handlers ----
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

  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === "application/pdf",
    );

    if (files.length > 0) {
      setUploadedFiles([files[0]]);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files).filter(
      (file) => file.type === "application/pdf",
    );

    if (files.length > 0) {
      setUploadedFiles([files[0]]);
    }
  };

  const removeFile = () => {
    setUploadedFiles([]);
  };

  // ---- Option 1: Save & make available immediately ----
  const handleSaveNow = () => {
    // No schedule → parent publishes the quiz right away
    handleSubmit();
  };

  // ---- Option 2: Schedule for a future date ----
  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setScheduleData((prev) => ({ ...prev, [name]: value }));
    if (scheduleError) setScheduleError("");
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();

    const { startDate, endDate, durationMinutes } = scheduleData;

    if (!startDate) {
      setScheduleError("Please select a start date/time.");
      return;
    }

    const start = new Date(startDate);

    if (start < new Date()) {
      setScheduleError("Start date/time cannot be in the past.");
      return;
    }

    if (endDate) {
      const end = new Date(endDate);
      if (end <= start) {
        setScheduleError("End date/time must be after the start date/time.");
        return;
      }
    }

    // ⬇ FIX: Convert to ISO string so the backend knows the exact timezone
    handleSubmit({
      startDate: start.toISOString(),
      endDate: endDate ? new Date(endDate).toISOString() : null,
      durationMinutes: durationMinutes ? Number(durationMinutes) : null,
    });

    setIsScheduleModalOpen(false);
    setScheduleData({ startDate: "", endDate: "", durationMinutes: "" });
    setScheduleError("");
  };

  const closeScheduleModal = () => {
    setIsScheduleModalOpen(false);
    setScheduleError("");
  };

  return (
    <>
      <h4>Step 3: Add Questions</h4>

      {(errors.questions || errors.options) && (
        <div className="alert alert-danger mb-3">
          {errors.questions || errors.options}
        </div>
      )}

      {/* Drag & Drop Upload */}
      <div
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleFileDrop}
        className={`border border-2 border-dashed rounded p-4 text-center mb-3 ${
          isDragging ? "bg-light" : ""
        }`}
        style={{ cursor: "pointer", height: "100px" }}
        onClick={() => document.getElementById("fileInput").click()}
      >
        <p className="mb-0 mt-40">
          {isDragging
            ? "Release to upload PDF"
            : "Drag & Drop PDF here, or click to select"}
        </p>
        <input
          id="fileInput"
          type="file"
          accept="application/pdf"
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />
      </div>

      {/* PDF Preview */}
      {uploadedFiles.length > 0 && (
        <div className="mt-3">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="mb-3 border p-2 rounded">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <strong>{file.name}</strong>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={removeFile}
                >
                  Remove
                </button>
              </div>
              <embed
                src={URL.createObjectURL(file)}
                type="application/pdf"
                width="100%"
                height="200px"
              />
            </div>
          ))}
        </div>
      )}

      {/* Questions Section */}
      {formData.questions.map((q, qIndex) => (
        <div key={qIndex} className="mb-4 p-3 border rounded position-relative">
          <button
            type="button"
            className="btn-close position-absolute top-0 end-0"
            onClick={() => removeQuestion(qIndex)}
            disabled={formData.questions.length <= 1}
          />
          <input
            type="text"
            className={`form-control mb-2 ${
              errors.questions ? "is-invalid" : ""
            }`}
            placeholder={`Question ${qIndex + 1}`}
            value={q.text}
            onChange={(e) => updateQuestionText(qIndex, e.target.value)}
          />
          {q.options.map((opt, optIndex) => (
            <div key={optIndex} className="input-group mb-1">
              <input
                type="text"
                className={`form-control ${errors.options ? "is-invalid" : ""}`}
                placeholder={`Option ${optIndex + 1}`}
                value={opt}
                onChange={(e) => updateOption(qIndex, optIndex, e.target.value)}
              />
              <span className="input-group-text">
                <input
                  type="radio"
                  name={`correct-${qIndex}`}
                  checked={q.correctIndex === optIndex}
                  onChange={() => updateCorrectAnswer(qIndex, optIndex)}
                />
                &nbsp;Correct
              </span>
            </div>
          ))}
        </div>
      ))}

      {/* Add Question */}
      <button
        type="button"
        className="btn btn-primary me-10 mt-20"
        onClick={addQuestion}
      >
        + Add Question
      </button>

      {/* =============================== */}
      {/* PUBLISHING OPTIONS */}
      {/* =============================== */}
      <div className="mt-4 p-3 border rounded bg-light mt-20">
        <p className="mb-2 fw-semibold">When should this quiz be available?</p>
        <div className="d-flex flex-wrap gap-2">
          {/* 1) SAVE — Available now */}
          <button
            type="button"
            className="btn btn-success"
            onClick={handleSaveNow}
            disabled={loading}
            title="Publish this quiz and make it available immediately"
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Saving...
              </>
            ) : (
              "Save (Available Now)"
            )}
          </button>

          {/* 2) SCHEDULE — Available on a future date */}
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => setIsScheduleModalOpen(true)}
            disabled={loading}
            title="Choose a future start date for this quiz"
          >
            Schedule Quiz
          </button>

          {/* Back */}
          <button
            type="button"
            className="btn btn-info ms-auto"
            onClick={() => setStep(2)}
            disabled={loading}
          >
            Back
          </button>
        </div>
      </div>

      {/* ========================================== */}
      {/* SCHEDULE QUIZ MODAL OVERLAY */}
      {/* ========================================== */}
      {isScheduleModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050,
          }}
        >
          <div
            className="bg-white rounded shadow-lg"
            style={{ width: "100%", maxWidth: "500px", padding: "20px" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Schedule Quiz</h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeScheduleModal}
              />
            </div>

            {scheduleError && (
              <div className="alert alert-danger py-2">{scheduleError}</div>
            )}

            <form onSubmit={handleScheduleSubmit}>
              <div className="mb-3">
                <label className="form-label">Start Date &amp; Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="startDate"
                  value={scheduleData.startDate}
                  onChange={handleScheduleChange}
                  min={new Date().toISOString().slice(0, 16)}
                  required
                />
                <small className="text-muted">
                  When the quiz will become available.
                </small>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  End Date &amp; Time{" "}
                  <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="endDate"
                  value={scheduleData.endDate}
                  onChange={handleScheduleChange}
                  min={scheduleData.startDate || undefined}
                />
                <small className="text-muted">
                  Leave blank to keep the quiz available indefinitely (until you
                  manually close it).
                </small>
              </div>

              <div className="mb-4">
                <label className="form-label">
                  Time Limit (Minutes){" "}
                  <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="durationMinutes"
                  placeholder="e.g. 60"
                  value={scheduleData.durationMinutes}
                  onChange={handleScheduleChange}
                  min="1"
                />
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeScheduleModal}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleScheduleSubmit}
                  className="btn btn-danger"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Scheduling...
                    </>
                  ) : (
                    "Confirm Schedule"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
