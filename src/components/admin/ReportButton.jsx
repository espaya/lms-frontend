import { useRef, useState, useEffect } from "react";

export default function ReportButton() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <>
      <button
        ref={buttonRef}
        className="btn btn-primary"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
      >
        <i className="ri-download-2-fill" />
      </button>
      {open && (
        <ul
          ref={dropdownRef}
          className="dropdown-menu show"
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            minWidth: "120px",
            zIndex: 1000,
          }}
        >
          <li>
            <a className="dropdown-item" href="#">
              <i className="ri-file-pdf-fill text-danger me-2" />
              PDF
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              <i className="ri-file-excel-fill text-success me-2" />
              Excel
            </a>
          </li>
        </ul>
      )}
    </>
  );
}
