//index.js

require('../../models/home.m.js');
import { store } from '../../utils/mpux.js';

class Home extends global.Controller {
  constructor(props) {
    super(props);
    this.data = {
      abc: 112
    }
  }
  onShow() {
    super.onShow();
    console.log("Home onShow");
    //发送请求
    this.ajax();
    console.log(store());
  }
  toGym() {
    wx.navigateTo({
      url: '/pages/gym/index',
    })
  }
}
global.Selector(["home", "gym"])(Home);
