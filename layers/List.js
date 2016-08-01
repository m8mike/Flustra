var List = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.layers = [];
	this.scrollBar = new ScrollBar(x + w - 5, y, h);
	this.addLayer();
	this.active = this.layers[0];
	this.layers[0].active = true;
};
List.prototype.resize = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
	if (Math.abs(this.scrollBar.offsetY) > 0 && this.h - this.scrollBar.offsetY > this.scrollBar.listHeight) {
		this.scrollBar.offsetY += this.h - this.scrollBar.offsetY - this.scrollBar.listHeight;
	}
	if (this.scrollBar.offsetY > 0) {
		this.scrollBar.offsetY = 0;
	}
	this.scrollBar.resize(x + w - 5, y, h);
	var fullLength = this.layers.length * 20;
    if (fullLength < this.h) {
        this.scrollBar.size = this.scrollBar.maxSize;
    } else {
        this.scrollBar.size = this.scrollBar.maxSize * this.h / fullLength;
    }
};
List.prototype.addLayer = function() {
    this.layers.push(new Layer("Layer " + this.layers.length, this));
	this.resize(this.x, this.y, this.w, this.h);
    /*var fullLength = this.layers.length * 20;
    if (fullLength < this.h) {
        this.scrollBar.size = this.scrollBar.maxSize;
    } else {
        this.scrollBar.size = this.scrollBar.maxSize * this.h / fullLength;
    }*/
};
List.prototype.addSublayer = function() {
    println("addSublayer");
};
List.prototype.deleteLayer = function() {
    println("delete layer");
};
List.prototype.onPressed = function() {
	this.scrollBar.onPressed();
};
List.prototype.onReleased = function() {
	this.scrollBar.onReleased();
};
List.prototype.draw = function() {
    /*fill(99, 99, 99);
    rect(this.x, this.y, this.w, this.h);*/
    pushMatrix();
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.clip();
	var visibleCount = 0;
    for (var i = 0; i < this.layers.length; i++) {
		if (this.layers[i].draw(this.x, this.y + visibleCount * 20 + this.scrollBar.offsetY, this.w, 20)) {
			visibleCount++;
		}
    }
	this.scrollBar.listHeight = visibleCount * 20;
    popMatrix();
    this.scrollBar.draw();
};