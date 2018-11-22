/*
 * Created Date: Friday July 27th 2018 9:47:45 am
 * Author: chengpu
 * -----
 * Last Modified:Friday August 24th 2018 2:41:27 pm
 * Modified By: chengpu
 */

import store, { modelStore } from "./store"
import Controller from "./controller";
import Module from "./module";
import dispatch from './dispatch';
import * as baseActions from './base-actions';

/**
 * 提供一个store给app
 * @param {Object} store 
 */
export default function provider(store) {
  return Target => {
    const ins = new Target(store);
    //获取原型链的属性名
    const p7eNames = Object.getOwnPropertyNames(Target.prototype.__proto__);  
    //获取自有属性名
    const p7yNames = Object.getOwnPropertyNames(ins.__proto__);
    // 合并得到对象拥有的所有方法（包括集成来的和自己扩展的）
    const propertyNames = [...p7eNames, ...p7yNames];
    // 将方法变成成员变量的形式存在
    propertyNames.forEach(name => {
      ins[name] = ins[name];
    });
    // 去掉只读的属性，因为Page函数处理时可能重新赋值
    delete ins.constructor;
    App(ins);
  }
}

/**
 * 绑定装置
 */
export function Selector() {
  /**
   * 获取参数模型或者事件，由于参数不确定所以使用arguments获取
   */
  let args = [].slice.call(arguments);
  let models = [];
  let actions = [];
  let firstParam = args[0];
  if (typeof firstParam === 'object' && !isNaN(firstParam.length)) {
    models = firstParam;
    actions = args[1] ? args[1] : [];
  } else if (typeof firstParam === 'object') {
    actions = firstParam;
  }
  return Target => {
    const ins = new Target({actions: packageActions(actions), baseActions});
    if (Controller.prototype.isPrototypeOf(ins)) {
      //获取原型链的属性名 
      let proto = Target.prototype.__proto__;
      const p7eNames = [];
      while (proto.constructor.name !== Object.name) {
        p7eNames.push(...Object.getOwnPropertyNames(proto));
        proto = proto.__proto__;
      }
      //获取自有属性名
      const p7yNames = Object.getOwnPropertyNames(ins.__proto__);
      // 合并得到对象拥有的所有方法（包括集成来的和自己扩展的）
      const propertyNames = [...p7eNames, ...p7yNames];
      // 将方法变成成员变量的形式存在
      propertyNames.forEach(name => {
        ins[name] = ins[name];
      });
      // 去掉只读的属性，因为Page函数处理时可能重新赋值
      delete ins.constructor;
      // subscribeCenter
      controllerSubscribe(ins, models);
      // 将model注入到page的data中
      modelInject(ins, models);
      // 及时释放内存，防止内存泄露
      models = null;
      actions = null;
      args = null;
      firstParam = null;
      // 注册页面
      return Page(ins);

    } else if (Module.prototype.isPrototypeOf(ins)) {
      const wxProperty = {
        created: true,
        attached: true,
        ready: true,
        moved: true,
        detached: true
      };
      //获取原型链的属性名
      let proto = Target.prototype.__proto__;
      const p7eNames = [];
      while (proto.constructor.name !== Object.name) {
        p7eNames.push(...Object.getOwnPropertyNames(proto));
        proto = proto.__proto__;
      }    
      //获取自有属性名
      const p7yNames = Object.getOwnPropertyNames(ins.__proto__);
      // 合并得到对象拥有的所有方法（包括集成来的和自己扩展的）
      const propertyNames = [...p7eNames, ...p7yNames];      
      // 将方法变成成员变量的形式存在
      propertyNames.forEach(name => {
        if (!wxProperty[name]) {
          ins.methods[name] = ins[name];
        }
      });
      // 去掉只读的属性，因为Page函数处理时可能重新赋值
      delete ins.methods.constructor;
      // subscribeCenter
      moduleSubscribe(ins, models);
      // 将model注入到page的data中
      modelInject(ins, models);
      // 及时释放内存，防止内存泄露
      models = null;
      actions = null;
      args = null;
      firstParam = null;
      // 注册页面
      return Component(ins);
    }
  };
}
/**
 * 控制器添加订阅功能
 * @param {Object} page 
 * @param {Array<Object>} models 
 */
function controllerSubscribe(page, models) {
  const tmpLoadFunc = page.onLoad;
  page.onLoad = function(params) {
    models.forEach(modelName => {
      // 添加订阅者
      this.__subscribe__(modelName);
    });
    // 判断业务层是否重写了onLoad方法，如果重写了该方法则需要主动调用一下
    if (tmpLoadFunc) {
      tmpLoadFunc.call(this, params);
    }
  }
  const tmpUnLoadFunc = page.onUnload;
  page.onUnload = function(params) {
    // 全部退订
    this.__unsubscribe__();
    // 判断业务层是否重写了onLoad方法，如果重写了该方法则需要主动调用一下
    if (tmpUnLoadFunc) {
      tmpUnLoadFunc.call(this, params)
    }
  }
}
/**
 * 模型注入
 * @param {Object} ins 
 * @param {Array<Object>} models 
 */
function modelInject(ins, models) {
  const Models = modelStore();
  const props = {};
  models.forEach(modelName => {
    const Model = Models[modelName];
    props[modelName] = new Model().data;
  });
  ins.data = { ...ins.data, props };
}

/**
 * 组件添加订阅功能
 * @param {Object} module 
 * @param {Array<Object>} models 
 */
function moduleSubscribe(module, models) {
  const tmpLoadFunc = module.attached;
  module.attached = function(params) {
    this.actions = module._actions;
    this._tokens = module._tokens;
    models.forEach(modelName => {
      // 添加订阅者
      this.__subscribe__(modelName);
    });
    // 判断业务层是否重写了onLoad方法，如果重写了该方法则需要主动调用一下
    if (tmpLoadFunc) {
      tmpLoadFunc.call(this, params);
    }
  }
  const tmpUnLoadFunc = module.detached;
  module.detached = function(params) {
    // 全部退订
    this.__unsubscribe__();
    // 判断业务层是否重写了onLoad方法，如果重写了该方法则需要主动调用一下
    if (tmpUnLoadFunc) {
      tmpUnLoadFunc.call(this, params)
    }
  }    
}

/**
 * 打包Action
 * @param {*Map<String,Object>} actions
 */
function packageActions(actionCreators) {
  const newActionCreators = {}
  for (const key in actionCreators) {
    if (actionCreators.hasOwnProperty(key)) {
      const actionCreator = actionCreators[key];
      newActionCreators[key] = (params) => {     
        return new Promise((resolve) => {
          actionCreator(params, action => {           
            const { data } = action;
            dispatch(action, () => {
              resolve(data);
            });
          }, store());
        });
      };
    }
  }
  return newActionCreators;
}

