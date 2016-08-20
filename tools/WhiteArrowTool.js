var WhiteArrowTool = function() {
    this.start = {x:0, y:0};
    this.finish = {x:0, y:0};
    this.selectionStarted = false;
    this.movingPoint = null;
    this.movingAnchor = null;
};
WhiteArrowTool.prototype.checkSelection = function() {
	if (!contourManager.contour) {
		return null;
	}
	var units = contourManager.contour.points;
    for (var i = 0; i < units.length; i++) {
        if (units[i].x > this.start.x && units[i].x < this.finish.x && 
            units[i].y > this.start.y && units[i].y < this.finish.y) {
			if (keyPressed && keyCode === CONTROL) {
				units[i].deselect();
			} else {
				units[i].select();
			}
        } else {
			if (!(keyPressed && (keyCode === CONTROL || keyCode === SHIFT))) {
				units[i].deselect();
			}
        }
    }
};
WhiteArrowTool.prototype.checkPointsToMove = function() {
	var units = contourManager.contour.points;
    for (var i = 0; i < units.length; i++) {
        if (dist(units[i].x, units[i].y, mouseX, mouseY) < 8) {
			this.movingPoint = units[i];
			this.start.x = mouseX;
			this.start.y = mouseY;
			return true;
		}
	}
	return false;
};
WhiteArrowTool.prototype.checkAnchorsToMove = function() {
	var units = contourManager.contour.points;
    for (var i = 0; i < units.length; i++) {
        if (dist(units[i].anchorPoint1.x, units[i].anchorPoint1.y, mouseX, mouseY) < 8 && units[i].anchorPoint1.visible) {
			this.movingAnchor = units[i].anchorPoint1;
			return true;
		}
        if (dist(units[i].anchorPoint2.x, units[i].anchorPoint2.y, mouseX, mouseY) < 8 && units[i].anchorPoint2.visible) {
			this.movingAnchor = units[i].anchorPoint2;
			return true;
		}
	}
	return false;
};
WhiteArrowTool.prototype.normalize = function() {
    if (this.start.x > this.finish.x) {
        var startX = this.finish.x;
        var finishX = this.start.x;
        this.start.x = startX;
        this.finish.x = finishX;
    }
    if (this.start.y > this.finish.y) {
        var startY = this.finish.y;
        var finishY = this.start.y;
        this.start.y = startY;
        this.finish.y = finishY;
    }
};
WhiteArrowTool.prototype.onClicked = function() {
	var units = contourManager.contour.points;
    for (var i = 0; i < units.length; i++) {
		if (dist(units[i].x, units[i].y, mouseX, mouseY) < 8) {
			if (keyPressed && keyCode === CONTROL) {
				units[i].deselect();
			} else {
				if (!(keyPressed && keyCode === SHIFT)) {
					for (var j = 0; j < units.length; j++) {
						units[j].deselect();
					}
				}
				units[i].select();
			}
			this.selectionStarted = false;
			this.movingPoint = null;
			return null;
		}
	}
};
WhiteArrowTool.prototype.onPressed = function() {
    if (!this.selectionStarted) {
		if (this.checkPointsToMove()) {
			return null;
		}
		if (this.checkAnchorsToMove()) {
			return null;
		}
		this.start.x = mouseX;
		this.start.y = mouseY;
		this.finish = {x:this.start.x, y:this.start.y};
		this.selectionStarted = true;
    }
};
WhiteArrowTool.prototype.onReleased = function() {
	if (this.movingPoint) {
		this.movingPoint.anchorPoint1.x += mouseX - this.start.x;
		this.movingPoint.anchorPoint1.y += mouseY - this.start.y;
		this.movingPoint.anchorPoint2.x += mouseX - this.start.x;
		this.movingPoint.anchorPoint2.y += mouseY - this.start.y;
		this.movingPoint.x += mouseX - this.start.x;
		this.movingPoint.y += mouseY - this.start.y;
		this.start.x = 0;
		this.start.y = 0;
		this.movingPoint = null;
	}
	if (this.movingAnchor) {
		this.movingAnchor.x = mouseX;
		this.movingAnchor.y = mouseY;
		this.movingAnchor = null;
	}
    if (this.selectionStarted) {
		this.normalize();
		this.checkSelection();
		this.selectionStarted = false;
		this.start.x = 0;
		this.start.y = 0;
		this.finish.x = 0;
		this.finish.y = 0;
	}
};
WhiteArrowTool.prototype.update = function() {
	if (this.selectionStarted) {
		this.finish.x = mouseX;
		this.finish.y = mouseY;
		var c = color(255, 255, 0, 128);
		fill(c);
		rect(this.start.x, this.start.y, this.finish.x - this.start.x, this.finish.y - this.start.y);
		return null;
	} else if (this.movingPoint) {
		this.movingPoint.anchorPoint1.x += mouseX - this.start.x;
		this.movingPoint.anchorPoint1.y += mouseY - this.start.y;
		this.movingPoint.anchorPoint2.x += mouseX - this.start.x;
		this.movingPoint.anchorPoint2.y += mouseY - this.start.y;
		this.movingPoint.x += mouseX - this.start.x;
		this.movingPoint.y += mouseY - this.start.y;
		this.start.x = mouseX;
		this.start.y = mouseY;
		return null;
	} else if (this.movingAnchor) {
		
		return null;
	}
	var units = contourManager.contour.points;
    for (var i = 0; i < units.length; i++) {
		if (dist(units[i].x, units[i].y, mouseX, mouseY) < 8) {
			fill(255, 255, 255);
			stroke(0, 0, 0);
			strokeWeight(1);
			rect(units[i].x - 4, units[i].y - 4, 8, 8);
			return null;
		}
	}
};
WhiteArrowTool.prototype.draw = function(x, y) {
	pushMatrix();
	translate(x+5, y+1);
	scale(1.3, 1.3);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
	ctx.strokeStyle = '#000000';
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(1.5, 1.3);
	ctx.lineTo(9.0, 9.7);
	ctx.lineTo(6.1, 9.7);
	ctx.lineTo(8.1, 13.7);
	ctx.lineTo(6.0, 14.8);
	ctx.lineTo(3.9, 10.9);
	ctx.lineTo(1.5, 13.2);
	ctx.lineTo(1.5, 1.3);
	ctx.closePath();
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	popMatrix();
};