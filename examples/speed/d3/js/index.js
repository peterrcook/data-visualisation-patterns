var running = true;

function toggleRunning() {
    running = !running;
}

function getData(numPoints, w, h, maxR) {
    var points = [];
    for(var i=0; i<numPoints; i++) {
        points.push({
            id: 0,
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * maxR
        });
    }
    return points;
}

function update() {
    var data = getData(5000, 1000, 800, 10);

    d3.select('svg')
        .selectAll('circle')
        .data(data)
        .join('circle')
        .style('fill', '#ccc')
        .attr('cx', function(d) {
            return d.x;
        })
        .attr('cy', function(d) {
            return d.y;
        })
        .attr('r', function(d) {
            return d.r;
        });
}

function nextFrame() {
    if(running) update();
    window.requestAnimationFrame(nextFrame);
}

nextFrame();
