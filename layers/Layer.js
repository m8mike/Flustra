var Layer = function(name, parent) {
	this.name = name;
	this.parent = parent;
	
	this.drawingPart = new LayerDrawingPart(this);
	
	this.contentSelected = true;
	this.contentVisible = true;
	
	this.layerSelected = false;
	
	this.childrenVisible = false;
	
	this.locked = false;
	this.active = false;
	
	this.color = {r:parseInt(random(0, 255)), g:parseInt(random(0, 255)), b:parseInt(random(0, 255)), a:255};
	this.children = [];
};
Layer.prototype.setColor = function(r, g, b, name) {
	this.color.r = r;
	this.color.g = g;
	this.color.b = b;
	if (name) {
		this.name = name;
	}
};
Layer.prototype.isChildOf = function(parent) {
	if (!this.parent) {
		return false;
	}
	if (this.parent === parent) {
		return true;
	}
	return this.parent.isChildOf(parent);
};
Layer.prototype.select = function() {
	this.contentSelected = true;
};
Layer.prototype.removeParent = function() {
	if (this.parent) {
		this.parent.children.splice(this.parent.children.indexOf(this), 1);
	}
	if (lp.list.layers.indexOf(this) != -1) {
		lp.list.layers.splice(lp.list.layers.indexOf(this), 1);
	}
};
Layer.prototype.setParent = function(parent, index) {
	this.removeParent();
	this.parent = parent;
	if (!parent) {
		lp.list.layers.splice(index, 0, this);
		return null;
	}
	if (index !== null) {
		this.parent.children.splice(index, 0, this);
	} else {
		this.parent.children.push(this);
	}
};
Layer.prototype.cloneWithoutChildren = function(parent) {
	var layer = new Layer(this.name + " - copy", parent);
	if (this.content) {
		layer.content = this.content.clone();
	}
};
Layer.prototype.clone = function(parent) {
	var layer = new Layer(this.name + " - copy", parent);
	if (this.content) {
		layer.content = this.content.clone();
	}
	for (var i = 0; i < this.children.length; i++) {
		layer.children.push(this.children[i].clone());
	}
	return layer;
};
Layer.prototype.deactivate = function() {
	if (this.content) {
		if (this.content instanceof Contour) {
			this.content.fixColor();
		}
		this.content.active  = false;
		if (contourManager.contour === this.content) {
			contourManager.contour = undefined;
		}
	}
	this.contentSelected = false;
};
Layer.prototype.parentsVisible = function() {
	if (this.parent) {
		if (!this.parent.contentVisible) {
			this.deactivate();
			return false;
		}
		var vis = this.parent.parentsVisible();
		if (!vis) {
			this.deactivate();
		}
		return vis;
	}
	return true;
};
Layer.prototype.checkActiveChildren = function() {
	for (var i = 0; i < this.children.length; i++) {
		if (this.children[i].active) {
			return true;
		}
		this.children[i].checkActiveChildren();
	}
	return false;
};
Layer.prototype.countParents = function() {
	if (this.parent != null) {
		return 1 + this.parent.countParents();
	}
	return 0;
};
Layer.prototype.countChildren = function() {
	var numChildren = this.children.length;
	for (var i = 0; i < this.children.length; i++) {
		numChildren += this.children[i].countChildren();
	}
	return numChildren;
};
Layer.prototype.setChildrenVisible = function(visible) {
	this.childrenVisible = visible;
	for (var i = 0; i < this.children.length; i++) {
		//this.children[i].layerVisible = visible;
		if (!visible) {
			this.children[i].deselectChildren();
		}
	}
};
Layer.prototype.isVisible = function() {
	if (!this.parent) {
		return true;
	}
	if (!this.parent.childrenVisible) {
		return false;
	}
	return this.parent.isVisible();
};
Layer.prototype.getAllChildren = function() {
	var children = [];
	children.push(this);
	for (var i = 0; i < this.children.length; i++) {
		children = children.concat(this.children[i].getAllChildren());
	}
	return children;
};
Layer.prototype.getVisibleChildren = function() {
	var visibleChildren = [];
	if (this.isVisible()) {
		visibleChildren.push(this);
	}
	for (var i = 0; i < this.children.length; i++) {
		visibleChildren = visibleChildren.concat(this.children[i].getVisibleChildren());
	}
	return visibleChildren;
};
Layer.prototype.deselectChildren = function() {
	this.layerSelected = false;
	for (var i = 0; i < this.children.length; i++) {
		this.children[i].deselectChildren();
	}
};
Layer.prototype.remove = function() {
	this.contentVisible = false;
	this.layerSelected = false;
	this.deleted = true;
};
Layer.prototype.drawContent = function() {
	if (this.contentVisible && this.content && this.parentsVisible()) {
		this.content.visible = this.contentVisible;
		this.content.draw();
	}
	for (var i = 0; i < this.children.length; i++) {
		this.children[i].drawContent();
	}
};
Layer.prototype.checkEye = function(list) {
	if (!(mouseX > list.x && mouseX < list.x + 20)) {
		return false;
	}
	if (!this.active) {
		this.contentVisible = !this.contentVisible;
		list.setVisible = this.contentVisible;
		list.setVisibleStarted = true;
		this.deactivate();
	}
	return true;
};
Layer.prototype.checkLock = function(list) {
	if (!(mouseX > list.x + 20 && mouseX < list.x + 40)) {
		return false;
	}
	if (!this.active) {
		this.locked = !this.locked;
		list.setLocked = this.locked;
		list.setLockedStarted = true;
		this.deactivate();
	}
	return true;
};
Layer.prototype.checkActiveMark = function(list) {
	if (!(mouseX > list.x + 40 && mouseX < list.x + 60)) {
		return false;
	}
	if (!this.active && !(this.content instanceof ImageContent)) {
		for (var i = 0; i < list.layers.length; i++) {
			list.layers[i].active = false;
		}
		this.active = true;
		list.active = this;
		this.contentVisible = true;
		this.locked = false;
	}
	return true;
};
Layer.prototype.checkTriangle = function(list) {
	if (!(this.children.length > 0 &&
			mouseX > list.x + 70 + this.countParents() * 20 && 
			mouseX < list.x + 90 + this.countParents() * 20)) {
		return false;
	}
	this.setChildrenVisible(!this.childrenVisible);
	return true;
};
Layer.prototype.onPressed = function(list) {
	if (this.checkEye(list)) {
		
	} else if (this.checkLock(list)) {
		
	} else if (this.checkActiveMark(list)) {
		
	} else if (this.checkTriangle(list)) {
		
	} else {
		if (this.layerSelected) {
			list.layerMoving = this;
		} else {
			for (var i = 0; i < list.layers.length; i++) {
				list.layers[i].deselectChildren();
			}
			this.layerSelected = true;
		}
	}
};
Layer.prototype.draw = function(x, y, w, h) {
	return this.drawingPart.draw(x, y, w, h);
};