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
window.addEventListener('click', mouseClicker);

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


function mouseClicker(event) {
    // if we clicked on a button, toggle the button
    if (mouse.underPointer.button == true) {
        mouse.underPointer.device.button();
    } else if (mouse.underPointer.connector != false) {
        console.log('Connector clicked!');
        // if we clicked on a connector...
        let connector = mouse.underPointer.connector;
        // if mouse is holding the end of a wire, connect it and drop it
        if (mouse.heldDevice instanceof device.Wire) {
            mouse.heldDevice.connect(connector);
            mouse.drop();
            console.log('Wire connected');
        } else {
            // a free mouse pointer - anchor a new wire to the connector
            let wire = new device.Wire(connector.x, connector.y);
            wire.anchor(connector);
            wires[wire.id] = wire;
            mouse.grab(wire);
            console.log('Wire created');
        }
    }

    // if we clicked on nothing and we're holding a wire, delete it
    console.log(mouse.underPointer, mouse.heldDevice instanceof device.Wire);
    if (!mouse.underPointer.device && !mouse.underPointer.connector && !mouse.underPointer.button && mouse.heldDevice instanceof device.Wire) {
        let droppedWire = mouse.heldDevice;
        mouse.drop();
        cutWire(droppedWire);
    }

    console.log(wires);
}

function mouseGrabber(event) {
    let loc = locator(event);
    if (mouse.holding == false && mouse.underPointer.device != false) {
        mouse.holding = true;
        mouse.heldDevice = mouse.underPointer.device;
    }
}

function mouseReleaser(event) {
    if (mouse.heldDevice instanceof device.Wire == false) {
        mouse.drop();
    }
}

function cutWire(wire) {
    wire.cut();
    delete wires[wire.id];
}

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
            found.button = true;
        }
    });

    // draw wires
    wireArray.map(key => {
        wires[key].update(ctx);
        if (wires[key].held == true) {
            wires[key].updateFreeEnd(mouse.x, mouse.y);
        }
        if (wires[key].isCut == true) {
            delete wires[key];
        }
    });

    // update devices under the cursor
    mouse.underPointer = found;


    ctx.fillText('AND Gate', 140, 150)
    ctx.fillText('Switch', 300, 150)
    ctx.fillText('Bulb', 440, 150)
}

animate();
