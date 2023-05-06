var canvas = document.getElementById('canvas');
var renderer = new THREE.WebGLRenderer({ canvas: canvas, precision: "highp" });

var camera = new THREE.OrthographicCamera(-2, 2, 2, -2, 1, 1000);
camera.position.set(0, 0, 2);
camera.lookAt(new THREE.Vector3());

var scene = new THREE.Scene();

var widthSegments = canvas.width - 1;
var heightSegments = canvas.height - 1;

var geometry = new THREE.BufferGeometry();

var vertices = new Float32Array(widthSegments * heightSegments * 3);
var indices = new Uint16Array(widthSegments * heightSegments * 6);

var index = 0;

for (var j = 0; j < heightSegments; j++) {
    for (var i = 0; i < widthSegments; i++) {
        var a = j * (widthSegments + 1) + i;
        var b = (j + 1) * (widthSegments + 1) + i;
        var c = (j + 1) * (widthSegments + 1) + i + 1;
        var d = j * (widthSegments + 1) + i + 1;

        indices[index++] = a;
        indices[index++] = b;
        indices[index++] = d;

        indices[index++] = b;
        indices[index++] = c;
        indices[index++] = d;
    }
}

geometry.setIndex(new THREE.BufferAttribute(indices, 1));

var position = new THREE.BufferAttribute(vertices, 3);
geometry.addAttribute('position', position);

// var mesh = new THREE.Mesh(geometry, material);

var material = new THREE.ShaderMaterial({
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent,
    uniforms: {
        zoom: { value: 1.5 },
        offsetX: { value: 0 },
        offsetY: { value: 0 },
        maxIterations: { value: 100 }
    }
});
console.log("Zoom:", material.uniforms.zoom.value);
console.log("Offset X:", material.uniforms.offsetX.value);
console.log("Offset Y:", material.uniforms.offsetY.value);

var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    console.log("Animating...");
}

animate();
