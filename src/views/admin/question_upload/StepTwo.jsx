export default function StepTwo({
  errors,
  allTopics,
  formData,
  updateTopic,
  removeTopic,
  addTopic,
  setStep,
}) {
  return (
    <>
      <h4>Step 2: Add Topics</h4>
      {errors.topics && (
        <div className="alert alert-danger mb-3">{errors.topics}</div>
      )}
      {formData.topics.map((topic, index) => (
        <div key={index} className="mb-3">
          <label>Topic {index + 1}</label>
          <select
            className="form-select mb-1"
            value={topic}
            onChange={(e) => updateTopic(index, e.target.value)}
          >
            <option value="">-- Select existing topic --</option>
            {allTopics.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            className="form-control"
            placeholder="Or enter new topic"
            value={topic}
            onChange={(e) => updateTopic(index, e.target.value)}
          />

          {formData.topics.length > 1 && (
            <button
              className="btn btn-outline-danger mt-1"
              onClick={() => removeTopic(index)}
            >
              &times; Remove
            </button>
          )}
        </div>
      ))}

      <button className="btn btn-secondary me-2" onClick={addTopic}>
        + Add Topic
      </button>

      <div className="mt-3">
        <button className="btn btn-secondary me-2" onClick={() => setStep(1)}>
          Back
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setStep(3)}
          disabled={formData.topics.some((t) => !t.trim())}
        >
          Next
        </button>
      </div>
    </>
  );
}
