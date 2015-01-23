define(function (require) {
	var map = require('src/map')

	module('map')

	test('changeValue()', function (assert) {
		var o = {
			a: 1,
			b: 2,
			c: 3
		}
		var o2 = map.changeValue(o, function (key, value) {
			return value * value
		})
		assert.deepEqual(o2, {
			a: 1,
			b: 4,
			c: 9
		})
	})
})