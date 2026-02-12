import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
  },
  optimizeDeps: {
    exclude: ['tflex-viewer'],
    include: ['void-elements', 'html-parse-stringify']
  },
  plugins: [
    react(),
    {
      name: 'fix-void-elements',
      enforce: 'pre',
      transform(code, id) {
        if (id.includes('html-parse-stringify')) {
          code = code.replace(
            /import\s+(\w+)\s+from\s+["']void-elements["']/g,
            (_, varName) => {
              return `import * as ${varName}_module from 'void-elements';\nconst ${varName} = ${varName}_module.default || ${varName}_module || (typeof ${varName}_module === 'object' && Object.keys(${varName}_module).length > 0 ? ${varName}_module : ${varName}_module);`;
            }
          );
          return code;
        }
        return null;
      }
    }
  ]
});
