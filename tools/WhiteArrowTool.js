var WhiteArrowTool = function(x, y) {
	Tool.call(this, x, y);
	this.toolName = "Arrow tool (to edit points)";
    this.start = {x:0, y:0};
    this.finish = {x:0, y:0};
    this.selectionStarted = false;
    this.movingPoint = null;
	//when moving anchor also changing another anchor's angle relatively to parent point
    this.movingAnchor = null;
	this.movingAnchor2 = null;
	this.anchorParent = null;
};
WhiteArrowTool.prototype = Object.create(Tool.prototype);
WhiteArrowTool.prototype.checkSelection = function() {
	if (!contourManager.contour) {
		return null;
	}
	var points = contourManager.contour.points;
    for (var i = 0; i < points.length; i++) {
        if (points[i].x > this.start.x && points[i].x < this.finish.x && 
            points[i].y > this.start.y && points[i].y < this.finish.y) {
			if (keyPressed && keyCode === CONTROL) {
				points[i].deselect();
			} else {
				points[i].select();
			}
        } else {
			if (!(keyPressed && (keyCode === CONTROL || keyCode === SHIFT))) {
				points[i].deselect();
			}
        }
    }
};
WhiteArrowTool.prototype.checkPointsToMove = function() {
	if (!contourManager.contour) {
		return false;
	}
	var units = contourManager.contour.points;
    for (var i = 0; i < units.length; i++) {
        if (dist(units[i].x, units[i].y, getMouseX(), getMouseY()) < 8) {
			this.movingPoint = units[i];
			this.start.x = getMouseX();
			this.start.y = getMouseY();
			return true;
		}
	}
	return false;
};
WhiteArrowTool.prototype.checkAnchorsToMove = function() {
	if (!contourManager.contour) {
		return false;
	}
	var units = contourManager.contour.points;
    for (var i = 0; i < units.length; i++) {
        if (dist(units[i].anchorPoint1.x, units[i].anchorPoint1.y, getMouseX(), getMouseY()) < 8 && units[i].anchorPoint1.visible) {
			this.movingAnchor = units[i].anchorPoint1;
			var fi1 = Math.atan2(this.movingAnchor.y - units[i].y, this.movingAnchor.x - units[i].x);
			var fi2 = Math.atan2(units[i].anchorPoint2.y - units[i].y, units[i].anchorPoint2.x - units[i].x);
			if (Math.round(Math.abs(fi1*180/Math.PI) + Math.abs(fi2*180/Math.PI)) === 180) {
				this.movingAnchor2 = units[i].anchorPoint2;
				this.anchorParent = units[i];
			}
			return true;
		}
        if (dist(units[i].anchorPoint2.x, units[i].anchorPoint2.y, getMouseX(), getMouseY()) < 8 && units[i].anchorPoint2.visible) {
			this.movingAnchor = units[i].anchorPoint2;
			var fi1 = Math.atan2(this.movingAnchor.y - units[i].y, this.movingAnchor.x - units[i].x);
			var fi2 = Math.atan2(units[i].anchorPoint1.y - units[i].y, units[i].anchorPoint1.x - units[i].x);
			if (Math.round(Math.abs(fi1*180/Math.PI) + Math.abs(fi2*180/Math.PI)) === 180) {
				this.movingAnchor2 = units[i].anchorPoint1;
				this.anchorParent = units[i];
			}
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
WhiteArrowTool.prototype.checkLayersToActivate = function() {
	for (var i = lp.list.layers.length - 1; i >= 0; i--) {
		var layer = lp.list.layers[i];
		if (layer.locked || !layer.contentVisible || !layer.content) {
			continue;
		}
		var contour = layer.content;
		if (contour.isPointInContour(getMouseX(), getMouseY())) {
			contourManager.setActive(contour);
			return null;
		}
	}
};
WhiteArrowTool.prototype.onClicked = function() {
	if (!contourManager.contour) {
		this.checkLayersToActivate();
		return null;
	}
	var units = contourManager.contour.points;
    for (var i = 0; i < units.length; i++) {
		if (dist(units[i].x, units[i].y, getMouseX(), getMouseY()) < 8) {
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
	this.checkLayersToActivate();
};
WhiteArrowTool.prototype.onPressed = function() {
	Tool.prototype.onPressed.call(this);
    if (!this.selectionStarted) {
		if (this.checkPointsToMove()) {
			return null;
		}
		if (this.checkAnchorsToMove()) {
			return null;
		}
		this.start.x = getMouseX();
		this.start.y = getMouseY();
		this.finish = {x:this.start.x, y:this.start.y};
		this.selectionStarted = true;
    }
};
WhiteArrowTool.prototype.onReleased = function() {
	Tool.prototype.onReleased.call(this);
	if (this.movingPoint) {
		this.movingPoint.anchorPoint1.x += getMouseX() - this.start.x;
		this.movingPoint.anchorPoint1.y += getMouseY() - this.start.y;
		this.movingPoint.anchorPoint2.x += getMouseX() - this.start.x;
		this.movingPoint.anchorPoint2.y += getMouseY() - this.start.y;
		this.movingPoint.x += getMouseX() - this.start.x;
		this.movingPoint.y += getMouseY() - this.start.y;
		this.start.x = 0;
		this.start.y = 0;
		this.movingPoint = null;
	}
	if (this.movingAnchor) {
		this.movingAnchor.x = getMouseX();
		this.movingAnchor.y = getMouseY();
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
	Tool.prototype.update.call(this);
	if (tools.activeTool !== this) {
		return null;
	}
	if (this.selectionStarted) {
		this.finish.x = getMouseX();
		this.finish.y = getMouseY();
		var c = color(255, 255, 0, 128);
		fill(c);
		rect(this.start.x/nav.camera.scaleRatio + nav.camera.x, 
			 this.start.y/nav.camera.scaleRatio + nav.camera.y, 
			 1/nav.camera.scaleRatio * (this.finish.x - this.start.x), 
			 1/nav.camera.scaleRatio * (this.finish.y - this.start.y));
		return null;
	} else if (this.movingPoint) {
		this.movingPoint.anchorPoint1.x += getMouseX() - this.start.x;
		this.movingPoint.anchorPoint1.y += getMouseY() - this.start.y;
		this.movingPoint.anchorPoint2.x += getMouseX() - this.start.x;
		this.movingPoint.anchorPoint2.y += getMouseY() - this.start.y;
		this.movingPoint.x += getMouseX() - this.start.x;
		this.movingPoint.y += getMouseY() - this.start.y;
		this.start.x = getMouseX();
		this.start.y = getMouseY();
		return null;
	} else if (this.movingAnchor) {
		this.movingAnchor.x = getMouseX();
		this.movingAnchor.y = getMouseY();
		if (this.movingAnchor2) {
			var fi = Math.atan2(this.movingAnchor.y - this.anchorParent.y, this.movingAnchor.x - this.anchorParent.x);
			var r = Math.sqrt(Math.pow(this.movingAnchor2.x - this.anchorParent.x, 2) + 
							  Math.pow(this.movingAnchor2.y - this.anchorParent.y, 2));
			this.movingAnchor2.x = this.anchorParent.x + r * Math.cos(Math.PI + fi);
			this.movingAnchor2.y = this.anchorParent.y + r * Math.sin(Math.PI + fi);
		}
		return null;
	}
	if (!contourManager.contour) {
		return null;
	}
	var units = contourManager.contour.points;
    for (var i = 0; i < units.length; i++) {
		if (dist(units[i].x, units[i].y, getMouseX(), getMouseY()) < 8) {
			fill(255, 255, 255);
			stroke(0, 0, 0);
			strokeWeight(1);
			rect(1 / nav.camera.scaleRatio * (units[i].x - 4) + nav.camera.x, 
				 1 / nav.camera.scaleRatio * (units[i].y - 4) + nav.camera.y, 8, 8);
			return null;
		}
	}
};
WhiteArrowTool.prototype.draw = function() {
	Tool.prototype.draw.call(this);
	var x = this.x + 5;
	var y = this.y + 5;
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