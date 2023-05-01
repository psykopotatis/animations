let lines = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    noFill();
    strokeWeight(2);

    for (let i = 0; i < 200; i++) {
        lines.push(new RotatingLine());
    }
}

function draw() {
    background(0, 10);
    translate(width / 2, height / 2);

    lines.forEach(line => {
        line.update();
        line.display();
    });
}

class RotatingLine {
    constructor() {
        this.radius = random(50, 250);
        this.angle = random(360);
        this.speed = random(0.5, 2);
        this.color = color(random(255), random(255), random(255), 50);
        this.strokeWeight = random(1, 4);
    }

    update() {
        this.angle += this.speed;
    }

    display() {
        push();
        rotate(this.angle);
        stroke(this.color);
        strokeWeight(this.strokeWeight);
        line(this.radius, 0, this.radius * 1.5, 0);
        pop();
    }
}
