// components/comp.js
import { Selector, Module } from "../utils/mpux.js"

class Comp extends Module {
  constructor(props) {
    super(props);
    this.data = {
      abc: 112
    }
  }
}
Selector(["gym"])(Comp);
