// gates.js - our logic gates

import Device from './prototype.js'

/*
|--------------------------------------------------------------------------
| AND Gate
|--------------------------------------------------------------------------
|
| Document here.
|
*/

class Gate extends Device {
    constructor(x, y) {
        super(x, y);

        this.inputOne = {
            x: x - 75,
            y: y - 30,
            inputPower: false,
            outputPower: false,
            wire: undefined
        }
        this.inputTwo = {
            x: x - 75,
            y: y + 30,
            inputPower: false,
            outputPower: false,
            wire: undefined
        }
        this.output = {
            x: x + 55,
            y: y,
            inputPower: false,
            outputPower: false,
            wire: undefined
        }

        this.connectors = [this.inputOne, this.inputTwo, this.output]
    }

}

class And extends Gate {
    // constructor takes in values that we want to be
    // passed in when initializing the class
    constructor(x, y) {
        super(x, y);
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
    }

    update(ctx) {
        super.update(ctx);
        // update power
        this.output.outputPower = this.inputOne.inputPower && this.inputTwo.inputPower;
    }
}

export { And };
