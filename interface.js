  var started = false;
  var lifespan = $("#lifespan").val() ? $("#lifespan").val() : 400; // ending count
  var rocket;
  var population;
  var lifeP;
  var count = 0; // starting count
  var target;
  var maxForce = $("#maxForce").val() ? $("#maxForce").val() : 0.8; // speed
  var popSize = $("#popSize").val() ? $("#popSize").val() : 1000;// amount of things
  var crashPenalty = $("#crashPenalty").val() ? $("#crashPenalty").val() : 10;
  var generation = 1;
  // variables that relate to where the obstacle is
  var rx = 100;
  var ry = 150;
  var rw = 200;
  var rh = 10;

$(document).ready(function(){

  $('#start').click(function() {
    started = true;
    loop();
  });

});
