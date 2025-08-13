// import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";

export default function ExportReport({ reportRef }) {
  async function exportToPDF() {
    try {
      const element = document.getElementById("report");
      if (!element) {
        console.error("Report element not found");
        return;
      }

      const cloned = element.cloneNode(true);
      cloned.style.position = "absolute";
      cloned.style.left = "-9999px";
      cloned.style.top = "0";
      cloned.style.width = element.offsetWidth + "px";
      document.body.appendChild(cloned);

      const images = cloned.querySelectorAll("img");

      const convertToBase64 = (img) =>
        fetch(img.src, { mode: "cors" })
          .then((response) => {
            if (!response.ok) throw new Error("Failed to fetch image");
            return response.blob();
          })
          .then(
            (blob) =>
              new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
              })
          )
          .catch(() => img.src);

      await Promise.all(
        Array.from(images).map(async (img) => {
          const base64 = await convertToBase64(img);
          img.src = base64;
        })
      );

      await new Promise((r) => setTimeout(r, 100));

      const canvas = await html2canvas(cloned, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#fff",
      });

      document.body.removeChild(cloned);

      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.left = "-9999px";
      document.body.appendChild(iframe);

      const imgData = canvas.toDataURL("image/png");

      iframe.contentDocument.open();
      iframe.contentDocument.write(`
      <html>
        <head>
          <title>Print Preview</title>
          <style>
            body, html {
              margin: 0; padding: 0; text-align: center; background: white; font-size: 16px;
            }
            img {
              max-width: 100%;
              height: auto;
              margin: 0 auto;
              display: block;
            }
          </style>
        </head>
        <body>
          <img src="${imgData}" />
          <script>
            window.onload = function() {
              window.focus();
              window.print();
            };
          </script>
        </body>
      </html>
    `);
      iframe.contentDocument.close();

      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 3000);
    } catch (error) {
      console.error("Error exporting PDF:", error);
    }
  }

  // export to excel
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
          <button
            className="dropdown-item"
            onClick={exportToPDF}
            // disabled={!reportRef?.current}
          >
            <i className="ri-file-pdf-line me-2 text-danger"></i> PDF
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={exportToExcel}
            // disabled={!reportRef?.current}
          >
            <i className="ri-file-excel-line me-2 text-success"></i> Excel
          </button>
        </li>
      </ul>
    </div>
  );
}
