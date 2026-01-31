import React from 'react';
import { createRoot } from 'react-dom/client';
import { TFlexViewer3D } from 'tflex-viewer';

function App() {
  const handleInit = (instance) => {
    console.log('Viewer инициализирован:', instance);
    
    instance.loadAssemblyJson('/public/assets/ТРР-1-000 - Транспортер - A.1 (5).json');
    instance.loadModel('/public/assets/ТРР-1-000 - Транспортер - A.1 (1).gltf');
  };

  return (
    <div>
      <h1>viewer3d</h1>
      <TFlexViewer3D
        useWorker={true}
        config={{
          lang: 'ru',
          theme: 'light'
        }}
        onInit={handleInit}
      />
    </div>
  );
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
