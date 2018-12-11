"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// playground.js
const playground = _express.default.Router();

playground.get('/playground', (req, res) => {
  const currentUser = req.user;
  console.log(req.user);
  console.log(currentUser);
  res.render('playground', {
    currentUser
  });
});
var _default = playground;
exports.default = _default;
//# sourceMappingURL=playground.js.map