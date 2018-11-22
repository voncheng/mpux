'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JumpBubble = function () {
	function JumpBubble(canvasNode) {
		var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		var callback = arguments[2];

		_classCallCheck(this, JumpBubble);

		if (!canvasNode || !canvasNode.getContext) {
			console.warn("jumpBuffle，启用失败，canvas传参错误 或 浏览器不支持canvas");
			this.error = true;
			return false;
		}
		var t = this,
		    width = canvasNode.width,
		    height = canvasNode.height;

		var _config = {
			width: 30,
			left: width / 2 - 15,
			top: height - 30,
			alpha: 0.9,
			effect: 'ease',
			speed: 'default',
			max: 30,
			isToAlapha: true,
			diffWidth: 15,
			cavHeight: height,
			cavWidth: width };
		Object.assign(t, {
			canvasInfo: {
				canvas: canvasNode,
				width: width,
				height: height
			},
			config: Object.assign(_config, config),
			ctx: canvasNode.getContext("2d"),
			bubbleArr: [],
			allImg: {
				lists: [],
				doms: [],
				loadState: [] }
		});
		callback && callback(t);
	}

	_createClass(JumpBubble, [{
		key: 'create',
		value: function create(imgsrc, before, after) {
			var t = this,
			    ctx = t.ctx,
			    error = t.error;

			if (!ctx || error) {
				console.warn("jumpBuffle：create时，ctx错误");
				return false;
			}
			var bubbleArr = t.bubbleArr,
			    canvasInfo = t.canvasInfo,
			    _t$config = t.config,
			    imgwidth = _t$config.width,
			    max = _t$config.max;

			t.createImg(imgsrc).then(function (imgNode) {
				var imgInfo = {
					el: imgNode,
					width: imgwidth || imgNode.width,
					height: imgwidth && imgNode.height * (imgwidth / imgNode.width) || imgNode.height
				};
				if (bubbleArr.length > max) {
					return;
				}
				bubbleArr.push(new DrawImg(ctx, imgInfo, t.config));

				before && before(canvasInfo.canvas, imgNode, bubbleArr);
				if (!t.setInter) {
					t.setInterFn(after);
				}
			});
			return this;
		}
	}, {
		key: 'createImg',
		value: function createImg(imgsrc) {
			var _this = this;

			return new Promise(function (res) {
				var _allImg = _this.allImg,
				    lists = _allImg.lists,
				    doms = _allImg.doms,
				    loadState = _allImg.loadState;

				var i = lists.indexOf(imgsrc);
				if (i > -1 && loadState[i]) {
					res(doms[i]);
					return;
				}
				var img = document.createElement('img');
				img.src = imgsrc;
				img.setAttribute('style', 'display:none;');
				document.body.appendChild(img);
				lists.push(imgsrc);
				doms.push(img);
				img.onload = function () {
					loadState.push(true);
					res(img);
				};
			});
		}
	}, {
		key: 'setInterFn',
		value: function setInterFn(after) {
			var t = this,
			    ctx = t.ctx,
			    canvasInfo = t.canvasInfo,
			    width = canvasInfo.width,
			    height = canvasInfo.height;

			t.setInter = setInterval(function () {
				try {
					ctx.clearRect(0, 0, width, height);
					t.bubbleArr = t.bubbleArr.filter(function (val) {
						val.addCtx();
						val.updateCtx();
						if (val.y < 10) {
							after && after();
							return false;
						} else {
							return true;
						}
					});
					if (t.bubbleArr.length === 0) {
						clearInterval(t.setInter);
						t.setInter = null;
						ctx.clearRect(0, 0, width, height);
					}
				} catch (e) {
					console.warn('创建态度气泡出错', e);
					clearInterval(t.setInter);
				}
			}, 25);
		}
	}]);

	return JumpBubble;
}();

exports.default = JumpBubble;

