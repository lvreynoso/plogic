import * as device from './devices.js'
import * as utils from './utils.js'

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
// window.addEventListener('click', mouseClicker);

var mouse = {
    x: undefined,
    y: undefined,
    holding: false,
    heldDevice: undefined,
    underPointer: {
        device: false,
        connector: false,
        button: false
    },

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

var devices = {};
var wires = {};

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

    if (mouse.holding == true) {
        mouse.heldDevice.x = mouse.x;
        mouse.heldDevice.y = mouse.y;
    }
}


/*
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
*/

function mouseGrabber(event) {
    let loc = locator(event);
    if (mouse.holding == false && mouse.underPointer.device != false) {
        mouse.holding = true;
        mouse.heldDevice = mouse.underPointer.device;
    }
}

function mouseReleaser(event) {
    mouse.drop();
}

// function anchorWire(wire, connection) {
//
// }
//
// function attachWire(wire, connection) {
//
// }
//
// function cutWire(wire) {
//
// }

ctx.font = '18px sans-serif'


let testGateAND = new device.AndGate(200, 200);
devices[testGateAND.id] = testGateAND;


let testSwitch = new device.Switch(325, 200);
testSwitch.state = true;
devices[testSwitch.id] = testSwitch;

let testSwitch2 = new device.Switch(325, 300);
devices[testSwitch2.id] = testSwitch2;


let testBulb = new device.Bulb(460, 200);
devices[testBulb.id] = testBulb;

// main animation loop
function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, innerWidth, innerHeight);

    // draw devices, find the one under the cursor
    let deviceArray = Object.keys(devices);
    let wireArray = Object.keys(wires);
    let found = {
        device: false,
        connector: false,
        button: false
    }
    deviceArray.map(key => {
        // draw the device
        devices[key].update(ctx)
        // now we check if the device is under the mouse pointer
        let focused = false;
        // look through all the connectors - if pointer is over one,
        // draw focus ring and keep note of it
        devices[key].connectors.map(connector => {
            if (utils.getDistance(mouse, connector) < 10) {
                devices[key].drawConnectorFocus(ctx, connector);
                focused = true;
                found.connector = connector;
            }
        })
        // if we aren't focused on a connector, check if the pointer is
        // over the device - if so draw focus ring and keep note of it
        if (focused == false && utils.getDistance(mouse, devices[key]) < 30) {
            devices[key].drawFocus(ctx);
            found.device = devices[key];
        }
        // check if the mouse pointer is over a special zone in the device,
        // like a button toggle
        if (devices[key].zone != undefined && utils.inZone(mouse, devices[key].zone) == true) {
            found.button = devices[key].button;
        }
    });
    wireArray.map(key => devices[key].update(ctx));

    // update devices under the cursor
    mouse.underPointer = found;


    ctx.fillText('AND Gate', 140, 150)
    ctx.fillText('Switch', 300, 150)
    ctx.fillText('Bulb', 440, 150)
}

animate();
