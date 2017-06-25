var BlackArrowTool = function(x, y) {
	Tool.call(this, x, y);
    this.start = {x:0, y:0};
    this.finish = {x:0, y:0};
    this.selectionStarted = false;
    this.movingStarted = false;
	this.toolName = "Black arrow (to edit contours)";
};
BlackArrowTool.prototype = Object.create(Tool.prototype);
BlackArrowTool.prototype.onClicked = function() {};
BlackArrowTool.prototype.checkSelection = function() {
	var layers = lp.list.getVisibleLayers();
    for (var i = 0; i < layers.length; i++) {
		if (layers[i].content) {
			layers[i].content.drawBoundingBox();
		}
	}
};
BlackArrowTool.prototype.normalize = function() {
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
BlackArrowTool.prototype.isLayerInside = function(layer) {
	layer.content.calculateBounds();
	var bounds = layer.content.bounds;
	if (!bounds) {
		return false;
	}
	var min = {x:0, y:0};
	var max = {x:0, y:0};
	if (this.start.x < this.finish.x) {
		min.x = this.start.x;
		max.x = this.finish.x;
	} else {
		min.x = this.finish.x;
		max.x = this.start.x;
	}
	if (this.start.y < this.finish.y) {
		min.y = this.start.y;
		max.y = this.finish.y;
	} else {
		min.y = this.finish.y;
		max.y = this.start.y;
	}
	return (bounds.min.x > min.x && bounds.min.x < max.x &&
		bounds.max.x > min.x && bounds.max.x < max.x &&
		bounds.min.y > min.y && bounds.min.y < max.y &&
		bounds.max.y > min.y && bounds.max.y < max.y);
};
BlackArrowTool.prototype.isLayerIntersectsSelectionRectangle = function(layer) {
	var rect = {x:0, y:0, w:0, h:0};
	rect.x = this.start.x;
	rect.y = this.start.y;
	rect.w = this.finish.x - this.start.x;
	rect.h = this.finish.y - this.start.y;
	if (rect.w < 0) {
		rect.w = this.start.x - this.finish.x;
		rect.x = this.finish.x;
	}
	if (rect.h < 0) {
		rect.h = this.start.y - this.finish.y;
		rect.y = this.finish.y;
	}
	return layer.content.isRectangleIntersectsContour(rect);
};
BlackArrowTool.prototype.getLayerUnderMouse = function() {
	var layers = lp.list.getVisibleLayers();
	for (var i = layers.length - 1; i >= 0; i--) {
		var layer = layers[i];
		if (layer.locked || !layer.contentVisible || !layer.content) {
			continue;
		}
		if (layer.content.isPointInContour(getMouseX(), getMouseY())) {
			return layer;
		}
	}
	return null;
};
BlackArrowTool.prototype.startDrawingSelectionRectangle = function() {
	if (!this.selectionStarted) {
		this.start.x = getMouseX();
		this.start.y = getMouseY();
		this.finish = {x:this.start.x, y:this.start.y};
		this.selectionStarted = true;
    }
};
BlackArrowTool.prototype.deselectAll = function() {
	var layers = lp.list.getVisibleLayers();
	for (var i = 0; i < layers.length; i++) {
		var layer = layers[i];
		if (layer.content) {
			layer.deactivate();
		}
	}
};
BlackArrowTool.prototype.resetSettings = function() {
	this.movingStarted = false;
	this.selectionStarted = false;
	this.start.x = 0;
	this.start.y = 0;
	this.finish.x = 0;
	this.finish.y = 0;
};
BlackArrowTool.prototype.handleClick = function() {
	var layer = this.getLayerUnderMouse();
	if (layer) {
		if (keyPressed && (keyCode === CONTROL)) {
			layer.contentSelected = false;
		} else if (keyPressed && (keyCode === SHIFT)) {
			layer.contentSelected = true;
			if (layer.content) {
				contourManager.setActive(layer.content);
			}
		} else {
			this.deselectAll();
			layer.contentSelected = true;
			if (layer.content) {
				contourManager.setActive(layer.content);
			}
		}
	} else {
		this.deselectAll();
	}
};
var copySelectedContours = function() {
	var layers = lp.list.getVisibleLayers();
	for (var i = 0; i < layers.length; i++) {
		var layer = layers[i];
		if (!layer.contentSelected || !layer.content) {
			continue;
		}
		layer.cloneWithoutChildren(layer.parent);
	}
};
BlackArrowTool.prototype.onPressed = function() {
	Tool.prototype.onPressed.call(this);
	var layer = this.getLayerUnderMouse();
	if (layer && layer.contentSelected) {
		if (keyPressed && (keyCode === ALT)) {
			copySelectedContours();
		}
		this.movingStarted = true;
		this.start.x = getMouseX();
		this.start.y = getMouseY();
		this.finish = {x:this.start.x, y:this.start.y};
	} else if (keyPressed && (keyCode === SHIFT || keyCode === CONTROL)) {
		this.startDrawingSelectionRectangle();
	} else {
		this.deselectAll();
		this.startDrawingSelectionRectangle();
	}
};
BlackArrowTool.prototype.onReleased = function() {
	Tool.prototype.onReleased.call(this);
	if (!this.movingStarted && !this.selectionStarted) {
		this.resetSettings();
		return null;
	}
	var layers = lp.list.getVisibleLayers();
	this.finish.x = getMouseX();
	this.finish.y = getMouseY();
	if (this.movingStarted) {
		this.movingStarted = false;
		var offsetX = getMouseX() - this.start.x;
		var offsetY = getMouseY() - this.start.y;
		//move every selected layer
		var contoursToMove = [];
		for (var i = 0; i < layers.length; i++) {
			var layer = layers[i];
			if (!layer.content || !layer.contentSelected) {
				continue;
			}
			contoursToMove.push(layer.content);
			layer.content.move(offsetX, offsetY);
		}
		if (contoursToMove.length > 0) {
			history.addCommand(new MoveCommand(contoursToMove, offsetX, offsetY));
		}
	} else if (this.selectionStarted) {
		var startEqualsFinish = this.start.x == this.finish.x && this.start.y == this.finish.y;
		if (startEqualsFinish) {
			this.handleClick();
			this.resetSettings();
			return null;
		}
		if (this.finish.x < this.start.x) {//from right to left
			//if contours intersect rectangle ? select : deselect
			for (var i = 0; i < layers.length; i++) {
				var layer = layers[i];
				if (layer.locked || !layer.contentVisible || !layer.content) {
					continue;
				}
				if (this.isLayerIntersectsSelectionRectangle(layer)) {
					if (keyPressed && (keyCode === CONTROL)) {
						layer.contentSelected = false;
					} else {
						layer.contentSelected = true;
					}
				}
			}
		}
		//for each contour
		for (var i = 0; i < layers.length; i++) {
			var layer = layers[i];
			if (!layer.content) {
				continue;
			}
			if (this.isLayerInside(layer)) {//contours inside selection
				layer.contentSelected = true;
			} else if (!(keyPressed && (keyCode === SHIFT)) || !keyPressed) {
				if (this.finish.x > this.start.x) {
					layer.contentSelected = false;
				}
			}
		}
		this.resetSettings();
	}
};
BlackArrowTool.prototype.update = function() {
	Tool.prototype.update.call(this);
	if (this.selectionStarted) {
		this.finish.x = getMouseX();
		this.finish.y = getMouseY();
		var c = color(255, 0, 0, 40);
		fill(c);
		rect(this.start.x/nav.camera.scaleRatio + nav.camera.x, 
			 this.start.y/nav.camera.scaleRatio + nav.camera.y, 
			 1/nav.camera.scaleRatio * (this.finish.x - this.start.x), 
			 1/nav.camera.scaleRatio * (this.finish.y - this.start.y));
		return null;
	} else if (this.movingStarted) {
		pushMatrix();
		scale(1/nav.camera.scaleRatio);
		translate(getMouseX() - this.start.x + nav.camera.x * nav.camera.scaleRatio, 
				  getMouseY() - this.start.y + nav.camera.y * nav.camera.scaleRatio);
		strokeWeight(1);
		stroke(0, 0, 0);
		var visibleLayers = lp.list.getVisibleLayers();
		for (var i = 0; i < visibleLayers.length; i++) {
			var layer = visibleLayers[i];
			if (!layer.content || !layer.contentSelected) {
				continue;
			}
			layer.content.drawHandlers();
		}
		popMatrix();
	}
};
BlackArrowTool.prototype.draw = function() {
	Tool.prototype.draw.call(this);
	var x = this.x + 5;
	var y = this.y + 5;
	pushMatrix();
	translate(x+5, y+1);
	scale(1.3, 1.3);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
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
	ctx.fillStyle = "rgb(71, 0, 112)";
	ctx.fill();
	ctx.strokeStyle = "rgb(255, 255, 255)";
	ctx.stroke();
	ctx.restore();
	popMatrix();
};