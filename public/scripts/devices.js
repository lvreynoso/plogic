// contains all our device code


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
            power: false
        }
        this.inputTwo = {
            x: undefined,
            y: undefined,
            power: false
        }
        this.output = {
            x: undefined,
            y: undefined,
            power: false
        }
    }

    hold() {
        this.held = true;
    }

    drop() {
        this.held = false;
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
        ctx.arc(this.x - 75, this.y - 30, 5, (3/2) * Math.PI, (5/2) * Math.PI, false);
        ctx.stroke();

        this.inputOne.x = this.x - 75;
        this.inputOne.y = this.y - 30;
    }

    drawInputTwo(ctx) {
        // draw a connecting hook on the bottom left wire of the AND gate
        ctx.beginPath();
        ctx.arc(this.x - 75, this.y + 30, 5, (3/2) * Math.PI, (5/2) * Math.PI, false);
        ctx.stroke();

        this.inputTwo.x = this.x - 75;
        this.inputTwo.y = this.y + 30;
    }

    drawOutput(ctx) {
        // draw a connecting hook on the right wire of the AND gate
        ctx.beginPath();
        ctx.arc(this.x + 55, this.y, 5, (1/2) * Math.PI, (3/2) * Math.PI, false);
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

    update(ctx, mouse) {
        // update power
        this.output.power = this.inputOne.power && this.inputTwo.power;

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

        if (mouseNearConnector != undefined) {
            this.drawConnectorFocus(ctx, mouseNearConnector);
        }

        this.draw(ctx);
        this.draw(ctx);
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
            power: this.state
        }
    }

    hold() {
        this.held = true;
    }

    drop() {
        this.held = false;
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
        ctx.arc(this.x, this.y + 35, 5, (3/3) * Math.PI, (6/3) * Math.PI, false);
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
        this.connector.power = this.state;

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

        if (mouseNearConnector == true) {
            this.drawConnectorFocus(ctx);
        }

        this.draw(ctx);
        this.draw(ctx);
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
            power: false
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
        ctx.arc(this.x, this.y + 40, 5, (3/3) * Math.PI, (6/3) * Math.PI, false);
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
        this.state = this.connector.power

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

        if (mouseNearConnector == true) {
            this.drawConnectorFocus(ctx);
        }

        this.draw(ctx);
        this.draw(ctx);
    }
}

export {
    AndGate,
    Switch,
    Bulb,
}
