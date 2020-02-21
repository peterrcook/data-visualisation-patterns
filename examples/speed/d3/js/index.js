var stats = new Stats();
stats.showPanel(0);
document.body.appendChild( stats.dom );

var running = true;
var numItems = 1500;
var w = 1000;
var h = 800;
var maxR = 10;
var data = initData();

function toggleRunning() {
    running = !running;
}

function initData() {
    var data = [];
    for(var i=0; i<numItems; i++) {
        data.push({ id: 0 });
    }
    return data;
}

function updateData() {
    for(var i=0; i<numItems; i++) {
        data[i] = {
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * maxR
        }
    }
}

function update() {
    updateData();

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
    stats.begin();
    if(running) update();
    stats.end();
    window.requestAnimationFrame(nextFrame);
}

nextFrame();
