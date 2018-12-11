"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// levels.js
const levels = _express.default.Router();

levels.get('/level-:id', (req, res) => {
  const currentUser = req.user;
  console.log(req.user);
  console.log(currentUser);
  res.render(`levels/${req.params.id}`, {
    currentUser
  });
});
var _default = levels;
exports.default = _default;
//# sourceMappingURL=levels.js.map