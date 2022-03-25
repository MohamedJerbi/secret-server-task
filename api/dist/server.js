"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = require("body-parser");

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _connect = _interopRequireDefault(require("../connect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

const app = (0, _express.default)();
exports.app = app;
app.disable('x-powered-by');
app.use((0, _cors.default)());
app.use((0, _bodyParser.json)({
  limit: '15mb'
}));
app.use((0, _bodyParser.urlencoded)({
  extended: true,
  limit: '15mb'
}));
app.use((0, _morgan.default)('dev'));
app.get('/api', (req, res) => res.send('success'));

const start = async () => {
  try {
    await (0, _connect.default)(process.env.CONNECT);
    app.listen(process.env.port, () => {
      console.log(`REST API on http://localhost:${process.env.port}/api`);
    });
  } catch (e) {
    console.error(e);
  }
};

exports.start = start;