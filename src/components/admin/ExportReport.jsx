import html2pdf from "html2pdf.js";
import * as XLSX from "xlsx";
import domtoimage from "dom-to-image-more";
import Cookies from "js-cookie";

export default function ExportReport({ reportRef, reports }) {
  const csrfToken = Cookies.get("XSRF-TOKEN");
  const authToken = localStorage.getItem("auth_token");
  const apiBase = import.meta.env.VITE_API_URL;
  


  async function exportToPDF() {
    try {
      // Extract all rows from reports (instead of screenshot)
      const data = reports.map((report) => ({
        name: report.user?.name || "User",
        email: report.user?.email || "",
        topic: report.topic?.name || "Untitled",
        grade:
          report.total > 0
            ? Math.round((report.score / report.total) * 100) + '%'
            : 0 + '%',
        signature: report.signature
          ? `${apiBase}/storage/signature/${report.signature}`
          : null,
        date: new Date(report.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/export-pdf`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
          body: JSON.stringify({ reports: data }),
        }
      );

      if (!response.ok) throw new Error("Failed to export PDF");

      // Download blob
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "report.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF export failed:", error);
    }
  }

  const exportToExcel = () => {
    try {
      const element = reportRef?.current;
      if (!element) {
        console.error("Report element not found");
        return;
      }

      const table = element.querySelector("table");
      if (!table) {
        console.error("No table found in report");
        return;
      }

      const workbook = XLSX.utils.table_to_book(table, {
        sheet: "Report Data",
        raw: true,
      });

      XLSX.writeFile(workbook, "report.xlsx", {
        compression: true,
      });
    } catch (error) {
      console.error("Excel export failed:", error);
    }
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-primary mt-20 dropdown-toggle"
        type="button"
        id="exportDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="ri-download-line me-2"></i> Export
      </button>
      <ul className="dropdown-menu" aria-labelledby="exportDropdown">
        <li>
          <button className="dropdown-item" onClick={exportToPDF}>
            <i className="ri-file-pdf-line me-2 text-danger"></i> PDF
          </button>
        </li>
        <li>
          <button className="dropdown-item" onClick={exportToExcel}>
            <i className="ri-file-excel-line me-2 text-success"></i> Excel
          </button>
        </li>
      </ul>
    </div>
  );
}
