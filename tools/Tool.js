var Tool = function(x, y) {
	this.x = x;
	this.y = y;
};
Tool.prototype.checkMouse = function() {
	if (mouseX > this.x && mouseX < this.x + 30 && mouseY > this.y && mouseY < this.y + 30) {
		return true;
	}
	return false;
};
Tool.prototype.setActive = function() {
	tools.activeTool = this;
};
Tool.prototype.showHint = function() {
	if (this.toolName) {
		fill(0, 255, 0, 100);
		noStroke();
		rect(60, this.y+5, textWidth(this.toolName) + 10, 20);
		fill(0, 0, 0);
		text(this.toolName, 65, this.y + 20);
		stroke(0, 0, 0);
	}
};
Tool.prototype.draw = function() {
	if (tools.activeTool === this) {
		fill(71, 0, 112);
		rect(this.x, this.y, 30, 30);
	} else if (this.checkMouse()) {
		if (mousePressed) {
			fill(30, 30, 30);
		} else {
			fill(255, 154, 87);
		}
		rect(this.x, this.y, 30, 30);
	}
	if (this.checkMouse()) {
		this.showHint();
	}
};
Tool.prototype.update = function() {
	
};
Tool.prototype.onReleased = function() {
	
};
Tool.prototype.onPressed = function() {
	
};
Tool.prototype.onClicked = function() {
	
};