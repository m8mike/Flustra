var ContourPoint = function(x, y) {
    this.x = x;
    this.y = y;
    this.anchorPoint1 = new AnchorPoint(x, y);
    this.anchorPoint2 = new AnchorPoint(x, y);
	this.selected = false;
};
ContourPoint.prototype.select = function() {
	this.selected = true;
	this.anchorPoint1.visible = true;
	this.anchorPoint2.visible = true;
};
ContourPoint.prototype.deselect = function() {
	this.selected = false;
	this.anchorPoint1.visible = false;
	this.anchorPoint2.visible = false;
};
ContourPoint.prototype.draw = function() {
    if (this.anchorPoint1.visible) {
        line(this.x, this.y, this.anchorPoint1.x, this.anchorPoint1.y);
    }
    if (this.anchorPoint2.visible) {
        line(this.x, this.y, this.anchorPoint2.x, this.anchorPoint2.y);
    }
    this.anchorPoint1.draw();
    this.anchorPoint2.draw();
	var size = 4 * nav.camera.scaleRatio;
	if (this.selected) {
		fill(0, 0, 0);
		rectMode(CENTER);
		rect(this.x, this.y, size, size);
		rectMode(CORNER);
	} else {
		fill(255, 255, 255);
		ellipse(this.x, this.y, size, size);
	}
};
ContourPoint.prototype.updateAnchors = function(x, y) {
    this.anchorPoint1.x = x;
    this.anchorPoint1.y = y;
    this.anchorPoint2.x = 2 * this.x - x;
    this.anchorPoint2.y = 2 * this.y - y;
};
ContourPoint.prototype.move = function(offset) {
	this.x += offset.x;
	this.y += offset.y;
	this.anchorPoint1.x += offset.x;
	this.anchorPoint1.y += offset.y;
	this.anchorPoint2.x += offset.x;
	this.anchorPoint2.y += offset.y;
};
ContourPoint.prototype.rotate = function(center, angle) {
	var countRotation = function (p) {
		var d = dist(p.x, p.y, center.x, center.y);
		var a = Math.atan2(p.y - center.y, p.x - center.x);
		p.x = center.x + d * cos(a + angle);
		p.y = center.y + d * sin(a + angle);
	};
	var p = this;
	countRotation(p);
	countRotation(this.anchorPoint1);
	countRotation(this.anchorPoint2);
};
ContourPoint.prototype.scale = function(center, ratio) {
	var countScale = function (p) {
		var d = dist(p.x, p.y, center.x, center.y) * ratio;
		var a = Math.atan2(p.y - center.y, p.x - center.x);
		p.x = center.x + d * cos(a);
		p.y = center.y + d * sin(a);
	};
	var p = this;
	countScale(p);
	countScale(this.anchorPoint1);
	countScale(this.anchorPoint2);
};