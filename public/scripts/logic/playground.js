import * as device from './devices.js'
import * as utils from './utils.js'
import * as draw from './draw.js'

// reference to canvas
var canvas = document.getElementById("playgroundCanvas");
// 2D rendering context, to paint to canvas
var ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// fix coordinate issue by getting our canvas bounds
// and offsetting the mouse position
var canvasBounds = canvas.getBoundingClientRect();

// get mouse movement
window.addEventListener('mousemove', mouseTracker);
window.addEventListener('mousedown', mouseGrabber);
window.addEventListener('mouseup', mouseReleaser);
window.addEventListener('click', mouseClicker);

// get keyboard presses for menu
window.addEventListener('keypress', keyMenu);

var mouse = {
    x: undefined,
    y: undefined,
    holding: false,
    cloning: false,
    erasing: false,
    heldDevice: undefined,
    underPointer: {
        device: false,
        connector: false,
        button: false
    },

    grab(item) {
        if (this.holding == false || this.cloning == true) {
            this.holding = true;
            this.heldDevice = item;
            this.heldDevice.hold();
        }
    },

    drop() {
        if (this.heldDevice != undefined) {
            this.heldDevice.drop();
            console.log('dropped!');
        }
        if (this.cloning == true) {
            let copy = this.heldDevice.clone(this.x, this.y);
            this.clone(copy);
        } else {
            this.holding = false;
            this.heldDevice = undefined;
        }
    },

    clone(item) {
        this.cloning = true;
        this.grab(item);
        devices[this.heldDevice.id] = this.heldDevice;
    },

    normal() {
        this.cloning = false;
        this.erasing = false;
        this.holding = false;
        if (this.heldDevice != undefined) {
            delete devices[this.heldDevice.id];
        }
        this.heldDevice = undefined;
    },

    erase() {
        this.erasing = true;
    }
}

var devices = {};
var wires = {};
var overlays = {};

// fix coordinate issue by getting our canvas bounds
// and offsetting the mouse position
// TODO - still having problems if the page is reloaded while scrolled down
// ughhhhhh
function locator(event) {
    let location = {
        x: undefined,
        y: undefined
    }
    location.x = event.pageX - canvasBounds.x;
    location.y = event.pageY - canvasBounds.y;
    return location
}

// mouse event code
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

var keyboard = {
    menu: false,
    eraser: false
}

// keyboard menu code
function keyMenu(event) {
    const key = event.key;
    switch (key) {
        case '`':
            keyboard.menu.toggle();
            break;
        case 'Backspace':
            if (mouse.cloning == true || mouse.erasing == true) {
                mouse.normal();
            } else if (mouse.holding == false) {
                mouse.erase();
            }
            break;
        default:
            if (keyboard.menu.state == true) {
                keyboard.menu.select(key, mouse);
            }
            break;
    }
}

function mouseClicker(event) {
    // if mouse is in erase mode, erase the device under the mouse
    if (mouse.erasing == true && mouse.underPointer.device != false) {
        let erasedDevice = mouse.underPointer.device;
        // first erase all the connected wires
        erasedDevice.connectors.forEach(connector => {
            if (connector.wire != undefined) {
                connector.wire.cut();
            }
        })
        // then delete the device
        delete devices[erasedDevice.id];
    } else {
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
        if (!mouse.underPointer.device && !mouse.underPointer.connector && !mouse.underPointer.button && mouse.heldDevice instanceof device.Wire) {
            let droppedWire = mouse.heldDevice;
            mouse.drop();
            droppedWire.cut();
        }
    }
    // debugging
    let deviceArray = Object.keys(devices);
    let jsonArray = deviceArray.map(key => {
        return JSON.stringify(devices[key].constructor.name);
    });
    console.log(mouse.underPointer, mouse.heldDevice instanceof device.Wire, wires, jsonArray);
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

let mainMenu = new draw.Menu(50, 50, device);
overlays[mainMenu.type] = mainMenu;
keyboard.menu = mainMenu;

// main animation loop
function animate() {
    requestAnimationFrame(animate);

    ctx.font = '18px sans-serif';
    ctx.lineWidth = 2;

    // NOTE: I changed this because we should always be working
    // with the canvas width and height, such that it is responsive
    // if the canvas size is altered
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'black';

    // draw wires first so they run underneath devices
    let wireArray = Object.keys(wires);
    wireArray.forEach(key => {
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
    // draw connectors first
    deviceArray.forEach(key => {
        devices[key].drawConnectors(ctx);
    })
    // then draw the rest of the device
    deviceArray.forEach(key => {
        // draw the device
        devices[key].update(ctx)
        // now we check if the device is under the mouse pointer
        let focused = false;
        // look through all the connectors - if pointer is over one,
        // draw focus ring and keep note of it
        devices[key].connectors.forEach(connector => {
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

    // just in case
    ctx.fillStyle = 'black';
    // draw menu over everything
    let menuActive = false;
    let overlayArray = Object.keys(overlays);
    overlayArray.forEach(key => {
        overlays[key].update(ctx);
        if (overlays[key].state == true) {
            menuActive = true;
        }
    })

    // draw eraser
    if (mouse.erasing == true) {
        draw.eraser(ctx, mouse);
    }

    // positioning debug - draw mouse focus
    // draw.mouseFocus(ctx, mouse);

    // update devices under the cursor
    mouse.underPointer = found;
}

animate();
