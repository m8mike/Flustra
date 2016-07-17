var List = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.layers = [];
	this.scrollBar = new ScrollBar(x + w, y, h);
};
List.prototype.resize = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
	this.scrollBar.resize(x + w, y, h);
};
List.prototype.addLayer = function() {
    this.layers.push(new Layer("Layer " + this.layers.length, this));
    var fullLength = this.layers.length * 50;
    if (fullLength < this.h) {
        this.scrollBar.size = this.scrollBar.maxSize;
    } else {
        this.scrollBar.size = this.scrollBar.maxSize * this.h / fullLength;
    }
};
List.prototype.addSublayer = function() {
    println("addSublayer");
};
List.prototype.deleteLayer = function() {
    println("delete layer");
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
		if (this.layers[i].visible) {
			this.layers[i].draw(this.x, this.y + visibleCount * 21, this.w, 20);
			visibleCount++;
		}
    }
    popMatrix();
    this.scrollBar.draw();
};