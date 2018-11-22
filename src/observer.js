/*
 * Created Date: Friday July 27th 2018 7:27:02 pm
 * Author: chengpu
 * -----
 * Last Modified:Friday August 24th 2018 2:41:27 pm
 * Modified By: chengpu
 */

class Observer {
  constructor(){
    this.topics = {}; // 回调函数存放的数组
    this.subUid = -1;
  }
  // 发布方法
  publish(topic, args, callback, restore) {
    if (!this.topics[topic] || this.topics[topic].length === 0) {
        callback && callback();
        return false;
    }     
    var subscribers = this.topics[topic],
        len = subscribers ? subscribers.length : 0;
    while (len--) {
        subscribers[len].func(topic, args, callback, restore);
    }
    return true;
  };
  //订阅方法
  subscribe(topic, func, only) {
      if (!this.topics[topic]) {
          this.topics[topic] = [];
      }
      var token = (++this.subUid).toString();
      if (only) {
        this.topics[topic] = null;
        this.topics[topic]= [{
            token: token,
            func: func
        }]
      } else {
        this.topics[topic].push({
            token: token,
            func: func
        });
      }
      return token;
  };
  //退订方法 TODO：后期可优化 数据结构采用hashMap
  unsubscribe(token) {
    for (var m in this.topics) {
      if (this.topics[m]) {
          for (var i = 0, j = this.topics[m].length; i < j; i++) {
              if (this.topics[m][i].token === token) {
                this.topics[m].splice(i, 1);
                return token;
              }
          }
      }
    }
      return false;
  };
  // 退订真个服务
  unsubscribeTopic(topic) {
    this.topics[topic] = [];
    return false;
  };
}
const ob = new Observer();
const observer = new Observer();
export default ob;
export { observer };
