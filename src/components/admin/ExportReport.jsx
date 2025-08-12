
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";

export default function ExportReport({ reportRef }) {
  //  const reportRef = useRef(null);
  // export to pdf
  const exportToPDF = async () => {
    try {
      const element = reportRef?.current;
      if (!element) {
        console.error("Report element not found");
        return;
      }

      // First clone and adjust the element for better print quality
      const clonedElement = element.cloneNode(true);
      clonedElement.style.width = `${element.offsetWidth}px`;
      // Increased font sizes throughout
      clonedElement.style.fontSize = "24px"; // Increased base font size (from 20px)
      clonedElement.querySelectorAll("*").forEach((el) => {
        const computedStyle = window.getComputedStyle(el);
        // Increase all font sizes proportionally
        if (computedStyle.fontSize) {
          const currentSize = parseFloat(computedStyle.fontSize);
          el.style.fontSize = `${currentSize * 1.5}px`; // Increase by 50%
        }
      });
      document.body.appendChild(clonedElement);

      const canvas = await html2canvas(clonedElement, {
        scale: 2,
        useCORS: true,
        logging: true,
        allowTaint: true,
      });
      document.body.removeChild(clonedElement);

      // Create a temporary iframe for printing
      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.left = "-9999px";
      document.body.appendChild(iframe);

      // Convert canvas to image and insert into iframe
      const imgData = canvas.toDataURL("image/png");
      const img = new Image();
      img.src = imgData;

      iframe.contentDocument?.open();
      iframe.contentDocument?.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { 
              margin: 0; 
              padding: 0;
              font-family: Arial, sans-serif;
              font-size: 24px; /* Increased default size (from 20px) */
            }
            .print-container {
              width: 100%;
              padding: 2.54cm;
              box-sizing: border-box;
              font-size: 1.5rem; /* Increased relative size (from 1.25rem) */
            }
            img { 
              max-width: 100% !important; 
              height: auto !important;
              display: block;
            }
            @media print {
              @page { 
                size: A4;
                margin: 2.54cm;
              }
              body { 
                margin: 0; 
                padding: 0;
                font-size: 24pt; /* Larger for print (from 20pt) */
              }
              .print-container {
                padding: 0;
              }
              * {
                font-size: inherit; /* Inherit larger size */
              }
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            <img src="${imgData}" />
          </div>
          <script>
            // Ensure proper scaling on print
            window.onload = function() {
              const img = document.querySelector('img');
              img.style.width = 'calc(100% - 5.08cm)';
              img.style.height = 'auto';
              img.style.margin = '0 auto';
            };
          </script>
        </body>
      </html>
    `);
      iframe.contentDocument?.close();

      // Wait for image to load
      await new Promise((resolve) => {
        img.onload = resolve;
        if (img.complete) resolve();
      });

      // Trigger print dialog
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();

      // Clean up after printing
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    } catch (error) {
      console.error("PDF export failed:", error);
      // Fallback to direct PDF download with better scaling
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Calculate dimensions with readable scaling
      const margin = 25.4;
      const pageWidth = pdf.internal.pageSize.getWidth() - margin * 2;
      const scaleFactor = pageWidth / canvas.width;
      const scaledHeight = canvas.height * scaleFactor;

      pdf.addImage({
        imageData: canvas,
        format: "PNG",
        x: margin,
        y: margin,
        width: pageWidth,
        height: scaledHeight,
      });

      pdf.save("report.pdf");
    }
  };

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
            disabled={!reportRef?.current}
          >
            <i className="ri-file-pdf-line me-2 text-danger"></i> PDF
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={exportToExcel}
            disabled={!reportRef?.current}
          >
            <i className="ri-file-excel-line me-2 text-success"></i> Excel
          </button>
        </li>
      </ul>
    </div>
  );
}
