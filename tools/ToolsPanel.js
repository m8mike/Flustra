var ToolsPanel = function(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.blackArrow = new BlackArrowTool();
	this.whiteArrow = new WhiteArrowTool();
	this.pen = new PenTool();
	this.angle = new AngleTool();
	this.removePoint = new RemovePointTool();
	this.addPoint = new AddPointTool();
	this.activeTool = this.pen;
};
ToolsPanel.prototype.draw = function() {
	stroke(0, 0, 0);
	fill(92, 92, 92);
	rect(this.x, this.y, this.w, this.h);
	if (this.checkMouse()) {
		if (mousePressed) {
			fill(30, 30, 30);
		} else {
			fill(255, 154, 87);
		}
		if (mouseX < this.x + 30 && mouseY < this.y + 30) {
			if (this.activeTool !== this.blackArrow) {
				rect(this.x, this.y, 30, 30);
			}
		} else if (mouseY < this.y + 30) {
			if (this.activeTool !== this.whiteArrow) {
				rect(this.x + 30, this.y, 30, 30);
			}
		} else if (mouseX < this.x + 30 && mouseY < this.y + 60) {
			if (this.activeTool !== this.pen) {
				rect(this.x, this.y + 30, 30, 30);
			}
		} else if (mouseY < this.y + 60) {
			if (this.activeTool !== this.angle) {
				rect(this.x + 30, this.y + 30, 30, 30);
			}
		} else if (mouseX < this.x + 30 && mouseY < this.y + 90) {
			if (this.activeTool !== this.removePoint) {
				rect(this.x, this.y + 60, 30, 30);
			}
		} else if (mouseY < this.y + 90) {
			if (this.activeTool !== this.addPoint) {
				rect(this.x + 30, this.y + 60, 30, 30);
			}
		}
	}
	fill(71, 0, 112);
	if (this.activeTool === this.blackArrow) {
		rect(this.x, this.y, 30, 30);
	} else if (this.activeTool === this.whiteArrow) {
		rect(this.x + 30, this.y, 30, 30);
	} else if (this.activeTool === this.pen) {
		rect(this.x, this.y + 30, 30, 30);
	} else if (this.activeTool === this.angle) {
		rect(this.x + 30, this.y + 30, 30, 30);
	} else if (this.activeTool === this.removePoint) {
		rect(this.x, this.y + 60, 30, 30);
	} else if (this.activeTool === this.addPoint) {
		rect(this.x + 30, this.y + 60, 30, 30);
	}
	this.blackArrow.draw(this.x + 5, this.y + 5);
	this.whiteArrow.draw(this.x + 35, this.y + 5);
	this.pen.draw(this.x + 5, this.y + 35);
	this.angle.draw(this.x + 35, this.y + 35);
	this.removePoint.draw(this.x + 5, this.y + 65);
	this.addPoint.draw(this.x + 35, this.y + 65);
};
ToolsPanel.prototype.checkMouse = function() {
	if (mouseX > this.x && mouseX < (this.x + this.w) && mouseY > this.y && mouseY < (this.y + this.h)) {
		return true;
	}
}
ToolsPanel.prototype.onPressed = function() {
	return this.checkMouse();
};
ToolsPanel.prototype.onReleased = function() {
	if (this.checkMouse()) {
		if (mouseX < this.x + 30 && mouseY < this.y + 30) {
			this.activeTool = this.blackArrow;
		} else if (mouseY < this.y + 30) {
			this.activeTool = this.whiteArrow;
		} else if (mouseX < this.x + 30 && mouseY < this.y + 60) {
			this.activeTool = this.pen;
		} else if (mouseY < this.y + 60) {
			this.activeTool = this.angle;
		} else if (mouseX < this.x + 30 && mouseY < this.y + 90) {
			this.activeTool = this.removePoint;
		} else if (mouseY < this.y + 90) {
			this.activeTool = this.addPoint;
		}
		return true;
	}
	return false;
};