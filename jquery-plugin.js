define(function () {

	// 在parent中所属的位置, 如果没有parent一律返回0
	$.fn.indexOfInParent = function () {
		if (!this.parent()) { // root
			return 0;
		}

		var children = this.parent().children();
		for (var i = 0; i < children.length; i++) {
			// 必须通过dom判断
			if (children[i] == this[0]) { // 有多个元素忽略, 0个元素则报错
				return i;
			}
		}

		throw '请保证父子关系';
	};

	$.fn.switchClass = function (first, second) {
		if (this.hasClass(second)) {
			this.removeClass(second).addClass(first);
		} else {
			this.removeClass(first).addClass(second);
		}
	};


	// if flag addClass else removeClass
	$.fn.editClass = function (className, flag) {
		if (flag) {
			this.addClass(className);
		} else {
			this.removeClass(className);
		}
	};

	$.fn.chooseClass = function (className1, className2, flag) {
		if (flag) {
			this.addClass(className1).removeClass(className2);
		} else {
			this.addClass(className2).removeClass(className1);
		}
	};


	// add class `first`, remove all the other class in rest arguments
	// argument can be string or string array
	$.fn.replaceClass = function (first) {
		for (var i = 1; i < arguments.length; i++) {
			if (typeof arguments[i] == 'string') {
				this.removeClass(arguments[i]);
			} else {
				for (var j = 0; j < arguments[i].length; j++) {
					this.removeClass(arguments[i][j]);
				}
			}
		}
		this.addClass(first);
	};

	$.fn.cleanClass = function (keepClass, removeClasses) {
		for (var i = 0; i < removeClasses.length; i++) {
			this.removeClass(removeClasses[i]);
		}
		this.addClass(keepClass);
	};


	$.fn.deepParent = function (count) {
		var dom = this;
		for (var i = 0; i < count; i++) {
			dom = dom.parent();
		}
		return dom;
	};

	$.fn.getNumberCss = function (key) {
		var css = this.css(key);
		return Number(css.replace(/(\d+).*/, "$1"));
	};

	// insert $dom at position index
	$.fn.insertAt = function ($dom, index) {
		if (typeof index != 'number' || index >= this.children().length) {
			return this.append($dom);
		}
		if (index <= 0) {
			index = 0;
		}
		return $(this.children()[index]).before($dom);
	};


	// @todo
	$.fn.addAtByMaster = function ($dom, index) {
		if (typeof index != 'number' || index == this.children().length) {
			this.append($dom);
		} else {
			$(this.children()[index]).before($dom);
		}
	}

})
;