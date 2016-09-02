var AddPointTool = function(x, y) {
	Tool.call(this, x, y);
	this.toolName = "Add point";
};
AddPointTool.prototype = Object.create(Tool.prototype);
AddPointTool.prototype.onClicked = function() {
	var contour = contourManager.contour;
	if (!contour) {
		return null;
	}
	var lut = contour.getLUT();
	if (!lut.length) {
		return null;
	}
	var p = this.findClosest(lut);
	var p0 = contour.points[p.i];
	var p1 = contour.points[p.i].anchorPoint1;
	var p2, p3;
	if (p.i === contour.points.length - 1 && contour.closed) {
		p2 = contour.points[0].anchorPoint2;
		p3 = contour.points[0];
	} else {
		p2 = contour.points[p.i + 1].anchorPoint2;
		p3 = contour.points[p.i + 1];
	}
	var p3x = p2.x * p.t + p1.x * (1 - p.t);
	var p3y = p2.y * p.t + p1.y * (1 - p.t);
	p1.x = p1.x * p.t + p0.x * (1 - p.t);
	p1.y = p1.y * p.t + p0.y * (1 - p.t);
	p2.x = p3.x * p.t + p2.x * (1 - p.t);
	p2.y = p3.y * p.t + p2.y * (1 - p.t);
	contour.points.splice(p.i + 1, 0, new ContourPoint(p.x, p.y));
	var point = contour.points[p.i + 1];
	point.anchorPoint2.x = p3x * p.t + p1.x * (1 - p.t);
	point.anchorPoint2.y = p3y * p.t + p1.y * (1 - p.t);
	point.anchorPoint1.x = p2.x * p.t + p3x * (1 - p.t);
	point.anchorPoint1.y = p2.y * p.t + p3y * (1 - p.t);
};
AddPointTool.prototype.onPressed = function() {
	Tool.prototype.onPressed.call(this);
};
AddPointTool.prototype.onReleased = function() {
	Tool.prototype.onReleased.call(this);
};
AddPointTool.prototype.findClosest = function(LUT) {
	if (!LUT.length) {
		return null;
	}
	var p = {x:getMouseX(), y:getMouseY()};
    var d,
        dd = dist(LUT[0].x, LUT[0].y, p.x, p.y),
        f = 0, ff = 0;
    for (var i = 1; i < LUT.length; i++) {
		d = dist(LUT[i].x, LUT[i].y, p.x, p.y);
		if (d < dd) {
			f = i;
			ff = LUT[i].t;
			dd = d;
		}
    }
	ellipse(1 / nav.camera.scaleRatio * LUT[f].x + nav.camera.x, 
			1 / nav.camera.scaleRatio * LUT[f].y + nav.camera.y, 10, 10);
	var point = {};
	point.x = LUT[f].x;
	point.y = LUT[f].y;
	point.t = ff/99;
	point.i = LUT[f].i;
    return point;
};
AddPointTool.prototype.update = function() {
	Tool.prototype.update.call(this);
	var contour = contourManager.contour;
	if (!contour) {
		return null;
	}
	var lut = contour.getLUT();
	if (!lut.length) {
		return null;
	}
	var p = this.findClosest(lut);
};
AddPointTool.prototype.draw = function() {
	Tool.prototype.draw.call(this);
	var x = this.x + 5;
	var y = this.y + 5;
	pushMatrix();
	translate(x+2, y+1);
	scale(1.3, 1.3);
	noStroke();
	fill(255, 255, 255);
	rect(-1, 1, 6, 2);
	rect(1, -1, 2, 6);
	stroke(0, 0, 0);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
	// pen/
	ctx.strokeStyle = '#000000';
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(0.6, 13.7);
	ctx.lineTo(3.2, 6.1);
	ctx.lineTo(7.9, 3.9);
	ctx.lineTo(7.6, 2.7);
	ctx.lineTo(9.3, 1.4);
	ctx.lineTo(14.0, 5.8);
	ctx.lineTo(12.1, 7.6);
	ctx.lineTo(11.3, 7.2);
	ctx.lineTo(8.9, 11.6);
	ctx.lineTo(1.6, 14.7);
	ctx.lineTo(0.6, 13.7);
	ctx.closePath();
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.fill();
	ctx.stroke();

	// pen/
	ctx.beginPath();
	ctx.moveTo(1.1, 14.2);
	ctx.lineTo(5.7, 9.6);
	ctx.stroke();

	// pen/
	ctx.beginPath();
	ctx.moveTo(7.3, 9.0);
	ctx.bezierCurveTo(7.3, 9.6, 6.8, 10.0, 6.3, 10.0);
	ctx.bezierCurveTo(5.7, 10.0, 5.3, 9.6, 5.3, 9.0);
	ctx.bezierCurveTo(5.3, 8.4, 5.7, 8.0, 6.3, 8.0);
	ctx.bezierCurveTo(6.8, 8.0, 7.3, 8.4, 7.3, 9.0);
	ctx.closePath();
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.fill();

	// pen/
	ctx.beginPath();
	ctx.moveTo(7.9, 3.9);
	ctx.lineTo(11.3, 7.2);
	ctx.stroke();
	ctx.restore();
	popMatrix();
};