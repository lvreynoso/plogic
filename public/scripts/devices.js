// a kind of header file to handle imports and exports

import * as switches from './switches.js';
import * as wire from './wire.js';
import * as gates from './gates.js';
import * as displays from './displays.js'

// switches
var Switch = switches.Switch;

// wire
var Wire = wire.Wire;

// gates
var AndGate = gates.AndGate;

// displays
var Bulb = displays.Bulb;

export {
    AndGate,
    Switch,
    Bulb,
    Wire
}
