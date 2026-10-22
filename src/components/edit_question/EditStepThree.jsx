import { useEffect, useState } from "react";

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

  // Hydrate formData.questions from allData — preserving `id`
  useEffect(() => {
    if (allData?.length > 0 && allData[0]?.questions) {
      const formattedQuestions = allData[0].questions.map((q) => ({
        id: q.id, // critical for update sync
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

  const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); };
  const handleDragEnter  = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
  const handleDragLeave  = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };

  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter(
      (f) => f.type === "application/pdf"
    );
    if (files.length > 0) setUploadedFiles([files[0]]);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files).filter(
      (f) => f.type === "application/pdf"
    );
    if (files.length > 0) setUploadedFiles([files[0]]);
  };

  const removeFile = () => setUploadedFiles([]);

  return (
    <>
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
        className={`border border-2 border-dashed rounded p-4 text-center mb-3 ${
          isDragging ? "bg-light" : ""
        }`}
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
              className={`form-control mb-2 ${
                errors.questions ? "is-invalid" : ""
              }`}
              placeholder={`Question ${qIndex + 1}`}
              value={q.text || ""}
              onChange={(e) => updateQuestionText(qIndex, e.target.value)}
            />
            {q.options && q.options.length > 0 ? (
              q.options.map((opt, optIndex) => (
                <div key={optIndex} className="input-group mb-1">
                  <input
                    type="text"
                    className={`form-control ${
                      errors.options ? "is-invalid" : ""
                    }`}
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

      <div className="mt-3">
        <button
          type="button"
          className="btn btn-secondary me-2"
          onClick={() => setStep(2)}
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => handleSubmit()}
          disabled={loading}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Submitting...
            </>
          ) : (
            "Update"
          )}
        </button>
      </div>
    </>
  );
}