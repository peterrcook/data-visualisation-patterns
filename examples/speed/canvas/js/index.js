var stats = new Stats();
stats.showPanel(0);
document.body.appendChild( stats.dom );

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var running = true;
var numItems = 1500;
var w = 1000;
var h = 800;
var maxR = 10;
var data = initData();

var twoPi = 2 * Math.PI;

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

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#ccc';

    for(var i=0; i<numItems; i++) {
        var d = data[i];
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, twoPi, false);
        ctx.fill();
    }
}

function nextFrame() {
    stats.begin();
    if(running) update();
    stats.end();
    window.requestAnimationFrame(nextFrame);
}

nextFrame();
