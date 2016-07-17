var ScrollBar = function(x, y, h) {
    this.x = x;
    this.y = y;
    this.w = 5;
    this.h = h;
    this.offsetY = 0;
    this.pos = 0;
    this.maxSize = h - 2 * this.w;
    this.size = this.maxSize;
    this.listHeight = 0;
    this.movingStarted = false;
    this.startOfTheMovement = 0;//y
};
ScrollBar.prototype.topButtonPressed = function() {
    println("top");
};
ScrollBar.prototype.bottomButtonPressed = function() {
    println("bottom");
};
ScrollBar.prototype.barPressed = function() {
    this.movingStarted = true;
    this.startOfTheMovement = mouseY;
};
ScrollBar.prototype.onPressed = function() {
    if (mouseX > this.x && mouseX < this.x + this.w) {
        if (mouseY > this.y && mouseY < this.y + this.w) {
            this.topButtonPressed();
        } else if (mouseY > this.y + this.h - this.w && mouseY < this.y + this.h) {
            this.bottomButtonPressed();
        } else if (mouseY > this.y + this.w + this.pos*this.maxSize && 
            mouseY < this.y + this.w + this.pos*this.maxSize + this.size) {
            this.barPressed();
        }
    }
};
ScrollBar.prototype.onReleased = function() {
    this.movingStarted = false;
};
ScrollBar.prototype.resize = function(x, y, h) {
	this.x = x;
	this.y = y;
    this.h = h;
    //this.size *= (h - 2*this.w) / this.maxSize;
    this.maxSize = h - 2*this.w;
};
ScrollBar.prototype.draw = function() {
    if (this.movingStarted) {
        var pos = (mouseY - this.startOfTheMovement)/this.maxSize;
        if (pos <= 0) {
            this.pos = 0;
            this.offsetY = 0;
        } else if (pos >= (this.maxSize - this.size)/this.maxSize) {
            this.pos = (this.maxSize - this.size)/this.maxSize;
            this.offsetY = this.h - this.listHeight;
        } else {
            this.pos = pos;
            this.offsetY = (this.h - this.listHeight)/((this.maxSize - this.size)/this.maxSize)*pos;
        }
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