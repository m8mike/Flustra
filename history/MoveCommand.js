var MoveCommand = function(targets, offsetX, offsetY) {
	Command.call(this, targets);
	this.offsetX = offsetX;
	this.offsetY = offsetY;
};
MoveCommand.prototype = Object.create(Command.prototype);
MoveCommand.prototype.undo = function() {
	Command.prototype.undo.call(this);
	for (var i = 0; i < this.targets.length; i++) {
		this.targets[i].move(-this.offsetX, -this.offsetY);
	}
};
MoveCommand.prototype.redo = function() {
	Command.prototype.redo.call(this);
	for (var i = 0; i < this.targets.length; i++) {
		this.targets[i].move(this.offsetX, this.offsetY);
	}
};