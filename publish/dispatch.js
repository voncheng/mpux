"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dispatch;

var _store = require("./store");

var _store2 = _interopRequireDefault(_store);

var _observer = require("./observer");

var _observer2 = _interopRequireDefault(_observer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dispatch(action, callback, restore) {
  var type = action.type,
      data = action.data;

  (0, _store2.default)({ namespace: type, data: data }, restore);

  _observer2.default.publish(type, data, callback, restore);
}