// components/comp.js
import { Selector, Module } from "../utils/mpux.js"
import { action } from "../actions/action.js"
require('../models/gym.m.js');

class Comp extends Module {
  constructor(props) {
    super(props);
    this.data = {
      abc: 112
    }
  }
}
Selector(["gym"])(Comp);