'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.rollBack = rollBack;

var _store = require('./store');

var _dispatch = require('./dispatch');

var _dispatch2 = _interopRequireDefault(_dispatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function rollBack(name) {
  return new Promise(function (resolve) {
    var Model = (0, _store.modelStore)()[name];
    (0, _dispatch2.default)({
      type: name,
      data: _extends({}, new Model().data)
    }, resolve, true);
  });
}