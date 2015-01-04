define(function (require, exports) {

	/**
	 * iterate a array
	 * @param options
	 *      - array: <Array> the iterate array
	 *      - invoke: <Function> the iterate body, return a not undefined value means break
	 *          - element: the array element
	 *          - i: the index of the element
	 *      - [break]: <Function> execute when break the iterate
	 *          - element: the element when break
	 *          - i: the index when break
	 *      - [done]: <Function> execute when not break, empty parameter
	 *      - [context]: change this
	 * @return return break() or done() if has or return nothing if has none
	 */
	exports.array = function (options) {
		var array = options.array
		var invoke = options.invoke
		var _break = options.break
		var done = options.done
		var context = options.context ? options.context : this
		var isBreak = false;
		for (var i = 0; i < array.length; i++) {
			if (typeof invoke.call(context, array[i], i) != 'undefined') {
				isBreak = true
				break
			}
		}
		if (isBreak) {
			return _break ? _break.call(context, array[i], i) : undefined
		} else {
			return done ? done.call(context) : undefined
		}
	}


	/**
	 * a object for-in iterate
	 * @param options
	 */
	exports.object = function (options) {
		var obj = options.object
		var invoke = options.invoke
		var _break = options.break
		var done = options.done
		var context = options.context ? options.context : this
		var isBreak = false
		for (var key in obj) {
			if (typeof invoke.call(context, key, obj[key]) != 'undefined') {
				isBreak = true
				break
			}
		}
		if (isBreak) {
			return _break ? _break.call(context, key, obj[key]) : undefined
		} else {
			return done ? done.call(context) : undefined
		}
	}

	exports.objectPassFirst = function () {

	}


	if (typeof QUnit != 'undefined') {
		QUnit.module('iterate-arary')

		QUnit.test('a basic example', function (assert) {
			var a = [0, 1, 2, 3] // 0 1 4 9
			var s = 0
			exports.array({
				array: a,
				invoke: function (x, i) {
					s += x * i
				}
			})

			assert.equal(s, 14)
		})

		QUnit.test('break', function (assert) {
			var a = [0, 1, 2, 3]
			var s = 0
			var result = exports.array({
				array: a,
				invoke: function (x, i) {
					if (i == 2) {
						return null // break
					}
					s += x
				},
				break: function () {
					return s += 100
				},
				done: function () {
					return s -= 100
				}
			})

			assert.equal(101, result)
		})

		QUnit.test('done(not break)', function (assert) {
			var a = [0, 1, 2, 3]
			var s = 0
			var result = exports.array({
				array: a,
				invoke: function (x) {
					s += x
				},
				break: function () {
					return s -= 100
				},
				done: function () {
					return s += 100
				}
			})

			assert.equal(106, result)
		})

		QUnit.test('context', function (assert) {
			var a = [0, 1]
			var context = {}
			exports.array({
				array: a,
				invoke: function () {
					assert.deepEqual(this, context)
				},
				done: function () {
					assert.deepEqual(this, context)
				},
				context: context
			})
		})

		QUnit.module('iterate-object')

		QUnit.test('a basic example', function (assert) {
			var o = {
				a: 1,
				b: 2,
				c: 3
			}
			var sum = 0
			var str = ''
			exports.object({
				object: o,
				invoke: function (key, value) {
					str += key
					sum += value
				}
			})

			assert.equal(str, 'abc')
			assert.equal(sum, 6)
		})
	}


})