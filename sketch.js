let noiseScale = 0.004;
let num = 4000;
let particles = [];

let button;

class Particle {
  constructor(col) {
    this.position = createVector(random(0, width), random(0, height));
    this.radius = 3;
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0.0, 0.0);
    this.colour = col;
  }

  render() {
    noStroke();
    fill(this.colour);

    ellipse(this.position.x, this.position.y, this.radius);
  }

  update(nscale) {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    let n = noise(
      this.position.x * nscale,
      this.position.y * nscale,
      frameCount * nscale
    );

    let a = TAU * n;

    let px = cos(a);
    let py = sin(a);
    this.acceleration = createVector(px, py);

    this.velocity.limit(2);

    if (!onScreen(this.position)) {
      this.position.x = random(width, width + 100);
      this.position.y = random(-100, height + 100);
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //button = createButton("some bullshit");
  //button.mousePressed();


  for (let i = 0; i < num; i++) {
    particles.push(new Particle(color(0, random(255), 0)));
  }
}

function draw() {
  background(0, 10);
  for (let i = 0; i < num; i++) {
    if (i < num / 2) {
      particles[i].colour = color(255);
    } else {
      particles[i].colour = color(255);
    }
    particles[i].update(random(0.01, 0.004));
    particles[i].render();
  }
}

function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
