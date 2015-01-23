define(function (require, exports) {

	exports.changeValue = function (obj, invoke) {
		var otherObj = {}
		for (var key in obj) {
			otherObj[key] = invoke(key, obj[key])
		}
		return otherObj
	}

})