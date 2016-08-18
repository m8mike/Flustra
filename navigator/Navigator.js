var Navigator = function(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.movingStarted = false;
	this.sideMoving = '';
};
Navigator.prototype = Object.create(ResizablePanel.prototype);
Navigator.prototype.draw = function() {
	ResizablePanel.prototype.draw.call(this);//call superclass method
	copy(0, 0, window.innerWidth, window.innerHeight, this.x+5, this.y+15, this.w-10, this.h-30);
};
Navigator.prototype.resize = function() {
    ResizablePanel.prototype.resize.call(this);//call superclass method
};
Navigator.prototype.onPressed = function() {
	
};
Navigator.prototype.onReleased = function() {
	
};