var player = document.getElementById("player");
var level = document.getElementById("level");
var obstacles = [];
var score = 0;

// Move the player
document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowLeft") {
        var left = parseInt(player.style.left);
        if (left > 0) {
            player.style.left = (left - 50) + "px";
        }
    }
    if (e.key === "ArrowRight") {
        var left = parseInt(player.style.left);
        if (left < 450) {
            player.style.left = (left + 50) + "px";
        }
    }
    if (e.key === "ArrowUp") {
        var bottom = parseInt(player.style.bottom);
        if (bottom < 250) {
            player.style.bottom = (bottom + 50) + "px";
        }
    }
    if (e.key === "ArrowDown") {
        var bottom = parseInt(player.style.bottom);
        if (bottom > 0) {
            player.style.bottom = (bottom - 50) + "px";
        }
    }

    // Check for collision with obstacles
    for (var i = 0; i < obstacles.length; i++) {
        if (checkCollision(player, obstacles[i])) {
            alert("Game over! Your score is " + score);
            location.reload();
        }
    }

    // Check for victory
    if (player.style.left === "450px" && player.style.bottom === "250px") {
        alert("You win! Your score is " + score);
        location.reload();
    }
});

// Generate obstacles
for (var i = 0; i < 5; i++) {
    var obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    obstacle.style.left = (Math.floor(Math.random() * 10) * 50) + "px";
    obstacle.style.bottom = (Math.floor(Math.random() * 5) * 50) + "px";
    level.appendChild(obstacle);
    obstacles.push(obstacle);
}

// Increase score every second
setInterval(function() {
    score++;
}, 1000);

// Check for collision between two elements
function checkCollision(a, b) {
    var aRect = a.getBoundingClientRect();
    var bRect = b.getBoundingClientRect();

    return !(
        (aRect.bottom < bRect.top) ||
        (aRect.top > bRect.bottom) ||
        (aRect.right < bRect.left) ||
        (aRect.left > bRect.right)
    );
}
