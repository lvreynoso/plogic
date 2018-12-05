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

        this.connectorOne = {
            x: x - 45,
            y: y - 8,
            inputPower: false,
            outputPower: false,
            wire: undefined
        }
        this.connectorTwo = {
            x: x - 45,
            y: y + 8,
            inputPower: false,
            outputPower: false,
            wire: undefined
        }
        this.connectorThree = {
            x: x + 41,
            y: y,
            inputPower: false,
            outputPower: false,
            wire: undefined
        }

        this.connectors = [this.connectorOne, this.connectorTwo, this.connectorThree]
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
        ctx.arc(this.x, this.y, 16, Math.PI / 2, Math.PI * (3 / 2), true);
        ctx.lineTo(this.x - 20, this.y - 16)
        ctx.lineTo(this.x - 20, this.y - 8);
        ctx.moveTo(this.x - 40, this.y - 8);
        ctx.lineTo(this.x - 20, this.y - 8);
        ctx.lineTo(this.x - 20, this.y + 8);
        ctx.moveTo(this.x - 40, this.y + 8);
        ctx.lineTo(this.x - 20, this.y + 8);
        ctx.lineTo(this.x - 20, this.y + 16);
        ctx.lineTo(this.x, this.y + 16);
        ctx.moveTo(this.x + 16, this.y);
        ctx.lineTo(this.x + 36, this.y);
        ctx.closePath();
        ctx.stroke();
    }

    update(ctx) {
        super.update(ctx);
        // update power
        this.connectorThree.outputPower = this.connectorOne.inputPower && this.connectorTwo.inputPower;
    }
}

class Nand extends Gate {
    constructor(x, y) {
        super(x, y);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 16, Math.PI / 2, Math.PI * (3 / 2), true);
        ctx.lineTo(this.x - 20, this.y - 16)
        ctx.lineTo(this.x - 20, this.y - 8);
        ctx.moveTo(this.x - 40, this.y - 8);
        ctx.lineTo(this.x - 20, this.y - 8);
        ctx.lineTo(this.x - 20, this.y + 8);
        ctx.moveTo(this.x - 40, this.y + 8);
        ctx.lineTo(this.x - 20, this.y + 8);
        ctx.lineTo(this.x - 20, this.y + 16);
        ctx.lineTo(this.x, this.y + 16);
        ctx.moveTo(this.x + 26, this.y);
        ctx.arc(this.x + 21, this.y, 5, 0, 2 * Math.PI, false);
        ctx.moveTo(this.x + 26, this.y);
        ctx.lineTo(this.x + 36, this.y);
        ctx.stroke();
        ctx.closePath();
    }

    update(ctx) {
        super.update(ctx);
        // update power
        this.connectorThree.outputPower = !(this.connectorOne.inputPower && this.connectorTwo.inputPower);
    }
}

class Not extends Gate {
    constructor(x, y) {
        super(x, y);

        this.connectorOne = {
            x: x - 45,
            y: y,
            inputPower: false,
            outputPower: false,
            wire: undefined
        }
        this.connectorTwo = {
            x: x + 41,
            y: y,
            inputPower: false,
            outputPower: false,
            wire: undefined
        }

        this.connectors = [this.connectorOne, this.connectorTwo]
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x - 20 + (32 * Math.cos(Math.asin(0.5))), this.y);
        ctx.lineTo(this.x - 20, this.y - 16)
        ctx.lineTo(this.x - 20, this.y);
        ctx.moveTo(this.x - 40, this.y);
        ctx.lineTo(this.x - 20, this.y);
        ctx.lineTo(this.x - 20, this.y + 16);
        ctx.lineTo(this.x - 20 + (32 * Math.cos(Math.asin(0.5))), this.y);
        ctx.moveTo(this.x - 10 + (32 * Math.cos(Math.asin(0.5))), this.y);
        ctx.arc(this.x - 15 + (32 * Math.cos(Math.asin(0.5))), this.y, 5, 0, 2 * Math.PI, false);
        ctx.moveTo(this.x - 10 + (32 * Math.cos(Math.asin(0.5))), this.y);
        ctx.lineTo(this.x + 36, this.y);
        ctx.stroke();
        ctx.closePath();
    }

    update(ctx) {
        super.update(ctx);
        // update power
        this.connectorTwo.outputPower = !this.connectorOne.inputPower
    }
}

