// displays - devices that take input and change their color

import Device from './prototype.js'

/*
|--------------------------------------------------------------------------
| Bulb
|--------------------------------------------------------------------------
|
| Document here.
|
*/

class Display extends Device {
    constructor(x, y) {
        super(x, y);
        // on/off; off by default
        this.state = false;
    }
}

class Bulb extends Display {
    // constructor takes in values that we want to be
    // passed in when initializing the class
    constructor(x, y) {
        super(x, y);
        this.connector = {
            x: this.x,
            y: this.y + 40,
            inputPower: false,
            outputPower: false,
            wire: undefined
        }
        this.connectors = [this.connector];
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, (2/3) * Math.PI, (1/3) * Math.PI, false);
        ctx.lineTo(this.x + (20 * Math.sin(Math.PI / 6)), this.y + 30);
        ctx.lineTo(this.x - (20 * Math.sin(Math.PI / 6)), this.y + 30);
        ctx.closePath();
        ctx.moveTo(this.x, this.y + 30);
        ctx.lineTo(this.x, this.y + 35);
        ctx.stroke();
        if (this.state == true) {
            ctx.fillStyle = 'yellow';
            ctx.fill();
        }
        ctx.fillStyle = 'black';
    }

    update(ctx) {
        super.update(ctx);
        // update bulb on/off state
        this.state = this.connector.inputPower;
    }
}

export { Bulb };
