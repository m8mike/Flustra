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
	var list = this.list;
	canvas.addEventListener('dblclick', list.onDoubleClick);
};
LayersPanel.prototype = Object.create(ResizablePanel.prototype);
LayersPanel.prototype.draw = function() {
	pushMatrix();
	translate(nav.camera.x, nav.camera.y);
	scale(1/nav.camera.scaleRatio);
	this.list.drawContent();
	if (contourManager) {
		var layers = this.list.getVisibleLayers();
		for (var i = 0; i < layers.length; i++) {
			if (layers[i].contentSelected && layers[i].content) {
				if (layers[i].content instanceof Contour) {
					layers[i].content.drawHandlers();
				}
			}
		}
		if (contourManager.contour) {
			contourManager.contour.drawPointsHandlers();
		}
	}
	popMatrix();
	ResizablePanel.prototype.draw.call(this);//call superclass method
	var x = this.x;
	var y = this.y;
	var w = this.w;
	var h = this.h;
	noFill();
	stroke(0, 0, 0);
	rect(x + 5, y + 15, w - 10, h - 30);
	fill(255, 255, 255);
	text("Layers", x + 5, y + 12);
	text("0 Layers", x + 5, y + h - 3);
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
	var x = this.x;
	var y = this.y;
	var w = this.w;
	var h = this.h;
    this.newLayerButton.x = x + 75;
    this.newLayerButton.y = y + h - 14;
    this.newSublayerButton.x = x + 95;
    this.newSublayerButton.y = y + h - 14;
    this.deleteLayerButton.x = x + 115;
    this.deleteLayerButton.y = y + h - 14;
	this.list.resize(x + 5, y + 15, w - 10, h - 30);
};
LayersPanel.prototype.onClicked = function() {
	this.list.onClicked();
};
LayersPanel.prototype.checkMouse = function() {
	var x = this.x;
	var y = this.y;
	var w = this.w;
	var h = this.h;
	if (mouseX > x && mouseX < (x + w) && mouseY > y && mouseY < (y + h)) {
		return true;
	}
	return false;
};
LayersPanel.prototype.selectEverything = function() {
	var selectChildren = function(layers) {
		for (var i = 0; i < layers.length; i++) {
			var layer = layers[i];
			if (layer.content && layer.contentVisible && !layer.locked) {
				layer.select();
			}
			selectChildren(layer.children);
		}
	};
	var layers = this.list.layers;
	selectChildren(layers);
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