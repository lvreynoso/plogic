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

        this.spoke = {
            north: 'north',
            south: 'south',
            east: 'east',
            west: 'west'
        }

        this.connectorOne = {
            x: this.x,
            y: this.y,
            outputPower: false,
            inputPower: false,
            wire: undefined,
            spoke: undefined
        }

        // keep track of all the connectors
        this.connectors = [this.connectorOne];
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
            // connector spokes so they're drawn under devices
            // really only need them for displays
            switch (connector.spoke) {
                case this.spoke.north:
                    ctx.moveTo(connector.x, connector.y - 5);
                    ctx.lineTo(connector.x, connector.y - 10);
                    ctx.stroke();
                    break;
                case this.spoke.south:
                    ctx.moveTo(connector.x, connector.y + 5);
                    ctx.lineTo(connector.x, connector.y + 10);
                    ctx.stroke();
                    break;
                case this.spoke.east:
                    ctx.moveTo(connector.x + 5, connector.y);
                    ctx.lineTo(connector.x + 10, connector.y);
                    ctx.stroke();
                    break;
                case this.spoke.west:
                    ctx.moveTo(connector.x - 5, connector.y);
                    ctx.lineTo(connector.x - 10, connector.y);
                    ctx.stroke();
                    break;
                // safari doesn't even complain if this isn't here, but to be safe...
                default:
                    break;
            }
            ctx.closePath();
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
        // this.drawConnectors(ctx);
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
