let particles = [];
let density = 20;
let res = 90;

function setup() {
  createCanvas(windowWidth, windowHeight);
  placeParticles();
}

function draw() {
  background(200, 200, 200);
  noStroke();

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
}

function placeParticles() {
  for (let i = 0; i < width * 2; i += density) {
    for (let j = 0; j < height * 2; j += density) {
      let c = color(255, 211, 0, 255);
      particles.push(new Particle(i, j, c));
    }
  }
}

class Particle {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = c;
    this.homeX = x;
    this.homeY = y;
  }

  update() {
    let mouseD = dist(this.x, this.y, mouseX, mouseY);
    let mouseA = atan2(this.y - mouseY, this.x - mouseX);
    let homeD = dist(this.x, this.y, this.homeX, this.homeY);
    let homeA = atan2(this.homeY - this.y, this.homeX - this.x);

    let mouseF = constrain(map(mouseD, 0, 400, 50, 0), 0, 200);
    let homeF = map(homeD, 0, 150, 0, 10);

    let vx = cos(mouseA) * mouseF + cos(homeA) * homeF;
    let vy = sin(mouseA) * mouseF + sin(homeA) * homeF;

    this.x += vx;
    this.y += vy;
  }

  draw() {
    fill(this.c);
    rect(this.x, this.y, res, res);
  }
}
