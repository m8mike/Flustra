var Contour = function() {
    this.points = [];
    this.closed = false;
	this.fillColor = colorSelect.fillColor;
	this.strokeColor = colorSelect.strokeColor;
	this.fillEnabled = colorSelect.fillEnabled;
	this.strokeEnabled = colorSelect.strokeEnabled;
	this.strokeWidth = 5;
	this.active = true;
	this.visible = true;
};
Contour.prototype.clone = function() {
	var contour = new Contour();
	for (var i = 0; i < this.points.length; i++) {
		contour.points.push(new ContourPoint(this.points[i].x, this.points[i].y));
		contour.points[i].anchorPoint1.x = this.points[i].anchorPoint1.x;
		contour.points[i].anchorPoint1.y = this.points[i].anchorPoint1.y;
		contour.points[i].anchorPoint2.x = this.points[i].anchorPoint2.x;
		contour.points[i].anchorPoint2.y = this.points[i].anchorPoint2.y;
	}
	contour.closed = this.closed;
	contour.setColor(this.fillColor, this.strokeColor);
	contour.fillEnabled = this.fillEnabled;
	contour.strokeEnabled = this.strokeEnabled;
	contour.strokeWidth = this.strokeWidth;
	contour.active = false;
	contour.visible = true;
	return contour;
};
Contour.prototype.setColor = function(f, s) {
	this.fillColor = {r:f.r, g:f.g, b:f.b, a:f.a};
	this.strokeColor = {r:s.r, g:s.g, b:s.b, a:s.a};
};
Contour.prototype.fixColor = function() {
	this.setColor(this.fillColor, this.strokeColor);
};
Contour.prototype.add = function(x, y) {
    this.points.push(new ContourPoint(x, y));
    for (var i = 0; i < this.points.length - 1; i++) {
        this.points[i].anchorPoint1.visible = false;
        this.points[i].anchorPoint2.visible = false;
    }
    if (this.points.length > 1) {
        this.points[this.points.length - 2].anchorPoint1.visible = true;
    }
    this.points[this.points.length - 1].anchorPoint1.visible = true;
    this.points[this.points.length - 1].anchorPoint2.visible = true;
};
Contour.prototype.draw = function() {
	if (this.visible) {
		this.drawContent();
	} else {
		return null;
	}
	/*if (this.active) {
		this.drawHandlers();
	}*/
};
Contour.prototype.isPointInContour = function(x, y) {
	if (!this.points.length) {
		return false;
	}
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(this.points[0].x, this.points[0].y);
    for (var i = 0; i < this.points.length - 1; i++) {
		ctx.bezierCurveTo(this.points[i].anchorPoint1.x, this.points[i].anchorPoint1.y, 
					this.points[i+1].anchorPoint2.x, this.points[i+1].anchorPoint2.y, 
					this.points[i+1].x, this.points[i+1].y);
	}
	if (this.closed) {
		var last = this.points.length - 1;
        ctx.bezierCurveTo(this.points[last].anchorPoint1.x, this.points[last].anchorPoint1.y, 
            this.points[0].anchorPoint2.x, this.points[0].anchorPoint2.y, 
            this.points[0].x, this.points[0].y);
	}
	ctx.closePath();
	return ctx.isPointInPath(x, y);
};
Contour.prototype.drawContour = function() {
	if (!this.points.length) {
		return null;
	}
    beginShape();
	vertex(this.points[0].x, this.points[0].y);
    for (var i = 0; i < this.points.length; i++) {
        if (i + 1 !== this.points.length) {
            bezierVertex(this.points[i].anchorPoint1.x, this.points[i].anchorPoint1.y, 
                this.points[i+1].anchorPoint2.x, this.points[i+1].anchorPoint2.y, 
                this.points[i+1].x, this.points[i+1].y);
        }
    }
    if (this.closed) {
        var last = this.points.length - 1;
        bezierVertex(this.points[last].anchorPoint1.x, this.points[last].anchorPoint1.y, 
            this.points[0].anchorPoint2.x, this.points[0].anchorPoint2.y, 
            this.points[0].x, this.points[0].y);
    }
    endShape();
};
Contour.prototype.drawContent = function() {
	if (this.fillColor && this.fillEnabled) {
		fill(color(this.fillColor.r, this.fillColor.g, this.fillColor.b, this.fillColor.a));
	} else {
		noFill();
	}
	if (this.strokeColor && this.strokeEnabled) {
		stroke(color(this.strokeColor.r, this.strokeColor.g, this.strokeColor.b, this.strokeColor.a));
		strokeWeight(this.strokeWidth);
	} else {
		noStroke();
	}
    this.drawContour();
	strokeWeight(1);
	stroke(0, 0, 0);
};
Contour.prototype.drawHandlers = function() {
    if (!this.points.length) {
        return null;
    }
    noFill();
	stroke(0, 0, 0);//TODO: change to a layer color
	strokeWeight(1);
    this.drawContour();
    for (var i = 0; i < this.points.length; i++) {
        this.points[i].draw();
    }
};
//Generates a LookUp Table of coordinates on the curve
Contour.prototype.getLUT = function() {
	var LUT = [];
	if (this.points.length <= 1) {
		return LUT;
	}
	var steps = 100;
	for (var j = 0; j < this.points.length - 1; j++) {
		var p1 = this.points[j];
		var p2 = this.points[j].anchorPoint1;
		var p3 = this.points[j+1].anchorPoint2;
		var p4 = this.points[j+1];
		for (var i = 1; i < steps; i++) {
			var t = i / steps;
			var x = bezierPoint(p1.x, p2.x, p3.x, p4.x, t);
			var y = bezierPoint(p1.y, p2.y, p3.y, p4.y, t);
			LUT.push({x:x, y:y, i:j, t:i});
		}
	}
	if (this.closed) {
		var p1 = this.points[this.points.length - 1];
		var p2 = this.points[this.points.length - 1].anchorPoint1;
		var p3 = this.points[0].anchorPoint2;
		var p4 = this.points[0];
		for (var i = 1; i < steps; i++) {
			var t = i / steps;
			var x = bezierPoint(p1.x, p2.x, p3.x, p4.x, t);
			var y = bezierPoint(p1.y, p2.y, p3.y, p4.y, t);
			LUT.push({x:x, y:y, i:this.points.length - 1, t:i});
		}
	}
	return LUT;
};
Contour.prototype.getLastPoint = function() {
    if (this.points.length <= 0) {
        return null;
    }
    return this.points[this.points.length - 1];
};
Contour.prototype.isMoving = function() {
    if (this.points.length > 0) {
        return this.points[this.points.length - 1].movingStarted;
    }
    return false;
};
Contour.prototype.setMoving = function(moving) {
	if (!this.points.length) {
		return null;
	}
    this.points[this.points.length - 1].movingStarted = moving;
};
Contour.prototype.updateAnchors = function(x, y) {
	if (!this.points.length) {
		return null;
	}
    this.points[this.points.length - 1].updateAnchors(x, y);
};