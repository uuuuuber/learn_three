import * as THREE from 'three';

function createCamera(width, height) {
  const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);

  return camera;
}

export { createCamera };