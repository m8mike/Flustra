console.log("logic");
var canvas;
var sketchProc = function(processingInstance) {
	with (processingInstance) {
		var ToolButton = function(x, y, name, action) {
			this.x = x;
			this.y = y;
			this.w = 14;
			this.h = 14;
			this.name = name;
			this.action = action;
			this.pressed = false;
			this.mouseIsOver = false;
		};
		ToolButton.prototype.draw = function() {
			if (this.pressed && this.mouseIsOver) {
				stroke(0, 0, 0);
				fill(41, 41, 41);
			} else if (this.mouseIsOver) {
				stroke(255, 255, 255);
				fill(145, 145, 145);
			} else {
				noStroke();
				fill(77, 77, 77);
			}
			rect(this.x, this.y, this.w, this.h);
		};
		ToolButton.prototype.onOver = function() {
			if (mouseX > this.x && mouseX < this.x + 14 &&
				mouseY > this.y && mouseY < this.y + 14) {
				this.mouseIsOver = true;
			} else {
				this.mouseIsOver = false;
			}
			return this.mouseIsOver;
		};
		ToolButton.prototype.onPressed = function() {
			this.pressed = this.onOver();
		};
		ToolButton.prototype.onReleased = function() {
			this.pressed = this.onOver();
			if (this.pressed && this.action) {
				this.action();
			}
			this.pressed = false;
		};
		var trace = function() {
			println("hello");
		};
		var LayersPanel = function(x, y) {
			this.x = x;
			this.y = y;
			this.w = 100;
			this.h = 300;
			this.movingStarted = false;
			this.sideMoving = '';
			this.newLayerButton = new ToolButton(this.x + 55, this.y + this.h - 14, "New Layer", trace);
		};
		LayersPanel.prototype = Object.create(ResizablePanel.prototype);
		LayersPanel.prototype.draw = function() {
			ResizablePanel.prototype.draw.call(this);//call superclass method
			fill(255, 255, 255);
			text("Layers", this.x + 5, this.y + 12);
			text("0 Layers", this.x + 5, this.y + this.h - 3);
			this.newLayerButton.draw();
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
		var Layer = function(name) {
			this.name = name;
			this.visible = true;
			this.locked = false;
			this.color = color(random(0, 255), random(0, 255), random(0, 255));
		};
		var lp = new LayersPanel(290, 10);
		lp.draw();
	}
};

var init = function() {
	canvas = document.getElementById("canvas");
	var processingInstance = new Processing(canvas, sketchProc);
};
init();