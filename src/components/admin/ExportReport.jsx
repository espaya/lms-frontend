import Cookies from "js-cookie";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export default function ExportReport({ reportRef, reports }) {
  const apiBase = import.meta.env.VITE_API_URL;

  // 1. Helper: Load, Resize, and Convert Image to Base64
  const getResizedBase64Image = (url, maxWidth = 150, maxHeight = 60) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Calculate aspect ratio to fit within max dimensions
        if (width > maxWidth) {
          height = Math.floor(height * (maxWidth / width));
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.floor(width * (maxHeight / height));
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Set exact physical dimensions for Word
        const base64 = canvas.toDataURL("image/png");
        resolve(`<img src="${base64}" width="${width}" height="${height}" style="width: ${width}px; height: ${height}px;" />`);
      };

      img.onerror = () => resolve("Not signed");
    });
  };

  const exportToWord = async () => {
    try {
      // 2. Process all images in parallel
      const processedReports = await Promise.all(
        reports.map(async (report) => {
          let signatureHtml = "Not signed";
          if (report.signature) {
            const imgUrl = `${apiBase}/view-answer-signature/${report.signature}`;
            signatureHtml = await getResizedBase64Image(imgUrl);
          }
          return { ...report, signatureHtml };
        })
      );

      // 3. Build the table rows with explicit widths
      const tableRows = processedReports
        .map((report) => {
          const grade = report.total > 0 ? Math.round((report.score / report.total) * 100) : 0;
          const dateStr = new Date(report.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });

          // Use explicit widths on <td> and valign="middle" to keep things centered
          return `
            <tr>
              <td width="25%" valign="middle">
                <strong>${report.profile?.full_name || report.user?.name}</strong><br/>
                <span style="color: #666; font-size: 9pt;">${report.user?.email || ""}</span>
              </td>
              <td width="30%" valign="middle">
                ${report.topic?.name || "Untitled"}
              </td>
              <td width="10%" valign="middle" align="center">
                ${grade}%
              </td>
              <td width="20%" valign="middle" align="center">
                ${report.signatureHtml}
              </td>
              <td width="15%" valign="middle">
                ${dateStr}
              </td>
            </tr>
          `;
        })
        .join("");

      // 4. Wrap in Word-compatible HTML
      const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8'>
          <title>Quiz Report</title>
          <style>
            /* Ensure the table is constrained and text wraps nicely */
            @page { size: 8.5in 11in; margin: 1in; }
            body { font-family: 'Arial', sans-serif; font-size: 10pt; line-height: 1.3; }
            h2 { text-align: center; color: #333; font-size: 16pt; }
            table { width: 100%; border-collapse: collapse; table-layout: fixed; }
            th, td { border: 1px solid #000; padding: 6px; vertical-align: middle; word-wrap: break-word; }
            th { background-color: #f2f2f2; font-weight: bold; text-align: left; font-size: 11pt; }
          </style>
        </head>
        <body>
          <h2>Quiz Report Preview</h2>
          <table>
            <thead>
              <tr>
                <th width="25%">Name</th>
                <th width="30%">Topic</th>
                <th width="10%">Grade</th>
                <th width="20%">Signature</th>
                <th width="15%">Date</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </body>
        </html>
      `;

      const blob = new Blob(["\ufeff", htmlContent], {
        type: "application/msword",
      });
      saveAs(blob, "Quiz_Report.doc");
    } catch (error) {
      console.error("Word export failed:", error);
      alert("Failed to export to Word.");
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
      </ul>
    </div>
  );
}