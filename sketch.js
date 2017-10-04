function setup() {
  createCanvas(400, 300);
  // rocket = new Rocket();
  population = new Population();
  lifeP = createP();
  generationP = createP();
  target = createVector(width/2, 50);
  noLoop();
}

function draw() {
  if (started) {
    background(0);
    population.run();
    lifeP.html(count);
    generationP.html(generation);

    count++;

    if (count == lifespan) {
      population.evaluate();
      population.selection();
      count = 0;
      generation ++;
    }

    // fill(255);
    rect(100, 150, 200, 10);
    ellipse(target.x, target.y, 16, 16);
  }

}
