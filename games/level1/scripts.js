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

class Game {
    constructor() {
        // add objects needed
        // add in values that need to be passed in
        this.AndGate = AndGate()
        this.Switch = Switch()
        this.Bulb = Bulb()
    }

    draw() {
        // draw the game
        // draw objects
        // draw level
    }
}


function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    // relativeX is where our mouse is

    // if mouse is between 0 and canvas width
    if(relativeX > 0 && relativeX < canvas.width) {
        // do something
    }
}

document.addEventListener("mousemove", mouseMoveHandler, false);

