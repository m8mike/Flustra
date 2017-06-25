var Navigator = function(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.movingStarted = false;
	this.sideMoving = '';
	this.camera = new Camera();
};
Navigator.prototype = Object.create(ResizablePanel.prototype);
Navigator.prototype.draw = function() {
	ResizablePanel.prototype.draw.call(this);//call superclass method
	copy(0, 0, window.innerWidth, window.innerHeight, this.x+5, this.y+15, this.w-10, this.h-30);
};
Navigator.prototype.resize = function() {
    ResizablePanel.prototype.resize.call(this);//call superclass method
};
Navigator.prototype.checkMouse = function() {
	if (mouseX > this.x && mouseX < (this.x + this.w) && mouseY > this.y && mouseY < (this.y + this.h)) {
		return true;
	}
};
Navigator.prototype.onPressed = function() {
	
};
Navigator.prototype.onReleased = function() {
	
};