var DrawImg = function () {
	function DrawImg(ctx, imgInfo, _ref) {
		var left = _ref.left,
		    top = _ref.top,
		    alpha = _ref.alpha,
		    speed = _ref.speed,
		    cavWidth = _ref.cavWidth,
		    cavHeight = _ref.cavHeight,
		    effect = _ref.effect,
		    isToAlapha = _ref.isToAlapha,
		    diffWidth = _ref.diffWidth;

		_classCallCheck(this, DrawImg);

		Object.assign(this, {
			whichUnit: null,
			ctx: ctx,
			originWidth: imgInfo.width,
			img: imgInfo.el,
			imgWidth: imgInfo.width - diffWidth,
			imgHeight: imgInfo.height - diffWidth,
			x: left,
			y: top,
			alpha: alpha,
			speed: speed,
			effect: effect,
			isToAlapha: isToAlapha,
			cavWidth: cavWidth,
			oneUnit: cavHeight / 4,
			toRight: Math.random() > 0.5 ? false : true,
			xPx: Math.random() * 2.5,
			yPx: null,
			yPxArr: null,
			diffAlapa: null });
		this.updateCtx = this.updateCtx.bind(this);
		this.effectCommon = this.effectCommon.bind(this);
	}

	_createClass(DrawImg, [{
		key: 'getSpeed',
		value: function getSpeed() {
			var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';

			switch (type) {
				case 'slow':
					return 0.6;
				case 'fast':
					return 1.4;
				default:
					return 1;
			}
		}
	}, {
		key: 'addCtx',
		value: function addCtx() {
			var p = this,
			    ctx = p.ctx;

			ctx.save();
			ctx.globalAlpha = p.alpha;
			ctx.drawImage(p.img, p.x, p.y, p.imgWidth, p.imgHeight);
			ctx.restore();
		}
	}, {
		key: 'setImgWidth',
		value: function setImgWidth() {
			var originWidth = this.originWidth,
			    imgWidth = this.imgWidth;

			if (imgWidth < originWidth) {
				this.imgWidth += 1;
				this.imgHeight += 1;
			}
		}
	}, {
		key: 'setAlapa',
		value: function setAlapa() {
			var p = this,
			    y = p.y,
			    isToAlapha = p.isToAlapha,
			    whichUnit = p.whichUnit;

			if (!isToAlapha) return false;
			var diffAlapa = p.diffAlapa;
			if (whichUnit === 2) {
				if (!diffAlapa) {
					p.diffAlapa = diffAlapa = p.countDiffAlapa();
				}
				if (p.alpha <= diffAlapa) {
					p.alpha = 0;
				} else {
					p.alpha -= diffAlapa;
				}
			}
		}
	}, {
		key: 'countDiffAlapa',
		value: function countDiffAlapa() {
			var alpha = this.alpha,
			    oneUnit = this.oneUnit,
			    yPx = this.yPx;

			return (alpha + 0.1) / (oneUnit / yPx);
		}
	}, {
		key: 'setYpx',
		value: function setYpx() {
			var p = this,
			    y = p.y,
			    oneUnit = p.oneUnit;

			var i = void 0;

			switch (true) {
				case y < oneUnit:
					i = 2;
					break;
				case y > oneUnit && y < oneUnit * 2:
					i = 1;
					break;
				default:
					i = 0;
			}
			if (p.whichUnit !== i) {
				p.yPx = p.yPxArr[i];
				p.whichUnit = i;
			}
			p.y -= p.yPxArr[i];
		}
	}, {
		key: 'setYpxArr',
		value: function setYpxArr() {
			if (this.yPxArr) return false;
			this.yPxArr = this.countYpxArr(this.effect, this.getSpeed(this.speed));
		}
	}, {
		key: 'countYpxArr',
		value: function countYpxArr(effect) {
			var speedNum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

			var basePx = 2;
			var easeArr = [basePx - 0.5, basePx, basePx + 0.5];
			var linearArr = [basePx, basePx, basePx];
			switch (effect) {
				case 'ease':
					return mlt(easeArr);
				case 'linear':
					return mlt(linearArr);
				default:
					return mlt(easeArr);
			}
			function mlt(arr) {
				return arr.map(function (v) {
					return v * speedNum;
				});
			}
		}
	}, {
		key: 'pullback',
		value: function pullback() {
			var p = this,
			    y = p.y,
			    cavWidth = p.cavWidth,
			    xPx = p.xPx,
			    originWidth = p.originWidth;

			switch (true) {
				case p.x + originWidth >= cavWidth:
					p.toRight = false;
					p.x -= xPx;
					break;
				case p.x <= 2:
					p.toRight = true;
					p.x += xPx;
					break;
				case p.toRight:
					p.x += xPx;
					break;
				default:
					p.x -= xPx;
			}
			this.effectCommon();
		}
	}, {
		key: 'effectCommon',
		value: function effectCommon() {
			this.setYpxArr();
			this.setYpx();
			this.setAlapa();
			this.setImgWidth();
		}
	}, {
		key: 'updateCtx',
		value: function updateCtx() {
			this.pullback();
		}
	}]);

	return DrawImg;
}();