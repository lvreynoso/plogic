// a kind of header file to handle imports and exports

import * as switches from './switches.js';
import * as wire from './wire.js';
import * as gates from './gates.js';
import * as displays from './displays.js';
import * as wiring from './wiring.js'

// wire
const Wire = wire.Wire;

// gates
const gate = gates;

// displays
const display = displays;

export {
    switches,
    Wire,
    gate,
    display,
    wiring
}
