// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          // Copy the worker and give it a .js extension
          src: 'node_modules/pdfjs-dist/build/pdf.worker.min.mjs',
          dest: 'assets',
          rename: 'pdf.worker.min.js' // Force .js extension
        }
      ]
    })
  ]
});