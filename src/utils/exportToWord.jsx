const exportToWord = async ({fullname, title}) => {
  const printArea = document.getElementById("printArea");
  const cloned = printArea.cloneNode(true);

  const images = cloned.querySelectorAll("img");
  const imagePromises = [];

  images.forEach((img) => {
    // Handle signature images with dynamic sizing (unchanged)
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
    } 
    // Handle logo separately - convert to base64
    else if (img.src && img.src.includes('main_logo.png')) {
      const promise = new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const tempImg = new Image();
        tempImg.crossOrigin = "Anonymous";
        tempImg.src = img.src.startsWith('http') ? img.src : window.location.origin + img.src;

        tempImg.onload = function () {
          canvas.width = tempImg.width;
          canvas.height = tempImg.height;
          ctx.drawImage(tempImg, 0, 0);
          img.src = canvas.toDataURL('image/png');
          
          // Preserve original dimensions
          const width = img.getAttribute("width");
          const height = img.getAttribute("height");
          if (width) {
            img.style.width = typeof width === 'number' ? width + "px" : width;
          }
          if (height) {
            img.style.height = typeof height === 'number' ? height + "px" : height;
          }
          resolve();
        };

        tempImg.onerror = () => {
          console.error('Failed to load logo:', img.src);
          resolve();
        };
      });
      imagePromises.push(promise);
    }
    else {
      // Handle any other images
      if (img.src && !img.src.startsWith('data:') && !img.src.startsWith('http') && !img.src.startsWith('blob:')) {
        img.src = window.location.origin + img.src;
      }
    }
  });

  await Promise.all(imagePromises);

  // Rest of your export code remains exactly the same
  const tables = cloned.querySelectorAll("table, th, td");
  tables.forEach((el) => {
    el.style.border = "1px solid black";
    el.style.borderCollapse = "collapse";
  });

  cloned.style.fontFamily = "Arial, sans-serif";
  cloned.style.padding = "20px";

  const content = cloned.innerHTML;

  const sourceHTML = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' 
          xmlns:w='urn:schemas-microsoft-com:office:word'>
      <head>
        <meta charset='utf-8'>
        <title>Export</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          table, th, td { border: 1px solid black; border-collapse: collapse; }
          img { max-width: 100%; height: auto; }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;

  const blob = new Blob(["\ufeff", sourceHTML], {
    type: "application/msword",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${fullname} - ${title}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default exportToWord;