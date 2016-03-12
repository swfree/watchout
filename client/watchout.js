// CONSTANTS
var boardLength = 600;
var numberOfEnemies = 15;
var collisions = 0;

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
    collisions++;
    if (collisions === 5) {
      collisions = 0;
      d3.select('.mouse')
        .attr('height', 120).attr('width', 120)
        .transition()
        .attr('xlink:href', './assets/explosion.gif')
        .transition().delay(2000)
        .attr('height', 30).attr('width', 30)
        .attr('xlink:href', './assets/rocketship.png');
    }
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
  });

// MAKE MOUSE
var mouse = d3.select('svg').append('svg:image')
  .attr('height', 30).attr('width', 30)
  .attr('xlink:href', './assets/rocketship.png')
  .attr('x', boardLength / 2)
  .attr('y', boardLength / 2)
  .classed('mouse', true)
  .call(drag);

// ROTATE MOUSE
var rotateShip = function (data) {
  d3.select('.mouse')
    .data(data)
    .attr('transform', function (d, i) {
      return 'rotate(' + d.angle + ' ' + d.x + ' ' + d.y + ')';
    });
};

d3.select(window).on('mousemove', function() {
  var cursorX = event.clientX;
  var cursorY = event.clientY;
  var mouseX = parseInt(d3.select('.mouse').attr('x'));
  var mouseY = parseInt(d3.select('.mouse').attr('y'));
  var someAngle;

  if (mouseX > cursorX && mouseY > cursorY) {
    someAngle = -45;
  } else if (mouseX < cursorX && mouseY < cursorY) {
    someAngle = 135;
  } else if (mouseX < cursorX && mouseY > cursorY) {
    someAngle = 45;
  } else {
    someAngle = 225;
  }

  rotateShip([{angle: someAngle + 15, x: (mouseX + 15), y: (mouseY + 15)}]);
});

// START ENEMY MOVEMENT
setInterval(move, 2000);
setInterval(increaseCurrentScore, 100);