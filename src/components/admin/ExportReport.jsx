import Cookies from "js-cookie";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { formatDate } from "../../utils/DateFormatter";

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
        resolve(
          `<img src="${base64}" width="${width}" height="${height}" style="width: ${width}px; height: ${height}px;" />`
        );
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

      // 3. Build the table rows (Topic column REMOVED)
      const tableRows = processedReports
        .map((report) => {
          const grade =
            report.total > 0
              ? Math.round((report.score / report.total) * 100)
              : 0;
          const dateStr = formatDate(report.created_at);

          return `
            <tr>
              <td width="35%" valign="middle">
                <strong>${report.profile?.full_name || report.user?.name}</strong><br/>
                <span style="color: #666; font-size: 9pt;">${report.user?.email || ""}</span>
              </td>
              <td width="15%" valign="middle" align="center">
                ${grade}%
              </td>
              <td width="25%" valign="middle" align="center">
                ${report.signatureHtml}
              </td>
              <td width="25%" valign="middle">
                ${dateStr}
              </td>
            </tr>
          `;
        })
        .join("");

      // Get the topic name dynamically from the first report (if available)
      const topicName = reports[0]?.topic?.name || "All Topics";

      // 4. Wrap in Word-compatible HTML
      const htmlContent = `
        <!DOCTYPE html>
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8'>
          <title>Quiz Report</title>
          <style>
            @page { size: 8.5in 11in; margin: 1in; }
            body { font-family: 'Arial', sans-serif; font-size: 10pt; line-height: 1.3; }
            h1 { text-align: center; color: #333; font-size: 18pt; margin-bottom: 5px; }
            h3 { text-align: center; color: #555; font-size: 14pt; margin-top: 0; margin-bottom: 20px; font-weight: normal; }
            table { width: 100%; border-collapse: collapse; table-layout: fixed; }
            th, td { border: 1px solid #000; padding: 8px; vertical-align: middle; word-wrap: break-word; }
            th { background-color: #f2f2f2; font-weight: bold; text-align: left; font-size: 11pt; }
          </style>
        </head>
        <body>
          <h1>Quiz Report</h1>
          <h3>${topicName}</h3>
          
          <table>
            <thead>
              <tr>
                <th width="35%">Name</th>
                <th width="15%">Grade</th>
                <th width="25%">Signature</th>
                <th width="25%">Date</th>
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
      saveAs(blob, `Quiz_Report_${topicName.replace(/\s+/g, '_')}.doc`);
    } catch (error) {
      console.error("Word export failed:", error);
      alert("Failed to export to Word.");
    }
  };

  const exportToExcel = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Report Data");

      // Add Headers
      worksheet.addRow(["Name", "Email", "Grade", "Date"]);

      // Add Data
      reports.forEach((report) => {
        const grade = report.total > 0 ? `${Math.round((report.score / report.total) * 100)}%` : "0%";
        const dateStr = formatDate(report.created_at);

        worksheet.addRow([
          report.profile?.full_name || report.user?.name || "User",
          report.user?.email || "",
          grade,
          dateStr
        ]);
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