export default function StepOne({
  formData,
  allSubjects,
  errors,
  setStep,
  setFormData,
}) {
  return (
    <>
      <h4>Step 1: Add Subject</h4>
      <select
        className="form-select mb-2"
        value={formData.subject}
        onChange={(e) => {
          const selected = e.target.value;
          setFormData((prev) => ({ ...prev, subject: selected }));
        }}
      >
        <option value="">-- Select an existing subject --</option>
        {allSubjects.map((subj) => (
          <option key={subj.id} value={subj.name}>
            {subj.name}
          </option>
        ))}
      </select>

      <p className="text-muted mt-10">Or enter a new subject:</p>
      <input
        type="text"
        className={`form-control mb-3 ${errors.subject ? "is-invalid" : ""}`}
        placeholder="Enter New Subject"
        value={formData.subject}
        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        autoComplete="off"
      />

      {errors.subject && (
        <div className="invalid-feedback">{errors.subject}</div>
      )}
      <button
        className="btn btn-primary mt-10"
        onClick={() => {
          if (formData.subject.trim()) setStep(2);
        }}
        disabled={!formData.subject.trim()}
      >
        Continue
      </button>
    </>
  );
}
