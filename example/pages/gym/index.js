// pages/gym/index.js
import { plus, minus, effect } from "../../actions/action.js"
require('../../models/gym.m.js');

class Gym extends global.Controller {
  constructor(props) {
    super(props);
    /**
     * 页面的初始数据
     */
    this.data = {
    }
  }
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  }

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  }

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  }

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  }

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    this.baseActions.rollBack("home");
  }

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  }

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  }

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
  effect() {
    this.actions.effect("我已变成猛男!");
    wx.navigateBack();
  }
  puls() {
    this.actions.plus().then((result) => {
      // console.log(result);
    }).catch((err) => {

    });
  }
  minus() {
    this.actions.minus();
  }

}
global.Selector(["gym"], { plus, minus, effect })(Gym);
