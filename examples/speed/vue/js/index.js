var stats = new Stats();
stats.showPanel(0);
document.body.appendChild( stats.dom );

var running = true;
var numItems = 1500;
var w = 1000;
var h = 800;
var maxR = 10;

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

var app = new Vue({
    el: '#app',
    data: {
        data: null
    },
    mounted: function() {
        this.data = initData();
        this.update();
    },
    methods: {
        update() {
            stats.begin();
            if(running) {
                for(var i=0; i<numItems; i++) {
                    Vue.set(this.data, i, {
                        x: Math.random() * w,
                        y: Math.random() * h,
                        r: Math.random() * maxR
                    });
                }
            }
            stats.end();
            window.requestAnimationFrame(this.update);
        }
    }
});
