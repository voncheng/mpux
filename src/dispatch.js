/*
 * Created Date: Friday July 27th 2018 1:07:37 pm
 * Author: chengpu
 * -----
 * Last Modified:Friday August 24th 2018 2:41:27 pm
 * Modified By: chengpu
 */
import store from './store';
import ob from "./observer";

export default function dispatch(action, callback, restore){
  const { type, data } = action;
  store({namespace: type, data}, restore);  
  // 广播最新资讯
  ob.publish(type, data, callback, restore);
}
