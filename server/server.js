'use strict'; // environment setup

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _expressValidator = _interopRequireDefault(require("express-validator"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _index = _interopRequireDefault(require("./controllers/index.js"));

var _auth = _interopRequireDefault(require("./controllers/auth.js"));

var _levels = _interopRequireDefault(require("./controllers/levels.js"));

var _playground = _interopRequireDefault(require("./controllers/playground.js"));

var _database = _interopRequireDefault(require("./database/database.js"));

var _exphbsConfig = _interopRequireDefault(require("./config/exphbs-config.js"));

var _checkAuth = _interopRequireDefault(require("./lib/check-auth.js"));

var _checkCookie = _interopRequireDefault(require("./lib/check-cookie.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const result = process.env.NODE_ENV == 'development' ? _dotenv.default.config() : false; // dependencies

const exphbs = _expressHandlebars.default.create(_exphbsConfig.default); // whatevers


// set our express options
const app = (0, _express.default)();
app.set('port', process.env.PORT || 3000);
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_bodyParser.default.json());
app.use(_express.default.static('public'));
app.use((0, _expressValidator.default)());
app.use((0, _cookieParser.default)());
app.use(_checkCookie.default); // set our view engine

app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars'); // routes that need authentication
// routes

app.use(_index.default);
app.use(_auth.default);
app.use(_playground.default);
app.use(_levels.default); // face the world

const hotPort = app.get('port');
const server = app.listen(hotPort, () => {
  console.log(`App listening on port ${hotPort}!`);
}); // for Mocha/Chai test purposes

var _default = server;
exports.default = _default;
//# sourceMappingURL=server.js.map