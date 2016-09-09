var ScaleTool = function(x, y) {
	Tool.call(this, x, y);
	this.toolName = "Scale";
};
ScaleTool.prototype = Object.create(Tool.prototype);
ScaleTool.prototype.onClicked = function() {
	
};
ScaleTool.prototype.onPressed = function() {
	Tool.prototype.onPressed.call(this);
};
ScaleTool.prototype.onReleased = function() {
	Tool.prototype.onReleased.call(this);
};
ScaleTool.prototype.update = function() {
	Tool.prototype.update.call(this);
};
ScaleTool.prototype.draw = function() {
	Tool.prototype.draw.call(this);
	var x = this.x + 5;
	var y = this.y + 5;
	pushMatrix();
	translate(x-1, y);
	scale(1.5, 1.5);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
	
	// scale/
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(13.8, 13.8);
	ctx.lineTo(0.5, 13.8);
	ctx.lineTo(0.5, 0.5);
	ctx.lineTo(13.8, 0.5);
	ctx.lineTo(13.8, 13.8);
	ctx.closePath();
	ctx.fillStyle = "rgb(0, 255, 0)";
	ctx.fill();
	ctx.stroke();

	// scale/
	ctx.beginPath();
	ctx.moveTo(7.1, 7.4);
	ctx.lineTo(11.6, 2.8);
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.fill();
	ctx.stroke();

	// scale/
	ctx.beginPath();
	ctx.moveTo(7.9, 2.8);
	ctx.lineTo(11.6, 2.8);
	ctx.lineTo(11.6, 6.2);
	ctx.stroke();

	// scale/
	ctx.beginPath();
	ctx.moveTo(7.9, 13.6);
	ctx.lineTo(0.8, 13.6);
	ctx.lineTo(0.8, 6.4);
	ctx.lineTo(7.9, 6.4);
	ctx.lineTo(7.9, 13.6);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	popMatrix();
};