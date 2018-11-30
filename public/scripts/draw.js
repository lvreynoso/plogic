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
    ctx.beginPath();
    ctx.arc(device.x, device.y, 40, 0, 2 * Math.PI, true)
    ctx.strokeStyle = 'purple';
    ctx.stroke();
    ctx.strokeStyle = 'black';
}

let connectorFocus = function(ctx, connector) {
    ctx.beginPath();
    ctx.arc(connector.x, connector.y, 10, 0, 2 * Math.PI, true)
    ctx.strokeStyle = 'purple';
    ctx.stroke();
    ctx.strokeStyle = 'black';
}

export {
    focus,
    connectorFocus
}
