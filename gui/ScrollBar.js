var ScrollBar = function(x, y, h) {
    this.x = x;
    this.y = y;
    this.w = 7;
    this.h = h;
    this.offsetY = 0;
    this.pos = 0;
    this.lastPos = 0;
    this.maxSize = h - 2 * this.w;
    this.size = this.maxSize;
    this.listHeight = 20;
    this.movingStarted = false;
    this.startOfTheMovement = 0;//y
};
ScrollBar.prototype.onTopButtonPressed = function() {
    this.pos -= 3 / this.listHeight;
	this.adjustPos();
};
ScrollBar.prototype.onBottomButtonPressed = function() {
    this.pos += 3 / this.listHeight;
	this.adjustPos();
};
ScrollBar.prototype.barPressed = function() {
    this.movingStarted = true;
    this.startOfTheMovement = mouseY;
    this.lastPos = this.pos;
};
ScrollBar.prototype.onPressed = function() {
    if (mouseX > this.x && mouseX < this.x + this.w) {
        if (mouseY > this.y && mouseY < this.y + this.w) {
            this.topButtonPressed = true;
			return true;
        } else if (mouseY > this.y + this.h - this.w && mouseY < this.y + this.h) {
            this.bottomButtonPressed = true;
			return true;
        } else if (mouseY > this.y + this.w + this.pos*this.maxSize && 
            mouseY < this.y + this.w + this.pos*this.maxSize + this.size) {
            this.barPressed();
			return true;
        }
    }
};
ScrollBar.prototype.onReleased = function() {
    this.movingStarted = false;
	this.topButtonPressed = false;
	this.bottomButtonPressed = false;
};
ScrollBar.prototype.onOut = function() {
    this.movingStarted = false;
};
ScrollBar.prototype.resize = function(x, y, h) {
	this.x = x;
	this.y = y;
    this.h = h;
	this.pos = Math.abs(this.offsetY) / this.listHeight;
    this.size = h * (h - 2 * this.w) * this.listHeight;
    this.maxSize = h - 2 * this.w;
};
ScrollBar.prototype.adjustPos = function() {
	if (this.pos < 0) {
		this.pos = 0;
		this.offsetY = 0;
	} else if (this.pos > (this.maxSize - this.size)/this.maxSize) {
		this.pos = (this.maxSize - this.size)/this.maxSize;
		this.offsetY = this.h - this.listHeight;
	} else {
		this.offsetY = (this.h - this.listHeight)/((this.maxSize - this.size)/this.maxSize)*this.pos;
	}
}
ScrollBar.prototype.draw = function() {
    if (this.movingStarted) {
		this.pos = this.lastPos + (mouseY - this.startOfTheMovement)/this.maxSize;
		this.adjustPos();
        /*var pos = (mouseY - this.startOfTheMovement)/this.maxSize;
        if (pos <= 0) {
            this.pos = 0;
            this.offsetY = 0;
        } else if (pos >= (this.maxSize - this.size)/this.maxSize) {
            this.pos = (this.maxSize - this.size)/this.maxSize;
            this.offsetY = this.h - this.listHeight;
        } else {
            this.pos = pos;
            this.offsetY = (this.h - this.listHeight)/((this.maxSize - this.size)/this.maxSize)*pos;
        }*/
    } else if (this.topButtonPressed) {
		this.onTopButtonPressed();
	} else if (this.bottomButtonPressed) {
		this.onBottomButtonPressed();
	}
	stroke(0, 0, 0);
    fill(0, 0, 0);
    rect(this.x, this.y, this.w, this.w);
    fill(0, 0, 0);
    rect(this.x, this.y + this.h - this.w, this.w, this.w);
	stroke(255, 0, 0);
    fill(255, 255, 255);
    rect(this.x-1, this.y + this.w + this.pos*(this.h - 2*this.w)-1, this.w, this.size);
	stroke(0, 255, 255);
    rect(this.x+1, this.y + this.w + this.pos*(this.h - 2*this.w)+1, this.w, this.size);
	stroke(0, 0, 0);
    rect(this.x, this.y + this.w + this.pos*(this.h - 2*this.w), this.w, this.size);
};