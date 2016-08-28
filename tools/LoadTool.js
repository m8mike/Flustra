var LoadTool = function(x, y) {
	Tool.call(this, x, y);
};
LoadTool.prototype = Object.create(Tool.prototype);
LoadTool.prototype.onClicked = function() {
	
};
LoadTool.prototype.setActive = function() {
	
};
LoadTool.prototype.onPressed = function() {
	Tool.prototype.onPressed.call(this);
};
LoadTool.prototype.onReleased = function() {
	Tool.prototype.onReleased.call(this);
};
LoadTool.prototype.update = function() {
	Tool.prototype.update.call(this);
};
LoadTool.prototype.draw = function() {
	Tool.prototype.draw.call(this);
	var x = this.x + 5;
	var y = this.y + 5;
	pushMatrix();
	translate(x+1, y+1);
	scale(0.3, 0.3);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
	// load/
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(57.9, 15.0);
	ctx.lineTo(43.8, 4.7);
	ctx.lineTo(6.3, 7.1);
	ctx.lineTo(5.3, 53.3);
	ctx.lineTo(36.6, 58.1);
	ctx.lineTo(57.9, 58.1);
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.fill();

	// load/
	ctx.beginPath();
	ctx.moveTo(36.6, 58.1);
	ctx.lineTo(2.5, 58.1);
	ctx.lineTo(2.5, 2.5);
	ctx.lineTo(49.1, 2.5);
	ctx.lineTo(57.9, 12.1);
	ctx.lineTo(57.9, 23.0);
	ctx.lineTo(52.1, 23.0);
	ctx.lineTo(51.8, 14.1);
	ctx.lineTo(46.2, 9.4);
	ctx.lineTo(8.8, 9.1);
	ctx.lineTo(8.8, 52.1);
	ctx.lineTo(31.6, 52.1);
	ctx.lineTo(36.6, 58.1);
	ctx.closePath();
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.fill();

	// load/
	ctx.beginPath();
	ctx.moveTo(16.7, 30.3);
	ctx.lineTo(16.7, 7.5);
	ctx.lineTo(31.6, 7.5);
	ctx.lineTo(31.6, 23.7);
	ctx.lineTo(37.6, 23.7);
	ctx.lineTo(37.6, 7.1);
	ctx.lineTo(43.8, 7.1);
	ctx.lineTo(43.8, 30.3);
	ctx.lineTo(16.7, 30.3);
	ctx.closePath();
	ctx.fill();

	// load/
	ctx.beginPath();
	ctx.moveTo(58.0, 60.4);
	ctx.lineTo(45.4, 60.4);
	ctx.lineTo(45.4, 44.7);
	ctx.lineTo(33.1, 44.7);
	ctx.lineTo(51.7, 24.1);
	ctx.lineTo(70.1, 44.5);
	ctx.lineTo(58.0, 44.5);
	ctx.lineTo(58.0, 60.4);
	ctx.closePath();
	ctx.fill();
	ctx.restore();
	popMatrix();
};