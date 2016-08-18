var WhiteArrowTool = function() {
	
};
WhiteArrowTool.prototype.draw = function(x, y) {
	pushMatrix();
	translate(x+5, y+1);
	scale(1.3, 1.3);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
	ctx.strokeStyle = '#000000';
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
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	popMatrix();
};