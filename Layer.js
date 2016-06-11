var Layer = function(name, parent) {
	this.name = name;
	this.parent = parent;
	this.contentVisible = true;
	this.layerVisible = true;
	this.locked = false;
	this.layerSelected = false;
	this.contentSelected = false;
	this.color = color(random(0, 255), random(0, 255), random(0, 255));
	this.children = [];
};
Layer.prototype.draw = function(pos) {
	if (!this.layerVisible) {
		return null;
	}
	stroke(0, 0, 0);
	if (this.layerSelected) {
		fill(255, 154, 87);
	} else if (this.children.length > 0) {
		fill(97, 97, 97);
	} else {
		fill(112, 112, 112);
	}
    rect(this.x, this.y, this.w, this.w);
};