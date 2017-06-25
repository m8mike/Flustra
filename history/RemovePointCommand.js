var RemovePointCommand = function(contour, point, id) {
	Command.call(this, [contour]);
	this.point = point;
	this.id = id;
};
RemovePointCommand.prototype = Object.create(Command.prototype);
RemovePointCommand.prototype.undo = function() {
	Command.prototype.undo.call(this);
	var contour = this.targets[0];
	var points = contour.points;
	var point = this.point;
	points.splice(this.id, 0, point);
};
RemovePointCommand.prototype.redo = function() {
	Command.prototype.redo.call(this);
	var contour = this.targets[0];
	var points = contour.points;
	var point = this.point;
	points.splice(this.id, 1);
};