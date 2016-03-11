var boardWidth = 600;
var boardHeight = 600;
// HELPER FUNCTIONS
var initial = function(x, y, r) {
  svg.append('circle').attr('cx', x).attr('cy', y).attr('r', r);
};


var randX = function() {
  return Math.random() * boardWidth;
};

var randY = function() {
  return Math.random() * boardHeight;
};

var drag = d3.behavior.drag()
  .on('drag', function() { mouse.attr('cx', d3.event.x).attr('cy', d3.event.y); });



// start slingin' some d3 here.

var xPositions = [randX(), randX(), randX(), randX(), randX(), randX(), randX(), randX(), randX(), randX()];
var yPositions = [randY(), randY(), randY(), randY(), randY(), randY(), randY(), randY(), randY(), randY()];


var svg = d3.select('.board').append('svg')
  .attr('width', boardWidth)
  .attr('height', boardHeight);

d3.select('svg').selectAll('circle')
  .data(xPositions).enter().append('circle').attr('cx', function(d) { return d; })
  .attr('r', 10)
  .data(yPositions).attr('cy', function(d) { return d; });

// var circle = svg.append('circle').attr('cx', 30).attr('cy', 30).attr('r', 10);
// circle.transition().attr('cx', 60).duration(1000).delay(1000);

var mouse = d3.select('svg').append('circle')
  .attr('fill', 'blue').attr('cx', boardWidth / 2)
  .attr('cy', boardHeight / 2).attr('r', 10)
  .classed('mouse', true);

d3.select('.mouse').call(drag);



