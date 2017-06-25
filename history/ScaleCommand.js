var ScaleCommand = function(targets, center, ratio) {
	Command.call(this, targets);
	this.center = center;
	this.ratio = ratio;
};
ScaleCommand.prototype = Object.create(Command.prototype);
ScaleCommand.prototype.undo = function() {
	Command.prototype.undo.call(this);
	for (var i = 0; i < this.targets.length; i++) {
		this.targets[i].scale(this.center, 1 / this.ratio);
	}
};
ScaleCommand.prototype.redo = function() {
	Command.prototype.redo.call(this);
	for (var i = 0; i < this.targets.length; i++) {
		this.targets[i].scale(this.center, this.ratio);
	}
};