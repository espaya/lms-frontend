import html2pdf from "html2pdf.js";
import Cookies from "js-cookie";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export default function ExportReport({ reportRef, reports }) {
  const apiBase = import.meta.env.VITE_API_URL;

  // Helper function to convert image URL to Base64
  const getBase64Image = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (err) {
      console.error("Failed to load image:", url);
      return ""; // Return empty if image fails
    }
  };

  const exportToWord = async () => {
    try {
      // 1. Fetch all signature images and convert to Base64
      const reportsWithBase64 = await Promise.all(
        reports.map(async (report) => {
          let base64Sig = "";
          if (report.signature) {
            // Note: Make sure this matches the exact URL your frontend uses to fetch the image
            const imgUrl = `${apiBase}/view-answer-signature/${report.signature}`;
            base64Sig = await getBase64Image(imgUrl);
          }
          return { ...report, base64Sig };
        })
      );

      // 2. Build the HTML table
      let tableRows = reportsWithBase64
        .map((report) => {
          const grade =
            report.total > 0 ? Math.round((report.score / report.total) * 100) : 0;
          const dateStr = new Date(report.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });

          return `
            <tr>
              <td>
                <strong>${report.profile?.full_name || report.user?.name}</strong><br/>
                <span style="color: #666; font-size: 10pt;">${report.user?.email || ""}</span>
              </td>
              <td>${report.topic?.name || "Untitled"}</td>
              <td>${grade}%</td>
              <td style="text-align: center;">
                ${
                  report.base64Sig
                    ? `<img src="${report.base64Sig}" style="max-height: 50px; max-width: 120px;" />`
                    : "Not signed"
                }
              </td>
              <td>${dateStr}</td>
            </tr>
          `;
        })
        .join("");

      const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8'>
          <title>Quiz Report</title>
          <style>
            body { font-family: Arial, sans-serif; font-size: 11pt; }
            h2 { text-align: center; color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; vertical-align: middle; }
            th { background-color: #f2f2f2; font-weight: bold; }
          </style>
        </head>
        <body>
          <h2>Quiz Report Preview</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Topic</th>
                <th>Grade</th>
                <th>Signature</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </body>
        </html>
      `;

      // 3. Create and download the .doc file
      const blob = new Blob(["\ufeff", htmlContent], {
        type: "application/msword",
      });
      saveAs(blob, "Quiz_Report.doc");
    } catch (error) {
      console.error("Word export failed:", error);
      alert("Failed to export to Word. Check the console.");
    }
  };

  const exportToExcel = async () => {
    try {
      const element = reportRef?.current;
      if (!element) return;
      const table = element.querySelector("table");
      if (!table) return;

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Report Data");
      const rows = Array.from(table.querySelectorAll("tr"));

      rows.forEach((row) => {
        const cells = Array.from(row.querySelectorAll("th, td")).map(
          (cell) => cell.innerText
        );
        worksheet.addRow(cells);
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "Quiz_Report.xlsx");
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
          <button className="dropdown-item" onClick={exportToWord}>
            Export to Word
          </button>
        </li>
        <li>
          <button className="dropdown-item" onClick={exportToExcel}>
            Export to Excel
          </button>
        </li>
        {/* You can re-add the PDF button here if you get the backend route working */}
      </ul>
    </div>
  );
}