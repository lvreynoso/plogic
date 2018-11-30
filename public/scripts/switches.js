// switches.js - it's full of switches

import makeUUID from './identify.js'

/*
|--------------------------------------------------------------------------
| Switch
|--------------------------------------------------------------------------
|
| Document here.
|
*/

class Switch {
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

        // toggle zone
        this.zone = {
            x: x,
            y: y,
            width: 10,
            height: 20
        }

        this.connector = {
            x: this.x,
            y: this.y + 40,
            outputPower: this.state,
            inputPower: false,
            wire: undefined
        }

        // keep track of all the connectors
        this.connectors = [this.connector];
    }

    hold() {
        this.held = true;
    }

    drop() {
        this.held = false;
        this.zone.x = this.x;
        this.zone.y = this.y;
    }

    button() {
        // toggle state i.e. on/off status
        this.state = !this.state;
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

    drawConnectorFocus(ctx, connector) {
        ctx.beginPath();
        ctx.arc(connector.x, connector.y, 10, 0, 2 * Math.PI, true)
        ctx.strokeStyle = 'purple';
        ctx.stroke();
        ctx.strokeStyle = 'black';
    }

    update(ctx) {
        // update connector power
        this.connector.outputPower = this.state;

        this.draw(ctx);
        this.draw(ctx);

    }
}

export { Switch };
