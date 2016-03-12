// CONSTANTS
var boardLength = 600;
var numberOfEnemies = 10;

// HELPERS
/* Creates an array of 10 random coordinates */
var randPositions = function(n) {
  n = n || numberOfEnemies;
  var result = [];
  for (var i = 0; i < n; i++) {
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

/* Add starry night sky */
var addStars = function () {
  d3.select('svg').selectAll('.stars')
    .data(randPositions(50)).enter().append('circle')
    .attr('cx', function(d) { return d; })
    .attr('r', 1)
    .data(randPositions(50)).attr('cy', function(d) { return d; })
    .classed('stars', true);
};

// SVG HELPERS
/* Sets up the game board */
var svg = d3.select('.board').append('svg')
  .attr('width', boardLength)
  .attr('height', boardLength);

// PLACE STARS
addStars();

d3.select('svg').selectAll('.enemies')
  .data(randPositions()).enter().append('circle')
  .attr('cx', function(d) { return d; })
  .attr('r', 10)
  .data(randPositions()).attr('cy', function(d) { return d; })
  .classed('enemies', true);

var drag = d3.behavior.drag()
  .on('drag', function() { mouse.attr('cx', d3.event.x).attr('cy', d3.event.y); });

// MAKE PATTERN IMAGE
d3.select('svg').append('defs').append('pattern')
  .attr('id', 'image').attr('x', 0)
  .attr('y', 0).attr('patternUnits', 'userSpaceOnUse')
  .attr('height', 20).attr('width', 20)
  .append('image').attr('x', 0).attr('y', 0)
  .attr('height', '100%').attr('width', '100%')
  .attr('xlink:href', './assets/rocketship.png');


// MAKE MOUSE
var mouse = d3.select('svg').append('circle')
  // .attr('id', 'top')
  // .attr('fill', 'url(#image)') 
  // .attr('cx', boardLength / 2)
  // .attr('cy', boardLength / 2).attr('r', 10)
  // .classed('mouse', true).call(drag);


  .attr('fill', 'blue') 
  .attr('cx', boardLength / 2)
  .attr('cy', boardLength / 2).attr('r', 10)
  .classed('mouse', true).call(drag);

// START ENEMY MOVEMENT
setInterval(move, 2000);
setInterval(increaseCurrentScore, 100);