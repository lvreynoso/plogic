import * as device from './devices.js'

// reference to canvas
var canvas = document.getElementById("myCanvas");
// 2D rendering context, to paint to canvas
var ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var testGateAND = new AndGate(200, 200);
testGateAND.draw(ctx);
