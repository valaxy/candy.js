define(function () {

	Object.defineProperty(String.prototype, 'inner', {
		enumerable: false,
		value: function () {
			return this.slice(1, this.length - 1);
		}
	});

	Object.defineProperty(String.prototype, 'extractNumber', {
		enumerable: false,
		value: function () {
			return Number(this.match(/\d+/)[0]);
		}
	});

//
//	// 获取一个长度为length的字符串, 字母表为a-zA-Z
//	Object.defineProperty(String.prototype, 'random', {
//		enumerable: false,
//		value: function (length) {
//			Math.random() *
//		}
//	});

});