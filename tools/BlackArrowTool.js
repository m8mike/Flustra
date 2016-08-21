var BlackArrowTool = function(x, y) {
	Tool.call(this, x, y);
};
BlackArrowTool.prototype = Object.create(Tool.prototype);
BlackArrowTool.prototype.onClicked = function() {
	
};
BlackArrowTool.prototype.onPressed = function() {
	Tool.prototype.onPressed.call(this);
};
BlackArrowTool.prototype.onReleased = function() {
	Tool.prototype.onReleased.call(this);
};
BlackArrowTool.prototype.update = function() {
	Tool.prototype.update.call(this);
};
BlackArrowTool.prototype.draw = function(x, y) {
	pushMatrix();
	translate(x+5, y+1);
	scale(1.3, 1.3);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(1.5, 1.3);
	ctx.lineTo(9.0, 9.7);
	ctx.lineTo(6.1, 9.7);
	ctx.lineTo(8.1, 13.7);
	ctx.lineTo(6.0, 14.8);
	ctx.lineTo(3.9, 10.9);
	ctx.lineTo(1.5, 13.2);
	ctx.lineTo(1.5, 1.3);
	ctx.closePath();
	ctx.fillStyle = "rgb(71, 0, 112)";
	ctx.fill();
	ctx.strokeStyle = "rgb(255, 255, 255)";
	ctx.stroke();
	ctx.restore();
	popMatrix();
};