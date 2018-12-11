// draw.js - non-device objects drawn on the canvas

/*
|--------------------------------------------------------------------------
| Draw
|--------------------------------------------------------------------------
|
| Document here.
|
*/

let focus = function(ctx, device) {
    ctx.strokeStyle = 'purple';
    ctx.beginPath();
    ctx.arc(device.x, device.y, 40, 0, 2 * Math.PI, true)
    ctx.stroke();
    ctx.closePath();
    ctx.strokeStyle = 'black';
}

let connectorFocus = function(ctx, connector) {
    ctx.strokeStyle = 'purple';
    ctx.beginPath();
    ctx.arc(connector.x, connector.y, 10, 0, 2 * Math.PI, true)
    ctx.stroke();
    ctx.closePath();
    ctx.strokeStyle = 'black';
}

let mouseFocus = function(ctx, mouse) {
    ctx.strokeStyle = 'purple';
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 40, 0, 2 * Math.PI, true)
    ctx.stroke();
    ctx.closePath();
    ctx.strokeStyle = 'black';
}

let eraser = function(ctx, mouse) {
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(mouse.x - 25, mouse.y - 25);
    ctx.lineTo(mouse.x + 25, mouse.y + 25);
    ctx.moveTo(mouse.x - 25, mouse.y + 25);
    ctx.lineTo(mouse.x + 25, mouse.y - 25);
    ctx.stroke();
    ctx.closePath();
    ctx.strokeStyle = 'black';
}

class Menu {
    constructor(x, y, device) {
        this.x = x;
        this.y = y;

        this.type = "menu";
        this.state = false;

        this.gates = {
            q: {
                device: new device.gate.And(x + 166.67, y + 200),
                label: {
                    text: "AND Gate",
                    x: x + 80,
                    y: y + 150
                }
            },
            w: {
                device: new device.gate.Not(x + 500, y + 200),
                label: {
                    text: "NOT Gate",
                    x: x + 413,
                    y: y + 150
                }
            },
            e: {
                device: new device.gate.Or(x + 833.33, y + 200),
                label: {
                    text: "OR Gate",
                    x: x + 746,
                    y: y + 150
                }
            },
            a: {
                device: new device.gate.Nand(x + 166.67, y + 366.67),
                label: {
                    text: "NAND Gate",
                    x: x + 80,
                    y: y + 316.67
                }
            },
            s: {
                device: new device.gate.Buffer(x + 500, y + 366.67),
                label: {
                    text: "Buffer",
                    x: x + 433,
                    y: y + 316.67
                }
            },
            d: {
                device: new device.gate.Nor(x + 833.33, y + 366.67),
                label: {
                    text: "NOR Gate",
                    x: x + 746,
                    y: y + 316.67
                }
            },
            z: {
                device: new device.gate.Xor(x + 166.67, y + 533.34),
                label: {
                    text: "XOR Gate",
                    x: x + 80,
                    y: y + 483.34
                }
            },
            x: {
                device: new device.gate.Xnor(x + 500, y + 533.34),
                label: {
                    text: "XNOR Gate",
                    x: x + 433,
                    y: y + 483.34
                }
            }
        }

        this.switches = {
            q: {
                device: new device.switches.TwoWay(x + 166.67, y + 200),
                label: {
                    text: "Two Way Switch",
                    x: x + 80,
                    y: y + 150
                }
            },
        };

        this.displays = {
            q: {
                device: new device.display.Bulb(x + 166.67, y + 200),
                label: {
                    text: "Light Bulb",
                    x: x + 80,
                    y: y + 150
                }
            },
            w: {
                device: new device.display.LCDNumber(x + 500, y + 200),
                label: {
                    text: "LCD Number Display",
                    x: x + 413,
                    y: y + 150
                }
            },
        };
        this.wiring = {
            q: {
                device: new device.wiring.Splitter(x + 166.67, y + 200),
                label: {
                    text: "Splitter",
                    x: x + 80,
                    y: y + 150
                }
            },
        };

        this.selected = '1';
        this.category = {
            '1': this.gates,
            '2': this.switches,
            '3': this.displays,
            '4': this.wiring
        }
    }

    toggle() {
        this.state = !this.state;
    }

    select(key, mouse) {
        switch (key) {
            case '1':
            case '2':
            case '3':
            case '4':
                this.selected = key;
                break;
            case 'q':
            case 'w':
            case 'e':
            case 'a':
            case 's':
            case 'd':
            case 'z':
            case 'x':
            case 'c':
                let selectedCategory = this.category[this.selected];
                if (selectedCategory.hasOwnProperty(key)) {
                    mouse.normal();
                    let selectedDevice = selectedCategory[key].device;
                    let copy = selectedDevice.clone(mouse.x, mouse.y);
                    mouse.clone(copy);
                    this.toggle();
                }
                break;
            default:
                break;
        }
    }

