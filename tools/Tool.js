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
Tool.prototype.draw = function() {
	
};
Tool.prototype.update = function() {
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
	this.draw(this.x + 5, this.y + 5);
};
Tool.prototype.onReleased = function() {
	
};
Tool.prototype.onPressed = function() {
	
};