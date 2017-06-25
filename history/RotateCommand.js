var RotateCommand = function(targets, center, angle) {
	Command.call(this, targets);
	this.center = center;
	this.angle = angle;
};
RotateCommand.prototype = Object.create(Command.prototype);
RotateCommand.prototype.undo = function() {
	Command.prototype.undo.call(this);
	for (var i = 0; i < this.targets.length; i++) {
		this.targets[i].rotate(this.center, -this.angle);
	}
};
RotateCommand.prototype.redo = function() {
	Command.prototype.redo.call(this);
	for (var i = 0; i < this.targets.length; i++) {
		this.targets[i].rotate(this.center, this.angle);
	}
};