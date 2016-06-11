var ScrollBar = function(x, y, h) {
    this.x = x;
    this.y = y;
    this.w = 5;
    this.h = h;
    this.pos = 0;
    this.maxSize = h - 2*this.w;
    this.size = this.maxSize;
};
ScrollBar.prototype.resize = function(x, y, h) {
	this.x = x;
	this.y = y;
    this.h = h;
    this.maxSize = h - 2*this.w;
    this.size = this.maxSize;
};
ScrollBar.prototype.draw = function() {
    fill(0, 0, 0);
    rect(this.x, this.y, this.w, this.w);
    fill(0, 0, 0);
    rect(this.x, this.y + this.h - this.w, this.w, this.w);
    fill(255, 0, 0);
    rect(this.x, this.y + this.w + this.pos*(this.h - 2*this.w), this.w, this.size);
};