// contains all our device code


// AND Gate
class AndGate {
    // constructor takes in values that we want to be
    // passed in when initializing the class
    constructor(x, y) {
        // position
        this.x = x;
        this.y = y;
        this.held = false;
    }

    hold() {
        this.held = true;
    }

    drop() {
        this.held = false;
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

    drawFocus(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 40, 0, 2 * Math.PI, true)
        ctx.strokeStyle = 'purple';
        ctx.stroke();
        ctx.strokeStyle = 'black';
    }

    update(ctx, mouse) {
        // check if the mouse is near us
        let mouseOver = false;
        if (Math.abs(mouse.x - this.x) < 30 && Math.abs(mouse.y - this.y) < 30) {
            mouseOver = true;
        }

        // if the mouse is near us, check for any action we should take
        if (mouseOver == true) {
            // check if we were clicked on
            if (mouse.clicked == true) {
                // toggle being held
                this.held = !this.held;
            }
            // if being held, move with the mouse
            if (this.held == true) {
                this.x = mouse.x;
                this.y = mouse.y;
            } else {
                // if not being held, draw a focus ring
                this.drawFocus(ctx);
            }
        }

        this.draw(ctx);
        this.draw(ctx);
    }
}

// Switch - simple on-off toggle
class Switch {
    // constructor takes in values that we want to be
    // passed in when initializing the class
    constructor(x, y) {
        // position
        this.x = x;
        this.y = y;
        // on/off; off by default
        this.state = false;
        this.held = false;
    }

    hold() {
        this.held = true;
    }

    drop() {
        this.held = false;
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
        ctx.fillStyle = 'black';
    }

    drawFocus(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 40, 0, 2 * Math.PI, true)
        ctx.strokeStyle = 'purple';
        ctx.stroke();
        ctx.strokeStyle = 'black';
    }

    update(ctx, mouse) {
        // check if the mouse is near us
        let mouseOver = false;
        if (Math.abs(mouse.x - this.x) < 30 && Math.abs(mouse.y - this.y) < 30) {
            mouseOver = true;
        }

        let mouseInSwitchZone = false;
        if (Math.abs(mouse.x - this.x) < 5 && Math.abs(mouse.y - this.y) < 10) {
            mouseInSwitchZone = true;
        }

        // if the mouse is near us, check for any action we should take
        if (mouseOver == true) {
            // check if we were clicked on
            if (mouse.clicked == true) {
                // if the click was in the switch zone and we aren't being held
                if (mouseInSwitchZone == true && !this.held) {
                    // toggle power
                    this.state = !this.state;
                } else {
                    // toggle being held
                    this.held = !this.held;
                }
            }
            // if being held, move with the mouse
            if (this.held == true) {
                this.x = mouse.x;
                this.y = mouse.y;
            } else {
                // if not being held, draw a focus ring
                this.drawFocus(ctx);
            }
        }

        this.draw(ctx);
        this.draw(ctx);
    }
}

// light bulb - turns on with power
class Bulb {
    // constructor takes in values that we want to be
    // passed in when initializing the class
    constructor(x, y) {
        // position
        this.x = x;
        this.y = y;
        // on/off; off by default
        this.state = false;
        this.held = false;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, (2/3) * Math.PI, (1/3) * Math.PI, false);
        ctx.lineTo(this.x + (20 * Math.sin(Math.PI / 6)), this.y + 30);
        ctx.lineTo(this.x - (20 * Math.sin(Math.PI / 6)), this.y + 30);
        ctx.closePath();
        ctx.stroke();
        if (this.state == true) {
            ctx.fillStyle = 'yellow';
            ctx.fill();
        }
        ctx.fillStyle = 'black';
    }

    drawFocus(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 40, 0, 2 * Math.PI, true)
        ctx.strokeStyle = 'purple';
        ctx.stroke();
        ctx.strokeStyle = 'black';
    }

    update(ctx, mouse) {
        // check if the mouse is near us
        let mouseOver = false;
        if (Math.abs(mouse.x - this.x) < 30 && Math.abs(mouse.y - this.y) < 30) {
            mouseOver = true;
        }

        // if the mouse is near us, check for any action we should take
        if (mouseOver == true) {
            // check if we were clicked on
            if (mouse.clicked) {
                // toggle being held
                this.held = !this.held;
                mouse.holding = !mouse.holding;
            }
            // if being held, move with the mouse
            if (this.held == true) {
                this.x = mouse.x;
                this.y = mouse.y;
            } else {
                // if not being held, draw a focus ring
                this.drawFocus(ctx);
            }
        }

        this.draw(ctx);
        this.draw(ctx);
    }
}

export {
    AndGate,
    Switch,
    Bulb,
}
