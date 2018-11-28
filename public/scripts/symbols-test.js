import * as device from './devices.js'

// reference to canvas
var canvas = document.getElementById("myCanvas");
// 2D rendering context, to paint to canvas
var ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
// fix coordinate issue by updating the CSS
// ctx.canvas.style.width = canvas.width + 'px';
// ctx.canvas.style.height = canvas.height + 'px';

// fix coordinate issue by getting our canvas bounds
// and offsetting the mouse position
var canvasBounds = canvas.getBoundingClientRect();

// get mouse movement
window.addEventListener('mousemove', mouseTracker);
window.addEventListener('mousedown', mouseGrabber);
window.addEventListener('mouseup', mouseReleaser);
window.addEventListener('click', mouseClicker);

var mouse = {
    x: undefined,
    y: undefined,
    holding: false,
    heldDevice: undefined,

    grab(item) {
        if (this.holding == false) {
            this.holding = true;
            this.heldDevice = item;
            this.heldDevice.hold();
        }
    },

    drop() {
        if (this.heldDevice != undefined) {
            this.heldDevice.drop();
        }
        this.holding = false;
        this.heldDevice = undefined;
    }
}

var devices = [];
var wires = [];

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
}

function mouseClicker(event) {
    let loc = locator(event) {
        if (mouse.holding == false) {
            // find a device underneath and send it a click event
            let result = {
                status: 'empty'
            }
            let underCursor = false;
            let index = 0;
            while (underCursor == false && index < devices.length) {
                underCursor = device[index].checkLocation(loc);
                if (underCursor == true) {
                    let target = device[index];
                    result = target.click(loc);
                }
            }
            if (result.status == 'connector') {
                let wire = new device.Wire(loc);
                mouse.grab(wire);
                // TODO: Create function
                anchorWire(wire, result.connection);
            }
        } else if (mouse.heldDevice instanceof Wire) {
            // find a device underneath and send it a click event
            let result = {
                status: 'empty',
                connection: undefined
            }
            let underCursor = {
                status: false,
                location: undefined
            }
            let index = 0;
            while (underCursor.status == false && index < devices.length) {
                underCursor = device[index].checkLocation(loc);
                if (underCursor.status == true) {
                    let target = device[index];
                    result = target.click(underCursor.location);
                }
            }
            if (result.status == 'connector') {
                // TODO: Create function
                attachWire(mouse.heldDevice, result.connection);
                mouse.drop();
            } else {
                // drop the wire anyways
                // TODO: create function
                cutWire(mouse.heldDevice);
                mouse.drop();
            }
        }
    }
}

function mouseGrabber(event) {
    let loc = locator(event);
    if (mouse.holding == false) {
        devices.map(entry => {
            let underCursor = entry.checkLocation(loc);
            if (underCursor == true) {
                mouse.grab(entry);
            }
        })
    }
}

function mouseReleaser(event) {
    mouse.drop();
}

ctx.font = '18px sans-serif'


let testGateAND = new device.AndGate(200, 200);
devices.push(testGateAND);


let testSwitch = new device.Switch(325, 200);
testSwitch.state = true;
devices.push(testSwitch);

let testSwitch2 = new device.Switch(325, 300);
devices.push(testSwitch2);


let testBulb = new device.Bulb(460, 200);
devices.push(testBulb);

// main animation loop
function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, innerWidth, innerHeight);

    devices.map(entry => entry.update(ctx, mouse));
    wires.map(entry => entry.update(ctx, mouse));

    ctx.fillText('AND Gate', 140, 150)
    ctx.fillText('Switch', 300, 150)
    ctx.fillText('Bulb', 440, 150)

    mouse.clicked = false;
}

animate();
