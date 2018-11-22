export function effect(params, put) {
  setTimeout(function () {
    put({
      type: 'home',
      data: {
        message: params,
        goods: [{},{}]
      }
    });
  });
}
export function plus(params, put, store) {
  setTimeout(function () {
    put({
      type: 'gym',
      data: {
        count: store.gym.count + 1,
      }
    });
  }, 2000);
}
export function minus(params, put, store) {
  put({
    type: 'gym',
    data: {
      count: store.gym.count - 1,
    }
  });
}
