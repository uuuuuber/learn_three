import { useEffect, useRef } from 'react';
import { createCamera } from './component_three/camera';
import { createScene } from './component_three/scene';
import { createCube } from './component_three/cube';
import { createRenderer } from './systems_three/renderer'

function App() {
  const divRef = useRef();

  useEffect(() => {
    // init
    let width = divRef.current.clientWidth;
    let height = divRef.current.clientHeight;
    const camera = createCamera(width, height);
    camera.position.z = 2;

    const scene = createScene();

    const mesh = createCube();
    scene.add(mesh);

    const renderer = createRenderer();
    renderer.setSize(width, height);
    // renderer.setAnimationLoop(animation);

    const divCurrent = divRef.current;
    divCurrent.appendChild(renderer.domElement);
    renderer.render(scene, camera);
    window.addEventListener('resize', handleResize);

    // handle window resize
    function handleResize(width, height) {
      width = divRef.current.clientWidth;
      height = divRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    }

    // animation
    function animation(time) {
      mesh.rotation.x = time / 2000;
      mesh.rotation.y = time / 1000;

      renderer.render(scene, camera);
    }

    return () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener('resize', handleResize);
      divCurrent.removeChild(renderer.domElement);
      scene.remove(mesh);
    };
  }, []);

  return <div ref={divRef} style={{ height: '100vh' }} />;
}

export default App;
