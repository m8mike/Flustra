var DefaultColors = function(x, y) {
	this.x = x;
	this.y = y;
};
DefaultColors.prototype.checkMouse = function() {
	if (mouseX > this.x && mouseX < this.x + 50 && mouseY > this.y && mouseY < this.y + 50) {
		return true;
	}
	return false;
};
DefaultColors.prototype.onPressed = function() {
	return this.checkMouse();
};
DefaultColors.prototype.onReleased = function() {
	if (this.checkMouse()) {
		var f = {r:255, g:255, b:255};
		var s = {r:0, g:0, b:0};
		colorSelect.fillColor = f;
		colorSelect.strokeColor = s;
		if (contourManager.contour) {
			contourManager.contour.fillColor = f;
			contourManager.contour.strokeColor = s;
		}
	}
	return this.checkMouse();
};
DefaultColors.prototype.draw = function() {
	if (this.checkMouse()) {
		if (mousePressed) {
			fill(30, 30, 30);
		} else {
			fill(255, 0, 0);
		}
		rect(this.x, this.y, 50, 50);
	}
	pushMatrix();
	translate(this.x+5, this.y+5);
	scale(3, 3);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
	// defaultColors/
	ctx.save();
	// defaultColors/
	ctx.beginPath();
	ctx.moveTo(8.2, 8.4);
	ctx.lineTo(2.0, 8.4);
	ctx.lineTo(2.0, 2.2);
	ctx.lineTo(8.2, 2.2);
	ctx.lineTo(8.2, 8.4);
	ctx.closePath();
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.strokeStyle = "rgb(255, 255, 255)";
	ctx.lineWidth = 1;
	ctx.stroke();
	ctx.fill();
	ctx.beginPath();
	ctx.moveTo(10.6, 10.8);
	ctx.lineTo(4.4, 10.8);
	ctx.lineTo(4.4, 4.6);
	ctx.lineTo(10.6, 4.6);
	ctx.lineTo(10.6, 10.8);
	ctx.closePath();
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.strokeStyle = "rgb(0, 0, 0)";
	ctx.lineWidth = 1;
	ctx.stroke();
	ctx.fill();
	ctx.restore();
	popMatrix();
};