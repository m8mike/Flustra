var Tool = function(x, y) {
	this.x = x;
	this.y = y;
	this.active = false;
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
	if (this.active) {
		fill(71, 0, 112);
		rect(this.x, this.y, 30, 30);
	} else {
		if (mousePressed) {
			fill(30, 30, 30);
		} else {
			fill(255, 154, 87);
		}
		if (checkMouse()) {
			rect(this.x, this.y, 30, 30);
		}
	}
	this.draw(this.x, this.y);
};
Tool.prototype.onReleased = function() {
	
};
Tool.prototype.onPressed = function() {
	
};