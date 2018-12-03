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
        this.connectorOne = {
            x: this.x,
            y: this.y + 40,
            inputPower: false,
            outputPower: false,
            wire: undefined
        }
        this.connectors = [this.connectorOne];
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, (2 / 3) * Math.PI, (1 / 3) * Math.PI, false);
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
        this.state = this.connectorOne.inputPower;
    }
}

class LCDNumber extends Display {
    constructor(x, y) {
        super(x, y);

        this.connectorOne = {
            x: this.x - 30,
            y: this.y + 70,
            outputPower: false,
            inputPower: false,
            wire: undefined
        }
        this.connectorTwo = {
            x: this.x - 10,
            y: this.y + 70,
            outputPower: false,
            inputPower: false,
            wire: undefined
        }
        this.connectorThree = {
            x: this.x + 10,
            y: this.y + 70,
            outputPower: false,
            inputPower: false,
            wire: undefined
        }
        this.connectorFour = {
            x: this.x + 30,
            y: this.y + 70,
            outputPower: false,
            inputPower: false,
            wire: undefined
        }
        this.connectorFive = {
            x: this.x,
            y: this.y - 70,
            outputPower: false,
            inputPower: false,
            wire: undefined
        }

        this.connectors = [this.connectorOne, this.connectorTwo, this.connectorThree, this.connectorFour, this.connectorFive]
    }

    draw(ctx) {
        // black background
        ctx.fillRect(this.x - 35, this.y - 60, 70, 120);
        // connector wires
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - 60);
        ctx.lineTo(this.x, this.y - 65);
        ctx.moveTo(this.x - 10, this.y + 60);
        ctx.lineTo(this.x - 10, this.y + 65);
        ctx.moveTo(this.x - 30, this.y + 60);
        ctx.lineTo(this.x - 30, this.y + 65);
        ctx.moveTo(this.x + 10, this.y + 60);
        ctx.lineTo(this.x + 10, this.y + 65);
        ctx.moveTo(this.x + 30, this.y + 60);
        ctx.lineTo(this.x + 30, this.y + 65);

        ctx.stroke();
    }

    drawNumber(ctx, n) {
        // our drawing area is 60w by 110h
        ctx.fillStyle = '#42f44e';

        // top bar
        if ((!n[1] && !n[3]) || n[2] || (n[1] && n[3]) || n[0]) {
            ctx.fillRect(this.x - 18, this.y - 55, 36, 10);
            ctx.beginPath();
            ctx.moveTo(this.x - 18, this.y - 55);
            ctx.lineTo(this.x - 18, this.y - 45);
            ctx.lineTo(this.x - 23, this.y - 50);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(this.x + 18, this.y - 55);
            ctx.lineTo(this.x + 18, this.y - 45);
            ctx.lineTo(this.x + 23, this.y - 50);
            ctx.closePath();
            ctx.fill();
        }
        if (!n[1] || (!n[2] && !n[3]) || (n[2] && n[3])) {
            // right upper bar
            ctx.fillRect(this.x + 20, this.y - 43, 10, 36);
            ctx.beginPath();
            ctx.moveTo(this.x + 20, this.y - 43);
            ctx.lineTo(this.x + 30, this.y - 43);
            ctx.lineTo(this.x + 25, this.y - 48);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(this.x + 20, this.y - 7);
            ctx.lineTo(this.x + 30, this.y - 7);
            ctx.lineTo(this.x + 25, this.y - 2);
            ctx.closePath();
            ctx.fill();
        }

        // right lower bar
        if (n[1] || !(n[2]) || n[3]) {
            ctx.fillRect(this.x + 20, this.y + 7, 10, 36);
            ctx.beginPath();
            ctx.moveTo(this.x + 20, this.y + 7);
            ctx.lineTo(this.x + 30, this.y + 7);
            ctx.lineTo(this.x + 25, this.y + 2);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(this.x + 20, this.y + 43);
            ctx.lineTo(this.x + 30, this.y + 43);
            ctx.lineTo(this.x + 25, this.y + 48);
            ctx.closePath();
            ctx.fill();
        }

        // left upper bar
        if ((!n[2] && !n[3]) || (n[1] && !n[2]) || (n[1] && !n[3]) || n[0]) {
            ctx.fillRect(this.x - 30, this.y - 43, 10, 36);
            ctx.beginPath();
            ctx.moveTo(this.x - 20, this.y - 43);
            ctx.lineTo(this.x - 30, this.y - 43);
            ctx.lineTo(this.x - 25, this.y - 48);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(this.x - 20, this.y - 7);
            ctx.lineTo(this.x - 30, this.y - 7);
            ctx.lineTo(this.x - 25, this.y - 2);
            ctx.closePath();
            ctx.fill();
        }

        // left lower bar
        if ((!n[1] && !n[3]) || (n[2] && !n[3])) {
            ctx.fillRect(this.x - 30, this.y + 7, 10, 36);
            ctx.moveTo(this.x - 20, this.y + 7);
            ctx.lineTo(this.x - 30, this.y + 7);
            ctx.lineTo(this.x - 25, this.y + 2);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(this.x - 20, this.y + 43);
            ctx.lineTo(this.x - 30, this.y + 43);
            ctx.lineTo(this.x - 25, this.y + 48);
            ctx.closePath();
            ctx.fill();
        }

        // bottom bar
        if ((!n[1] && !n[3]) || (!n[1] && n[2]) || (n[1] && !n[2] && n[3]) || (n[2] && !n[3]) || n[0]) {
            ctx.fillRect(this.x - 18, this.y + 45, 36, 10);
            ctx.beginPath();
            ctx.moveTo(this.x - 18, this.y + 45);
            ctx.lineTo(this.x - 18, this.y + 55);
            ctx.lineTo(this.x - 23, this.y + 50);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(this.x + 18, this.y + 45);
            ctx.lineTo(this.x + 18, this.y + 55);
            ctx.lineTo(this.x + 23, this.y + 50);
            ctx.closePath();
            ctx.fill();
        }

        // central bar
        if ((!n[1] && n[2]) || (n[1] && !n[2]) || n[0] || (n[1] && !n[3])) {
            ctx.fillRect(this.x - 18, this.y - 5, 36, 10);
            ctx.beginPath();
            ctx.moveTo(this.x - 18, this.y - 5);
            ctx.lineTo(this.x - 18, this.y + 5);
            ctx.lineTo(this.x - 23, this.y);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(this.x + 18, this.y - 5);
            ctx.lineTo(this.x + 18, this.y + 5);
            ctx.lineTo(this.x + 23, this.y);
            ctx.closePath();
            ctx.fill();
        }

        ctx.fillStyle = 'black';
    }

    update(ctx) {
        super.update(ctx);

        let n = [this.connectorOne.inputPower, this.connectorTwo.inputPower, this.connectorThree.inputPower, this.connectorFour.inputPower]

        if (this.connectorFive.inputPower == true) {
            this.drawNumber(ctx, n);
        }
    }
}

export {
    Bulb,
    LCDNumber
}
