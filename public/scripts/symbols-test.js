import * as device from './devices.js'

// reference to canvas
var canvas = document.getElementById("myCanvas");
// 2D rendering context, to paint to canvas
var ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// get mouse movement
window.addEventListener('mousemove', mouseTracker);
window.addEventListener('mouseup', mouseClicker);

var mouse = {
    x: undefined,
    y: undefined
}

var devices = [];

var selector = {
    holds: false,
    index: undefined,
}

function mouseTracker(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log(`Mouse x: ${mouse.x}, y: ${mouse.y}`);
}

function mouseClicker(event) {
    if (selector.holds == false) {
        let found = false;
        let deviceIndex = 0;
        console.log(devices);
        while (!found) {
            // debugging
            // console.log(devices[deviceIndex]);
            // console.log(event.x - devices[deviceIndex].x);
            // console.log(event.y - devices[deviceIndex].y);
            // check how close the cursor is to this device
            // if true, end the loop and pick up the device
            if (Math.abs(event.x - devices[deviceIndex].x) < 30 && Math.abs(event.y - devices[deviceIndex].y) < 30) {
                found = true;
                selector.holds = true;
                selector.index = deviceIndex;
                devices[deviceIndex].hold();
            }
            // if we've run through all devices, end the loop
            if (deviceIndex == devices.length - 1) {
                found = true;
            }
            deviceIndex += 1;
        }
    } else if (selector.holds == true) {
        // drop the device, set the mouse to free
        devices[selector.index].drop();
        selector.holds = false;
        selector.index = undefined;
    }
}

ctx.font = '18px sans-serif'


var testGateAND = new device.AndGate(200, 200);
devices.push(testGateAND);


var testSwitch = new device.Switch(325, 200);
testSwitch.toggle();
devices.push(testSwitch);


var testBulb = new device.Bulb(460, 200);
testBulb.toggle();
devices.push(testBulb);

// main animation loop
function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let index in devices) {
        devices[index].update(ctx, mouse);
    }

    ctx.fillText('AND Gate', 140, 150)
    ctx.fillText('Switch', 300, 150)
    ctx.fillText('Bulb', 440, 150)
}

animate();
