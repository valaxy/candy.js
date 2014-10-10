define(function () {

	/**
	 * move a item from old `from` index to new `to` index, rest items adjustfy themselves accorddingly
	 * from: the moved item's index in old array
	 * to:   the moved item's index in new array
	 */
	Object.defineProperty(Array.prototype, 'move', {
		enumerable: false,
		value: function (from, to) {
			if (from != to) {
				var remove = this.splice(from, 1)[0];
				this.splice(to, 0, remove);
			}

			return this;
		}
	});

	/**
	 * repeatly `push()` `item` `count` times
	 */
	Object.defineProperty(Array.prototype, 'pushs', {
		enumerable: false,
		value: function (item, count) {
			for (var i = 0; i < count; i++) {
				this.push(item);
			}
			return this;
		}
	});

});