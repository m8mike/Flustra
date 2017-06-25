var StrokeChangeCommand = function(targets, strokesBefore, strokeAfter) {
	Command.call(this, targets);
	this.strokesBefore = strokesBefore;
	this.strokeAfter = strokeAfter;
};
StrokeChangeCommand.prototype = Object.create(Command.prototype);
StrokeChangeCommand.prototype.undo = function() {
	Command.prototype.undo.call(this);
	for (var i = 0; i < this.targets.length; i++) {
		this.targets[i].strokeWidth = this.strokesBefore[i];
	}
};
StrokeChangeCommand.prototype.redo = function() {
	Command.prototype.redo.call(this);
	for (var i = 0; i < this.targets.length; i++) {
		this.targets[i].strokeWidth = this.strokeAfter;
	}
};