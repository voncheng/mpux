/*
 * Created Date: Friday July 27th 2018 10:43:09 am
 * Author: chengpu
 * -----
 * Last Modified:Friday August 24th 2018 2:41:27 pm
 * Modified By: chengpu
 */

import store, { modelStore } from './store';
export default class Model {
  static namespace="Model" // 必须唯一 与文件名相同
  static data={}
};

export function modelRegister() {  
  const args = [].slice.call(arguments);
  if (args.length > 0) {
    args.forEach(Model => {
      // 存储模型
      modelStore(Model);
      // 存储数据
      const model = new Model();
      model.namespace = Model.namespace;
      store(model);
    });
  }
  return modelStore()
}
