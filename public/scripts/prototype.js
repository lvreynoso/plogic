// prototype.js

import makeUUID from './identify.js'

/*
|--------------------------------------------------------------------------
| Device
|--------------------------------------------------------------------------
|
| The superclass where common methods live.
|
*/

export default class Device {
    constructor(x, y) {
        this.id = makeUUID();
        // position
        this.x = x;
        this.y = y;
        // on/off; off by default
        this.held = false;

        this.connector = {
            x: this.x,
            y: this.y,
            outputPower: false,
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
    }

    draw(ctx) {
        // for children to implement
        ctx.fillText('DEVICE PROTOTYPE', this.x, this.y);
    }

    drawConnectors(ctx) {
        this.connectors.forEach(connector => {
            ctx.beginPath();
            ctx.arc(connector.x, connector.y, 5, 0, 2 * Math.PI, false);
            ctx.stroke();
        })
    }

    update(ctx) {
        // update input power
        this.connectors.forEach(connector => {
            if (connector.wire != undefined) {
                connector.inputPower = connector.wire.power(connector);
            } else {
                connector.inputPower = false;
            }
        })

        this.draw(ctx);
        this.draw(ctx);
        this.drawConnectors(ctx);
    }

    updateLocation(x, y) {
        let deltaX = x - this.x;
        let deltaY = y - this.y;
        this.x += deltaX;
        this.y += deltaY;
        this.connectors.forEach(connector => {
            connector.x += deltaX;
            connector.y += deltaY;
        })
    }
}
