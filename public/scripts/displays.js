// displays - devices that take input and change their color

import makeUUID from './identify.js'

/*
|--------------------------------------------------------------------------
| Bulb
|--------------------------------------------------------------------------
|
| Document here.
|
*/

class Bulb {
    // constructor takes in values that we want to be
    // passed in when initializing the class
    constructor(x, y) {
        this.id = makeUUID();
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
        this.connectors = [this.connector];
    }

    hold() {
        this.held = true;
    }

    drop() {
        this.held = false;
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

    drawConnectorFocus(ctx, connector) {
        ctx.beginPath();
        ctx.arc(connector.x, connector.y, 10, 0, 2 * Math.PI, true)
        ctx.strokeStyle = 'purple';
        ctx.stroke();
        ctx.strokeStyle = 'black';
    }

    update(ctx) {
        // update power
        if (this.connector.wire != undefined) {
            this.connector.inputPower = this.connector.wire.power;
        } else {
            this.connector.inputPower = false;
        }
        this.state = this.connector.inputPower;

        this.draw(ctx);
        this.draw(ctx);
    }
}

export { Bulb };
