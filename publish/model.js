"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modelRegister = modelRegister;

var _store = require("./store");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function Model() {
  _classCallCheck(this, Model);
};

Model.namespace = "Model";
Model.data = {};
exports.default = Model;
;

function modelRegister() {
  var args = [].slice.call(arguments);
  if (args.length > 0) {
    args.forEach(function (Model) {
      (0, _store.modelStore)(Model);

      var model = new Model();
      model.namespace = Model.namespace;
      (0, _store2.default)(model);
    });
  }
  return (0, _store.modelStore)();
}