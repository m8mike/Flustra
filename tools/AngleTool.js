var AngleTool = function() {
	
};
AngleTool.prototype.draw = function(x, y) {
	pushMatrix();
	translate(x+6, y+3);
	scale(1.3, 1.3);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(1.2, 0.6);
	ctx.lineTo(8.8, 9.0);
	ctx.lineTo(7.3, 9.0);
	ctx.lineTo(1.8, 2.1);
	ctx.lineTo(2.2, 11.5);
	ctx.lineTo(1.2, 12.5);
	ctx.lineTo(1.2, 0.6);
	ctx.closePath();
	ctx.fill();
	ctx.lineWidth = 0.3;
	ctx.strokeStyle = "rgb(255, 255, 255)";
	ctx.stroke();
	ctx.restore();
	popMatrix();
};