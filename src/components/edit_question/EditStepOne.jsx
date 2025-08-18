import { useEffect } from "react";

export default function EditStepOne({
  formData,
  allData,
  errors,
  setStep,
  setFormData,
}) {
  // Initialize formData.subject with allData[0].subject.name when component mounts
  useEffect(() => {
    if (allData?.length > 0 && allData[0]?.subject && !formData.subject) {
      // allData is an array, so get the first item and access subject.name
      setFormData((prev) => ({
        ...prev,
        subject: allData[0].subject.name,
      }));
    }
  }, [allData, formData.subject, setFormData]);

  return (
    <>
      <h4>Step 1: Edit Subject</h4>
      <p className="text-muted mt-10">Or enter a new subject:</p>
      <input
        type="text"
        className={`form-control mb-3 ${errors.subject ? "is-invalid" : ""}`}
        placeholder="Enter New Subject"
        value={formData.subject || ""}
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