class Buffer extends Gate {
    constructor(x, y) {
        super(x, y);

        this.connectorOne = {
            x: x - 45,
            y: y,
            inputPower: false,
            outputPower: false,
            wire: undefined
        }
        this.connectorTwo = {
            x: x + 41,
            y: y,
            inputPower: false,
            outputPower: false,
            wire: undefined
        }

        this.connectors = [this.connectorOne, this.connectorTwo]
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x - 20 + (32 * Math.cos(Math.asin(0.5))), this.y);
        ctx.lineTo(this.x - 20, this.y - 16)
        ctx.lineTo(this.x - 20, this.y);
        ctx.moveTo(this.x - 40, this.y);
        ctx.lineTo(this.x - 20, this.y);
        ctx.lineTo(this.x - 20, this.y + 16);
        ctx.lineTo(this.x - 20 + (32 * Math.cos(Math.asin(0.5))), this.y);
        ctx.moveTo(this.x - 20 + (32 * Math.cos(Math.asin(0.5))), this.y);
        ctx.lineTo(this.x + 36, this.y);
        ctx.stroke();
        ctx.closePath();
    }

    update(ctx) {
        super.update(ctx);
        // update power
        this.connectorTwo.outputPower = this.connectorOne.inputPower;
    }
}

class Or extends Gate {
    constructor(x, y) {
        super(x, y);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x - 15 - (16 * Math.cos(Math.asin(0.5))), this.y, 16, Math.PI / 2, Math.PI * (3 / 2), true);
        ctx.moveTo(this.x - 15 - (16 * Math.cos(Math.asin(0.5))), this.y + 16);
        ctx.quadraticCurveTo(this.x + 10, this.y + 16, this.x + 16, this.y);
        ctx.quadraticCurveTo(this.x + 10, this.y + 16, this.x + 16, this.y);
        ctx.moveTo(this.x - 15 - (16 * Math.cos(Math.asin(0.5))), this.y - 16);
        ctx.quadraticCurveTo(this.x + 10, this.y - 16, this.x + 16, this.y);
        ctx.quadraticCurveTo(this.x + 10, this.y - 16, this.x + 16, this.y);
        ctx.moveTo(this.x - 40, this.y - 8);
        ctx.lineTo(this.x - 15, this.y - 8);
        ctx.moveTo(this.x - 40, this.y + 8);
        ctx.lineTo(this.x - 15, this.y + 8);
        ctx.moveTo(this.x + 16, this.y);
        ctx.lineTo(this.x + 36, this.y);
        ctx.closePath();
        ctx.stroke();
    }

    update(ctx) {
        super.update(ctx);
        // update power
        this.connectorThree.outputPower = this.connectorOne.inputPower || this.connectorTwo.inputPower;
    }
}

class Nor extends Gate {
    constructor(x, y) {
        super(x, y);
    }

    draw(ctx) {
        ctx.beginPath();
        // arcs
        ctx.arc(this.x - 15 - (16 * Math.cos(Math.asin(0.5))), this.y, 16, Math.PI / 2, Math.PI * (3 / 2), true);
        ctx.moveTo(this.x - 15 - (16 * Math.cos(Math.asin(0.5))), this.y + 16);
        ctx.quadraticCurveTo(this.x + 10, this.y + 16, this.x + 16, this.y);
        ctx.quadraticCurveTo(this.x + 10, this.y + 16, this.x + 16, this.y);
        ctx.moveTo(this.x - 15 - (16 * Math.cos(Math.asin(0.5))), this.y - 16);
        ctx.quadraticCurveTo(this.x + 10, this.y - 16, this.x + 16, this.y);
        ctx.quadraticCurveTo(this.x + 10, this.y - 16, this.x + 16, this.y);
        // back wires
        ctx.moveTo(this.x - 40, this.y - 8);
        ctx.lineTo(this.x - 15, this.y - 8);
        ctx.moveTo(this.x - 40, this.y + 8);
        ctx.lineTo(this.x - 15, this.y + 8);
        // front end
        ctx.moveTo(this.x + 26, this.y)
        ctx.arc(this.x + 21, this.y, 5, 0, 2 * Math.PI, false);
        ctx.moveTo(this.x + 26, this.y);
        ctx.lineTo(this.x + 36, this.y);
        ctx.closePath();
        ctx.stroke();
    }

