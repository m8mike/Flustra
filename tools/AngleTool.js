var AngleTool = function(x, y) {
	Tool.call(this, x, y);
	this.toolName = "Angle tool";
};
AngleTool.prototype = Object.create(Tool.prototype);
AngleTool.prototype.onClicked = function() {
	
};
AngleTool.prototype.onPressed = function() {
	Tool.prototype.onPressed.call(this);
	var contour = contourManager.contour;
	if (!contour) {
		return null;
	}
	var maxDist = 4 * nav.camera.scaleRatio;
    for (var i = 0; i < contour.points.length; i++) {
        if (dist(contour.points[i].x, contour.points[i].y, getMouseX(), getMouseY()) < maxDist) {
			this.activePoint = contour.points[i];
			this.activePoint.anchorPoint1.visible = true;
			this.activePoint.anchorPoint2.visible = true;
			var anchor1 = this.activePoint.anchorPoint1;
			var anchor2 = this.activePoint.anchorPoint2;
			this.start1 = {x:anchor1.x, y:anchor1.y};
			this.start2 = {x:anchor2.x, y:anchor2.y};
			return null;
		} else if (dist(contour.points[i].anchorPoint1.x, contour.points[i].anchorPoint1.y, getMouseX(), getMouseY()) < maxDist) {
			if (contour.points[i].anchorPoint1.visible) {
				this.activeAnchor = contour.points[i].anchorPoint1;
				this.startAnchor = {x:this.activeAnchor.x, y:this.activeAnchor.y};
				return null;
			}
		} else if (dist(contour.points[i].anchorPoint2.x, contour.points[i].anchorPoint2.y, getMouseX(), getMouseY()) < maxDist) {
			if (contour.points[i].anchorPoint2.visible) {
				this.activeAnchor = contour.points[i].anchorPoint2;
				this.startAnchor = {x:this.activeAnchor.x, y:this.activeAnchor.y};
				return null;
			}
		}
	} 
};
AngleTool.prototype.onReleased = function() {
	Tool.prototype.onReleased.call(this);
	if (this.activePoint) {
		var anchor1 = this.activePoint.anchorPoint1;
		var anchor2 = this.activePoint.anchorPoint2
		var start1 = this.start1;
		var start2 = this.start2;
		var offset1 = {x:anchor1.x-start1.x, y:anchor1.y-start1.y};
		var offset2 = {x:anchor2.x-start2.x, y:anchor2.y-start2.y};
		history.addCommand(new MoveAnchorsCommand([anchor1, anchor2], [offset1, offset2]));
		this.start1 = null;
		this.start2 = null;
		this.activePoint = null;
		return null;
	}
	if (!this.activeAnchor || !this.startAnchor) {
		this.activePoint = null;
		this.activeAnchor = null;
		return null;
	}
	var offsetX = this.activeAnchor.x - this.startAnchor.x;
	var offsetY = this.activeAnchor.y - this.startAnchor.y;
	history.addCommand(new MoveCommand([this.activeAnchor], offsetX, offsetY));
	this.activePoint = null;
	this.activeAnchor = null;
};
AngleTool.prototype.update = function() {
	Tool.prototype.update.call(this);
	if (this.activePoint) {
        this.activePoint.updateAnchors(getMouseX(), getMouseY());
	} else if (this.activeAnchor) {
		this.activeAnchor.x = getMouseX();
		this.activeAnchor.y = getMouseY();
	}
};
AngleTool.prototype.draw = function() {
	Tool.prototype.draw.call(this);
	var x = this.x + 5;
	var y = this.y + 5;
	pushMatrix();
	translate(x+6, y+3);
	scale(1.3, 1.3);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(1.2, 0.6);
	ctx.lineTo(8.8, 9.0);
	ctx.lineTo(7.3, 9.0);
	ctx.lineTo(1.8, 2.1);
	ctx.lineTo(2.2, 11.5);
	ctx.lineTo(1.2, 12.5);
	ctx.lineTo(1.2, 0.6);
	ctx.closePath();
	ctx.fillStyle = "rgb(71, 0, 112)";
	ctx.fill();
	ctx.lineWidth = 0.3;
	ctx.strokeStyle = "rgb(255, 255, 255)";
	ctx.stroke();
	ctx.restore();
	popMatrix();
};