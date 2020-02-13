var width = 1200;
var numColumns = 14;
var data;
var radiusScale = d3.scaleSqrt().domain([0, 100]);
var transitionDuration = 500;
var transitionDelay = 8;
var sortBy = 'country';

function getLayout() {
    var cellWidth = width / numColumns;
    var cellHeight = cellWidth * 1.2;

    var layout = data.map(function(d, i) {
        var ret = {};

        ret.id = d.id;
        
        var col = i % numColumns;
        var row = Math.floor(i / numColumns);
        ret.x = col * cellWidth + 0.5 * cellWidth;
        ret.y = row * cellHeight + 0.5 * cellHeight;

        ret.oilGasCoalRadius = radiusScale(d.energyMix.oilgascoal);
        ret.renewableRadius = radiusScale(d.energyMix.renewable);
        ret.hydroelectricRadius = radiusScale(d.energyMix.hydroelectric);
        ret.nuclearRadius = radiusScale(d.energyMix.nuclear);

        ret.labelYOffset = cellHeight * 0.45;
        ret.label = d.id;

        if(sortBy !== 'country') {
            ret.opacity = d.energyMix[sortBy] > 0 ? 1 : 0;
        } else {
            ret.opacity = 1;
        }

        ret.datum = d;

        return ret;
    });

    return layout;
}

function enteringGroups(enter) {
    var enterSelection = enter
        .append('g')
        .classed('country', true)
        .style('opacity', 0)
        .attr('transform', function(d) {
            return 'translate(' + d.x + ',' + d.y + ')';
        });

    enterSelection.append('circle')
        .classed('oilgascoal', true);

    enterSelection.append('circle')
        .classed('renewable', true);

    enterSelection.append('circle')
        .classed('hydroelectric', true);

    enterSelection.append('circle')
        .classed('nuclear', true);

    enterSelection.append('text')
        .classed('label', true)
        .attr('y', function(d) {
            return d.labelYOffset;
        });

    return enterSelection;
}

function updateItem(d, i) {
    var t = d3.transition()
        .duration(transitionDuration)
        .delay(i * transitionDelay);
    
    d3.select(this)
        .transition(t)
        .attr('transform', 'translate(' + d.x + ',' + d.y + ')')
        .style('opacity', d.opacity);

    d3.select(this)
        .select('.oilgascoal')
        .transition(t)
        .attr('r', d.oilGasCoalRadius);

    d3.select(this)
        .select('.renewable')
        .transition(t)
        .attr('r', d.renewableRadius);

    d3.select(this)
        .select('.hydroelectric')
        .transition(t)
        .attr('r', d.hydroelectricRadius);

    d3.select(this)
        .select('.nuclear')
        .transition(t)
        .attr('r', d.nuclearRadius);

    d3.select(this)
        .select('.label')
        .text(d.label);
}

function updateChart() {
    radiusScale.range([0, 0.35 * width / numColumns]);

    var layout = getLayout();

    d3.select('#chart')
        .selectAll('g.country')
        .data(layout, function(d) { return d.id; })
        .join(enteringGroups)
        .each(updateItem);
}

function doSort() {
    switch(sortBy) {
    case 'country':
        data = _.sortBy(data, function(d) {
            return d.name;
        });
        break;
    case 'renewable':
    case 'hydroelectric':
    case 'oilgascoal':
    case 'nuclear':
        data = _.sortBy(data, function(d) {
            return -d.energyMix[sortBy];
        });
        break;
    }
}

function update() {
    doSort();
    updateChart();
    updateMenu();
}

d3.json('data/data.json')
    .then(function(json) {
        data = json;
        update();
    });
