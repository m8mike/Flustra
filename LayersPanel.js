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
	this.scrollBar = new ScrollBar(this.x + this.w, this.y, this.h);
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
	this.scrollBar.draw();
};
LayersPanel.prototype.resize = function() {
    ResizablePanel.prototype.resize.call(this);//call superclass method
    this.newLayerButton.x = this.x + 55;
    this.newLayerButton.y = this.y + this.h - 14;
	this.scrollBar.resize(this.x + this.w, this.y, this.h);
};
LayersPanel.prototype.onPressed = function() {
    this.newLayerButton.onPressed();
};
LayersPanel.prototype.onReleased = function() {
    this.newLayerButton.onReleased();
};