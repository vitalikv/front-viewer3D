import 'reflect-metadata';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { TFlexViewer3D } from 'tflex-viewer';

function App() {
  const handleInit = async (instance) => {
    console.log('Viewer инициализирован:', instance);

    await instance.loadAssemblyJson('/public/assets/ТРР-1-000 - Транспортер - A.1 (5).json');
    await instance.loadModel('667ee52f-2a9c-41b5-982a-a167e4e80e0a');
  };

  return (
    <div>
      <TFlexViewer3D
        useWorker={true}
        config={{
          lang: 'ru',
          theme: 'light',
        }}
        onInit={handleInit}
      />
    </div>
  );
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
