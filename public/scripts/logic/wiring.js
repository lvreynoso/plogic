// wiring.js

import Device from './prototype.js'

/*
|--------------------------------------------------------------------------
| Wiring Tools
|--------------------------------------------------------------------------
|
| Tools to help with wiring.
|
*/

class Splitter extends Device {
    constructor(x, y) {
        super(x, y);

        this.connectorOne = {
            x: this.x,
            y: this.y - 17.5,
            outputPower: false,
            inputPower: false,
            wire: undefined
        }
        this.connectorTwo = {
            x: this.x + 17.5,
            y: this.y,
            outputPower: false,
            inputPower: false,
            wire: undefined
        }
        this.connectorThree = {
            x: this.x,
            y: this.y + 17.5,
            outputPower: false,
            inputPower: false,
            wire: undefined
        }
        this.connectorFour = {
            x: this.x - 17.5,
            y: this.y,
            outputPower: false,
            inputPower: false,
            wire: undefined
        }

        // keep track of all the connectors
        this.connectors = [this.connectorOne, this.connectorTwo, this.connectorThree, this.connectorFour];
    }

    draw(ctx) {
        ctx.strokeRect(this.x - 7.5, this.y - 7.5, 15, 15);
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - 7.5);
        ctx.lineTo(this.x, this.y - 12.5);
        ctx.moveTo(this.x + 7.5, this.y);
        ctx.lineTo(this.x + 12.5, this.y);
        ctx.moveTo(this.x, this.y + 7.5);
        ctx.lineTo(this.x, this.y + 12.5);
        ctx.moveTo(this.x - 7.5, this.y);
        ctx.lineTo(this.x - 12.5, this.y);
        ctx.stroke();
        ctx.closePath();
    }

    update(ctx) {
        super.update(ctx);

        this.state = false;
        this.connectors.forEach(connector => {
            if (connector.inputPower == true) {
                this.state = true;
            }
        })
        if (this.state == true) {
            this.connectors.forEach(connector => connector.outputPower = true)
        } else {
            this.connectors.forEach(connector => connector.outputPower = false)
        }

    }
}

export {
    Splitter
}
