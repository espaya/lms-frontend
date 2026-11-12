import { useEffect, useState } from "react";

// ⬇ Helper to format backend dates for the datetime-local input
const formatForInput = (dateString) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return "";

  // Pad month, day, hour, and minute with leading zeros if needed
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export default function EditStepThree({
  formData,
  errors,
  loading,
  addQuestion,
  handleSubmit,
  removeQuestion,
  setStep,
  updateQuestionText,
  updateOption,
  updateCorrectAnswer,
  uploadedFiles,
  setUploadedFiles,
  setFormData,
  allData,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    startDate: "",
    endDate: "",
    durationMinutes: "",
  });
  const [scheduleError, setScheduleError] = useState("");

  // Hydrate formData.questions from allData
  useEffect(() => {
    if (allData?.length > 0 && allData[0]?.questions) {
      const formattedQuestions = allData[0].questions.map((q) => ({
        id: q.id,
        text: q.question_text,
        options: Array.isArray(q.options)
          ? q.options
          : JSON.parse(q.options || "[]"),
        correctIndex: q.correct_index ?? 0,
      }));

      const hasEmptyQuestions =
        !formData.questions ||
        formData.questions.length === 0 ||
        formData.questions.every((q) => !q.text || !q.text.trim());

      if (hasEmptyQuestions) {
        setFormData((prev) => ({ ...prev, questions: formattedQuestions }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allData]);

  // ---- Drag & Drop ----
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
      (f) => f.type === "application/pdf",
    );
    if (files.length > 0) setUploadedFiles([files[0]]);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files).filter(
      (f) => f.type === "application/pdf",
    );
    if (files.length > 0) setUploadedFiles([files[0]]);
  };

  const removeFile = () => setUploadedFiles([]);

  // ---- Scheduling ----
  const handleSaveNow = () => {
    handleSubmit();
  };

  const openScheduleModal = () => {
    // ⬇ Pre-fill the modal with existing schedule data (if any)
    const currentQ = allData?.[0]?.questions?.[0];

    setScheduleData({
      startDate: formatForInput(currentQ?.available_from),
      endDate: formatForInput(currentQ?.available_until),
      durationMinutes: currentQ?.duration_minutes ?? "",
    });
    setScheduleError("");
    setIsScheduleModalOpen(true);
  };

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

    if (endDate) {
      const end = new Date(endDate);
      if (end <= start) {
        setScheduleError("End date/time must be after the start date/time.");
        return;
      }
    }

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
      {/* ... (Keep all your existing JSX for the Drag&Drop and Questions) ... */}

      <h4>Step 3: Edit Questions</h4>

      {allData?.length > 0 && allData[0]?.fileName && (
        <div className="alert alert-info mb-3">
          <strong>Current PDF:</strong>{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`${apiBase}/storage/questions/${allData[0].fileName}`}
          >
            {allData[0].fileName}
          </a>
        </div>
      )}

      {(errors.questions || errors.options) && (
        <div className="alert alert-danger mb-3">
          {errors.questions || errors.options}
        </div>
      )}

      {/* Drag & Drop */}
      <div
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleFileDrop}
        className={`border border-2 border-dashed rounded p-4 text-center mb-3 ${isDragging ? "bg-light" : ""}`}
        style={{ cursor: "pointer", height: "100px" }}
        onClick={() => document.getElementById("fileInput").click()}
      >
        <p className="mb-0 mt-40">
          {isDragging
            ? "Release to upload PDF"
            : "Drag & Drop PDF here, or click to select (optional - will replace current PDF)"}
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
      {uploadedFiles.length > 0
        ? uploadedFiles.map((file, index) => (
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
          ))
        : allData?.[0]?.fileName && (
            <div className="mt-3 mb-3 border p-2 rounded">
              <strong>Existing File</strong>
              <embed
                src={`${apiBase}/storage/questions/${allData[0].fileName}`}
                type="application/pdf"
                width="100%"
                height="200px"
              />
            </div>
          )}

      {/* Questions */}
      {formData.questions && formData.questions.length > 0 ? (
        formData.questions.map((q, qIndex) => (
          <div
            key={q.id ?? `new-${qIndex}`}
            className="mb-4 p-3 border rounded position-relative"
          >
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0"
              onClick={() => removeQuestion(qIndex)}
              disabled={formData.questions.length <= 1}
            />
            <input
              type="text"
              className={`form-control mb-2 ${errors.questions ? "is-invalid" : ""}`}
              placeholder={`Question ${qIndex + 1}`}
              value={q.text || ""}
              onChange={(e) => updateQuestionText(qIndex, e.target.value)}
            />
            {q.options && q.options.length > 0 ? (
              q.options.map((opt, optIndex) => (
                <div key={optIndex} className="input-group mb-1">
                  <input
                    type="text"
                    className={`form-control ${errors.options ? "is-invalid" : ""}`}
                    placeholder={`Option ${optIndex + 1}`}
                    value={opt || ""}
                    onChange={(e) =>
                      updateOption(qIndex, optIndex, e.target.value)
                    }
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
              ))
            ) : (
              <div className="alert alert-warning">No options available</div>
            )}
          </div>
        ))
      ) : (
        <div className="alert alert-info">No questions available</div>
      )}

      <button
        type="button"
        className="btn btn-secondary me-2"
        onClick={addQuestion}
      >
        + Add Question
      </button>

      {/* PUBLISHING OPTIONS */}
      <div className="mt-4 p-3 border rounded bg-light mt-20">
        <p className="mb-2 fw-semibold">When should this quiz be available?</p>
        <div className="d-flex flex-wrap gap-2">
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

          <button
            type="button"
            className="btn btn-danger"
            onClick={openScheduleModal}
            disabled={loading}
            title="Choose a start date for this quiz"
          >
            Schedule Quiz
          </button>

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

      {/* SCHEDULE QUIZ MODAL OVERLAY */}
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
