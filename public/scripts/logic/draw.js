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

export {
    focus,
    connectorFocus
}
