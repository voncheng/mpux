"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _store = require("./store");

var _store2 = _interopRequireDefault(_store);

var _observer = require("./observer");

var _observer2 = _interopRequireDefault(_observer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
  function Controller(_ref) {
    var actions = _ref.actions,
        baseActions = _ref.baseActions;

    _classCallCheck(this, Controller);

    this.actions = actions;
    this.baseActions = baseActions;
    this._tokens = [];
  }

  _createClass(Controller, [{
    key: "__subscribe__",
    value: function __subscribe__(modelName) {
      var token = _observer2.default.subscribe(modelName, this.__dispatch__);

      this.__saveSubscription__(token);

      var data = (0, _store2.default)();

      this.__sync__(modelName, data[modelName]);
    }
  }, {
    key: "__unsubscribe__",
    value: function __unsubscribe__(token) {
      if (token) {
        _observer2.default.unsubscribe(token);
      } else {
        this._tokens.forEach(function (token) {
          _observer2.default.unsubscribe(token);
        });
      }
    }
  }, {
    key: "__saveSubscription__",
    value: function __saveSubscription__(tokens) {
      this._tokens.push(tokens);
    }
  }, {
    key: "__dispatch__",
    value: function __dispatch__(type, data, callback, restore) {
      var props = this.data.props;
      if (restore) {
        props[type] = _extends({}, data);
      } else {
        props[type] = _extends({}, props[type], data);
      }
      this.setData({
        props: props
      }, callback);
    }
  }, {
    key: "__sync__",
    value: function __sync__(type, data) {
      var props = this.data.props;
      props[type] = _extends({}, props[type], data);
      this.setData({
        props: props
      });
    }
  }]);

  return Controller;
}();

exports.default = Controller;