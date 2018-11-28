// contains all our device code
// this is by far the worst code I've ever written.

// wires that run between devices
class Wire {
    constructor(start) {
        this.start = {
            x: start.x,
            y: start.y,
            inputPower: start.outputPower,
            outputPower: false,
            connection: start
        }

        this.end = {
            x: start.x,
            y: start.y,
            inputPower: false,
            outputPower: false,
            connection: undefined
        }

        this.power = this.start.inputPower || this.end.inputPower;

        // always starts held
        this.held = true;
    }
    cut() {
        if (this.start.connection != undefined) {
            this.start.connection.wire = undefined;
            this.start.connection = undefined;
        }
        if (this.end.connection != undefined) {
            this.end.connection.wire = undefined;
            this.end.connection = undefined;
        }
    }

    draw(ctx) {
        if (this.cut != true) {
            ctx.beginPath();
            ctx.moveTo(this.start.x, this.start.y);
            ctx.lineTo(this.end.x, this.end.y);
            ctx.stroke();
        }
    }

    update(ctx, mouse) {
        // update power
        if (this.start.connection != undefined) {
            this.start.inputPower = this.start.connection.outputPower;
        }
        if (this.end.connection != undefined) {
            this.end.inputPower = this.end.connection.outputPower;
        }
        this.power = this.start.inputPower || this.end.inputPower
        this.start.outputPower = this.power;
        this.end.outputPower = this.power;

        if (this.held == true) {
            this.end.x = mouse.x;
            this.end.y = mouse.y;
        }

        this.draw(ctx);
    }
}

// AND Gate
class AndGate {
    // constructor takes in values that we want to be
    // passed in when initializing the class
    constructor(x, y) {
        // position
        this.x = x;
        this.y = y;
        this.held = false;
        this.inputOne = {
            x: undefined,
            y: undefined,
            inputPower: false,
            outputPower: false,
            wire: undefined
        }
        this.inputTwo = {
            x: undefined,
            y: undefined,
            inputPower: false,
            outputPower: false,
            wire: undefined
        }
        this.output = {
            x: undefined,
            y: undefined,
            inputPower: false,
            outputPower: false,
            wire: undefined
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 30, Math.PI / 2, Math.PI * (3 / 2), true);
        ctx.lineTo(this.x - 70, this.y - 30)
        ctx.lineTo(this.x - 50, this.y - 30);
        ctx.lineTo(this.x - 50, this.y + 30);
        ctx.lineTo(this.x - 70, this.y + 30);
        ctx.lineTo(this.x, this.y + 30);
        ctx.moveTo(this.x + 30, this.y);
        ctx.lineTo(this.x + 50, this.y);
        ctx.closePath();
        ctx.stroke();

        this.drawInputOne(ctx);
        this.drawInputTwo(ctx);
        this.drawOutput(ctx);
    }

