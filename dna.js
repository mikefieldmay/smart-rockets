function DNA(genes) {

  if (genes) {
    this.genes = genes;
  } else {
    this.genes = [];
    for (var i = 0; i < lifespan; i++) {
      this.genes[i] = p5.Vector.random2D(); // returns a random 2 dimensional vector
      this.genes[i].setMag(maxForce); // sets the magnitude to the maximum force
    }
  }

  this.crossover = function(partner) {
    var newGenes = []
    var mid = floor(random(this.genes.length)); // random is a p5 method that returns a random number from 0 to the value passed to it

    for (var i = 0; i < this.genes.length; i++) {
      // there are as many genes as the lifespan/count
      // mid might be a misnomer as it gets essentially a random amount of it's mother and fathers DNA, not 50%
      if (i > mid) {
        newGenes[i] = this.genes[i];
      } else {
        newGenes[i] = partner.genes[i];
      }
    }
    return new DNA(newGenes);
  }

  this.mutate = function() {  
    for (var i = 0; i < this.genes.length; i++) {
      // for every gene, there is a 0.1 chance that it will mutate
      if (random(1) < 0.01) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxForce);
      }
    }
  }

}
