var Contour = function() {
    this.points = [];
    this.closed = false;
	this.fillColor = colorSelect.fillColor;
	this.strokeColor = colorSelect.strokeColor;
	this.strokeWidth = 5;
	this.active = true;
	this.visible = true;
};
Contour.prototype.setColor = function(f, s) {
	this.fillColor = {r:f.r, g:f.g, b:f.b};
	this.strokeColor = {r:s.r, g:s.g, b:s.b};
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
	if (this.fillColor) {
		fill(color(this.fillColor.r, this.fillColor.g, this.fillColor.b));
	}
	if (this.strokeColor) {
		stroke(color(this.strokeColor.r, this.strokeColor.g, this.strokeColor.b));
		strokeWeight(this.strokeWidth);
	}
    this.drawContour();
	strokeWeight(1);
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