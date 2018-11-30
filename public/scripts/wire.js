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
    constructor(x, y) {
        this.id = makeUUID();

        this.start = {
            x: x,
            y: y,
            inputPower: false,
            outputPower: false,
            connection: undefined
        }

        this.end = {
            x: x,
            y: y,
            inputPower: false,
            outputPower: false,
            connection: undefined
        }

        this.power = this.start.inputPower || this.end.inputPower;
        this.held = true;

        this.isCut = false;

        console.log(this);
    }

    hold() {
        this.held = true;
    }

    drop() {
        this.held = false;
    }

    anchor(connection) {
        this.start.connection = connection;
        if (connection.wire != undefined) {
            console.log('Wire already in place, cutting...', connection.wire);
            connection.wire.cut();
        }
        connection.wire = this;
    }

    connect(connection) {
        this.end.connection = connection;
        if (connection.wire != undefined) {
            connection.wire.cut();
        }
        connection.wire = this;
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
        this.isCut = true;
        console.log('Witness me!', this.isCut, this.id);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.stroke();
    }

    update(ctx) {
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

        this.draw(ctx);
    }

    updateFreeEnd(x, y) {
        this.end.x = x;
        this.end.y = y;
    }

}

export {
    Wire
};
