import * as device from './devices.js'
import * as utils from './utils.js'
import * as draw from './draw.js'

// reference to canvas
var canvas = document.getElementById("myCanvas");
// 2D rendering context, to paint to canvas
var ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth/2;
ctx.canvas.height = window.innerHeight/2;

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

    // if the mouse is holding a device, update the device's
    // position to match the mouse pointer's position
    if (mouse.holding == true) {
        mouse.heldDevice.updateLocation(mouse.x, mouse.y);
    }
}


function mouseClicker(event) {
    // if we clicked on a button, toggle the button
    if (mouse.underPointer.button == true && mouse.holding == false) {
        mouse.underPointer.device.button();
    } else if (mouse.underPointer.connector != false) {
        // if we clicked on a connector...
        let connector = mouse.underPointer.connector;
        // if mouse is holding the end of a wire, connect it and drop it
        if (mouse.heldDevice instanceof device.Wire) {
            mouse.heldDevice.connect(connector);
            mouse.drop();
        } else {
            // a free mouse pointer - anchor a new wire to the connector
            let wire = new device.Wire(connector.x, connector.y);
            wire.anchor(connector);
            wires[wire.id] = wire;
            mouse.grab(wire);
        }
    }

    // if we clicked on nothing and we're holding a wire, delete it
    console.log(mouse.underPointer, mouse.heldDevice instanceof device.Wire);
    if (!mouse.underPointer.device && !mouse.underPointer.connector && !mouse.underPointer.button && mouse.heldDevice instanceof device.Wire) {
        let droppedWire = mouse.heldDevice;
        mouse.drop();
        droppedWire.cut();
    }

    console.log(wires);
}

function mouseGrabber(event) {
    let loc = locator(event);
    if (mouse.holding == false && mouse.underPointer.device != false) {
        mouse.grab(mouse.underPointer.device)
    }
}

function mouseReleaser(event) {
    if ((mouse.heldDevice instanceof device.Wire) == false) {
        mouse.drop();
    }
}

ctx.font = '18px sans-serif';
ctx.lineWidth = 2;

let testGateOR = new device.gate.Or(75, 200);
devices[testGateOR.id] = testGateOR;

let testGateNOR = new device.gate.Nor(75, 300);
devices[testGateNOR.id] = testGateNOR;

let testGateXOR = new device.gate.Xor(75, 400);
devices[testGateXOR.id] = testGateXOR;

let testGateXNOR = new device.gate.Xnor(75, 500);
devices[testGateXNOR.id] = testGateXNOR;

let testGateAND = new device.gate.And(200, 200);
devices[testGateAND.id] = testGateAND;

let testGateNAND = new device.gate.Nand(200, 300);
devices[testGateNAND.id] = testGateNAND;

let testGateNOT = new device.gate.Not(200, 400);
devices[testGateNOT.id] = testGateNOT;

let testGateBuffer = new device.gate.Buffer(200, 500);
devices[testGateBuffer.id] = testGateBuffer;

let testSwitch = new device.switches.TwoWay(325, 200);
testSwitch.state = true;
devices[testSwitch.id] = testSwitch;

let testSwitch2 = new device.switches.TwoWay(325, 300);
devices[testSwitch2.id] = testSwitch2;

let testBulb = new device.display.Bulb(460, 200);
devices[testBulb.id] = testBulb;

let testSplitter = new device.wiring.Splitter(325, 400);
devices[testSplitter.id] = testSplitter;

let testLCD = new device.display.LCDNumber(600, 200);
devices[testLCD.id] = testLCD;

// main animation loop
function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, innerWidth, innerHeight);
    ctx.fillStyle = 'black';

    // draw wires first so they run underneath devices
    let wireArray = Object.keys(wires);
    wireArray.map(key => {
        wires[key].update(ctx);
        if (wires[key].isCut == true) {
            delete wires[key];
        }
    });

    // draw devices, find the one under the cursor
    let deviceArray = Object.keys(devices);
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
                draw.connectorFocus(ctx, connector);
                focused = true;
                found.connector = connector;
            }
        })
        // if we aren't focused on a connector, check if the pointer is
        // over the device - if so draw focus ring and keep note of it
        if (focused == false && utils.getDistance(mouse, devices[key]) < 30) {
            draw.focus(ctx, devices[key]);
            found.device = devices[key];
        }
        // check if the mouse pointer is over a special zone in the device,
        // like a button toggle
        if (devices[key].zone != undefined && utils.inZone(mouse, devices[key].zone) == true) {
            found.button = true;
        }
    });

    // update devices under the cursor
    mouse.underPointer = found;


    ctx.fillText('Gates', 140, 150)
    ctx.fillText('Switches', 300, 150)
    ctx.fillText('Bulb', 440, 150)
}

animate();
