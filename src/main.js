import { initViewer3D } from 'tp-viewer3d'

// Получаем элементы из DOM
const container = document.getElementById('container')
const canvas = document.getElementById('canvas')

// Инициализируем viewer
async function init() {
  try {
    const viewer = await initViewer3D({
      canvas,
      container,
      useWorker: true
    })

    // Viewer готов к использованию
    // Можно загружать модели через viewer.loadModel(url)
    viewer.loadAssemblyJson('/public/assets/ТРР-1-000 - Транспортер - A.1 (5).json');
    viewer.loadModel('/public/assets/ТРР-1-000 - Транспортер - A.1 (1).gltf');
    console.log('Viewer инициализирован 2:', viewer)
  } catch (error) {
    console.error('Ошибка при инициализации viewer:', error)
    container.innerHTML = `<p style="color: red; padding: 20px;">Ошибка: ${error.message}</p>`
  }
}

init()
