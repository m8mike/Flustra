var PictureTool = function(x, y) {
	Tool.call(this, x, y);
	this.toolName = "Place image (Picture tool)";
};
PictureTool.prototype = Object.create(Tool.prototype);
PictureTool.prototype.onClicked = function() {
	var img1 = new Image();
	img1.onload = function () {
		println(1);
		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img1, 0, 0);
	}
	img1.src = 'img/Home.jpg';
	//or
	b = loadImage("laDefense.jpg");
    image(b, 0, 0);
};
PictureTool.prototype.setActive = function() {
	
};
PictureTool.prototype.onPressed = function() {
	Tool.prototype.onPressed.call(this);
};
PictureTool.prototype.onReleased = function() {
	Tool.prototype.onReleased.call(this);
};
PictureTool.prototype.update = function() {
	Tool.prototype.update.call(this);
};
PictureTool.prototype.draw = function() {
	Tool.prototype.draw.call(this);
	var x = this.x + 5;
	var y = this.y + 5;
	pushMatrix();
	translate(x, y);
	noStroke();
	var a = this.checkMouse()?255:110;
	var b = 255;
	a = b - a;
	fill(b, a, a);
	rect(0, 0, 10, 10);
	fill(b, b, a);
	rect(10, 0, 10, 10);
	fill(a, b, a);
	rect(0, 10, 10, 10);
	fill(a, a, b);
	rect(10, 10, 10, 10);
	stroke(0, 0, 0);
	popMatrix();
};