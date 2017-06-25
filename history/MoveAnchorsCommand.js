var MoveAnchorsCommand = function(targets, offsets) {
	Command.call(this, targets);
	this.offsets = offsets;
};
MoveAnchorsCommand.prototype = Object.create(Command.prototype);
MoveAnchorsCommand.prototype.undo = function() {
	Command.prototype.undo.call(this);
	for (var i = 0; i < this.targets.length; i++) {
		this.targets[i].move(-this.offsets[i].x, -this.offsets[i].y);
	}
};
MoveAnchorsCommand.prototype.redo = function() {
	Command.prototype.redo.call(this);
	for (var i = 0; i < this.targets.length; i++) {
		this.targets[i].move(this.offsets[i].x, this.offsets[i].y);
	}
};