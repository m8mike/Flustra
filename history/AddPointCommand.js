var AddPointCommand = function(contour) {
	Command.call(this, [contour]);
	this.point = contour.points[contour.points.length - 1];
	this.id = contour.points.length - 1;
};
AddPointCommand.prototype = Object.create(Command.prototype);
AddPointCommand.prototype.undo = function() {
	Command.prototype.undo.call(this);
	var contour = this.targets[0];
	var points = contour.points;
	var point = this.point;
	points.splice(points.indexOf(point), 1);
};
AddPointCommand.prototype.redo = function() {
	Command.prototype.redo.call(this);
	var contour = this.targets[0];
	var points = contour.points;
	var point = this.point;
	points.splice(this.id, 0, point);
};