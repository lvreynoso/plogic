// utils.js

const getDistance = function(first, second) {
    let x = first.x - second.x;
    let y = first.y - second.y;
    let distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
    return distance;
}

const inZone = function(mouse, zone) {
    let result = false;
    if (Math.abs(mouse.x - zone.x) < zone.width && Math.abs(mouse.y - zone.y) < zone.height) {
        result = true;
    }
    return result;
}

export {
    getDistance,
    inZone
}
