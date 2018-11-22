/*
 * Created Date: Friday July 27th 2018 10:34:12 am
 * Author: chengpu
 * -----
 * Last Modified:Friday August 24th 2018 2:41:27 pm
 * Modified By: chengpu
 */

import store from "./store";
import ob from './observer';

export default class Controller {
  constructor({actions, baseActions}) {
    this.actions = actions;
    this.baseActions = baseActions;
    this._tokens = [];
  }
  /**
   * 订阅
   * @param {String} modelName 
   */
  __subscribe__(modelName) {
    // 添加订阅者获得一个订阅号
    const token = ob.subscribe(modelName, this.__dispatch__);
    // 记录一下订阅号
    this.__saveSubscription__(token);
    // 获取仓库数据
    const data = store();
    // 同步最新资讯（通俗易懂）
    this.__sync__(modelName, data[modelName]);
  }
  /**
   * 退订
   * @param {Number} token 
   */
  __unsubscribe__(token) {
    // 如果没有订阅号则退订全部
    if (token) {
      ob.unsubscribe(token);
    } else {
      this._tokens.forEach(token => {
        ob.unsubscribe(token);
      });
    }
  }
  /**
   * 保存订阅号
   * @param {Number} tokens 
   */
  __saveSubscription__(tokens) {
    this._tokens.push(tokens);
  }
  /**
   * 更新状态
   * @param {Object} data 
   */
  __dispatch__(type, data, callback, restore) {
    const props = this.data.props;
    if (restore) {
      props[type] = {
        ...data
      };
    } else {
      props[type] = {
        ...props[type],
        ...data
      };
    }
    this.setData({
      props: props
    }, callback);
  }
  /**
   * 同步数据
   * @param {Object} data 
   */
  __sync__(type, data) {
    const props = this.data.props;
    props[type] = {
      ...props[type],
      ...data
    };
    this.setData({
      props: props
    });
  }
}
