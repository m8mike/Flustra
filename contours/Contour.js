var Contour = function() {
    this.points = [];
    this.closed = false;
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
    if (!this.points.length) {
        return null;
    }
    beginShape();
    noFill();
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
    this.points[this.points.length - 1].movingStarted = moving;
};
Contour.prototype.updateAnchors = function(x, y) {
    this.points[this.points.length - 1].updateAnchors(x, y);
};