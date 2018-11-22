/*
 * Created Date: Monday July 30th 2018 4:07:28 pm
 * Author: chengpu
 * -----
 * Last Modified:Wednesday August 22nd 2018 4:35:00 pm
 * Modified By: chengpu
 */
import { createStoreWithCustomStore } from "./store";

export default class Application {
  constructor(store) {
    this.store = store;
    createStoreWithCustomStore(store);
  }
}
