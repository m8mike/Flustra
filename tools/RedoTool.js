var RedoTool = function(x, y) {
	Tool.call(this, x, y);
	this.toolName = "Redo";
};
RedoTool.prototype = Object.create(Tool.prototype);
RedoTool.prototype.onClicked = function() {
};
RedoTool.prototype.setActive = function() {
	history.redo();
};
RedoTool.prototype.onPressed = function() {
	Tool.prototype.onPressed.call(this);
};
RedoTool.prototype.onReleased = function() {
	Tool.prototype.onReleased.call(this);
};
RedoTool.prototype.update = function() {
	Tool.prototype.update.call(this);
};
RedoTool.prototype.draw = function() {
	Tool.prototype.draw.call(this);
	var x = this.x + 5;
	var y = this.y + 5;
	pushMatrix();
	translate(x+2, y+1);
	scale(0.08, 0.08);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
	// redo//
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(185.8, 1.5);
	ctx.lineTo(246.6, 95.3);
	ctx.lineTo(126.6, 95.3);
	ctx.lineTo(185.8, 1.5);
	ctx.closePath();
	ctx.fillStyle = "#ffffff";
	ctx.fill();
	ctx.restore();
	// redo//
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(153.7, 83.5);
	ctx.bezierCurveTo(153.7, 83.5, 153.5, 83.3, 153.0, 83.0);
	ctx.bezierCurveTo(152.7, 82.8, 152.4, 82.6, 152.1, 82.4);
	ctx.bezierCurveTo(151.9, 82.3, 151.7, 82.2, 151.5, 82.0);
	ctx.bezierCurveTo(151.4, 81.9, 151.2, 81.8, 151.0, 81.7);
	ctx.bezierCurveTo(150.7, 81.5, 150.3, 81.2, 149.9, 81.0);
	ctx.bezierCurveTo(149.4, 80.7, 148.9, 80.3, 148.4, 80.0);
	ctx.bezierCurveTo(147.2, 79.3, 145.9, 78.5, 144.4, 77.6);
	ctx.bezierCurveTo(141.4, 75.9, 137.7, 74.0, 133.3, 72.0);
	ctx.bezierCurveTo(128.8, 70.0, 123.7, 68.0, 118.1, 66.3);
	ctx.bezierCurveTo(112.4, 64.6, 106.2, 63.2, 99.8, 62.5);
	ctx.bezierCurveTo(93.3, 61.8, 86.5, 61.7, 79.9, 62.7);
	ctx.bezierCurveTo(73.2, 63.7, 66.6, 65.7, 60.4, 69.2);
	ctx.bezierCurveTo(57.3, 70.8, 54.3, 72.9, 51.5, 75.3);
	ctx.bezierCurveTo(48.6, 77.7, 45.9, 80.4, 43.3, 83.4);
	ctx.bezierCurveTo(40.8, 86.5, 38.4, 89.8, 36.3, 93.4);
	ctx.bezierCurveTo(34.1, 96.9, 32.2, 100.7, 30.3, 104.6);
	ctx.bezierCurveTo(29.9, 105.6, 29.5, 106.5, 29.1, 107.4);
	ctx.bezierCurveTo(28.7, 108.3, 28.3, 109.3, 27.9, 110.2);
	ctx.bezierCurveTo(27.6, 111.2, 27.2, 112.1, 26.9, 113.1);
	ctx.bezierCurveTo(26.6, 114.1, 26.3, 115.0, 26.0, 116.0);
	ctx.bezierCurveTo(24.8, 119.9, 24.0, 123.8, 23.5, 127.7);
	ctx.bezierCurveTo(22.5, 135.6, 22.9, 143.4, 24.6, 150.8);
	ctx.bezierCurveTo(26.1, 158.3, 28.9, 165.2, 32.1, 171.4);
	ctx.bezierCurveTo(35.3, 177.5, 39.0, 182.9, 42.6, 187.5);
	ctx.bezierCurveTo(46.2, 192.1, 49.7, 195.8, 52.7, 198.8);
	ctx.bezierCurveTo(55.7, 201.8, 58.2, 204.0, 60.0, 205.4);
	ctx.bezierCurveTo(61.8, 206.9, 62.8, 207.6, 62.8, 207.6);
	ctx.bezierCurveTo(62.8, 207.6, 61.6, 207.1, 59.6, 206.1);
	ctx.bezierCurveTo(57.5, 205.1, 54.5, 203.5, 50.8, 201.3);
	ctx.bezierCurveTo(47.1, 199.0, 42.7, 196.0, 37.9, 192.2);
	ctx.bezierCurveTo(33.1, 188.4, 27.9, 183.6, 22.8, 177.8);
	ctx.bezierCurveTo(17.7, 171.9, 12.7, 164.8, 8.7, 156.5);
	ctx.bezierCurveTo(4.7, 148.1, 1.7, 138.4, 0.6, 128.0);
	ctx.bezierCurveTo(0.0, 122.8, -0.1, 117.4, 0.1, 112.0);
	ctx.bezierCurveTo(0.2, 110.6, 0.3, 109.3, 0.4, 107.9);
	ctx.bezierCurveTo(0.6, 106.6, 0.7, 105.2, 0.9, 103.8);
	ctx.bezierCurveTo(1.1, 102.5, 1.3, 101.2, 1.5, 99.7);
	ctx.bezierCurveTo(1.8, 98.4, 2.1, 97.0, 2.3, 95.6);
	ctx.bezierCurveTo(4.5, 85.2, 8.2, 74.5, 13.7, 64.2);
	ctx.bezierCurveTo(19.1, 53.9, 26.7, 44.1, 35.9, 36.1);
	ctx.bezierCurveTo(45.1, 28.0, 55.9, 21.9, 66.8, 17.8);
	ctx.bezierCurveTo(77.7, 13.7, 88.6, 11.5, 98.9, 10.5);
	ctx.bezierCurveTo(109.1, 9.5, 118.8, 9.6, 127.5, 10.4);
	ctx.bezierCurveTo(145.1, 11.9, 159.1, 15.6, 168.9, 18.7);
	ctx.bezierCurveTo(171.3, 19.5, 173.5, 20.3, 175.4, 20.9);
	ctx.bezierCurveTo(176.3, 21.3, 177.2, 21.6, 178.0, 21.9);
	ctx.bezierCurveTo(178.8, 22.2, 179.6, 22.5, 180.3, 22.8);
	ctx.bezierCurveTo(182.6, 23.7, 183.8, 24.2, 183.8, 24.2);
	ctx.lineTo(153.7, 83.5);
	ctx.closePath();
	ctx.fillStyle = "#ffffff";
	ctx.fill();
	ctx.restore();
	popMatrix();
};