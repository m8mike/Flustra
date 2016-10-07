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
    for (var i = 0; i < this.points.length-1; i++) {
		bezierVertex(this.points[i].anchorPoint1.x, this.points[i].anchorPoint1.y, 
			this.points[i+1].anchorPoint2.x, this.points[i+1].anchorPoint2.y, 
			this.points[i+1].x, this.points[i+1].y);
    }
    if (this.closed) {
        var last = this.points.length - 1;
        bezierVertex(this.points[last].anchorPoint1.x, this.points[last].anchorPoint1.y, 
            this.points[0].anchorPoint2.x, this.points[0].anchorPoint2.y, 
            this.points[0].x, this.points[0].y);
    }
    endShape();
	if (this.ts) {
		var minX=Infinity, minY=Infinity, maxX=-Infinity, maxY=-Infinity;
		for (var i = 0; i < this.ts.length; i++) {
			if (this.ts[i].x < minX) {
				minX = this.ts[i].x;
			}
			if (this.ts[i].y < minY) {
				minY = this.ts[i].y;
			}
			if (this.ts[i].x > maxX) {
				maxX = this.ts[i].x;
			}
			if (this.ts[i].y > maxY) {
				maxY = this.ts[i].y;
			}
			/*stroke(this.ts[i].col);
			fill(this.ts[i].col);
			ellipse(this.ts[i].x, this.ts[i].y, 10, 10);
			stroke(0,0,0);*/
		}
		noFill();
		stroke(0,0,0);
		strokeWeight(1);
		rect(minX, minY, maxX-minX, maxY-minY);
		fill(0,0,0);
	}
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
Contour.prototype.drawBoundingBox = function() {
    noFill();
	stroke(0, 0, 0);//TODO: change to a layer color
	strokeWeight(1);
	var minX, maxX, minY, maxY;
	for (var i = 0; i < this.points.length-1; i++) {
		this.ts = [];
		var a = this.points[i];
		var b = this.points[i].anchorPoint1;
		var c = this.points[i+1].anchorPoint2;
		var d  = this.points[i+1];
		var a1 = {x:3*(b.x-a.x), y:3*(b.y-a.y)};
		var b1 = {x:3*(c.x-b.x), y:3*(c.y-b.y)};
		var c1 = {x:3*(d.x-c.x), y:3*(d.y-c.y)};
		var v1 = {x:3*(-a.x+3*b.x-3*c.x+d.x), y:3*(-a.y+3*b.y-3*c.y+d.y)};
		var v2 = {x:6*(a.x-2*b.x+c.x), y:6*(a.y-2*b.y+c.y)};
		var v3 = {x:3*(b.x-a.x), y:3*(b.y-a.y)};
		var ts = [];
		var t1x = (-v2.x + Math.sqrt(v2.x*v2.x-4*v1.x*v3.x))/(2*v1.x);
		var t2x = (-v2.x - Math.sqrt(v2.x*v2.x-4*v1.x*v3.x))/(2*v1.x);
		var t1y = (-v2.y + Math.sqrt(v2.y*v2.y-4*v1.y*v3.y))/(2*v1.y);
		var t2y = (-v2.y - Math.sqrt(v2.y*v2.y-4*v1.y*v3.y))/(2*v1.y);
		if (t1x > 0 && t1x < 1) {
			ts.push(t1x);
		}
		if (t2x > 0 && t2x < 1) {
			ts.push(t2x);
		}
		if (t1y > 0 && t1y < 1) {
			ts.push(t1y);
		}
		if (t2y > 0 && t2y < 1) {
			ts.push(t2y);
		}
		ts.push(0);
		ts.push(1);
		var getBezier = function(t, p1, p2, p3, p4) {
			var t2 = t * t;
			var t3 = t2 * t;
			var mt = 1-t;
			var mt2 = mt * mt;
			var mt3 = mt2 * mt;
			return p1*mt3 + p2*3*mt2*t + p3*3*mt*t2 + p4*t3;
		};
		for (var k = 0; k < ts.length; k++) {
			var xx = getBezier(ts[k],a.x,b.x,c.x,d.x);
			var yy = getBezier(ts[k],a.y,b.y,c.y,d.y);
			this.ts.push({x:xx, y:yy, col:color(255,0,0)});
		}
	}
};
Contour.prototype.drawHandlers = function(withPoints) {
    if (!this.points.length) {
        return null;
    }
    noFill();
	stroke(0, 0, 0);//TODO: change to a layer color
	strokeWeight(1);
    this.drawContour();
	if (!withPoints) {
		return null;
	}
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