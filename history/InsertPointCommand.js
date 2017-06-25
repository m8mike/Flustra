var InsertPointCommand = function(contour, point, anchor1before, anchor2before, anchor1, anchor2, p3) {
	Command.call(this, [contour]);
	this.point = point;
	this.anchor1before = anchor1before;
	this.anchor2before = anchor2before;
	this.anchor1 = anchor1;
	this.anchor2 = anchor2;
	this.anchor1copy = {x:anchor1.x, y:anchor1.y};
	this.anchor2copy = {x:anchor2.x, y:anchor2.y};
	this.p3 = p3;
};
InsertPointCommand.prototype = Object.create(Command.prototype);
InsertPointCommand.prototype.undo = function() {
	Command.prototype.undo.call(this);
	var contour = this.targets[0];
	var points = contour.points;
	points.splice(this.point.i+1, 1);
	var a1 = points[this.point.i].anchorPoint1;
	var a2;
	if (points.length > this.point.i+1) {
		a2 = points[this.point.i+1].anchorPoint2;
	} else {
		a2 = points[0].anchorPoint2;
	}
	a1.x = this.anchor1before.x;
	a1.y = this.anchor1before.y;
	a2.x = this.anchor2before.x;
	a2.y = this.anchor2before.y;
};
InsertPointCommand.prototype.addPoint = function(points, p, p1, p2, p3) {
	points.splice(p.i + 1, 0, new ContourPoint(p.x, p.y));
	var point = points[p.i + 1];
	point.select();
	point.anchorPoint2.x = p3.x * p.t + p1.x * (1 - p.t);
	point.anchorPoint2.y = p3.y * p.t + p1.y * (1 - p.t);
	point.anchorPoint1.x = p2.x * p.t + p3.x * (1 - p.t);
	point.anchorPoint1.y = p2.y * p.t + p3.y * (1 - p.t);
};
InsertPointCommand.prototype.redo = function() {
	Command.prototype.redo.call(this);
	var contour = this.targets[0];
	var points = contour.points;
	var p = this.point;
	this.addPoint(points, p, this.anchor1copy, this.anchor2copy, this.p3);
	var a1 = points[p.i].anchorPoint1;
	var a2;
	var contour = this.targets[0];
	if (p.i+2 >= points.length && contour.closed) {
		a2 = points[0].anchorPoint2;
	} else {
		a2 = points[p.i + 2].anchorPoint2;
	}
	a1.x = this.anchor1copy.x;
	a1.y = this.anchor1copy.y;
	a2.x = this.anchor2copy.x;
	a2.y = this.anchor2copy.y;
};