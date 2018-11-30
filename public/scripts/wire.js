// wires that run between devices

import makeUUID from './identify.js'

/*
|--------------------------------------------------------------------------
| Wire
|--------------------------------------------------------------------------
|
| Document here.
|
*/

class Wire {
    constructor(loc) {
        this.id = makeUUID();

        this.start = {
            x: loc.x,
            y: loc.y,
            inputPower: false,
            outputPower: false,
            connection: undefined
        }

        this.end = {
            x: loc.x,
            y: loc.y,
            inputPower: false,
            outputPower: false,
            connection: undefined
        }

        this.power = this.start.inputPower || this.end.inputPower;
        this.held = true;
        this.cut = false;
    }

    grab() {
        this.held = true;
    }

    drop() {
        this.held = false;
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
        this.cut = true;
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

export { Wire };
