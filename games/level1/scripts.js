// reference to canvas
var canvas = document.getElementById("myCanvas");
// 2D rendering context, to paint to canvas
var ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// add a comment for this object
class AndGate {
    // constructor takes in values that we want to be 
    // passed in when initializing the class
    constructor(x, y) {
        // position
        this.x = x;
        this.y = y;
    }
}

// add a comment for this object
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

