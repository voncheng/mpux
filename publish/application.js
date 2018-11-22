"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _store = require("./store");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Application = function Application(store) {
  _classCallCheck(this, Application);

  this.store = store;
  (0, _store.createStoreWithCustomStore)(store);
};

exports.default = Application;