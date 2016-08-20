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
	if (this.selected) {
		fill(0, 0, 0);
		rect(this.x - 2, this.y - 2, 4, 4);
	} else {
		fill(255, 255, 255);
		ellipse(this.x, this.y, 4, 4);
	}
};
ContourPoint.prototype.updateAnchors = function(x, y) {
    this.anchorPoint1.x = x;
    this.anchorPoint1.y = y;
    this.anchorPoint2.x = 2 * this.x - x;
    this.anchorPoint2.y = 2 * this.y - y;
};