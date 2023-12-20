import './App.css';
import React, { useRef, useEffect } from 'react';
import { createScene } from './component_three/scene';
import { createCamera } from './component_three/camera';
import { createRenderer } from './systems_three/renderer';
import { createCube } from './component_three/cube';

function App() {
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  useEffect(() => {
    const scene = createScene();
    const camera = createCamera();
    camera.position.z = 5;

    const renderer = createRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;
    const cube = createCube;
    scene.add(cube);

    sceneRef.current.appendChild(renderer.domElement);

    // const animate = () => {
    //   requestAnimationFrame(animate);

    //   cube.rotation.x += 0.01;
    //   cube.rotation.y += 0.01;

    //   renderer.render(scene, camera);
    // };

    // animate();

    return () => {
      sceneRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={sceneRef}>

    </div>
  );
}

export default App;
