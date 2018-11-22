"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Observer = function () {
    function Observer() {
        _classCallCheck(this, Observer);

        this.topics = {};
        this.subUid = -1;
    }

    _createClass(Observer, [{
        key: "publish",
        value: function publish(topic, args, callback, restore) {
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
        }
    }, {
        key: "subscribe",
        value: function subscribe(topic, func, only) {
            if (!this.topics[topic]) {
                this.topics[topic] = [];
            }
            var token = (++this.subUid).toString();
            if (only) {
                this.topics[topic] = null;
                this.topics[topic] = [{
                    token: token,
                    func: func
                }];
            } else {
                this.topics[topic].push({
                    token: token,
                    func: func
                });
            }
            return token;
        }
    }, {
        key: "unsubscribe",
        value: function unsubscribe(token) {
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
        }
    }, {
        key: "unsubscribeTopic",
        value: function unsubscribeTopic(topic) {
            this.topics[topic] = [];
            return false;
        }
    }]);

    return Observer;
}();

var ob = new Observer();
var observer = new Observer();
exports.default = ob;
exports.observer = observer;