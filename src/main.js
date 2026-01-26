import { TFlexViewer } from 'tflex-viewer'


const container = document.getElementById('container')
const canvas = document.getElementById('canvas')


async function init() {
  try {
    const tflexViewer = await TFlexViewer({
      canvas,
      container,
      useWorker: true
    })


    tflexViewer.loadAssemblyJson('/public/assets/ТРР-1-000 - Транспортер - A.1 (5).json');
    tflexViewer.loadModel('/public/assets/ТРР-1-000 - Транспортер - A.1 (1).gltf');
    console.log('Viewer инициализирован 2:', tflexViewer)
  } catch (error) {
    console.error('Ошибка при инициализации viewer:', error)
    container.innerHTML = `<p style="color: red; padding: 20px;">Ошибка: ${error.message}</p>`
  }
}

init()
