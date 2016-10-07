var self;
var addLayer = function() {
	//println("new layer");
    self.list.addLayer();
};
var addSublayer = function() {
    self.list.addSublayer();
};
var deleteLayer = function() {
    self.list.deleteLayer();
};
var LayersPanel = function(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.movingStarted = false;
	this.sideMoving = '';
	this.list = new List(x + 5, y + 15, w - 10, h - 30);
    self = this;
	this.newLayerButton = new NewLayerButton(this.x + 75, this.y + this.h - 14, "New Layer", addLayer);
	this.newSublayerButton = new NewSublayerButton(this.x + 95, this.y + this.h - 14, "New Sublayer", addSublayer);
	this.deleteLayerButton = new DeleteLayerButton(this.x + 115, this.y + this.h - 14, "Delete Layer", deleteLayer);
    var canvas = document.getElementById("canvas");
	canvas.addEventListener('dblclick', this.list.onDoubleClick);
};
LayersPanel.prototype = Object.create(ResizablePanel.prototype);
LayersPanel.prototype.draw = function() {
	pushMatrix();
	translate(nav.camera.x, nav.camera.y);
	scale(1/nav.camera.scaleRatio);
	this.list.drawContent();
	if (contourManager) {
		if (contourManager.selectedLayers) {
			for (var i = 0; i < contourManager.selectedLayers.length; i++) {
				contourManager.selectedLayers[i].content.drawHandlers();
			}
		}
		if (contourManager.contour) {
			contourManager.contour.drawHandlers(true);
		}
	}
	popMatrix();
	ResizablePanel.prototype.draw.call(this);//call superclass method
	noFill();
	stroke(0, 0, 0);
	rect(this.x + 5, this.y + 15, this.w - 10, this.h - 30);
	fill(255, 255, 255);
	text("Layers", this.x + 5, this.y + 12);
	text("0 Layers", this.x + 5, this.y + this.h - 3);
	this.newLayerButton.draw();
	this.newSublayerButton.draw();
	this.deleteLayerButton.draw();
	this.list.draw();
};
LayersPanel.prototype.checkButtons = function() {
	if (this.newLayerButton.onOver()) {
		return true;
	} else if (this.newSublayerButton.onOver()) {
		return true;
	} else if (this.deleteLayerButton.onOver()) {
		return true;
	}
	return false;
};
LayersPanel.prototype.resize = function() {
    ResizablePanel.prototype.resize.call(this);//call superclass method
    this.newLayerButton.x = this.x + 75;
    this.newLayerButton.y = this.y + this.h - 14;
    this.newSublayerButton.x = this.x + 95;
    this.newSublayerButton.y = this.y + this.h - 14;
    this.deleteLayerButton.x = this.x + 115;
    this.deleteLayerButton.y = this.y + this.h - 14;
	this.list.resize(this.x + 5, this.y + 15, this.w - 10, this.h - 30);
};
LayersPanel.prototype.onClicked = function() {
	this.list.onClicked();
};
LayersPanel.prototype.checkMouse = function() {
	if (mouseX > this.x && mouseX < (this.x + this.w) && mouseY > this.y && mouseY < (this.y + this.h)) {
		return true;
	}
	return false;
};
LayersPanel.prototype.onPressed = function() {
    this.newLayerButton.onPressed();
    this.newSublayerButton.onPressed();
    this.deleteLayerButton.onPressed();
    this.list.onPressed();
};
LayersPanel.prototype.onReleased = function() {
    this.newLayerButton.onReleased();
    this.newSublayerButton.onReleased();
    this.deleteLayerButton.onReleased();
    this.list.onReleased();
};