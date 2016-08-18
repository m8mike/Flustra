var SwitchColors = function(x, y) {
	this.x = x;
	this.y = y;
};
SwitchColors.prototype.checkMouse = function() {
	if (mouseX > this.x && mouseX < this.x + 50 && mouseY > this.y && mouseY < this.y + 50) {
		return true;
	}
	return false;
};
SwitchColors.prototype.onPressed = function() {
	return this.checkMouse();
};
SwitchColors.prototype.onReleased = function() {
	if (this.checkMouse()) {
		var f = colorSelect.fillColor;
		var s = colorSelect.strokeColor;
		colorSelect.fillColor = s;
		colorSelect.strokeColor = f;
		if (contourManager.contour) {
			contourManager.contour.fillColor = s;
			contourManager.contour.strokeColor = f;
		}
	}
	return this.checkMouse();
};
SwitchColors.prototype.draw = function() {
	if (this.checkMouse()) {
		if (mousePressed) {
			fill(30, 30, 30);
		} else {
			fill(255, 0, 0);
		}
		rect(this.x, this.y, 50, 50);
	}
	pushMatrix();
	translate(this.x+10, this.y+10);
	scale(3, 3);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
	// switchColors/
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(3.7, 3.4);
	ctx.bezierCurveTo(3.7, 3.4, 6.1, 2.0, 7.4, 3.3);
	ctx.bezierCurveTo(8.7, 4.7, 7.4, 7.1, 7.4, 7.1);
	ctx.lineTo(6.4, 7.6);
	ctx.bezierCurveTo(6.4, 7.6, 7.7, 5.1, 6.6, 4.2);
	ctx.bezierCurveTo(5.4, 3.0, 3.2, 4.4, 3.2, 4.4);
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.fill();
	ctx.lineWidth = 0.3;
	ctx.strokeStyle = "rgb(0, 0, 0)";
	// switchColors/
	ctx.beginPath();
	ctx.moveTo(3.7, 1.3);
	ctx.lineTo(3.7, 6.1);
	ctx.lineTo(1.1, 3.7);
	ctx.lineTo(3.7, 1.3);
	ctx.closePath();
	ctx.fill();
	ctx.lineWidth = 0.3;
	// switchColors/
	ctx.beginPath();
	ctx.moveTo(4.7, 7.2);
	ctx.lineTo(9.4, 7.2);
	ctx.lineTo(7.0, 9.7);
	ctx.lineTo(4.7, 7.2);
	ctx.closePath();
	ctx.fill();
	ctx.restore();
	popMatrix();
};