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
        this.start.x = connection.x;
        this.start.y = connection.y;
        if (connection.wire != undefined) {
            console.log('Wire already in place, cutting...', connection.wire);
            connection.wire.cut();
        }
        connection.wire = this;
    }

    connect(connection) {
        this.end.connection = connection;
        this.end.x = connection.x;
        this.end.y = connection.y;
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

        if (this.power == true) {
            ctx.beginPath();
            ctx.moveTo(this.start.x - 1, this.start.y - 1);
            ctx.lineTo(this.end.x - 1, this.end.y - 1);
            ctx.moveTo(this.start.x + 1, this.start.y + 1);
            ctx.lineTo(this.end.x + 1, this.end.y + 1);
            // ctx.strokeStyle = '#7DF9FF'
            ctx.strokeStyle = '#42f44e';
            ctx.stroke();
            ctx.strokeStyle = 'black';
        }
    }

    update(ctx) {
        // update power and endpoints
        if (this.start.connection != undefined) {
            this.start.inputPower = this.start.connection.outputPower;
            this.start.x = this.start.connection.x;
            this.start.y = this.start.connection.y;
        }
        if (this.end.connection != undefined) {
            this.end.inputPower = this.end.connection.outputPower;
            this.end.x = this.end.connection.x;
            this.end.y = this.end.connection.y;
        }
        this.power = this.start.inputPower || this.end.inputPower
        this.start.outputPower = this.power;
        this.end.outputPower = this.power;

        this.draw(ctx);
    }

    updateLocation(x, y) {
        this.end.x = x;
        this.end.y = y;
    }

}

export {
    Wire
};