    drawFocus(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 40, 0, 2 * Math.PI, true)
        ctx.strokeStyle = 'purple';
        ctx.stroke();
        ctx.strokeStyle = 'black';
    }

    drawInputOne(ctx) {
        // draw a connecting hook on the top left wire of the AND gate
        ctx.beginPath();
        ctx.arc(this.x - 75, this.y - 30, 5, 0, 2 * Math.PI, false);
        ctx.stroke();

        this.inputOne.x = this.x - 75;
        this.inputOne.y = this.y - 30;
    }

    drawInputTwo(ctx) {
        // draw a connecting hook on the bottom left wire of the AND gate
        ctx.beginPath();
        ctx.arc(this.x - 75, this.y + 30, 5, 0, 2 * Math.PI, false);
        ctx.stroke();

        this.inputTwo.x = this.x - 75;
        this.inputTwo.y = this.y + 30;
    }

    drawOutput(ctx) {
        // draw a connecting hook on the right wire of the AND gate
        ctx.beginPath();
        ctx.arc(this.x + 55, this.y, 5, 0, 2 * Math.PI, false);
        ctx.stroke();

        this.output.x = this.x + 55;
        this.output.y = this.y;
    }

    drawConnectorFocus(ctx, connector) {
        if (connector != undefined) {
            ctx.beginPath();
            ctx.arc(connector.x, connector.y, 10, 0, 2 * Math.PI, true)
            ctx.strokeStyle = 'purple';
            ctx.stroke();
            ctx.strokeStyle = 'black';
        }
    }

    attachWire(mouse, connector) {
        let newWire = {
            wasMade: false,
            wire: undefined
        }
        if (mouse.clicked == true && mouse.holding == false) {
            // make a new wire!
            // first check if there's already a wire there
            if (connector.wire != undefined) {
                connector.wire.cut();
            }
            let wire = new Wire(connector)
            mouse.holding = true;
            mouse.heldDevice = wire;
            mouse.clicked = false;
            connector.wire = wire;
            newWire.wasMade = true;
            newWire.wire = wire;
        } else if (mouse.clicked == true && mouse.holding == true) {
            // if mouse is holding a wire
            // first check if there's already a wire there
            if (connector.wire != undefined) {
                connector.wire.cut();
            }
            let wire = mouse.heldDevice;
            connector.wire = wire;
            mouse.holding = false;
            mouse.heldDevice = undefined;
            mouse.clicked = false;
            wire.end.connection = connector;
            wire.held = false;
        }
        return newWire;
    }

    update(ctx, mouse) {
        // update power
        if (this.inputOne.wire != undefined) {
            this.inputOne.inputPower = this.inputOne.wire.power;
        }
        if (this.inputTwo.wire != undefined) {
            this.inputTwo.inputPower = this.inputTwo.wire.power;
        }
        this.output.outputPower = this.inputOne.inputPower && this.inputTwo.inputPower;

        // check if the mouse is near us
        let mouseOver = false;
        if (Math.abs(mouse.x - this.x) < 30 && Math.abs(mouse.y - this.y) < 30) {
            mouseOver = true;
        }

        // if the mouse is near us, check for any action we should take
        if (mouseOver == true) {
            // check if we were clicked on
            if (mouse.clicked == true) {
                // toggle being held
                this.held = !this.held;
            }
            // if being held, move with the mouse
            if (this.held == true) {
                this.x = mouse.x;
                this.y = mouse.y;
            } else {
                // if not being held, draw a focus ring
                this.drawFocus(ctx);
            }
        }

        // check if the mouse is near a connector
        let mouseNearConnector = undefined;
        let connectors = [this.inputOne, this.inputTwo, this.output]
        for (let i = 0; i < connectors.length; i++) {
            if (Math.abs(mouse.x - connectors[i].x) < 10 && Math.abs(mouse.y - connectors[i].y) < 10) {
                mouseNearConnector = connectors[i];
            }
        }

        let newWire = {
            wasMade: false,
            wire: undefined
        }
        if (mouseNearConnector != undefined) {
            this.drawConnectorFocus(ctx, mouseNearConnector);
            if (mouse.clicked == true) {
                newWire = this.attachWire(mouse, mouseNearConnector);
            }
        }

        this.draw(ctx);
        this.draw(ctx);

        return newWire;
    }
}

// Switch - simple on-off toggle
class Switch {
    // constructor takes in values that we want to be
    // passed in when initializing the class
    constructor(x, y) {
        // position
        this.x = x;
        this.y = y;
        // on/off; off by default
        this.state = false;
        this.held = false;
        this.connector = {
            x: this.x,
            y: this.y + 40,
            outputPower: this.state,
            inputPower: false,
            wire: undefined
        }
    }

