import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      'viewer/worker': 'viewer/dist/worker.js'
    }
  },
  optimizeDeps: {
    exclude: ['viewer'],
    include: ['stats.js'],
    esbuildOptions: {
      format: 'esm'
    }
  },
  plugins: [
    {
      name: 'fix-viewer-worker',
      enforce: 'pre',
      transform(code, id) {
        if (id.includes('viewer/dist/index.js')) {
          // Исправляем проблему с workerFileName, который становится undefined
          // Проблема: Object.assign не содержит ключа "./worker.js"
          // Ищем паттерн: new URL(Object.assign(...)[`./${s}`], import.meta.url)
          // где s может быть "worker.js", но Object.assign не содержит этого ключа
          
          // Более точный паттерн, который ищет всю конструкцию с Object.assign
          const pattern = /new URL\(\([^)]*Object\.assign\([^)]*\)\)\[`\.\/\$\{[^}]+\}`\],\s*import\.meta\.url\)/g;
          
          const fixedCode = code.replace(pattern, (match) => {
            // Проверяем, содержит ли Object.assign "./worker.js"
            if (match.includes('"./worker.js"') || match.includes("'./worker.js'")) {
              // Если содержит, оставляем как есть
              return match;
            }
            // Если не содержит, заменяем на прямую ссылку на worker.js
            return 'new URL("./worker.js", import.meta.url)';
          });
          
          return fixedCode;
        }
        return null;
      }
    }
  ]
})
