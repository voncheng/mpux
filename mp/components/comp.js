// components/comp.js
import { Selector, Module } from "../utils/jr-sm/index.js"
import { action } from "../actions/action.js"
require('../models/gym.m.js');

class Comp extends Module {
  constructor(props) {
    super(props);
    this.data = {
      abc: 112
    }
  }
  click() {
    this.actions.action();
  }
}
Selector(["gym"])(Comp);