    draw(ctx) {
        ctx.strokeRect(this.x - 15, this.y - 25, 30, 50);
        ctx.beginPath();
        ctx.arc(this.x, this.y - 10, 5, 0, 2 * Math.PI, true);
        ctx.stroke();
        if (this.state == true) {
            ctx.fillStyle = '#42f44e';
            ctx.fill();
        }
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(this.x, this.y + 10, 5, 0, 2 * Math.PI, true);
        ctx.stroke();
        if (this.state == false) {
            ctx.fillStyle = 'red';
            ctx.fill();
        }
        ctx.closePath();
        this.drawConnector(ctx);
        ctx.fillStyle = 'black';
    }

    drawFocus(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 40, 0, 2 * Math.PI, true)
        ctx.strokeStyle = 'purple';
        ctx.stroke();
        ctx.strokeStyle = 'black';
    }

    drawConnector(ctx) {
        // draw a switch connecting hook
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + 25);
        ctx.lineTo(this.x, this.y + 30);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.x, this.y + 35, 5, 0, 2 * Math.PI, false);
        ctx.stroke();

        this.connector.x = this.x;
        this.connector.y = this.y + 35;
    }

    drawConnectorFocus(ctx) {
        ctx.beginPath();
        ctx.arc(this.connector.x, this.connector.y, 10, 0, 2 * Math.PI, true)
        ctx.strokeStyle = 'purple';
        ctx.stroke();
        ctx.strokeStyle = 'black';
    }

    update(ctx, mouse) {
        // update connector power
        this.connector.outputPower = this.state;

        // check if the mouse is near us
        let mouseOver = false;
        if (Math.abs(mouse.x - this.x) < 30 && Math.abs(mouse.y - this.y) < 30) {
            mouseOver = true;
        }

        let mouseInSwitchZone = false;
        if (Math.abs(mouse.x - this.x) < 5 && Math.abs(mouse.y - this.y) < 10) {
            mouseInSwitchZone = true;
        }

        // if the mouse is near us, check for any action we should take
        if (mouseOver == true) {
            // check if we were clicked on
            if (mouse.clicked == true) {
                // if the click was in the switch zone and we aren't being held
                if (mouseInSwitchZone == true && !this.held) {
                    // toggle power
                    this.state = !this.state;
                } else {
                    // toggle being held
                    this.held = !this.held;
                }
            }
            // if being held, move with the mouse
            if (this.held == true) {
                this.x = mouse.x;
                this.y = mouse.y;
            } else {
                // if not being held, draw a focus ring
                this.drawFocus(ctx);
            }
        }

        // check if the mouse is near a connector
        let mouseNearConnector = false;
        if (Math.abs(mouse.x - this.connector.x) < 10 && Math.abs(mouse.y - this.connector.y) < 10) {
            mouseNearConnector = true;
        }

        let newWire = {
            wasMade: false,
            wire: undefined
        }
        if (mouseNearConnector == true) {
            this.drawConnectorFocus(ctx);
            // if mouse is not holding a wire
            if (mouse.clicked == true && mouse.holding == false) {
                // make a new wire!
                // first check if there's already a wire there
                if (this.connector.wire != undefined) {
                    this.connector.wire.cut();
                }
                let wire = new Wire(this.connector)
                mouse.holding = true;
                mouse.heldDevice = wire;
                mouse.clicked = false;
                this.connector.wire = wire;
                newWire.wasMade = true;
                newWire.wire = wire;
            } else if (mouse.clicked == true && mouse.holding == true) {
                // if mouse is holding a wire
                // first check if there's already a wire there
                if (this.connector.wire != undefined) {
                    this.connector.wire.cut();
                }
                let wire = mouse.heldDevice;
                this.connector.wire = wire;
                mouse.holding = false;
                mouse.heldDevice = undefined;
                mouse.clicked = false;
                wire.end.connection = this.connector;
                wire.held = false;
            }
        }

        this.draw(ctx);
        this.draw(ctx);

        return newWire;
    }
}

