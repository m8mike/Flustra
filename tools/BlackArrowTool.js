var BlackArrowTool = function(x, y) {
	Tool.call(this, x, y);
    this.start = {x:0, y:0};
    this.finish = {x:0, y:0};
    this.selectionStarted = false;
    this.movingStarted = false;
	this.toolName = "Black arrow (to edit contours)";
	this.selectedLayers = [];
};
BlackArrowTool.prototype = Object.create(Tool.prototype);
BlackArrowTool.prototype.onClicked = function() {
	/*
	var layers = lp.list.getVisibleLayers();
	var startEqualsFinish = this.start.x == this.finish.x && this.start.y == this.finish.y;
	if (!startEqualsFinish) {
		return null;
	}
	if ((keyPressed && !(keyCode === CONTROL || keyCode === SHIFT)) || !keyPressed) {
		this.selectedLayers = [];
	}
	for (var i = layers.length - 1; i >= 0; i--) {
		var layer = layers[i];
		if (layer.locked || !layer.contentVisible || !layer.content) {
			continue;
		}
		if (layer.content.isPointInContour(getMouseX(), getMouseY()) && (this.selectedLayers.indexOf(layer) === -1)) {
			if (keyPressed && keyCode === CONTROL) {
				this.selectedLayers.splice(this.selectedLayers.indexOf(layer), 1);
			} else {
				this.selectedLayers.push(layer);
			}
			break;
		}
	}
	for (var i = 0; i < layers.length; i++) {
		var layer = layers[i];
		if (layer.content) {
			layer.deactivate();
		}
	}
	for (var i = 0; i < this.selectedLayers.length; i++) {
		var layer = this.selectedLayers[i];
		if (layer.content && !layer.locked) {
			layer.content.visible = true;
		}
	}
	contourManager.selectedLayers = this.selectedLayers;*/
};
BlackArrowTool.prototype.checkSelection = function() {
	var layers = lp.list.getVisibleLayers();
    for (var i = 0; i < layers.length; i++) {
		if (layers[i].content) {
			layers[i].content.drawBoundingBox();
		}
	}
	/*var layers = lp.list.layers;
    for (var i = 0; i < layers; i++) {
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
    }*/
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
	return layer.content.isPointInContour(getMouseX(), getMouseY());
};
BlackArrowTool.prototype.isLayerIntersectsSelectionRectangle = function(layer) {
	return layer.content.isRectangleIntersectsContour();
};
BlackArrowTool.prototype.isLayerSelected = function(layer) {
	if (this.selectedLayers.indexOf(layer) === -1) {
		return false;
	}
	return true;
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
	for (var i = 0; i < layers.length; i++) {
		var layer = layers[i];
		if (layer.content) {
			layer.deactivate();
		}
	}
	this.selectedLayers = [];
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
	
};
var copySelectedContours = function() {
	/*var allLayers = lp.list.getVisibleLayers();
	var layers = contourManager.selectedLayers;
	for (var i = 0; i < layers.length; i++) {
		
	}*/
};
BlackArrowTool.prototype.onPressed = function() {
	Tool.prototype.onPressed.call(this);
	var layer = this.getLayerUnderMouse();
	var selected = this.isLayerSelected(this);
	if (layer && selected) {
		if (keyPressed && (keyCode === ALT)) {
			copySelectedContours();
		}
		this.movingStarted = true;
		//start = mouseX mouseY
	} else if (keyPressed && (keyCode === SHIFT || keyCode === CONTROL)) {
		this.startDrawingSelectionRectangle();
	} else {
		this.deselectAll();
		this.startDrawingSelectionRectangle();
	}
};
BlackArrowTool.prototype.onReleased = function() {
	Tool.prototype.onReleased.call(this);
    /*if (this.selectionStarted) {
		this.normalize();
		this.checkSelection();
		this.selectionStarted = false;
		this.start.x = 0;
		this.start.y = 0;
		this.finish.x = 0;
		this.finish.y = 0;
		return null;
	}*/
	if (!this.movingStarted && !this.selectionStarted) {
		resetSettings();
		return null;
	}
	var layers = lp.list.getVisibleLayers();
	this.finish.x = getMouseX();
	this.finish.y = getMouseY();
	if (this.movingStarted) {
		this.movingStarted = false;
		//move every selected layer
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
						//deselect();
					} else {
						//select();
					}
				}
			}
		}
		//for each contour
		for (var i = 0; i < layers.length; i++) {
			var layer = layers[i];
			if (this.isLayerInside(layer)) {//contours inside selection
				//select
			} else if (!(keyPressed && (keyCode === SHIFT)) || !keyPressed) {
				//deselect
			}
		}
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