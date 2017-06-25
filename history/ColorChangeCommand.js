var ColorChangeCommand = function(target, fillBefore, strokeBefore, fillAfter, strokeAfter) {
	Command.call(this, [target]);
	this.fillBefore = fillBefore;
	this.strokeBefore = strokeBefore;
	this.fillAfter = {
		r:fillAfter.r,
		g:fillAfter.g,
		b:fillAfter.b,
		a:fillAfter.a
	};
	this.strokeAfter = {
		r:strokeAfter.r,
		g:strokeAfter.g,
		b:strokeAfter.b,
		a:strokeAfter.a
	};
};
ColorChangeCommand.prototype = Object.create(Command.prototype);
ColorChangeCommand.prototype.undo = function() {
	Command.prototype.undo.call(this);
	for (var i = 0; i < this.targets.length; i++) {
		this.targets[i].setColor(this.fillBefore, this.strokeBefore);
	}
};
ColorChangeCommand.prototype.redo = function() {
	Command.prototype.redo.call(this);
	for (var i = 0; i < this.targets.length; i++) {
		this.targets[i].setColor(this.fillAfter, this.strokeAfter);
	}
};