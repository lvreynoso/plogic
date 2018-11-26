// contains all our device code


// AND Gate
class AndGate {
    // constructor takes in values that we want to be
    // passed in when initializing the class
    constructor(x, y) {
        // position
        this.x = x;
        this.y = y;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 30, Math.PI / 2, Math.PI * (3 / 2), true);
        ctx.lineTo(this.x - 60, this.y - 30);
        ctx.lineTo(this.x - 60, this.y + 30);
        ctx.lineTo(this.x, this.y + 30);
        ctx.closePath();
        ctx.stroke();
    }
}

// Switch - simple on-off toggle
class Switch {
    // constructor takes in values that we want to be
    // passed in when initializing the class
    constructor(x, y, state) {
        // position
        this.x = x;
        this.y = y;
        // on/off
        this.state = state;
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
}

// add a comment for this object
class Bulb {

}

export {
    AndGate,
    Switch,
    Bulb,
}
