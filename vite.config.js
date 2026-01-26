import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
  },
  optimizeDeps: {
    exclude: ['tflex-viewer', 'stats.js']
  },
  plugins: [
    {
      name: 'fix-stats-js',
      enforce: 'pre',
      transformIndexHtml(html) {
        
        return html.replace(
          '<head>',
          `<head>
    <script src="/node_modules/stats.js/build/stats.min.js"></script>`
        );
      },
      transform(code, id) {
        
        if (id.includes('tflex-viewer/dist/index.js')) {
          
          return code.replace(
            /import\s+(\w+)\s+from\s+["']stats\.js["']/g,
            `// Используем window.Stats, который загружается через script тег в index.html
const $1 = typeof window !== 'undefined' ? window.Stats : null;`
          );
        }
        return null;
      }
    }
  ]
})
