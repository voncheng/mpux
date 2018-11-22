//app.js

import Provider, { Application, Controller, Selector } from "./utils/jr-sm/index.js"
import BaseController from "./super/base-vc.js";


//如果不想每个页面都导入jr-sm，可以挂载到global下
global.Controller = BaseController;
global.Application = Application;
global.Provider = Provider;
global.Selector = Selector;

class App extends Application {
  onLaunch() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  }
  globalData = {
    host: "http://10.13.91.14:8081",
    userInfo: null
  }
}
Provider({})(App);
