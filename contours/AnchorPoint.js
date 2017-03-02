var AnchorPoint = function(x, y) {
    this.x = x;
    this.y = y;
    this.visible = false;
};
AnchorPoint.prototype.draw = function() {
    if (this.visible) {
		var size = 3 * nav.camera.scaleRatio;
        ellipse(this.x, this.y, size, size);
    }
};