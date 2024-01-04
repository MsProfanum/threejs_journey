import * as dat from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Axis helper
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/4.png");

// Material
const material = new THREE.MeshMatcapMaterial({
  matcap: matcapTexture,
});

// Font loader
const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Hello There", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  //   textGeometry.computeBoundingBox();
  //   textGeometry.translate(
  //     -(textGeometry.boundingBox.max.x - 0.02) / 2,
  //     -(textGeometry.boundingBox.max.y - 0.02) / 2,
  //     -(textGeometry.boundingBox.max.z - 0.03) / 2
  //   );
  textGeometry.center();

  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Donut and spheres
const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);

for (let i = 0; i < 70; i++) {
  const donut = new THREE.Mesh(donutGeometry, material);
  const box = new THREE.Mesh(boxGeometry, material);

  donut.position.set(
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10
  );
  box.position.set(
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10
  );

  donut.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
  box.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

  const scale = Math.random();
  donut.scale.set(scale, scale, scale);
  box.scale.set(scale, scale, scale);

  scene.add(donut);
  scene.add(box);
}

// gui.add(textGeometry, "size").min(0.1).max(1).step(0.01);

/**
 * Object
 */
// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial()
// );

// scene.add(cube);

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  scene.rotation.x = elapsedTime * 0.15;
  scene.rotation.y = elapsedTime * 0.15;
  scene.rotation.z = elapsedTime * 0.15;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
