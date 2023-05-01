const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Circle object
const circle = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 30,
    dx: 2,
    dy: 2,
};

// Function to draw the circle
function drawCircle() {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

// Function to update the circle's position
function updateCircle() {
    circle.x += circle.dx;
    circle.y += circle.dy;

    // Check for boundary collision
    if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
        circle.dx = -circle.dx;
    }
    if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0) {
        circle.dy = -circle.dy;
    }
}

// Function to animate the circle
function animate() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw and update the circle
    drawCircle();
    updateCircle();

    // Request to perform animation
    requestAnimationFrame(animate);
}

// Start animation
animate();