    draw(ctx) {
        // background
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, 1000, 600);
        ctx.strokeRect(this.x, this.y, 1000, 600);
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, 1000, 100);
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(this.x + 250, this.y);
        ctx.lineTo(this.x + 250, this.y + 100);
        ctx.moveTo(this.x + 500, this.y);
        ctx.lineTo(this.x + 500, this.y + 100);
        ctx.moveTo(this.x + 750, this.y);
        ctx.lineTo(this.x + 750, this.y + 100);
        ctx.stroke();
        ctx.strokeStyle = 'black';

        // section labels
        // Gates
        if (this.selected == '1') {
            ctx.fillStyle = '#42f44e'
        } else {
            ctx.fillStyle = 'white';
        }
        ctx.fillRect(this.x + 10, this.y + 10, 50, 75);
        ctx.font = '36px chiq-bold';
        ctx.fillText('Gates', this.x + 80, this.y + 65);
        ctx.fillStyle = 'black';
        ctx.font = '48px chiq-bold';
        ctx.fillText('1', this.x + 18, this.y + 65);

        // Switches
        if (this.selected == '2') {
            ctx.fillStyle = '#42f44e'
        } else {
            ctx.fillStyle = 'white';
        }
        ctx.fillRect(this.x + 260, this.y + 10, 50, 75);
        ctx.font = '36px chiq-bold';
        ctx.fillText('Switches', this.x + 320, this.y + 65);
        ctx.font = '48px chiq-bold';
        ctx.fillStyle = 'black';
        ctx.fillText('2', this.x + 268, this.y + 65);

        // Displays
        if (this.selected == '3') {
            ctx.fillStyle = '#42f44e'
        } else {
            ctx.fillStyle = 'white';
        }
        ctx.fillRect(this.x + 510, this.y + 10, 50, 75);
        ctx.font = '36px chiq-bold';
        ctx.fillText('Displays', this.x + 570, this.y + 65);
        ctx.font = '48px chiq-bold';
        ctx.fillStyle = 'black';
        ctx.fillText('3', this.x + 518, this.y + 65);

        // Wiring
        if (this.selected == '4') {
            ctx.fillStyle = '#42f44e'
        } else {
            ctx.fillStyle = 'white';
        }
        ctx.fillRect(this.x + 760, this.y + 10, 50, 75);
        ctx.font = '36px chiq-bold';
        ctx.fillText('Wiring', this.x + 830, this.y + 65);
        ctx.font = '48px chiq-bold';
        ctx.fillStyle = 'black';
        ctx.fillText('4', this.x + 768, this.y + 65);

        // draw boxes
        ctx.strokeStyle = 'black';
        ctx.moveTo(this.x, this.y + 266.67);
        ctx.lineTo(this.x + 1000, this.y + 266.67);
        ctx.moveTo(this.x, this.y + 433.33);
        ctx.lineTo(this.x + 1000, this.y + 433.33);
        ctx.moveTo(this.x + 333.33, this.y + 100);
        ctx.lineTo(this.x + 333.33, this.y + 600);
        ctx.moveTo(this.x + 666.67, this.y + 100); // 😈
        ctx.lineTo(this.x + 666.67, this.y + 600);
        ctx.stroke();

        // draw letter labels
        ctx.font = '48px chiq-bold';
        ctx.fillStyle = 'black'
        ctx.fillRect(this.x, this.y + 100, 55, 55)
        ctx.fillRect(this.x + 333.33, this.y + 100, 55, 55)
        ctx.fillRect(this.x + 666.67, this.y + 100, 55, 55)
        ctx.fillRect(this.x, this.y + 266.67, 55, 55)
        ctx.fillRect(this.x + 333.33, this.y + 266.67, 55, 55)
        ctx.fillRect(this.x + 666.67, this.y + 266.67, 55, 55)
        ctx.fillRect(this.x, this.y + 433.33, 55, 55)
        ctx.fillRect(this.x + 333.33, this.y + 433.33, 55, 55)
        ctx.fillRect(this.x + 666.67, this.y + 433.33, 55, 55)


        ctx.fillStyle = 'white';
        ctx.fillText('Q', this.x + 5, this.y + 145);
        ctx.fillText('W', this.x + 338.33, this.y + 145);
        ctx.fillText('E', this.x + 671.67, this.y + 145);
        ctx.fillText('A', this.x + 5, this.y + 311.67);
        ctx.fillText('S', this.x + +338.33, this.y + 311.67);
        ctx.fillText('D', this.x + +671.67, this.y + 311.67);
        ctx.fillText('Z', this.x + 5, this.y + 477.67);
        ctx.fillText('X', this.x + 338.33, this.y + 477.67);
        ctx.fillText('C', this.x + 671.67, this.y + 477.67);

        ctx.fillStyle = 'black';
    }

    drawCategory(ctx) {
        ctx.font = '28px chiq-bold';
        let selectedCategory = this.category[this.selected]
        switch (this.selected) {
            case '1':
            case '2':
            case '3':
            case '4':
                let deviceArray = Object.keys(selectedCategory);
                deviceArray.forEach(key => {
                    let deviceToDraw = selectedCategory[key].device
                    let labelToDraw = selectedCategory[key].label
                    deviceToDraw.drawConnectors(ctx);
                    deviceToDraw.update(ctx);
                    ctx.fillText(labelToDraw.text, labelToDraw.x, labelToDraw.y)
                })
                break;
            default:
                break;
        }
    }

    update(ctx) {
        if (this.state == true) {
            this.draw(ctx);
            this.drawCategory(ctx);
        }
    }
}

export {
    focus,
    connectorFocus,
    mouseFocus,
    eraser,
    Menu
}
