var UndoTool = function(x, y) {
	Tool.call(this, x, y);
};
UndoTool.prototype = Object.create(Tool.prototype);
UndoTool.prototype.onClicked = function() {
	
};
UndoTool.prototype.setActive = function() {
	
};
UndoTool.prototype.onPressed = function() {
	Tool.prototype.onPressed.call(this);
};
UndoTool.prototype.onReleased = function() {
	Tool.prototype.onReleased.call(this);
};
UndoTool.prototype.update = function() {
	Tool.prototype.update.call(this);
};
UndoTool.prototype.draw = function() {
	Tool.prototype.draw.call(this);
	var x = this.x + 5;
	var y = this.y + 5;
	pushMatrix();
	translate(x, y+1);
	scale(0.08, 0.08);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
	// undo//
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(72.9, 1.5);
	ctx.lineTo(12.0, 95.3);
	ctx.lineTo(132.1, 95.3);
	ctx.lineTo(72.9, 1.5);
	ctx.closePath();
	ctx.fillStyle = "#ffffff";
	ctx.fill();
	ctx.restore();

	// undo//
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(74.8, 24.2);
	ctx.bezierCurveTo(74.8, 24.2, 76.0, 23.7, 78.4, 22.8);
	ctx.bezierCurveTo(79.0, 22.5, 79.8, 22.2, 80.7, 21.9);
	ctx.bezierCurveTo(81.5, 21.6, 82.3, 21.3, 83.3, 20.9);
	ctx.bezierCurveTo(85.2, 20.3, 87.3, 19.5, 89.8, 18.7);
	ctx.bezierCurveTo(99.5, 15.6, 113.6, 11.9, 131.1, 10.4);
	ctx.bezierCurveTo(139.9, 9.6, 149.5, 9.5, 159.8, 10.5);
	ctx.bezierCurveTo(170.0, 11.5, 181.0, 13.7, 191.9, 17.8);
	ctx.bezierCurveTo(202.7, 21.9, 213.5, 28.0, 222.7, 36.1);
	ctx.bezierCurveTo(232.0, 44.1, 239.5, 53.9, 245.0, 64.2);
	ctx.bezierCurveTo(250.5, 74.5, 254.1, 85.2, 256.3, 95.6);
	ctx.bezierCurveTo(256.6, 97.0, 256.9, 98.4, 257.1, 99.7);
	ctx.bezierCurveTo(257.4, 101.2, 257.5, 102.5, 257.8, 103.8);
	ctx.bezierCurveTo(257.9, 105.2, 258.1, 106.6, 258.2, 107.9);
	ctx.bezierCurveTo(258.3, 109.3, 258.4, 110.6, 258.5, 112.0);
	ctx.bezierCurveTo(258.8, 117.4, 258.6, 122.8, 258.1, 128.0);
	ctx.bezierCurveTo(256.9, 138.4, 253.9, 148.1, 249.9, 156.5);
	ctx.bezierCurveTo(245.9, 164.8, 240.9, 171.9, 235.9, 177.8);
	ctx.bezierCurveTo(230.8, 183.6, 225.6, 188.4, 220.8, 192.2);
	ctx.bezierCurveTo(216.0, 196.0, 211.6, 199.0, 207.9, 201.3);
	ctx.bezierCurveTo(204.2, 203.5, 201.2, 205.1, 199.1, 206.1);
	ctx.bezierCurveTo(197.0, 207.1, 195.9, 207.6, 195.9, 207.6);
	ctx.bezierCurveTo(195.9, 207.6, 196.9, 206.9, 198.7, 205.4);
	ctx.bezierCurveTo(200.4, 204.0, 203.0, 201.8, 206.0, 198.8);
	ctx.bezierCurveTo(209.0, 195.8, 212.5, 192.1, 216.1, 187.5);
	ctx.bezierCurveTo(219.7, 182.9, 223.3, 177.5, 226.6, 171.4);
	ctx.bezierCurveTo(229.8, 165.2, 232.5, 158.3, 234.1, 150.8);
	ctx.bezierCurveTo(235.7, 143.4, 236.2, 135.6, 235.2, 127.7);
	ctx.bezierCurveTo(234.7, 123.8, 233.8, 119.9, 232.7, 116.0);
	ctx.bezierCurveTo(232.4, 115.0, 232.1, 114.1, 231.8, 113.1);
	ctx.bezierCurveTo(231.4, 112.1, 231.1, 111.2, 230.7, 110.2);
	ctx.bezierCurveTo(230.3, 109.3, 230.0, 108.3, 229.6, 107.4);
	ctx.bezierCurveTo(229.2, 106.5, 228.7, 105.6, 228.3, 104.6);
	ctx.bezierCurveTo(226.5, 100.7, 224.6, 96.9, 222.4, 93.4);
	ctx.bezierCurveTo(220.2, 89.8, 217.9, 86.5, 215.3, 83.4);
	ctx.bezierCurveTo(212.8, 80.4, 210.1, 77.7, 207.2, 75.3);
	ctx.bezierCurveTo(204.3, 72.9, 201.3, 70.8, 198.2, 69.2);
	ctx.bezierCurveTo(192.0, 65.7, 185.4, 63.7, 178.8, 62.7);
	ctx.bezierCurveTo(172.1, 61.7, 165.4, 61.8, 158.9, 62.5);
	ctx.bezierCurveTo(152.4, 63.2, 146.2, 64.6, 140.6, 66.3);
	ctx.bezierCurveTo(134.9, 68.0, 129.8, 70.0, 125.4, 72.0);
	ctx.bezierCurveTo(121.0, 74.0, 117.2, 75.9, 114.2, 77.6);
	ctx.bezierCurveTo(112.7, 78.5, 111.4, 79.3, 110.3, 80.0);
	ctx.bezierCurveTo(109.7, 80.3, 109.2, 80.7, 108.7, 81.0);
	ctx.bezierCurveTo(108.3, 81.2, 108.0, 81.5, 107.6, 81.7);
	ctx.bezierCurveTo(107.5, 81.8, 107.3, 81.9, 107.2, 82.0);
	ctx.bezierCurveTo(107.0, 82.2, 106.8, 82.3, 106.6, 82.4);
	ctx.bezierCurveTo(106.2, 82.6, 105.9, 82.8, 105.7, 83.0);
	ctx.bezierCurveTo(105.2, 83.3, 104.9, 83.5, 104.9, 83.5);
	ctx.lineTo(74.8, 24.2);
	ctx.closePath();
	ctx.fillStyle = "#ffffff";
	ctx.fill();
	ctx.restore();
	popMatrix();
};