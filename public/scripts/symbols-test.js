import * as device from './devices.js'

// reference to canvas
var canvas = document.getElementById("myCanvas");
// 2D rendering context, to paint to canvas
var ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
// fix coordinate issue by updating the CSS
// ctx.canvas.style.width = canvas.width + 'px';
// ctx.canvas.style.height = canvas.height + 'px';

// fix coordinate issue by getting our canvas bounds
// and offsetting the mouse position
var canvasBounds = canvas.getBoundingClientRect();

// get mouse movement
window.addEventListener('mousemove', mouseTracker);
window.addEventListener('mouseup', mouseClicker);

var mouse = {
    x: undefined,
    y: undefined,
    holding: false,
    heldDevice: undefined,
    clicked: false
}

var devices = [];

// fix coordinate issue by getting our canvas bounds
// and offsetting the mouse position
function locator(event) {
    let location = {
        x: undefined,
        y: undefined
    }
    location.x = event.x - canvasBounds.x;
    location.y = event.y - canvasBounds.y;
    return location
}

function mouseTracker(event) {
    let loc = locator(event)
    mouse.x = loc.x;
    mouse.y = loc.y;
    // console.log(`Mouse x: ${mouse.x}, y: ${mouse.y}`);
}

function mouseClicker(event) {
    mouse.clicked = true;
}

ctx.font = '18px sans-serif'


var testGateAND = new device.AndGate(200, 200);
devices.push(testGateAND);


var testSwitch = new device.Switch(325, 200);
testSwitch.state = true;
devices.push(testSwitch);

var testSwitch2 = new device.Switch(325, 300);
devices.push(testSwitch2);


var testBulb = new device.Bulb(460, 200);
devices.push(testBulb);

// main animation loop
function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let index in devices) {
        ctx.strokeStyle = 'black';
        devices[index].update(ctx, mouse);
    }

    ctx.fillText('AND Gate', 140, 150)
    ctx.fillText('Switch', 300, 150)
    ctx.fillText('Bulb', 440, 150)

    mouse.clicked = false;
}

animate();
