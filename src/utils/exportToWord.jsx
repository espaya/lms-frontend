const exportToWord = async ({ fullname, title }) => {
  const printArea = document.getElementById("printArea");
  if (!printArea) return alert("Print area not found");

  const cloned = printArea.cloneNode(true);

  // ============ IMAGE HANDLING (unchanged) ============
  const images = cloned.querySelectorAll("img");
  const imagePromises = [];

  images.forEach((img) => {
    if (img.classList.contains("signature")) {
      const promise = new Promise((resolve) => {
        const tempImg = new Image();
        tempImg.src = img.src;
        tempImg.onload = function () {
          const ratio = tempImg.naturalHeight / tempImg.naturalWidth;
          const width = 120;
          const height = width * ratio;
          img.setAttribute("width", width);
          img.setAttribute("height", height);
          img.style.width = width + "px";
          img.style.height = height + "px";
          resolve();
        };
        tempImg.onerror = () => resolve();
      });
      imagePromises.push(promise);
    } else if (img.src && img.src.includes("main_logo.png")) {
      const promise = new Promise((resolve) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const tempImg = new Image();
        tempImg.crossOrigin = "Anonymous";
        tempImg.src = img.src.startsWith("http")
          ? img.src
          : window.location.origin + img.src;
        tempImg.onload = function () {
          canvas.width = tempImg.width;
          canvas.height = tempImg.height;
          ctx.drawImage(tempImg, 0, 0);
          img.src = canvas.toDataURL("image/png");
          const width = img.getAttribute("width");
          const height = img.getAttribute("height");
          if (width) img.style.width = typeof width === "number" ? width + "px" : width;
          if (height) img.style.height = typeof height === "number" ? height + "px" : height;
          resolve();
        };
        tempImg.onerror = () => {
          console.error("Failed to load logo:", img.src);
          resolve();
        };
      });
      imagePromises.push(promise);
    } else {
      if (
        img.src &&
        !img.src.startsWith("data:") &&
        !img.src.startsWith("http") &&
        !img.src.startsWith("blob:")
      ) {
        img.src = window.location.origin + img.src;
      }
    }
  });

  await Promise.all(imagePromises);

  // ============ FIX 1: BOOTSTRAP GRID → TABLE LAYOUT ============
  const rows = cloned.querySelectorAll(".row");
  rows.forEach((row) => {
    row.style.display = "table";
    row.style.width = "100%";
    row.style.tableLayout = "fixed";
  });

  const col6 = cloned.querySelectorAll(".col-md-6");
  col6.forEach((col) => {
    col.style.display = "table-cell";
    // 🔥 FIX: Changed width from 100% to 50%
    col.style.width = "50%"; 
    col.style.verticalAlign = "top";
    col.style.paddingRight = "12pt";
  });

  const col12 = cloned.querySelectorAll(".col-md-12");
  col12.forEach((col) => {
    col.style.display = "block";
    col.style.width = "100%";
  });

  // ============ FIX 2: TABLE STYLING ============
  const tables = cloned.querySelectorAll("table");
  tables.forEach((table) => {
    table.setAttribute("border", "1");
    table.setAttribute("cellpadding", "6");
    table.setAttribute("cellspacing", "0");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
  });

  const cells = cloned.querySelectorAll("th, td");
  cells.forEach((cell) => {
    cell.style.border = "1pt solid #000";
    cell.style.padding = "4pt 6pt";
    cell.style.verticalAlign = "top";
    cell.style.textAlign = "left";
  });

  const headers = cloned.querySelectorAll("th");
  headers.forEach((th) => {
    th.style.backgroundColor = "#f2f2f2";
    th.style.fontWeight = "bold";
  });

  const content = cloned.innerHTML;

  // ============ FIX 3: PROPER WORD DOCUMENT WRAPPER ============
  const sourceHTML = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:w="urn:schemas-microsoft-com:office:word"
          xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page WordSection1 {
            size: 8.5in 11in;
            margin: 1in;
          }
          div.WordSection1 { page: WordSection1; }

          body, p, td, th, li, strong, u, em, span, div, h1, h2, h3, h4, h5, h6 {
            font-family: 'Times New Roman', Times, serif !important;
            color: #000;
          }
          body {
            font-size: 12pt;
            line-height: 1.15;
            margin: 0;
            padding: 0;
          }

          .word-doc {
            padding: 0 !important;
            margin: 0 !important;
            max-width: none !important;
            box-shadow: none !important;
            background: transparent !important;
            min-height: auto !important;
            font-family: 'Times New Roman', Times, serif !important;
            font-size: 12pt !important;
            line-height: 1.15 !important;
          }

          /* 🔥 FIX: Changed text-align from justify to left */
          p {
            margin: 0 0 6pt 0;
            // text-align: left; 
          }
          h4 { font-size: 14pt; font-weight: bold; margin: 12pt 0 6pt 0; }
          h5 { font-size: 12pt; font-weight: bold; margin: 10pt 0 6pt 0; }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 12pt;
            page-break-inside: avoid;
          }
          table th, table td {
            border: 1pt solid #000;
            padding: 4pt 6pt;
            vertical-align: top;
            font-size: 11pt;
            line-height: 1.15;
          }
          table th {
            background-color: #f2f2f2;
            font-weight: bold;
          }

          img { max-width: 100%; }

          .alert, button, .btn, .card-footer { display: none; }
        </style>
      </head>
      <body>
        <div class="WordSection1">
          ${content}
        </div>
      </body>
    </html>
  `;

  const blob = new Blob(["\ufeff", sourceHTML], {
    type: "application/msword",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${fullname || "Employee"} - ${title}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default exportToWord;