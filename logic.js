var sketchProc = function(processingInstance) {
	with (processingInstance) {
		setup = function() {
			size(window.innerWidth, window.innerHeight);
			//background(255, 255, 255);
			var lp = new LayersPanel(290, 10);
			lp.draw();
		};
		//simple point in cartesian coordinates
		var Point = function(x, y) {
			this.x = x;
			this.y = y;
		};
		//clone point to pass by the value, not by the reference
		Point.prototype.clone = function() {
			return new Point(this.x, this.y);
		};
		//add value to x and to y
		Point.prototype.add = function(val) {
			this.x += val;
			this.y += val;
		};
		//checks if point equals another point
		Point.prototype.equals = function(point2) {
			if (point2.x === this.x && point2.y === this.y) {
				return true;
			}
			return false;
		};
		var polarToCartesian = function(radius, angle) {
			var cartesian = new Point(0, 0);
			cartesian.x = radius * Math.cos(angle);
			cartesian.y = radius * Math.sin(angle);
			return cartesian;
		};
		var ResizablePanel = function(x, y, w, h) {
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
			this.movingStarted = false;
			this.sideMoving = '';
		};
		ResizablePanel.prototype.drawCorner = function(x, y) {
			stroke(0, 0, 0);
			fill(204, 204, 204);
			ellipse(x, y, 8, 8);
		};
		ResizablePanel.prototype.drawSide = function(x, y, x1, y1) {
			stroke(255, 0, 0);
			line(x, y, x1, y1);
		};
		ResizablePanel.prototype.drawLUCorner = function() {
			this.drawCorner(this.x, this.y);
		};
		ResizablePanel.prototype.drawRUCorner = function() {
			this.drawCorner(this.x + this.w, this.y);
		};
		ResizablePanel.prototype.drawLDCorner = function() {
			this.drawCorner(this.x, this.y + this.h);
		};
		ResizablePanel.prototype.drawRDCorner = function() {
			this.drawCorner(this.x + this.w, this.y + this.h);
		};
		ResizablePanel.prototype.drawLSide = function() {
			this.drawSide(this.x, this.y, this.x, this.y + this.h);
		};
		ResizablePanel.prototype.drawRSide = function() {
			this.drawSide(this.x + this.w, this.y, this.x + this.w, this.y + this.h);
		};
		ResizablePanel.prototype.drawUSide = function() {
			this.drawSide(this.x, this.y, this.x + this.w, this.y);
		};
		ResizablePanel.prototype.drawDSide = function() {
			this.drawSide(this.x, this.y + this.h, this.x + this.w, this.y + this.h);
		};
		ResizablePanel.prototype.checkCorners = function() {
			if (this.movingStarted) {
				switch (this.sideMoving) {
					case "LU":
						this.drawLUCorner();
					break;
					case "RU":
						this.drawRUCorner();
					break;
					case "LD":
						this.drawLDCorner();
					break;
					case "RD":
						this.drawRDCorner();
					break;
					case "L":
						this.drawLSide();
					break;
					case "R":
						this.drawRSide();
					break;
					case "U":
						this.drawUSide();
					break;
					case "D":
						this.drawDSide();
					break;
				}
			} else if (dist(mouseX, mouseY, this.x, this.y) < 5) {
				this.drawLUCorner();
			} else if (dist(mouseX, mouseY, this.x + this.w, this.y) < 5) {
				this.drawRUCorner();
			} else if (dist(mouseX, mouseY, this.x, this.y + this.h) < 5) {
				this.drawLDCorner();
			} else if (dist(mouseX, mouseY, this.x + this.w, this.y + this.h) < 5) {
				this.drawRDCorner();
			} else if (Math.abs(mouseX - this.x) < 5) {
				this.drawLSide();
			} else if (Math.abs(mouseX - (this.x + this.w)) < 5) {
				this.drawRSide();
			} else if (Math.abs(mouseY - this.y) < 5) {
				this.drawUSide();
			} else if (Math.abs(mouseY - (this.y + this.h)) < 5) {
				this.drawDSide();
			}
		};
		ResizablePanel.prototype.checkSide = function() {
			if (dist(mouseX, mouseY, this.x, this.y) < 10) {
				this.sideMoving = "LU";
			} else if (dist(mouseX, mouseY, this.x + this.w, this.y) < 10) {
				this.sideMoving = "RU";
			} else if (dist(mouseX, mouseY, this.x, this.y + this.h) < 10) {
				this.sideMoving = "LD";
			} else if (dist(mouseX, mouseY, this.x + this.w, this.y + this.h) < 10) {
				this.sideMoving = "RD";
			} else if (Math.abs(mouseX - this.x) < 5) {
				this.sideMoving = "L";
			} else if (Math.abs(mouseX - (this.x + this.w)) < 5) {
				this.sideMoving = "R";
			} else if (Math.abs(mouseY - this.y) < 5) {
				this.sideMoving = "U";
			} else if (Math.abs(mouseY - (this.y + this.h)) < 5) {
				this.sideMoving = "D";
			}
		};
		ResizablePanel.prototype.resize = function() {
			var MIN_WIDTH = 100;
			if (this.sideMoving.includes("L")) {
				if (mouseX < this.x + this.w - MIN_WIDTH) {
					this.w = this.x - mouseX + this.w;
					this.x = mouseX;
				} else {
					this.x = this.w + this.x - MIN_WIDTH;
					this.w = MIN_WIDTH;
				}
			} else if (this.sideMoving.includes("R")) {
				if (mouseX > this.x + MIN_WIDTH) {
					this.w = mouseX-this.x;
				} else {
					this.w = MIN_WIDTH;
				}
			}
			var MIN_HEIGHT = 100;
			if (this.sideMoving.includes("U")) {
				if (mouseY < this.y + this.h - MIN_HEIGHT) {
					this.h = this.y - mouseY + this.h;
					this.y = mouseY;
				} else {
					this.y = this.h + this.y - MIN_HEIGHT;
					this.h = MIN_HEIGHT;
				}
			} else if (this.sideMoving.includes("D")) {
				if (mouseY > this.y + MIN_HEIGHT) {
					this.h = mouseY-this.y;
				} else {
					this.h = MIN_HEIGHT;
				}
			}
		};
		ResizablePanel.prototype.draw = function() {
			stroke(0, 0, 0);
			fill(92, 92, 92);
			rect(this.x, this.y, this.w, this.h);
			noFill();
			rect(this.x + 5, this.y + 15, this.w - 10, this.h - 30);
			this.checkCorners();
		};
		var LayersPanel = function(x, y) {
			this.x = x;
			this.y = y;
			this.w = 100;
			this.h = 300;
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