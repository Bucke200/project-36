// Importing Three.js and OrbitControls from the module
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { OrbitControls } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/examples/jsm/controls/OrbitControls.js';

// Setup the scene
const scene = new THREE.Scene();

// Setup the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 30);
console.log('Camera position:', camera.position.x, camera.position.y, camera.position.z);

// Setup the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1);
document.getElementById('container').appendChild(renderer.domElement);

// Handle window resizing
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// Lighting to illuminate the planets
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Create Sun
const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);
console.log('Sun:', sun);

// Create a planet function
function createPlanet(size, color, distance) {
  const planetGeometry = new THREE.SphereGeometry(size, 32, 32);
  const planetMaterial = new THREE.MeshLambertMaterial({ color: color });
  const planet = new THREE.Mesh(planetGeometry, planetMaterial);

  // Orbit properties
  planet.orbitRadius = distance;
  planet.angle = Math.random() * 2 * Math.PI;

  return planet;
}

// Add planets to the scene
const planets = [
  createPlanet(0.5, 0x0000ff, 5),  // Mercury
  createPlanet(0.9, 0xff4500, 8),  // Venus
  createPlanet(1, 0x00ff00, 12),   // Earth
  createPlanet(0.8, 0xff0000, 18)  // Mars
];

planets.forEach((planet, i) => {
  scene.add(planet);
  console.log(`Planet ${i + 1}:`, planet);
});

// Rotate planets around the sun
function animate() {
  requestAnimationFrame(animate);

  planets.forEach((planet) => {
    planet.angle += 0.01;
    planet.position.x = planet.orbitRadius * Math.cos(planet.angle);
    planet.position.z = planet.orbitRadius * Math.sin(planet.angle);
  });

  controls.update();
  renderer.render(scene, camera);
}

// Orbit controls for interaction
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

animate();

  