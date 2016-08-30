var List = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.layers = [];
    this.visibleLayers = [];
	this.scrollBar = new ScrollBar(x + w - 5, y, h);
	this.addLayer();
	this.active = this.layers[0];
	this.layers[0].active = true;
};
List.prototype.resize = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
	if (Math.abs(this.scrollBar.offsetY) > 0 && this.h - this.scrollBar.offsetY > this.scrollBar.listHeight) {
		this.scrollBar.offsetY += this.h - this.scrollBar.offsetY - this.scrollBar.listHeight;
	}
	if (this.scrollBar.offsetY > 0) {
		this.scrollBar.offsetY = 0;
	}
	this.scrollBar.resize(x + w - 5, y, h);
	var fullLength = this.layers.length * 20;
    if (fullLength < this.h) {
        this.scrollBar.size = this.scrollBar.maxSize;
    } else {
        this.scrollBar.size = this.scrollBar.maxSize * this.h / fullLength;
    }
};
List.prototype.addContour = function(contour) {
	this.active.children.push(new Layer(this.active.name + " " + this.active.children.length, this.active));
	this.active.childrenVisible = true;
	var layer = this.active.children[this.active.children.length - 1];
	layer.content = contour;
	this.layers.splice(this.visibleLayers.indexOf(this.active) + this.active.countChildren(), 0, layer);
	this.resize(this.x, this.y, this.w, this.h);
};
List.prototype.addLayer = function() {
    this.layers.push(new Layer("Layer " + this.layers.length, null));
	this.resize(this.x, this.y, this.w, this.h);
};
List.prototype.addSublayer = function() {
	for (var i = 0; i < this.visibleLayers.length; i++) {
		if (this.visibleLayers[i].layerSelected) {
			this.visibleLayers[i].childrenVisible = true;
			this.visibleLayers[i].children.push(new Layer(this.visibleLayers[i].name 
				+ " " + this.visibleLayers[i].children.length, this.visibleLayers[i]));
			var layer = this.visibleLayers[i].children[this.visibleLayers[i].children.length - 1];
			this.layers.splice(i + this.visibleLayers[i].countChildren(), 0, layer);
			this.resize(this.x, this.y, this.w, this.h);
			return null;
		}
	}
};
List.prototype.deleteAllChildren = function(layer) {
	for (var i = 0; i < layer.children.length; i++) {
		this.deleteAllChildren(layer.children[i]);
	}
	layer.remove();
	if (this.visibleLayers.indexOf(layer) != -1) {
		this.visibleLayers.splice(this.visibleLayers.indexOf(layer), 1);
	}
	if (this.layers.indexOf(layer) != -1) {
		this.layers.splice(this.layers.indexOf(layer), 1);
	}
};
List.prototype.deleteLayer = function() {
	var layersToRemove = [];
    for (var i = 0; i < this.visibleLayers.length; i++) {
		if (this.visibleLayers[i].layerSelected && !this.visibleLayers[i].active && !this.visibleLayers[i].checkActiveChildren()) {
			layersToRemove.push(this.visibleLayers[i]);
		}
	}
    for (var i = 0; i < layersToRemove.length; i++) {
		this.deleteAllChildren(layersToRemove[i]);
	}
};
List.prototype.onDoubleClick = function() {
	//println("double");
};
List.prototype.checkMouse = function() {
	if (mouseX > this.x && mouseX < this.x + this.w && 
		mouseY > this.y && mouseY < this.y + this.h) {
		return true;
	}
	return false;
};
List.prototype.deactivateLayer = function(layer) {
	if (layer.content) {
		layer.content.fixColor();
		layer.content.active  = false;
		if (contourManager.contour === layer.content) {
			contourManager.contour = undefined;
		}
	}
};
List.prototype.mouseOnEye = function() {
	return mouseX > this.x && mouseX < this.x + 20;
};
List.prototype.mouseOnLock = function() {
	return mouseX > this.x + 20 && mouseX < this.x + 40;
};
List.prototype.mouseOnCheckMark = function() {
	return mouseX > this.x + 40 && mouseX < this.x + 60;
};
List.prototype.mouseOnTriangle = function(layer) {
	return layer.children.length > 0 &&
			mouseX > this.x + 70 + layer.countParents() * 20 && 
			mouseX < this.x + 90 + layer.countParents() * 20;
};
List.prototype.onPressed = function() {
	if (this.scrollBar.isVisible() && this.scrollBar.onPressed()) {
		
	} else if (this.checkMouse()) {
		var offset = mouseY - this.y + Math.abs(this.scrollBar.offsetY);
		var layerPressed = this.visibleLayers[int((offset - (offset % 20)) / 20)];
		if (!layerPressed) {
			return null;
		}
		if (this.mouseOnEye()) {
			if (!layerPressed.active) {
				layerPressed.contentVisible = !layerPressed.contentVisible;
				this.setVisible = layerPressed.contentVisible;
				this.setVisibleStarted = true;
				this.deactivateLayer(layerPressed);
			}
		} else if (this.mouseOnLock()) {
			if (!layerPressed.active) {
				layerPressed.locked = !layerPressed.locked;
				this.setLocked = layerPressed.locked;
				this.setLockedStarted = true;
				this.deactivateLayer(layerPressed);
			}
		} else if (this.mouseOnCheckMark()) {
			if (!layerPressed.active) {
				for (var i = 0; i < this.visibleLayers.length; i++) {
					this.visibleLayers[i].active = false;
				}
				layerPressed.active = true;
				this.active = layerPressed;
				layerPressed.contentVisible = true;
				layerPressed.locked = false;
			}
		} else if (this.mouseOnTriangle(layerPressed)) {
			layerPressed.setChildrenVisible(!layerPressed.childrenVisible);
		} else {
			for (var i = 0; i < this.visibleLayers.length; i++) {
				this.visibleLayers[i].layerSelected = false;
			}
			layerPressed.layerSelected = true;
		}
	}
};
List.prototype.onClicked = function() {
	if (!this.checkMouse) {
		return null;
	}
};
List.prototype.onReleased = function() {
	this.scrollBar.onReleased();
	this.setVisibleStarted = false;
	this.setLockedStarted = false;
};
List.prototype.drawContent = function() {
    for (var i = 0; i < this.layers.length; i++) {
		this.layers[i].drawContent();
	}
};
List.prototype.onOver = function() {
	if (this.checkMouse() && (this.setVisibleStarted || this.setLockedStarted)) {
		var offset = mouseY - this.y + Math.abs(this.scrollBar.offsetY);
		var layer = this.visibleLayers[int((offset - (offset % 20)) / 20)];
		if (!layer) {
			return null;
		}
		if (layer.active) {
			return null;
		}
		if (mouseX < this.x + 20 && this.setVisibleStarted) {
			layer.contentVisible = this.setVisible;
			if (!this.setVisible) {
				this.deactivateLayer(layer);
			}
		} else if (mouseX < this.x + 40 && this.setLockedStarted) {
			layer.locked = this.setLocked;
			if (this.setLocked) {
				this.deactivateLayer(layer);
			}
		}
	}
};
List.prototype.draw = function() {
	this.onOver();
    /*fill(99, 99, 99);
    rect(this.x, this.y, this.w, this.h);*/
    pushMatrix();
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.clip();
	this.visibleLayers = [];
    for (var i = 0; i < this.layers.length; i++) {
		if (this.layers[i].draw(this.x, this.y + this.visibleLayers.length * 20 + this.scrollBar.offsetY, this.w, 20)) {
			this.visibleLayers.push(this.layers[i]);
		}
    }
	this.scrollBar.listHeight = this.visibleLayers.length * 20;
    popMatrix();
    this.scrollBar.draw();
};