var AngleTool = function() {
	
};
AngleTool.prototype.onClicked = function() {
	
};
AngleTool.prototype.onPressed = function() {
	var contour = contourManager.contour;
	if (!contour) {
		return null;
	}
    for (var i = 0; i < contour.points.length; i++) {
        if (dist(contour.points[i].x, contour.points[i].y, mouseX, mouseY) < 4) {
			this.activePoint = contour.points[i];
			this.activePoint.anchorPoint1.visible = true;
			this.activePoint.anchorPoint2.visible = true;
			return null;
		} else if (dist(contour.points[i].anchorPoint1.x, contour.points[i].anchorPoint1.y, mouseX, mouseY) < 4) {
			if (contour.points[i].anchorPoint1.visible) {
				this.activeAnchor = contour.points[i].anchorPoint1;
				return null;
			}
		} else if (dist(contour.points[i].anchorPoint2.x, contour.points[i].anchorPoint2.y, mouseX, mouseY) < 4) {
			if (contour.points[i].anchorPoint2.visible) {
				this.activeAnchor = contour.points[i].anchorPoint2;
				return null;
			}
		}
	} 
};
AngleTool.prototype.onReleased = function() {
	this.activePoint = null;
	this.activeAnchor = null;
};
AngleTool.prototype.update = function() {
	if (this.activePoint) {
        this.activePoint.updateAnchors(mouseX, mouseY);
	} else if (this.activeAnchor) {
		this.activeAnchor.x = mouseX;
		this.activeAnchor.y = mouseY;
	}
};
AngleTool.prototype.draw = function(x, y) {
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
	ctx.fill();
	ctx.lineWidth = 0.3;
	ctx.strokeStyle = "rgb(255, 255, 255)";
	ctx.stroke();
	ctx.restore();
	popMatrix();
};