function Population() {
  this.rockets = [];
  this.popSize = popSize
  this.matingPool = []

  for(var i = 0; i < this.popSize; i++) {
    this.rockets[i] = new Rocket();
  }

  this.evaluate = function() {

    var maxFit = 0;

    for (var i = 0; i < this.popSize; i++) {
      this.rockets[i].calcFitness();
      if (this.rockets[i].fitness > maxFit) {
        maxFit = this.rockets[i].fitness;
      }
    } // sets the maximum fitness as the fitness of the rocket nearest the target

    for (var i = 0; i < this.popSize; i++) {
      this.rockets[i].fitness /= maxFit;
    } // this divides the fitness by the max fitness to give a value out of 1

    this.matingPool = [];

    // the fitter the rocket, the greater the chance of it being selected from the mating pool
    for (var i = 0; i < this.popSize; i++) {
      // for every rocket multiply it's fitness by 100
      var n = this.rockets[i].fitness * 100;
      // then push as many as there are into the mating pool. e.g, if you are the fittest, 100 of you will go in.
      for (var j = 0; j < n; j++) {
        this.matingPool.push(this.rockets[i]);
      }
    }
  };

  this.selection = function() {
    var babies = [];
    for (var i = 0; i < this.rockets.length; i++) { // for every rocket i.e the poppulation of rockets (maybe use pop size)
      var fatherDNA = random(this.matingPool).dna; // select a random member of the pools dna
      var motherDNA = random(this.matingPool).dna;
      var childDNA = fatherDNA.crossover(motherDNA); // this creates a whole new set of DNA
      childDNA.mutate();
      babies[i] = new Rocket(childDNA);
    }
    this.rockets = babies;
  };

  this.run = function() {
    for(var i = 0; i < this.popSize; i++) {
      this.rockets[i].update();
      this.rockets[i].show();
    }
  };
}
