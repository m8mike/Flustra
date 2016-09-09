var RotateTool = function(x, y) {
	Tool.call(this, x, y);
	this.toolName = "Rotate";
};
RotateTool.prototype = Object.create(Tool.prototype);
RotateTool.prototype.onClicked = function() {
	
};
RotateTool.prototype.onPressed = function() {
	Tool.prototype.onPressed.call(this);
};
RotateTool.prototype.onReleased = function() {
	Tool.prototype.onReleased.call(this);
};
RotateTool.prototype.update = function() {
	Tool.prototype.update.call(this);
};
RotateTool.prototype.draw = function() {
	Tool.prototype.draw.call(this);
	var x = this.x + 5;
	var y = this.y + 5;
	pushMatrix();
	translate(x-2, y - 6);
	scale(1.5, 1.5);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
	// rotate/
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(4.6, 14.9);
	ctx.lineTo(0.6, 14.9);
	ctx.lineTo(0.6, 4.5);
	ctx.lineTo(4.6, 4.5);
	ctx.lineTo(4.6, 14.9);
	ctx.closePath();
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.fill();
	ctx.stroke();

	// rotate/
	ctx.beginPath();
	ctx.moveTo(9.0, 18.4);
	ctx.lineTo(6.2, 15.6);
	ctx.lineTo(13.5, 8.2);
	ctx.lineTo(16.3, 11.0);
	ctx.lineTo(9.0, 18.4);
	ctx.closePath();
	ctx.fillStyle = "rgb(0, 255, 0)";
	ctx.fill();
	ctx.stroke();

	ctx.strokeStyle = "rgb(0, 255, 0)";
	// rotate/
	ctx.beginPath();
	ctx.moveTo(10.8, 6.6);
	ctx.lineTo(10.8, 9.0);
	ctx.lineTo(8.6, 9.0);
	ctx.stroke();

	// rotate/
	ctx.beginPath();
	ctx.moveTo(4.6, 7.2);
	ctx.bezierCurveTo(4.6, 7.2, 8.0, 5.9, 10.8, 9.0);
	ctx.stroke();
	ctx.restore();
	popMatrix();
};