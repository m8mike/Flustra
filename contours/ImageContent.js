var ImageContent = function(img, x, y, angle, width, height) {
	this.img = img;
	this.x = x || 0;
	this.y = y || 0;
	this.angle = angle || 0;
	this.width = width || img.width;
	this.height = height || img.height;
	this.active = true;
	this.visible = true;
};
ImageContent.prototype.clone = function() {
	var imageContent = new ImageContent(this.img, this.x, this.y, this.angle, this.width, this.height);
	return imageContent;
};
ImageContent.prototype.drawContent = function() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
	pushMatrix();
	rotate(this.angle);
	ctx.drawImage(this.img, this.x, this.y);
	popMatrix();
};
ImageContent.prototype.draw = function() {
	if (this.visible) {
		this.drawContent();
	} else {
		return null;
	}
};

ImageContent.prototype.logProcessing = function() {
	
};
ImageContent.prototype.isPointInContour = function(x, y) {
	return false;
};
ImageContent.prototype.move = function(offset) {
	
};
ImageContent.prototype.rotate = function(center, angle) {
	
};
ImageContent.prototype.scale = function(center, ratio) {
	
};
ImageContent.prototype.isRectangleIntersectsContour = function(rect) {
	return false;
};
ImageContent.prototype.calculateBounds = function() {
	return false;
};
ImageContent.prototype.drawHandlers = function() {
	return false;
};