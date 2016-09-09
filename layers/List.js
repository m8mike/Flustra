var List = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.layers = [];
	this.scrollBar = new ScrollBar(x + w - 5, y, h);
	this.addLayer();
	this.active = this.layers[0];
	this.layers[0].active = true;
	this.layerMoving = null;
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
	this.resize(this.x, this.y, this.w, this.h);
};
List.prototype.copyLayer = function(layer, parent, index) {
	if (parent) {
		//this.layers.splice(index, 0, layer.clone(parent));
		parent.children.push(layer.clone(parent));
		var index = this.layers.indexOf(parent) + parent.children.length;
		this.layers.splice(index, 0, parent.children[parent.children.length-1]);
		parent.childrenVisible = true;
	} else {
		this.layers.splice(index, 0, layer.clone(parent));
	}
	this.resize(this.x, this.y, this.w, this.h);
};
List.prototype.addLayer = function() {
    this.layers.push(new Layer("Layer " + this.layers.length, null));
	this.resize(this.x, this.y, this.w, this.h);
};
List.prototype.addSublayer = function() {
	var layers = this.getVisibleLayers();
	for (var i = 0; i < layers.length; i++) {
		if (layers[i].layerSelected) {
			layers[i].childrenVisible = true;
			layers[i].children.push(new Layer(layers[i].name + " " + layers[i].children.length, layers[i]));
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
	if (this.layers.indexOf(layer) != -1) {
		this.layers.splice(this.layers.indexOf(layer), 1);
	}
};
List.prototype.deleteLayer = function() {
	var layersToRemove = [];
	var layers = this.getVisibleLayers();
    for (var i = 0; i < layers.length; i++) {
		if (layers[i].isVisible() && layers[i].layerSelected && 
			!layers[i].active && !layers[i].checkActiveChildren()) {
			layersToRemove.push(layers[i]);
		}
	}
    for (var i = 0; i < layersToRemove.length; i++) {
		layersToRemove[i].deactivate();
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
List.prototype.getVisibleLayers = function() {
	var visibleLayers = [];
	for (var i = 0; i < this.layers.length; i++) {
		visibleLayers = visibleLayers.concat(this.layers[i].getVisibleChildren());
	}
	return visibleLayers;
};
List.prototype.onPressed = function() {
	if (this.scrollBar.isVisible() && this.scrollBar.onPressed()) {
		
	} else if (this.checkMouse()) {
		var offset = mouseY - this.y + Math.abs(this.scrollBar.offsetY);
		var visibleLayers = this.getVisibleLayers();
		var layerPressed = visibleLayers[int((offset - (offset % 20)) / 20)];
		if (!layerPressed) {
			return null;
		}
		var list = this;
		layerPressed.onPressed(list);
	}
};
List.prototype.onClicked = function() {
	if (!this.checkMouse()) {
		return null;
	}
};
List.prototype.dragLayer = function(layer, parent, index, copy) {
	if (copy) {
		this.copyLayer(layer, parent, index);
	} else {
		layer.setParent(parent, index);
	}
};
List.prototype.onReleased = function() {
	if (this.checkMouse()) {
		var offset = mouseY - this.y + Math.abs(this.scrollBar.offsetY);
		var visibleLayers = this.getVisibleLayers();
		var layerOverIndex = int((offset - (offset % 20)) / 20);
		var layerOver = visibleLayers[layerOverIndex];
		if (!this.layerMoving) {
			return null;
		}
		if (layerOver && (layerOver !== this.layerMoving) && !(layerOver.isChildOf(this.layerMoving))) {
			//this.layerMoving.removeParent();
		}
		var copy = keyPressed && keyCode === ALT;
		if (!layerOver) {
			this.dragLayer(this.layerMoving, null, this.layers.length, copy);
		} else if (layerOver === this.layerMoving || layerOver.isChildOf(this.layerMoving)) {
			return null;
		} else if (offset % 20 > 5 && offset % 20 < 15) {
			this.dragLayer(this.layerMoving, layerOver, layerOver.children.length, copy);
		} else if (offset % 20 <= 5) {
			if (layerOver.parent) {
				this.dragLayer(this.layerMoving, layerOver.parent, layerOver.parent.children.indexOf(layerOver), copy);
			} else {
				this.layerMoving.removeParent();
				this.dragLayer(this.layerMoving, null, this.layers.indexOf(layerOver), copy);
			}
		} else if (offset % 20 >= 15) {
			if (layerOverIndex == visibleLayers.length - 1) {
				if (layerOver.parent) {
					this.dragLayer(this.layerMoving, layerOver.parent, layerOver.parent.children.indexOf(layerOver)+1, copy);
				} else {
					this.dragLayer(this.layerMoving, null, this.layers.length, copy);
				}
			} else if (layerOver.children.length > 0 && layerOver.childrenVisible) {
				this.dragLayer(this.layerMoving, layerOver, 0, copy);
			} else if (layerOver.parent) {
				this.dragLayer(this.layerMoving, layerOver.parent, layerOver.parent.children.indexOf(layerOver)+1, copy);
			} else if (visibleLayers[layerOverIndex+1].parent) {
				this.dragLayer(this.layerMoving, visibleLayers[layerOverIndex+1].parent, 
								visibleLayers[layerOverIndex+1].parent.children.indexOf(layerOver)+1, copy);
			} else {
				this.layerMoving.removeParent();
				this.dragLayer(this.layerMoving, null, this.layers.indexOf(layerOver)+1, copy);
			}
		}
	}
	this.layerMoving = null;
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
	if (!this.checkMouse()) {
		this.layerMoving = null;
		return null;
	}
	if (this.layerMoving) {
		if (!mousePressed) {
			this.layerMoving = null;
			return null;
		}
		var offset = mouseY - this.y + Math.abs(this.scrollBar.offsetY);
		var visibleLayers = this.getVisibleLayers();
		var layerOver = visibleLayers[int((offset - (offset % 20)) / 20)];
		if (layerOver) {
			noFill();
			stroke(0, 255, 0);
			if (offset % 20 > 5 && offset % 20 < 15) {
				rect(this.x, this.y + visibleLayers.indexOf(layerOver) * 20 + this.scrollBar.offsetY, this.w, 20);
			} else if (offset % 20 <= 5) {
				var x = this.x;
				var y = this.y + visibleLayers.indexOf(layerOver) * 20 + this.scrollBar.offsetY;
				line(x, y, x + this.w, y);
			} else if (offset % 20 >= 15) {
				var x = this.x;
				var y = this.y + visibleLayers.indexOf(layerOver) * 20 + this.scrollBar.offsetY;
				line(x, y + 20, x + this.w, y + 20);
			}
			stroke(0, 0, 0);
		} else {
			noFill();
			stroke(0, 255, 0);
			var x = this.x;
			var y = this.y + visibleLayers.length * 20 + this.scrollBar.offsetY;
			line(x, y, x + this.w, y);
			stroke(0, 0, 0);
		}
	}
	if (this.setVisibleStarted || this.setLockedStarted) {
		var offset = mouseY - this.y + Math.abs(this.scrollBar.offsetY);
		var visibleLayers = this.getVisibleLayers();
		var layer = visibleLayers[int((offset - (offset % 20)) / 20)];
		if (!layer) {
			return null;
		}
		if (layer.active) {
			return null;
		}
		if (mouseX < this.x + 20 && this.setVisibleStarted) {
			layer.contentVisible = this.setVisible;
			if (!this.setVisible) {
				layer.deactivate();
			}
		} else if (mouseX < this.x + 40 && this.setLockedStarted) {
			layer.locked = this.setLocked;
			if (this.setLocked) {
				layer.deactivate();
			}
		}
	}
};
List.prototype.draw = function() {
    /*fill(99, 99, 99);
    rect(this.x, this.y, this.w, this.h);*/
    pushMatrix();
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.clip();
	var visibleLayers = this.getVisibleLayers();
    for (var i = 0; i < visibleLayers.length; i++) {
		visibleLayers[i].draw(this.x, this.y + i * 20 + this.scrollBar.offsetY, this.w, 20);
    }
	this.scrollBar.listHeight = visibleLayers.length * 20;
    popMatrix();
    this.scrollBar.draw();
	this.onOver();
};