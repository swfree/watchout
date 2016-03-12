// CONSTANTS
var boardLength = 600;
var numberOfEnemies = 10;

// HELPERS
/* Creates an array of 10 random coordinates */
var randPositions = function() {
  var result = [];
  for (var i = 0; i < numberOfEnemies; i++) {
    result.push(Math.random() * boardLength);
  }
  return result;
};

/* Checks for collisions */
var checkCollision = function(d, i) {
  var enemyX = d3.select(this).attr('cx');
  var enemyY = d3.select(this).attr('cy');
  var mouseX = d3.select('.mouse').attr('cx');
  var mouseY = d3.select('.mouse').attr('cy');
  
  var separation = Math.sqrt(Math.pow((enemyX - mouseX), 2) + Math.pow((enemyY - mouseY), 2));
  if (separation < (40)) {
    updateScore();
  } else {
    increaseCurrentScore();
  }
};

/* Increases Current Score */
var increaseCurrentScore = function() {
  // increase current score
  var currentScore = parseInt(d3.select('.current').select('span').text());
  currentScore++;
  d3.select('.current').select('span').text(currentScore + '');
};

/* Updates score board */
var updateScore = function () {

  // save current score
  // save high score
  // reset current score to zero
  // if current score is greater than high score
    // high score = current score

  var currentScore = parseInt(d3.select('.current').select('span').text()); 
  var highScore = parseInt(d3.select('.highscore').select('span').text()); 
  if (currentScore > highScore) {
    d3.select('.highscore').select('span').text(currentScore + '');
  }
  d3.select('.current').select('span').text('0');
};

/* Transitions enemy pieces */
var move = function () {
  d3.select('svg').selectAll('.enemies')
    .data(randPositions())
    .transition().duration(1500)
    .attr('cx', function(d) { return d; })
    .tween('checkCollision', checkCollision)
    .each(function() {
      d3.selectAll('.enemies')
      .data(randPositions())
      .transition()
      .attr('cy', function(d) { return d; });
    });
};


// SVG HELPERS
/* Sets up the game board */
var svg = d3.select('.board').append('svg')
  .attr('width', boardLength)
  .attr('height', boardLength);

d3.select('svg').selectAll('circle')
  .data(randPositions()).enter().append('circle').attr('cx', function(d) { return d; })
  .attr('r', 10)
  .data(randPositions()).attr('cy', function(d) { return d; })
  .classed('enemies', true);

var drag = d3.behavior.drag()
  .on('drag', function() { mouse.attr('cx', d3.event.x).attr('cy', d3.event.y); });

var mouse = d3.select('svg').append('circle')
  .attr('fill', 'blue').attr('cx', boardLength / 2)
  .attr('cy', boardLength / 2).attr('r', 10)
  .classed('mouse', true).call(drag);

// START ENEMY MOVEMENT
setInterval(move, 2000);
setInterval(increaseCurrentScore, 100);