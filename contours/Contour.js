var Contour = function() {
    this.points = [];
    this.closed = false;
	this.fillColor = colorSelect.fillColor;
	this.strokeColor = colorSelect.strokeColor;
	this.fillEnabled = colorSelect.fillEnabled;
	this.strokeEnabled = colorSelect.strokeEnabled;
	this.strokeWidth = colorSelect.strokeWidth;
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
Contour.prototype.isRectangleIntersectsContour = function(rect) {
	if (!this.points.length) {
		return false;
	}
	var accept = function(t) {
		return 0<=t && t <=1;
	}
	var cuberoot = function(x) {
		return Math.pow(x, 1/3);
	};
	var getCubicRoots = function(pa, pb, pc, pd) {
		var d = (-pa + 3*pb - 3*pc + pd),
			a = (3*pa - 6*pb + 3*pc) / d,
			b = (-3*pa + 3*pb) / d,
			c = pa / d;
		var p = (3*b - a*a)/3,
			p3 = p/3,
			q = (2*a*a*a - 9*a*b + 27*c)/27,
			q2 = q/2,
			discriminant = q2*q2 + p3*p3*p3;
		// and some variables we're going to use later on:
		var u1,v1,root1,root2,root3;
		// three possible real roots:
		if (discriminant < 0) {
			var mp3  = -p/3,
				mp33 = mp3*mp3*mp3,
				r    = Math.sqrt( mp33 ),
				t    = -q / (2*r),
				cosphi = t < -1 ? -1 : t > 1 ? 1 : t,
				phi  = Math.acos(cosphi);
			var crtr = cuberoot(r),
				t1   = 2 * crtr;
			root1 = t1 * Math.cos(phi / 3) - a / 3;
			root2 = t1 * Math.cos((phi + 2 * PI) / 3) - a / 3;
			root3 = t1 * Math.cos((phi + 4 * PI) / 3) - a / 3;
			return [root1, root2, root3].filter(accept);
		}
		// three real roots, but two of them are equal:
		else if (discriminant === 0) {
			u1 = q2 < 0 ? cuberoot(-q2) : -cuberoot(q2);
			root1 = 2*u1 - a/3;
			root2 = -u1 - a/3;
			return [root1, root2].filter(accept);
		}
		// one real root, two complex roots
		else {
			var sd = Math.sqrt(discriminant);
			u1 = cuberoot(sd - q2);
			v1 = cuberoot(sd + q2);
			root1 = u1 - v1 - a/3;
			return [root1].filter(accept);
		}
	};
	//TODO: add offsets (2 points of rectangle) to each p, check intersection
	var checkPart = function(i, points, rect, offset) {
		var p1, p2, p3, p4;
		if (i == -1) {
			var l = points.length - 1;
			p1 = {x:points[l].x-offset.x, y:points[l].y-offset.y};
			p2 = {x:points[l].anchorPoint1.x - offset.x, y:points[l].anchorPoint1.y - offset.y};
			p3 = {x:points[0].anchorPoint2.x - offset.x, y:points[0].anchorPoint2.y - offset.y};
			p4  = {x:points[0].x - offset.x, y:points[0].y - offset.y};
		} else {
			p1 = {x:points[i].x-offset.x, y:points[i].y-offset.y};
			p2 = {x:points[i].anchorPoint1.x - offset.x, y:points[i].anchorPoint1.y - offset.y};
			p3 = {x:points[i+1].anchorPoint2.x - offset.x, y:points[i+1].anchorPoint2.y - offset.y};
			p4  = {x:points[i+1].x - offset.x, y:points[i+1].y - offset.y};
		}
		var rootsX = getCubicRoots(p1.x, p2.x, p3.x, p4.x);
		var rootsY = getCubicRoots(p1.y, p2.y, p3.y, p4.y);
		p1.x += offset.x;
		p2.x += offset.x;
		p3.x += offset.x;
		p4.x += offset.x;
		p1.y += offset.y;
		p2.y += offset.y;
		p3.y += offset.y;
		p4.y += offset.y;
		for (var i = 0; i < rootsX.length; i++) {
			var bp1x = bezierPoint(p1.x, p2.x, p3.x, p4.x, rootsX[i]);
			var bp1y = bezierPoint(p1.y, p2.y, p3.y, p4.y, rootsX[i]);
			if (bp1x >= rect.x && bp1x <= rect.x + rect.w &&
				bp1y >= rect.y && bp1y <= rect.y + rect.h) {
				return true;
			}
		}
		for (var i = 0; i < rootsY.length; i++) {
			var bp1x = bezierPoint(p1.x, p2.x, p3.x, p4.x, rootsY[i]);
			var bp1y = bezierPoint(p1.y, p2.y, p3.y, p4.y, rootsY[i]);
			if (bp1x >= rect.x && bp1x <= rect.x + rect.w &&
				bp1y >= rect.y && bp1y <= rect.y + rect.h) {
				return true;
			}
		}
		return false;
	};
    for (var i = 0; i < this.points.length - 1; i++) {
		var check1 = checkPart(i, this.points, rect, {x:rect.x, y:rect.y});
		var check2 = checkPart(i, this.points, rect, {x:rect.x+rect.w, y:rect.y+rect.h});
		if (check1 || check2) {
			return true;
		}
	}
	if (this.closed) {
		var check1 = checkPart(-1, this.points, rect, {x:rect.x, y:rect.y});
		var check2 = checkPart(-1, this.points, rect, {x:rect.x+rect.w, y:rect.y+rect.h});
		if (check1 || check2) {
			return true;
		}
	}
	return false;
	
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
Contour.prototype.logProcessing = function() {
	if (!this.points.length) {
		return null;
	}
	var points = this.points;
	if (this.fillColor && this.fillEnabled) {
		console.log("fill(color(" + this.fillColor.r + ", " + 
								this.fillColor.g + ", " + 
								this.fillColor.b + ", " +
								this.fillColor.a + "));");
	} else {
		console.log("noFill();");
	}
	if (this.strokeColor && this.strokeEnabled) {
		console.log("stroke(color(" + this.strokeColor.r + ", " +
								  this.strokeColor.g + ", " +
								  this.strokeColor.b + ", " +
								  this.strokeColor.a + "));");
		console.log("strokeWeight(" + this.strokeWidth + ");");
	} else {
		console.log("noStroke();");
	}
	console.log("beginShape();");
	console.log("vertex(" + points[0].x.toFixed(2) + ", " + points[0].y.toFixed(2) + ");");
	for (var i = 0; i < points.length-1; i++) {
		console.log("bezierVertex(" + points[i].anchorPoint1.x.toFixed(2) + ", " + 
								  points[i].anchorPoint1.y.toFixed(2) + ", " + 
								  points[i+1].anchorPoint2.x.toFixed(2) + ", " + 
								  points[i+1].anchorPoint2.y.toFixed(2) + ", " + 
								  points[i+1].x.toFixed(2) + ", " + 
								  points[i+1].y.toFixed(2) + ");");
    }
    if (this.closed) {
        var last = points.length - 1;
		console.log("bezierVertex(" + points[last].anchorPoint1.x.toFixed(2) + ", " + 
								  points[last].anchorPoint1.y.toFixed(2) + ", " + 
								  points[0].anchorPoint2.x.toFixed(2) + ", " + 
								  points[0].anchorPoint2.y.toFixed(2) + ", " + 
								  points[0].x.toFixed(2) + ", " + 
								  points[0].y.toFixed(2) + ");");
    }
   console.log("endShape();");
};
Contour.prototype.drawContour = function() {
	if (!this.points.length) {
		return null;
	}
	var points = this.points;
    beginShape();
	vertex(points[0].x, points[0].y);
    for (var i = 0; i < points.length-1; i++) {
		bezierVertex(points[i].anchorPoint1.x, points[i].anchorPoint1.y, 
			points[i+1].anchorPoint2.x, points[i+1].anchorPoint2.y, 
			points[i+1].x, points[i+1].y);
    }
    if (this.closed) {
        var last = points.length - 1;
        bezierVertex(points[last].anchorPoint1.x, points[last].anchorPoint1.y, 
            points[0].anchorPoint2.x, points[0].anchorPoint2.y, 
            points[0].x, points[0].y);
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
Contour.prototype.calculateBounds = function() {
	var minX, maxX, minY, maxY;
	if (this.points.length <= 1) {
		return null;
	}
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
	}
	var min = {x:minX, y:minY};
	var max = {x:maxX, y:maxY};
	this.bounds = {min:min, max:max};
};
Contour.prototype.drawBoundingBox = function() {
    noFill();
	stroke(0, 0, 0);//TODO: change to a layer color
	strokeWeight(1);
	this.calculateBounds();
	var minX = this.bounds.min.x;
	var maxX = this.bounds.max.x;
	var minY = this.bounds.min.y;
	var maxY = this.bounds.max.y;
	rect(minX, minY, maxX-minX, maxY-minY);
};
Contour.prototype.drawPointsHandlers = function() {
    for (var i = 0; i < this.points.length; i++) {
        this.points[i].draw();
    }
};
Contour.prototype.drawHandlers = function() {
    if (!this.points.length) {
        return null;
    }
    noFill();
	stroke(0, 0, 0);//TODO: change to a layer color
	strokeWeight(nav.camera.scaleRatio);
    this.drawContour();
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
Contour.prototype.showAnchors = function() {
	for (var i = 0; i < this.points.length; i++) {
		this.points[i].anchorPoint1.visible = true;
		this.points[i].anchorPoint2.visible = true;
	}
};
Contour.prototype.move = function(offset) {
	var points = this.points;
	for (var i = 0; i < points.length; i++) {
		points[i].move(offset);
	}
};
Contour.prototype.rotate = function(center, angle) {
	var points = this.points;
	for (var i = 0; i < points.length; i++) {
		points[i].rotate(center, angle);
	}
};
Contour.prototype.scale = function(center, ratio) {
	var points = this.points;
	for (var i = 0; i < points.length; i++) {
		points[i].scale(center, ratio);
	}
};