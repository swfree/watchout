var boardLength = 600;
var numberOfEnemies = 10;

var initial = function(x, y, r) {
  svg.append('circle').attr('cx', x).attr('cy', y).attr('r', r);
};

var randPositions = function() {
  var result = [];
  for (var i = 0; i < numberOfEnemies; i++) {
    result.push(Math.random() * boardLength);
  }
  return result;
};

var drag = d3.behavior.drag()
  .on('drag', function() { mouse.attr('cx', d3.event.x).attr('cy', d3.event.y); });

var svg = d3.select('.board').append('svg')
  .attr('width', boardLength)
  .attr('height', boardLength);

d3.select('svg').selectAll('circle')
  .data(randPositions()).enter().append('circle').attr('cx', function(d) { return d; })
  .attr('r', 10)
  .data(randPositions()).attr('cy', function(d) { return d; })
  .classed('enemies', true);

// var circle = svg.append('circle').attr('cx', 30).attr('cy', 30).attr('r', 10);
// circle.transition().attr('cx', 60).duration(1000).delay(1000);

var mouse = d3.select('svg').append('circle')
  .attr('fill', 'blue').attr('cx', boardLength / 2)
  .attr('cy', boardLength / 2).attr('r', 10)
  .classed('mouse', true).call(drag);


var move = function () {
  d3.select('svg').selectAll('.enemies')
    .data(randPositions())
    .transition().duration(1500)
    .attr('cx', function(d) { return d; })
    .each(function() {
      d3.selectAll('.enemies')
      .data(randPositions())
      .transition()
      .attr('cy', function(d) { return d; });
    });

};

setInterval(move, 2000);
