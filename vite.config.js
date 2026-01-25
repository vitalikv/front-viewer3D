import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      'tp-viewer3d/worker': 'tp-viewer3d/dist/worker.js'
    }
  },
  optimizeDeps: {
    exclude: ['tp-viewer3d'],
    include: ['stats.js'],
    esbuildOptions: {
      format: 'esm'
    }
  },
  plugins: [
    {
      name: 'fix-tp-viewer3d-worker',
      enforce: 'pre',
      transform(code, id) {
        if (id.includes('tp-viewer3d/dist/index.js')) {
          // Исправляем путь к воркеру
          // Проблема: Object.assign не содержит ключа "./worker.js", поэтому возвращается undefined
          // Заменяем всю проблемную строку целиком
          // Заменяем проблемную конструкцию, где Object.assign не содержит "./worker.js"
          // Используем более гибкий паттерн, который учитывает возможные комментарии
          const fixedCode = code.replace(
            /n = new URL\(\([^)]*Object\.assign\([^)]*\)\)\[`\.\/\$\{s\}`\], import\.meta\.url\)/,
            'n = new URL("./worker.js", import.meta.url)'
          )
          return fixedCode
        }
        return null
      }
    }
  ]
})
