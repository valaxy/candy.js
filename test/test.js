define(function (require, exports) {
	exports.init = function () {
		require('src/iterate')
		require('./map')
	}
})