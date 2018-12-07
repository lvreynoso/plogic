// switches.js - it's full of switches

import Device from './prototype.js'

/*
|--------------------------------------------------------------------------
| Switch
|--------------------------------------------------------------------------
|
| Document here.
|
*/

class Switch extends Device {
    // constructor takes in values that we want to be
    // passed in when initializing the class
    constructor(x, y) {
        super(x, y);
        // on/off; off by default
        this.state = false;

        // toggle zone
        this.zone = {
            x: this.x,
            y: this.y,
            width: 20,
            height: 20
        }

    }

    drop() {
        super.drop();
        this.zone.x = this.x;
        this.zone.y = this.y;
    }

    button() {
        // toggle state i.e. on/off status
        this.state = !this.state;
    }

}

/*
|--------------------------------------------------------------------------
| TwoWaySwitch
|--------------------------------------------------------------------------
|
| Document here.
|
*/

class TwoWay extends Switch {
    constructor(x, y) {
        super(x, y);

        // toggle zone
        this.zone = {
            x: this.x,
            y: this.y,
            width: 10,
            height: 20
        }

        // output connector
        this.connectorOne = {
            x: this.x,
            y: this.y + 35,
            outputPower: this.state,
            inputPower: false,
            wire: undefined,
            spoke: this.spoke.north
        }

        // keep track of all the connectors
        this.connectors = [this.connectorOne];
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
        // ctx.beginPath();
        // ctx.moveTo(this.x, this.y + 25);
        // ctx.lineTo(this.x, this.y + 30);
        // ctx.closePath();
        ctx.stroke();
    }


    update(ctx) {
        super.update(ctx);
        // update connector power
        this.connectorOne.outputPower = this.state;
    }
}

export {
    TwoWay
};
