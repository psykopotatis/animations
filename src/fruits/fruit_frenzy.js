var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Create the basket object
var basket = {
    x: canvas.width/2 - 25,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    speed: 5
};

// Create the fruits array
var fruits = [];

// Create the score variable
var score = 0;

// Create the game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the basket
    ctx.fillStyle = "brown";
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);

    // Draw the fruits
    for (var i = 0; i < fruits.length; i++) {
        ctx.fillStyle = fruits[i].color;
        ctx.beginPath();
        ctx.arc(fruits[i].x, fruits[i].y, fruits[i].radius, 0, 2*Math.PI);
        ctx.fill();

        // Update the fruit position
        fruits[i].y += fruits[i].speed;

        // Check if the fruit is caught
        if (fruits[i].y + fruits[i].radius >= basket.y && fruits[i].x >= basket.x && fruits[i].x <= basket.x + basket.width) {
            fruits.splice(i, 1);
            score++;
        }

        // Check if the fruit is missed
        if (fruits[i].y + fruits[i].radius >= canvas.height) {
            fruits.splice(i, 1);
        }
    }

    // Draw the score
    ctx.fillStyle = "black";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    // Move the basket
    if (keys.left && basket.x > 0) {
        basket.x -= basket.speed;
    }
    if (keys.right && basket.x + basket.width < canvas.width) {
        basket.x += basket.speed;
    }

    // Create new fruits
    if (Math.random() < 0.05) {
        var fruit = {
            x: Math.random() * canvas.width,
            y: 0,
            radius: 20,
            speed: 5,
            color: getRandomColor()
        };
        fruits.push(fruit);
    }

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

// Create the keys object
var keys = {};

// Handle the key events
document.addEventListener("keydown", function(e) {
    keys[e.key] = true;
});
document.addEventListener("keyup", function(e) {
    keys[e.key] = false;
});

// Start the game loop
gameLoop();

// Get a random color
function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
