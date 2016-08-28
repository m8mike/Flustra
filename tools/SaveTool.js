var SaveTool = function(x, y) {
	Tool.call(this, x, y);
};
SaveTool.prototype = Object.create(Tool.prototype);
SaveTool.prototype.onClicked = function() {
	
};
SaveTool.prototype.setActive = function() {
	
};
SaveTool.prototype.onPressed = function() {
	Tool.prototype.onPressed.call(this);
};
SaveTool.prototype.onReleased = function() {
	Tool.prototype.onReleased.call(this);
};
SaveTool.prototype.update = function() {
	Tool.prototype.update.call(this);
};
SaveTool.prototype.draw = function() {
	Tool.prototype.draw.call(this);
	var x = this.x + 5;
	var y = this.y + 5;
	pushMatrix();
	translate(x, y+1);
	scale(0.3, 0.3);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
	// save/
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(60.7, 14.7);
	ctx.lineTo(46.6, 4.4);
	ctx.lineTo(9.2, 6.9);
	ctx.lineTo(8.1, 53.1);
	ctx.lineTo(39.4, 57.8);
	ctx.lineTo(60.7, 57.8);
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.fill();

	// save/
	ctx.beginPath();
	ctx.moveTo(39.4, 57.8);
	ctx.lineTo(5.3, 57.8);
	ctx.lineTo(5.3, 2.2);
	ctx.lineTo(51.9, 2.2);
	ctx.lineTo(60.7, 11.8);
	ctx.lineTo(60.7, 22.7);
	ctx.lineTo(54.9, 22.7);
	ctx.lineTo(54.6, 13.8);
	ctx.lineTo(49.0, 9.2);
	ctx.lineTo(11.6, 8.9);
	ctx.lineTo(11.6, 51.9);
	ctx.lineTo(34.4, 51.9);
	ctx.lineTo(39.4, 57.8);
	ctx.closePath();
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.fill();

	// save/
	ctx.beginPath();
	ctx.moveTo(19.5, 30.0);
	ctx.lineTo(19.5, 7.2);
	ctx.lineTo(34.4, 7.2);
	ctx.lineTo(34.4, 23.4);
	ctx.lineTo(40.4, 23.4);
	ctx.lineTo(40.4, 6.9);
	ctx.lineTo(46.6, 6.9);
	ctx.lineTo(46.6, 30.0);
	ctx.lineTo(19.5, 30.0);
	ctx.closePath();
	ctx.fill();

	// save/
	ctx.beginPath();
	ctx.moveTo(48.1, 28.8);
	ctx.lineTo(60.7, 28.8);
	ctx.lineTo(60.7, 44.5);
	ctx.lineTo(72.9, 44.5);
	ctx.lineTo(54.3, 65.1);
	ctx.lineTo(35.9, 44.7);
	ctx.lineTo(48.1, 44.7);
	ctx.lineTo(48.1, 28.8);
	ctx.closePath();
	ctx.fill();
	ctx.restore();
	popMatrix();
};