// light bulb - turns on with power
class Bulb {
    // constructor takes in values that we want to be
    // passed in when initializing the class
    constructor(x, y) {
        // position
        this.x = x;
        this.y = y;
        // on/off; off by default
        this.state = false;
        this.held = false;
        this.connector = {
            x: this.x,
            y: this.y + 40,
            inputPower: false,
            outputPower: false,
            wire: undefined
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, (2/3) * Math.PI, (1/3) * Math.PI, false);
        ctx.lineTo(this.x + (20 * Math.sin(Math.PI / 6)), this.y + 30);
        ctx.lineTo(this.x - (20 * Math.sin(Math.PI / 6)), this.y + 30);
        ctx.closePath();
        ctx.stroke();
        if (this.state == true) {
            ctx.fillStyle = 'yellow';
            ctx.fill();
        }
        this.drawConnector(ctx);
        ctx.fillStyle = 'black';
    }

    drawFocus(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 40, 0, 2 * Math.PI, true)
        ctx.strokeStyle = 'purple';
        ctx.stroke();
        ctx.strokeStyle = 'black';
    }

    drawConnector(ctx) {
        // draw a lightbulb connecting hook
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + 30);
        ctx.lineTo(this.x, this.y + 35);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.x, this.y + 40, 5, 0, 2 * Math.PI, false);
        ctx.stroke();

        this.connector.x = this.x;
        this.connector.y = this.y + 40;
    }

    drawConnectorFocus(ctx) {
        ctx.beginPath();
        ctx.arc(this.connector.x, this.connector.y, 10, 0, 2 * Math.PI, true)
        ctx.strokeStyle = 'purple';
        ctx.stroke();
        ctx.strokeStyle = 'black';
    }

    update(ctx, mouse) {
        // update power
        if (this.connector.wire != undefined) {
            this.connector.inputPower = this.connector.wire.power;
        } else {
            this.connector.inputPower = false;
        }
        this.state = this.connector.inputPower;

        // check if the mouse is near us
        let mouseOver = false;
        if (Math.abs(mouse.x - this.x) < 30 && Math.abs(mouse.y - this.y) < 30) {
            mouseOver = true;
        }

        // if the mouse is near us, check for any action we should take
        if (mouseOver == true) {
            // check if we were clicked on
            if (mouse.clicked) {
                // toggle being held
                this.held = !this.held;
                mouse.holding = !mouse.holding;
            }
            // if being held, move with the mouse
            if (this.held == true) {
                this.x = mouse.x;
                this.y = mouse.y;
            } else {
                // if not being held, draw a focus ring
                this.drawFocus(ctx);
            }
        }

        // check if the mouse is near a connector
        let mouseNearConnector = false;
        if (Math.abs(mouse.x - this.connector.x) < 10 && Math.abs(mouse.y - this.connector.y) < 10) {
            mouseNearConnector = true;
        }

        let newWire = {
            wasMade: false,
            wire: undefined
        }
        if (mouseNearConnector == true) {
            this.drawConnectorFocus(ctx);
            // if mouse is not holding a wire
            if (mouse.clicked == true && mouse.holding == false) {
                // make a new wire!
                // first check if there's already a wire there
                if (this.connector.wire != undefined) {
                    this.connector.wire.cut();
                }
                let wire = new Wire(this.connector)
                mouse.holding = true;
                mouse.heldDevice = wire;
                mouse.clicked = false;
                this.connector.wire = wire;
                newWire.wasMade = true;
                newWire.wire = wire;
            } else if (mouse.clicked == true && mouse.holding == true) {
                // if mouse is holding a wire
                // first check if there's already a wire there
                if (this.connector.wire != undefined) {
                    this.connector.wire.cut();
                }
                let wire = mouse.heldDevice;
                this.connector.wire = wire;
                mouse.holding = false;
                mouse.heldDevice = undefined;
                mouse.clicked = false;
                wire.end.connection = this.connector;
                wire.held = false;
            }
        }

        this.draw(ctx);
        this.draw(ctx);

        return newWire;
    }
}

export {
    AndGate,
    Switch,
    Bulb,
    Wire
}
