"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function storeCreate(type) {
  var store = {};
  return {
    custom: function custom(sd) {
      if (sd) {
        for (var key in store) {
          if (store.hasOwnProperty(key)) {
            sd[key] = store[key];
          }
        }
        store = sd;
      };
    },
    default: function _default(model, restore) {
      if (!model) return store;
      if (restore) {
        store[model.namespace] = _extends({}, model.data);
      } else {
        store[model.namespace] = _extends({}, store[model.namespace], model.data);
      }
    }
  };
}
var stores = storeCreate();
var store = stores.default;
var createStoreWithCustomStore = stores.custom;

function modelStoreCreate() {
  var store = {};
  return function (Model) {
    if (!Model) return store;
    store[Model.namespace] = Model;
  };
}
var modelStore = modelStoreCreate();

exports.modelStore = modelStore;
exports.createStoreWithCustomStore = createStoreWithCustomStore;
exports.default = store;