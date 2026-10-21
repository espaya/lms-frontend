const exportToWord = async ({ fullname, title }) => {
  const printArea = document.getElementById("printArea");
  if (!printArea) return alert("Print area not found");

  const cloned = printArea.cloneNode(true);

  // ============ 1. IMAGE HANDLING (Unchanged) ============
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
      if (img.src && !img.src.startsWith("data:") && !img.src.startsWith("http") && !img.src.startsWith("blob:")) {
        img.src = window.location.origin + img.src;
      }
    }
  });

  await Promise.all(imagePromises);

  // ============ 2. BOOTSTRAP GRID -> LITERAL TABLES ============
  // Word ignores CSS display:table. We must replace DOM nodes with actual <table> tags.
  cloned.querySelectorAll(".row").forEach((row) => {
    const cols = Array.from(row.children).filter((el) =>
      el.className && typeof el.className === 'string' && el.className.includes("col-")
    );
    if (cols.length === 0) return;

    const table = document.createElement("table");
    table.setAttribute("border", "0");
    table.setAttribute("cellspacing", "0");
    table.setAttribute("cellpadding", "0");
    table.style.width = "100%";
    table.style.marginBottom = "10pt";
    
    const tbody = document.createElement("tbody");
    const tr = document.createElement("tr");

    cols.forEach((col) => {
      const td = document.createElement("td");
      td.setAttribute("valign", "top");
      td.style.verticalAlign = "top";
      td.style.border = "none";
      
      if (col.className.includes("col-md-6")) {
        td.style.width = "50%";
        td.style.paddingRight = "12pt";
      } else if (col.className.includes("col-md-4")) {
        td.style.width = "33.33%";
        td.style.paddingRight = "12pt";
      } else if (col.className.includes("col-md-12")) {
        td.setAttribute("colspan", "2"); // span across if needed
        td.style.width = "100%";
      } else {
        td.style.width = "100%";
      }

      // Move children from the div to the td
      while (col.firstChild) {
        td.appendChild(col.firstChild);
      }
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
    table.appendChild(tbody);
    row.parentNode.replaceChild(table, row);
  });

  // ============ 3. FIX HEADER ALIGNMENT & LINE BREAKS ============
  // Word sometimes ignores <br> tags. Convert them to <br/>.
  cloned.querySelectorAll("br").forEach((br) => (br.outerHTML = "<br/>"));

  // Force center alignment on the header wrapper
  const headerDiv = cloned.querySelector(".word-doc > div:first-child");
  if (headerDiv) {
    headerDiv.setAttribute("align", "center");
    headerDiv.style.textAlign = "center";
    headerDiv.style.marginBottom = "30pt";
    // Ensure child elements are also centered
    headerDiv.querySelectorAll("p, h5, h4, div").forEach(el => {
      el.style.textAlign = "center";
      el.setAttribute("align", "center");
    });
  }

  // ============ 4. DATA TABLES STYLING ============
  cloned.querySelectorAll("table").forEach((table) => {
    // Skip our layout tables (border=0)
    if (table.getAttribute("border") === "0") return;
    
    table.setAttribute("border", "1");
    table.setAttribute("cellpadding", "6");
    table.setAttribute("cellspacing", "0");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.style.marginBottom = "12pt";
  });

  cloned.querySelectorAll("th, td").forEach((cell) => {
    // Skip cells inside layout tables
    if (cell.closest("table[border='0']")) return;
    
    cell.setAttribute("valign", "top");
    cell.style.border = "1pt solid #000";
    cell.style.padding = "4pt 6pt";
    cell.style.verticalAlign = "top";
    cell.style.textAlign = "left";
  });

  // ============ 5. GENERATE HTML ============
  const content = cloned.innerHTML;

  const sourceHTML = `
    <!DOCTYPE html>
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
          @page WordSection1 { size: 8.5in 11in; margin: 1in; }
          div.WordSection1 { page: WordSection1; }

          body, p, td, th, li, strong, u, em, span, div, h1, h2, h3, h4, h5, h6 {
            font-family: 'Times New Roman', Times, serif !important;
            color: #000;
            font-size: 12pt;
            line-height: 1.15;
          }
          
          body { margin: 0; padding: 0; }
          
          p { margin: 0 0 8pt 0; text-align: left; }
          
          h4 { font-size: 14pt; font-weight: bold; margin: 12pt 0 6pt 0; }
          h5 { font-size: 12pt; font-weight: bold; margin: 10pt 0 6pt 0; }

          .word-doc { padding: 0 !important; margin: 0 !important; }

          table { border-collapse: collapse; width: 100%; margin-bottom: 12pt; }
          table th, table td { border: 1pt solid #000; padding: 4pt 6pt; vertical-align: top; font-size: 11pt; }
          table th { background-color: #f2f2f2; font-weight: bold; }
          
          img { max-width: 100%; }
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