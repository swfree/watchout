// CONSTANTS
var boardLength = 600;
var numberOfEnemies = 15;

// HELPERS
/* Creates an Array of n Random Coordinates */
var randPositions = function(n) {
  n = n || numberOfEnemies;
  var result = [];
  for (var i = 0; i < n; i++) {
    result.push(Math.random() * boardLength);
  }
  return result;
};

/* Checks for Collisions */
var checkCollision = function(d, i) {
  var enemyX = d3.select(this).attr('x');
  var enemyY = d3.select(this).attr('y');
  var mouseX = d3.select('.mouse').attr('x');
  var mouseY = d3.select('.mouse').attr('y');
  
  var separation = Math.sqrt(Math.pow((enemyX - mouseX), 2) + Math.pow((enemyY - mouseY), 2));
  if (separation < (40)) {
    updateScore();
  } else {
    increaseCurrentScore();
  }
};

/* Increases Current Score */
var increaseCurrentScore = function() {
  var currentScore = parseInt(d3.select('.current').select('span').text());
  currentScore++;
  d3.select('.current').select('span').text(currentScore + '');
};

/* Updates Score Board */
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

/* Transitions Enemy Pieces */
var move = function () {
  d3.select('svg').selectAll('.enemies')
    .data(randPositions())
    .transition().duration(1500)
    .attr('x', function(d) { return d; })
    .tween('checkCollision', checkCollision)
    .each(function() {
      d3.selectAll('.enemies')
      .data(randPositions())
      .transition()
      .attr('y', function(d) { return d; });
    });
};

/* Add Starry Night Sky */
var addStars = function () {
  d3.select('svg').selectAll('.stars')
    .data(randPositions(75)).enter().append('circle')
    .attr('cx', function(d) { return d; })
    .attr('r', 1)
    .data(randPositions(75)).attr('cy', function(d) { return d; })
    .classed('stars', true);
};

// SVG HELPERS
/* Sets up the Game Board */
var svg = d3.select('.board').append('svg')
  .attr('width', boardLength)
  .attr('height', boardLength);

// PLACE STARS
addStars();

d3.select('svg').selectAll('.enemies')
  .data(randPositions()).enter().append('svg:image')
  .attr('x', function(d) { return d; })
  .data(randPositions()).attr('y', function(d) { return d; })
  .attr('height', 30).attr('width', 30)
  .attr('xlink:href', './assets/asteroid.png')
  .classed('enemies', true);

var drag = d3.behavior.drag()
  .on('drag', function() { 
    mouse.attr('x', d3.event.x).attr('y', d3.event.y);
    // .attr('transform', 'rotate(45 ' + d3.select('.mouse').attr('x') + ' ' + d3.select('.mouse').attr('y') + ')'); 
    

    // affect rocketship rotation
    // find x and y coordinate before drag
    // on drag compare new x and y coordinate to previous x and y coordinate
    // rotate ship based on angle
    // sin(-x, y)???
  });

var rotateShip = function () {
  var tween = function (d, i, a) {
    console.log(a);
    return d3.interpolate('rotate(-60 300 300)', 'rotate(60 150 130)');
  };
  d3.select('.mouse')
    .transition()
    .duration(3000)
    .attrTween('transform', tween.call(this, undefined, undefined, 'transform'));
};

// MAKE MOUSE
var mouse = d3.select('svg').append('svg:image')
  .attr('height', 30).attr('width', 30)
  .attr('xlink:href', './assets/rocketship.png')
  .attr('x', boardLength / 2)
  .attr('y', boardLength / 2)
  .classed('mouse', true)
  .call(drag);

// make mouse rotate on mouseover
// d3.select('.mouse').on('mouseover', rotateShip);

// add mouse effects
// d3.select('.mouse').attr('animation-name', 'spin')
//   .attr('animation-duration', '3000')
//   .attr('animation-iteration-count', 'infinite')
//   .attr('transform-origin', '50% 50%')
//   .attr('display', 'inline-block');

// d3.select('.mouse').attr('transform', 'rotate(45 ' + d3.select('.mouse').attr('x') + ' ' + d3.select('.mouse').attr('y') + ')');



// START ENEMY MOVEMENT
setInterval(move, 2000);
setInterval(increaseCurrentScore, 100);