/*
 * Created Date: Monday September 10th 2018 7:58:02 pm
 * Author: chengpu
 * -----
 * Last Modified:Monday September 10th 2018 7:58:02 pm
 * Modified By: chengpu
 */
import { modelStore } from './store';
import dispatch from './dispatch';

export function rollBack(name) {
  return new Promise(function (resolve) {
    const Model = modelStore()[name];
    dispatch({
      type: name,
      data: {
        ...new Model().data
      }
    }, resolve, true);
  })
}
