// gates.js - our logic gates

import makeUUID from './identify.js'

/*
|--------------------------------------------------------------------------
| AND Gate
|--------------------------------------------------------------------------
|
| Document here.
|
*/

class AndGate {
    // constructor takes in values that we want to be
    // passed in when initializing the class
    constructor(x, y) {
        this.id = makeUUID();
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

        this.connectors = [this.inputOne, this.inputTwo, this.output]
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

    update(ctx) {
        // update power
        if (this.inputOne.wire != undefined) {
            this.inputOne.inputPower = this.inputOne.wire.power;
        }
        if (this.inputTwo.wire != undefined) {
            this.inputTwo.inputPower = this.inputTwo.wire.power;
        }
        this.output.outputPower = this.inputOne.inputPower && this.inputTwo.inputPower;

        this.draw(ctx);
        this.draw(ctx);
    }
}

export { AndGate };
