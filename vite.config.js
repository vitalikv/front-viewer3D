import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 3000,
  },
  optimizeDeps: {
    exclude: ['tflex-viewer', 'stats.js'],
    include: ['void-elements', 'html-parse-stringify']
  },
  plugins: [
    react(),
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
        
        if (id.includes('html-parse-stringify')) {
          code = code.replace(
            /import\s+(\w+)\s+from\s+["']void-elements["']/g,
            (match, varName) => {
              return `import * as ${varName}_module from 'void-elements';\nconst ${varName} = ${varName}_module.default || ${varName}_module || (typeof ${varName}_module === 'object' && Object.keys(${varName}_module).length > 0 ? ${varName}_module : ${varName}_module);`;
            }
          );
          return code;
        }
        
        
        return null;
      }
    }
  ]
})
