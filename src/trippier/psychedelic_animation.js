// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a sphere geometry
const geometry = new THREE.SphereGeometry(10, 128, 128);

// Create a custom shader material with color-changing properties and vertex displacement
const material = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 1.0 },
    },
    vertexShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vNormal;

        void main() {
            vUv = uv;
            vNormal = normal;

            // Displacement
            float displacement = sin(time + position.x * 10.0) + sin(time + position.y * 10.0) + sin(time + position.z * 10.0);

            // Additional displacement layers
            displacement += sin(time * 0.5 + position.x * 5.0) + sin(time * 0.5 + position.y * 5.0) + sin(time * 0.5 + position.z * 5.0);
            displacement += sin(time * 0.25 + position.x * 2.5) + sin(time * 0.25 + position.y * 2.5) + sin(time * 0.25 + position.z * 2.5);

            vec3 newPosition = position + normal * displacement * 0.1;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
    `,
    fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vNormal;

        void main() {
            float r = 0.5 * sin(vUv.x * 3.0 + time) + 0.5;
            float g = 0.5 * sin(vUv.y * 3.0 + time) + 0.5;
            float b = 0.5 * sin((vUv.x + vUv.y) * 3.0 + time) + 0.5;
            gl_FragColor = vec4(r, g, b, 1.0);
        }
    `,
});

// Create a sphere mesh and add it to the scene
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Set the camera position
camera.position.z = 30;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the sphere
    sphere.rotation.x += 0.005;
    sphere.rotation.y += 0.005;

    // Update the material's time uniform to change colors and displacement
    material.uniforms.time.value += 0.05;

    // Render the scene
    renderer.render(scene, camera);
}

animate();

