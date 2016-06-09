var trace = function() {
	println("new layer");
};
var LayersPanel = function(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.movingStarted = false;
	this.sideMoving = '';
	this.layers = [];
	this.newLayerButton = new ToolButton(this.x + 55, this.y + this.h - 14, "New Layer", trace);
};
LayersPanel.prototype = Object.create(ResizablePanel.prototype);
LayersPanel.prototype.draw = function() {
	ResizablePanel.prototype.draw.call(this);//call superclass method
	fill(255, 255, 255);
	text("Layers", this.x + 5, this.y + 12);
	text("0 Layers", this.x + 5, this.y + this.h - 3);
	this.newLayerButton.draw();
	var layerPos = new Point(this.x + 5, this.y + 15);
	for (var i = 0; i < this.layers.length; i++) {
		this.layers[i].draw(layerPos);
	}
};
LayersPanel.prototype.resize = function() {
	ResizablePanel.prototype.resize.call(this);//call superclass method
	this.newLayerButton.x = this.x + 55;
	this.newLayerButton.y = this.y + this.h - 14;
};
LayersPanel.prototype.onPressed = function() {
	this.newLayerButton.onPressed();
};
LayersPanel.prototype.onReleased = function() {
	this.newLayerButton.onReleased();
};
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
Layer.prototype.draw = function(layerPos) {
	if (!this.layerVisible) {
		return null;
	}
	if (this.layerSelected) {
		fill(255, 154, 87);
	} else if (this.children.length > 0) {
		fill(97, 97, 97);
	} else {
		fill(112, 112, 112);
	}
	stroke(0, 0, 0);
};
var lp = new LayersPanel(290, 10);
lp.draw();