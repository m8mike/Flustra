var CloseContourCommand = function(contour) {
	Command.call(this, [contour]);
};
CloseContourCommand.prototype = Object.create(Command.prototype);
CloseContourCommand.prototype.undo = function() {
	Command.prototype.undo.call(this);
	var contour = this.targets[0];
	contour.closed = false;
};
CloseContourCommand.prototype.redo = function() {
	Command.prototype.redo.call(this);
	var contour = this.targets[0];
	contour.closed = true;
};