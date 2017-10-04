function Rocket(dna) {
  this.position = createVector(width/2, height); //width of the drawing canvas
  this.velocity = createVector(); // initially 0. When added to the position it changes the things magnitude and position
  this.acceleration = createVector(); // initially 0
  // if it's crashed or completed it won't move further
  this.crashed = false;
  this.completed = false; 
  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }
  this.fitness = 0;


  this.applyForce = function(force) {
    this.acceleration.add(force); // adding the gene (which is a vector) to the old accelaration
  };

  this.calcFitness = function() {
    var distance = dist(this.position.x, this.position.y, target.x, target.y); // how far the item is away from the target. 
    this.fitness = map(distance, 0, width, width, 0); 
    // If the target is reached, the fitness is 400

    if (this.completed) {
      this.fitness *= 10; // if target is reached fitness is increased massively
    }
    if (this.crashed) {
      this.fitness /= 10; // if target isn't reach, fitness crashes
    }
  };

  this.update = function() {
    var targetDistance = dist(this.position.x, this.position.y, target.x, target.y);
    if (targetDistance < 10) {
      this.completed = true;
      this.position = target.copy();
    } // if the item is has hit the target, it is completed and it's position is now where the target is

    if (this.position.x > rx && this.position.x < rx + rw && this.position.y > ry && this.position.y < ry + rh) {
      this.crashed = true;
    } // if his has hit any part of the obstacle, then it has crashed

    if (this.position.x > width || this.position.x < 0) {
      this.crashed = true;
    } // if the rocket has hit the side it's crashed

    if (this.position.y > height || this.position.y < 0) {
      this.crashed = true;
    } // if the rocket has hit the top or bottom it's crashed

    this.applyForce(this.dna.genes[count]); // every gene is a random direction
    if (!this.completed && !this.crashed) {
      // N.B addition seems to take magnitude into account
      this.velocity.add(this.acceleration);
      // adding the acceleration to the velocity
      this.position.add(this.velocity);
      // adding the new velocity to the position
      this.acceleration.mult(0);
      // multiplies the vector by a scalar 0 which essentially resets the acceleration value
      this.velocity.limit(4);
      // limits the magnitude of the vector to 4
    }
  }

  this.show = function() {
    push(); // starts the new drawing state
    noStroke(); // disables drawing the outline
    fill(204, 102, 0, 150); // sets the color to draw shapes
    translate(this.position.x, this.position.y); // displace the shape by it's new coordinates
    rotate(this.velocity.heading()); // rotate by a specified angle. Heading calculates the angle a thing is heading
    rectMode(CENTER); // sets it up to be drawn from the center
    rect(0, 0, 25, 5); // the shape is drawn
    pop(); // restores the original drawing state
  }

}