    update(ctx) {
        super.update(ctx);
        // update power
        this.connectorThree.outputPower = !(this.connectorOne.inputPower || this.connectorTwo.inputPower);
    }
}

class Xor extends Gate {
    constructor(x, y) {
        super(x, y);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x - 15 - (16 * Math.cos(Math.asin(0.5))), this.y, 12, Math.PI / 2, Math.PI * (3 / 2), true);
        ctx.moveTo(this.x - 15 - (16 * Math.cos(Math.asin(0.5))), this.y + 16)
        ctx.arc(this.x - 15 - (16 * Math.cos(Math.asin(0.5))), this.y, 16, Math.PI / 2, Math.PI * (3 / 2), true);
        ctx.moveTo(this.x - 15 - (16 * Math.cos(Math.asin(0.5))), this.y + 16);
        ctx.quadraticCurveTo(this.x + 10, this.y + 16, this.x + 16, this.y);
        ctx.quadraticCurveTo(this.x + 10, this.y + 16, this.x + 16, this.y);
        ctx.moveTo(this.x - 15 - (16 * Math.cos(Math.asin(0.5))), this.y - 16);
        ctx.quadraticCurveTo(this.x + 10, this.y - 16, this.x + 16, this.y);
        ctx.quadraticCurveTo(this.x + 10, this.y - 16, this.x + 16, this.y);
        ctx.moveTo(this.x - 40, this.y - 8);
        ctx.lineTo(this.x - 15, this.y - 8);
        ctx.moveTo(this.x - 40, this.y + 8);
        ctx.lineTo(this.x - 15, this.y + 8);
        ctx.moveTo(this.x + 16, this.y);
        ctx.lineTo(this.x + 36, this.y);
        ctx.closePath();
        ctx.stroke();
    }

    update(ctx) {
        super.update(ctx);
        // update power
        this.connectorThree.outputPower = (this.connectorOne.inputPower != this.connectorTwo.inputPower);
    }
}

class Xnor extends Gate {
    constructor(x, y) {
        super(x, y);
    }

    draw(ctx) {
        ctx.beginPath();
        // arcs
        ctx.arc(this.x - 15 - (16 * Math.cos(Math.asin(0.5))), this.y, 12, Math.PI / 2, Math.PI * (3 / 2), true);
        ctx.moveTo(this.x - 15 - (16 * Math.cos(Math.asin(0.5))), this.y + 16)
        ctx.arc(this.x - 15 - (16 * Math.cos(Math.asin(0.5))), this.y, 16, Math.PI / 2, Math.PI * (3 / 2), true);
        ctx.moveTo(this.x - 15 - (16 * Math.cos(Math.asin(0.5))), this.y + 16);
        ctx.quadraticCurveTo(this.x + 10, this.y + 16, this.x + 16, this.y);
        ctx.quadraticCurveTo(this.x + 10, this.y + 16, this.x + 16, this.y);
        ctx.moveTo(this.x - 15 - (16 * Math.cos(Math.asin(0.5))), this.y - 16);
        ctx.quadraticCurveTo(this.x + 10, this.y - 16, this.x + 16, this.y);
        ctx.quadraticCurveTo(this.x + 10, this.y - 16, this.x + 16, this.y);
        // back wires
        ctx.moveTo(this.x - 40, this.y - 8);
        ctx.lineTo(this.x - 15, this.y - 8);
        ctx.moveTo(this.x - 40, this.y + 8);
        ctx.lineTo(this.x - 15, this.y + 8);
        // front end
        ctx.moveTo(this.x + 26, this.y)
        ctx.arc(this.x + 21, this.y, 5, 0, 2 * Math.PI, false);
        ctx.moveTo(this.x + 26, this.y);
        ctx.lineTo(this.x + 36, this.y);
        ctx.closePath();
        ctx.stroke();
    }

    update(ctx) {
        super.update(ctx);
        // update power
        this.connectorThree.outputPower = (this.connectorOne.inputPower == this.connectorTwo.inputPower);
    }
}

export {
    And,
    Nand,
    Not,
    Buffer,
    Or,
    Nor,
    Xor,
    Xnor
};
