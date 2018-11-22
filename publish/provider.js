"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = provider;
exports.Selector = Selector;

var _store = require("./store");

var _store2 = _interopRequireDefault(_store);

var _controller = require("./controller");

var _controller2 = _interopRequireDefault(_controller);

var _module = require("./module");

var _module2 = _interopRequireDefault(_module);

var _dispatch = require("./dispatch");

var _dispatch2 = _interopRequireDefault(_dispatch);

var _baseActions = require("./base-actions");

var baseActions = _interopRequireWildcard(_baseActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function provider(store) {
  return function (Target) {
    var ins = new Target(store);

    var p7eNames = Object.getOwnPropertyNames(Target.prototype.__proto__);

    var p7yNames = Object.getOwnPropertyNames(ins.__proto__);

    var propertyNames = [].concat(_toConsumableArray(p7eNames), _toConsumableArray(p7yNames));

    propertyNames.forEach(function (name) {
      ins[name] = ins[name];
    });

    delete ins.constructor;
    App(ins);
  };
}

function Selector() {
  var args = [].slice.call(arguments);
  var models = [];
  var actions = [];
  var firstParam = args[0];
  if ((typeof firstParam === "undefined" ? "undefined" : _typeof(firstParam)) === 'object' && !isNaN(firstParam.length)) {
    models = firstParam;
    actions = args[1] ? args[1] : [];
  } else if ((typeof firstParam === "undefined" ? "undefined" : _typeof(firstParam)) === 'object') {
    actions = firstParam;
  }
  return function (Target) {
    var ins = new Target({ actions: packageActions(actions), baseActions: baseActions });
    if (_controller2.default.prototype.isPrototypeOf(ins)) {
      var proto = Target.prototype.__proto__;
      var p7eNames = [];
      while (proto.constructor.name !== Object.name) {
        p7eNames.push.apply(p7eNames, _toConsumableArray(Object.getOwnPropertyNames(proto)));
        proto = proto.__proto__;
      }

      var p7yNames = Object.getOwnPropertyNames(ins.__proto__);

      var propertyNames = [].concat(p7eNames, _toConsumableArray(p7yNames));

      propertyNames.forEach(function (name) {
        ins[name] = ins[name];
      });

      delete ins.constructor;

      controllerSubscribe(ins, models);

      modelInject(ins, models);

      models = null;
      actions = null;
      args = null;
      firstParam = null;

      return Page(ins);
    } else if (_module2.default.prototype.isPrototypeOf(ins)) {
      var wxProperty = {
        created: true,
        attached: true,
        ready: true,
        moved: true,
        detached: true
      };

      var _proto = Target.prototype.__proto__;
      var _p7eNames = [];
      while (_proto.constructor.name !== Object.name) {
        _p7eNames.push.apply(_p7eNames, _toConsumableArray(Object.getOwnPropertyNames(_proto)));
        _proto = _proto.__proto__;
      }

      var _p7yNames = Object.getOwnPropertyNames(ins.__proto__);

      var _propertyNames = [].concat(_p7eNames, _toConsumableArray(_p7yNames));

      _propertyNames.forEach(function (name) {
        if (!wxProperty[name]) {
          ins.methods[name] = ins[name];
        }
      });

      delete ins.methods.constructor;

      moduleSubscribe(ins, models);

      modelInject(ins, models);

      models = null;
      actions = null;
      args = null;
      firstParam = null;

      return Component(ins);
    }
  };
}

function controllerSubscribe(page, models) {
  var tmpLoadFunc = page.onLoad;
  page.onLoad = function (params) {
    var _this = this;

    models.forEach(function (modelName) {
      _this.__subscribe__(modelName);
    });

    if (tmpLoadFunc) {
      tmpLoadFunc.call(this, params);
    }
  };
  var tmpUnLoadFunc = page.onUnload;
  page.onUnload = function (params) {
    this.__unsubscribe__();

    if (tmpUnLoadFunc) {
      tmpUnLoadFunc.call(this, params);
    }
  };
}

function modelInject(ins, models) {
  var Models = (0, _store.modelStore)();
  var props = {};
  models.forEach(function (modelName) {
    var Model = Models[modelName];
    props[modelName] = new Model().data;
  });
  ins.data = _extends({}, ins.data, { props: props });
}

function moduleSubscribe(module, models) {
  var tmpLoadFunc = module.attached;
  module.attached = function (params) {
    var _this2 = this;

    this.actions = module._actions;
    this._tokens = module._tokens;
    models.forEach(function (modelName) {
      _this2.__subscribe__(modelName);
    });

    if (tmpLoadFunc) {
      tmpLoadFunc.call(this, params);
    }
  };
  var tmpUnLoadFunc = module.detached;
  module.detached = function (params) {
    this.__unsubscribe__();

    if (tmpUnLoadFunc) {
      tmpUnLoadFunc.call(this, params);
    }
  };
}

function packageActions(actionCreators) {
  var newActionCreators = {};
  for (var key in actionCreators) {
    if (actionCreators.hasOwnProperty(key)) {
      (function () {
        var actionCreator = actionCreators[key];
        newActionCreators[key] = function (params) {
          return new Promise(function (resolve) {
            actionCreator(params, function (action) {
              var data = action.data;

              (0, _dispatch2.default)(action, function () {
                resolve(data);
              });
            }, (0, _store2.default)());
          });
        };
      })();
    }
  }
  return newActionCreators;
}