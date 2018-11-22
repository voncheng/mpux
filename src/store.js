/*
 * Created Date: Friday July 27th 2018 10:15:23 am
 * Author: chengpu
 * -----
 * Last Modified:Friday August 24th 2018 2:41:27 pm
 * Modified By: chengpu
 */

function storeCreate(type) {
  let store = {};
  return {
    custom(sd) {
      if (sd) {
        for (const key in store) {
          if (store.hasOwnProperty(key)) {
            sd[key] = store[key];
          }
        }
        store = sd;
      };
    },
    default(model, restore) {
      if (!model) return store;
      if (restore) {
        store[model.namespace] = { 
          ...model.data
        };
      } else {
        store[model.namespace] = { 
          ...store[model.namespace],
          ...model.data
      };
      }
      
    }
  }
}
const stores = storeCreate();
const store = stores.default;
const createStoreWithCustomStore = stores.custom;

function modelStoreCreate() {
  const store = {};
  return (Model) => {
    if (!Model) return store;
    store[Model.namespace] = Model;
  };
}
const modelStore = modelStoreCreate();

export {modelStore, createStoreWithCustomStore, store as default};
