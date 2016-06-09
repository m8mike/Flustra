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