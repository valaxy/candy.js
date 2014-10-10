define(function () {

	Backbone.ViewModel = Backbone.Model.extend({
		// 没有实现
	});


	Backbone.ViewCollection = Backbone.Collection.extend({
		// 没有实现
	});


	// 元素移动
	Backbone.Collection.prototype.move = function (from, to) {
		if (from != to) {
			var remove = this.remove(this.at(from), { silent: true });
			this.add(remove, { silent: true, at: to });
			this.trigger('move', from, to);
		}
		return this;
	};


	Backbone.View.prototype.bindClass = function (property, allValues, $dom) {
		var dom = $dom ? $dom : this.$el;
		dom.addClass(this.model.get(property)); // 默认值
		this.listenTo(this.model, 'change:' + property, function (model, value) {
			for (var index in allValues) {
				dom.removeClass(allValues[index]);
			}
			dom.addClass(value);
		});
	};


	// listen change:<property> and change $dom class
	Backbone.View.prototype.holdClass = function (property, valueEnum) {

	};


	Backbone.View.prototype.listenToChangeWithInit
		= Backbone.Events.listenToChangeWithInit = function (model, property, exec) {
		exec.call(this, model, model.get(property));
		this.listenTo(model, 'change:' + property, exec);
	};


	// listenTo的监听多个事件的版本
	Backbone.Events.listenToMany = Backbone.View.prototype.listenToMany = function (other, events, callback) {
		var me = this;
		events.forEach(function (event) {
			me.listenTo(other, event, callback);
		});
	};

});