var sketchProc = function(processingInstance) {
	sketchProc1(processingInstance);
	with (processingInstance) {
		var lp;
		setup = function() {
			size(window.innerWidth, window.innerHeight);
			//background(255, 255, 255);
			lp = new LayersPanel(window.innerWidth - 210, 10, 200, window.innerHeight - 20);
			lp.draw();
		};
		var LayersPanel = function(x, y, w, h) {
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
			this.movingStarted = false;
			this.sideMoving = '';
		};
		LayersPanel.prototype = Object.create(ResizablePanel.prototype);
		LayersPanel.prototype.draw = function() {
			ResizablePanel.prototype.draw.call(this);//call superclass method
			fill(255, 255, 255);
			text("Layers", this.x + 5, this.y + 12);
			text("0 Layers", this.x + 5, this.y + this.h - 3);
		};
		var Layer = function(name) {
			this.name = name;
			this.visible = true;
			this.locked = false;
			this.color = color(random(0, 255), random(0, 255), random(0, 255));
		};
		var ToolButton = function(x, y, w, h, name, action) {
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
			this.name = name;
			this.action = action;
		};
		ToolButton.prototype.draw = function() {
			stroke(0, 0, 0);
			fill(77, 77, 77);
			rect(this.x, this.y, this.w, this.h);
		};
		draw = function() {
			background(255, 255, 255);
			lp.draw();
			if (lp.movingStarted) {
				lp.resize();
			}
		};
		mousePressed = function() {
			if (!lp.movingStarted && mouseButton === LEFT) {
				lp.checkSide();
				if (lp.sideMoving !== '') {
					lp.movingStarted = true;
				}
			}
		};
		mouseReleased = function() {
			if (lp.movingStarted && mouseButton === LEFT) {
				lp.movingStarted = false;
				lp.sideMoving = '';
			}
		};
	}
};