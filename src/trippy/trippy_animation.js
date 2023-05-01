// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a torus knot geometry
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);

// Create a custom shader material with color-changing properties
const material = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 1.0 },
    },
    vertexShader: `
        varying vec2 vUv;

        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float time;
        varying vec2 vUv;

        void main() {
            float r = 0.5 * sin(vUv.x * 3.0 + time) + 0.5;
            float g = 0.5 * sin(vUv.y * 3.0 + time) + 0.5;
            float b = 0.5 * sin((vUv.x + vUv.y) * 3.0 + time) + 0.5;
            gl_FragColor = vec4(r, g, b, 1.0);
        }
    `,
});

// Create a torus knot mesh and add it to the scene
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Set the camera position
camera.position.z = 30;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the torus knot
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;

    // Update the material's time uniform to change colors
    material.uniforms.time.value += 0.1;

    // Render the scene
    renderer.render(scene, camera);
}

animate();
