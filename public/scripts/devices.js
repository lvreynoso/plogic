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

    update(ctx, mouse) {
        if (this.held == true) {
            this.x = mouse.x;
            this.y = mouse.y;
        }
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

    // functions can be added in classes
    toggle() {
        if (this.state == true) {
            this.state = false
        }
        else {
            this.state = true
        }
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

    update(ctx, mouse) {
        if (this.held == true) {
            this.x = mouse.x;
            this.y = mouse.y;
        }
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

    hold() {
        this.held = true;
    }

    drop() {
        this.held = false;
    }

    // functions can be added in classes
    toggle() {
        if (this.state == true) {
            this.state = false
        }
        else {
            this.state = true
        }
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

    update(ctx, mouse) {
        if (this.held == true) {
            this.x = mouse.x;
            this.y = mouse.y;
        }
        this.draw(ctx);
    }
}

export {
    AndGate,
    Switch,
    Bulb,
}
