// import * as THREE from 'three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// // main.js

// const loader = new GLTFLoader();

// loader.load( 'toyota/scene.gltf', function ( gltf ) {

// 	scene.add( gltf.scene );

// }, undefined, function ( error ) {

// 	console.error( error );

// } );

// // Set up the scene, camera, and renderer
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Create a red cube
// const geometry = new THREE.BoxGeometry(10, 10, 10);
// const material = new THREE.MeshBasicMaterial( { wireframe: false } );
// var colors = [0xff0000, 0x00ff00, 0x0000ff, 0xff0f00];
// const cube = new THREE.Mesh(geometry, material);
// cube.position.y = 11;
// scene.add(cube);

// // Create a platform (grid) viewed from above
// const platformGeometry = new THREE.BoxGeometry(100, 500, 0);
// const platformMaterial = new THREE.MeshBasicMaterial({ color: "green"});
// const platform = new THREE.Mesh(platformGeometry, platformMaterial);
// const grid = new THREE.GridHelper( 200, 20, 0xc1c1c1, 0x8d8d8d );
// platform.rotation.x = -Math.PI / 2; // Rotate to be horizontal and viewed from above
// scene.add(grid);

// // Set initial camera position
// camera.position.set(50, 50, 50);
// camera.lookAt(0, 0, 0);
// //camera.lookAt(cube.position.x, cube.position.y, cube.position.z);

// window.addEventListener( 'resize', onWindowResize );
// function onWindowResize() {

//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();

//     renderer.setSize( window.innerWidth, window.innerHeight );

// }

// // Add ambient and directional light
// const ambientLight = new THREE.AmbientLight(0x404040);
// scene.add(ambientLight);
// const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
// scene.add(directionalLight);


// var xVelocity = 0;
// var zVelocity = 0;
// var yVelocity = 0;


// // Handle keyboard input
// document.addEventListener("keydown", onDocumentKeyDown, false);

// function onDocumentKeyDown(event) {
//     var keyCode = event.which;
// 	const mvt = 0.5;
//     // Move cube based on key presses
//     if (keyCode == 38) { // W key (up)
//         if (cube.position.y <= platform.position.y + cube.geometry.parameters.height / 2){ 
//         //cube.position.z -= 5;
//         zVelocity = -mvt;
//         yVelocity = 0.3;
//         }
//     } 
//     if (keyCode == 40) { // S key (down)
//         if (cube.position.y <= platform.position.y + cube.geometry.parameters.height / 2){
//         zVelocity = mvt;
//         yVelocity = 0.3;
//         }
//     } 
//     if (keyCode == 37) { // A key (left)
//         //cube.position.x -= 1;
//         if (cube.position.y <= platform.position.y + cube.geometry.parameters.height / 2){
//         xVelocity = -mvt;
//         yVelocity = 0.3;
//         }
//     } 
//     if (keyCode == 39) { // D key (right)
//         //cube.position.x += 1;
//         if (cube.position.y <= platform.position.y + cube.geometry.parameters.height / 2){
//         xVelocity = mvt;
//         yVelocity = 0.3;
//         }
//     } 
//     if (keyCode == 32) { // Space key
// 		if (cube.position.y <= platform.position.y + cube.geometry.parameters.height / 2)
//         yVelocity = 1 ; // Reset vertical velocity
//     }
// }

// function changeCubeColor(cube){
//     if (cube.position.x >= 0 && cube.position.z >= 0) cube.material.color.setHex(colors[1]);
//     else if (cube.position.x <= 0 && cube.position.z >= 0) cube.material.color.setHex(colors[2]);
//     else if (cube.position.x >= 0 && cube.position.z <= 0) cube.material.color.setHex(colors[3]);
//     else if (cube.position.x <= 0 && cube.position.z <= 0) cube.material.color.setHex(colors[4]);
// }

// // Update cube position in the render loop
// var gravity = 0.05; // Adjust gravity strength
// var jumpStrength = 3; // Adjust jump strength
// // Render loop
// var render = function () {
//     requestAnimationFrame(render);
//     changeCubeColor(cube)
// 	yVelocity -= gravity; // Adjust gravity strength as needed
    
//     // Update cube position
//     cube.position.x += xVelocity;
//     cube.position.y += yVelocity;
//     cube.position.z += zVelocity;
    
//     // Check collision with platform
//     if (cube.position.y <= platform.position.y + cube.geometry.parameters.height / 2) {
//         cube.position.y = platform.position.y + cube.geometry.parameters.height / 2;
//         xVelocity = 0;
//         zVelocity = 0;
//         yVelocity = 0; // Reset vertical velocity
        
//     }
//     camera.position.z = cube.position.z + 50;
// 	camera.lookAt(cube.position);
    
//     renderer.render(scene, camera);
// };

// render();
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Set up your Three.js scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load your 3D model
const loader = new GLTFLoader();
loader.load('toyota/scene.gltf', function (gltf) {
  const model = gltf.scene; // Get the loaded model
  scene.add(model); // Add it to the scene
  model.position.set(0, 0, 0); // Adjust the position if necessary
}, undefined, function (error) {
  console.error(error);
});


// Create a light source (optional)
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Position the camera
//camera.position.z = 5;

// Render loop
function animate() {
  requestAnimationFrame(animate);
  // Rotate the model (optional)
  // model.rotation.x += 0.01;
  // model.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();