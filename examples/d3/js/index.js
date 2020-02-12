var width = 1200;
var numColumns = 14;
var data;
var radiusScale = d3.scaleSqrt().domain([0, 100]);
var transitionDuration = 500;
var delay = 8;

function getLayout() {
    var cellSize = width / numColumns;

    var layout = data.map(function(d, i) {
        var ret = {};

        ret.id = d.id;
        
        var col = i % numColumns;
        var row = Math.floor(i / numColumns);
        ret.x = col * cellSize + 0.5 * cellSize;
        ret.y = row * cellSize + 0.5 * cellSize;

        ret.oilGasCoalRadius = radiusScale(d.energyMix.oilgascoal);
        ret.renewableRadius = radiusScale(d.energyMix.renewable);
        ret.hydroelectricRadius = radiusScale(d.energyMix.hydroelectric);
        ret.nuclearRadius = radiusScale(d.energyMix.nuclear);

        ret.labelX = ret.x;
        ret.labelY = ret.y + cellSize * 0.5;
        ret.label = d.id;

        return ret;
    });

    return layout;
}

function update() {
    radiusScale.range([0, 0.35 * width / numColumns]);

    var layout = getLayout();

    d3.select('#chart .oilgascoal')
        .selectAll('circle')
        .data(layout, function(d) { return d.id; })
        .join(
            function(enter) {
                return enter.append('circle')
                    .classed('oilgascoal', true)
                    .attr('cx', function(d) { return d.x; })
                    .attr('cy', function(d) { return d.y; });
            }
        )
        .transition()
        .duration(transitionDuration)
        .delay(function(d, i) { return i * delay })
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; })
        .attr('r', function(d) { return d.oilGasCoalRadius; });

    d3.select('#chart .renewable')
        .selectAll('circle')
        .data(layout, function(d) { return d.id; })
        .join(
            function(enter) {
                return enter.append('circle')
                    .classed('renewable', true)
                    .attr('cx', function(d) { return d.x; })
                    .attr('cy', function(d) { return d.y; });
            }
        )
        .transition()
        .duration(transitionDuration)
        .delay(function(d, i) { return i * delay })
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; })
        .attr('r', function(d) { return d.renewableRadius; });

    d3.select('#chart .hydroelectric')
        .selectAll('circle')
        .data(layout, function(d) { return d.id; })
        .join(
            function(enter) {
                return enter.append('circle')
                    .classed('hydroelectric', true)
                    .attr('cx', function(d) { return d.x; })
                    .attr('cy', function(d) { return d.y; });
            }
        )
        .transition()
        .duration(transitionDuration)
        .delay(function(d, i) { return i * delay })
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; })
        .attr('r', function(d) { return d.hydroelectricRadius; });

    d3.select('#chart .nuclear')
        .selectAll('circle')
        .data(layout, function(d) { return d.id; })
        .join(
            function(enter) {
                return enter.append('circle')
                    .classed('nuclear', true)
                    .attr('cx', function(d) { return d.x; })
                    .attr('cy', function(d) { return d.y; });
            }
        )
        .transition()
        .duration(transitionDuration)
        .delay(function(d, i) { return i * delay })
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; })
        .attr('r', function(d) { return d.nuclearRadius; });

    d3.select('#chart .labels')
        .selectAll('text')
        .data(layout, function(d) { return d.id; })
        .join(
            function(enter) {
                return enter.append('text')
                    .classed('label', true)
                    .attr('x', function(d) { return d.labelX; })
                    .attr('y', function(d) { return d.labelY; });
            }
        )
        .transition()
        .duration(transitionDuration)
        .delay(function(d, i) { return i * delay })
        .style('opacity', 1)
        .attr('x', function(d) { return d.labelX; })
        .attr('y', function(d) { return d.labelY; })
        .text(function(d) { return d.label; });
}

function sortBy(field) {
    switch(field) {
    case 'country':
        data = _.sortBy(data, function(d) {
            return d.name;
        });
        break;
    case 'renewables':
        data = _.sortBy(data, function(d) {
            // Include hydroelectric, otherwise Zambia (as an example) ends up at the end
            // which doesn't seem fair seeing as most of its energy is hydro
            return -(d.energyMix.renewable + d.energyMix.hydroelectric);
        });
        break;
    case 'oilgascoal':
        data = _.sortBy(data, function(d) {
            return -d.energyMix.oilgascoal;
        });
        break;
    case 'nuclear':
        data = _.sortBy(data, function(d) {
            return -d.energyMix.nuclear;
        });
        break;
    }

    update();
}

d3.json('data/data.json')
    .then(function(json) {
        data = json;
        update();
    });
