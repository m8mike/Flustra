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
	this.list = new List(x + 5, y + 15, w - 10, h - 30);
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
	this.list.draw();
};
LayersPanel.prototype.resize = function() {
    ResizablePanel.prototype.resize.call(this);//call superclass method
    this.newLayerButton.x = this.x + 55;
    this.newLayerButton.y = this.y + this.h - 14;
	this.list.resize(this.x + 5, this.y + 15, this.w - 10, this.h - 30);
};
LayersPanel.prototype.onPressed = function() {
    this.newLayerButton.onPressed();
};
LayersPanel.prototype.onReleased = function() {
    this.newLayerButton.onReleased();
};