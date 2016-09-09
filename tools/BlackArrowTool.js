var BlackArrowTool = function(x, y) {
	Tool.call(this, x, y);
	this.start = null;
	this.toolName = "Black arrow (to edit contours)";
};
BlackArrowTool.prototype = Object.create(Tool.prototype);
/*BlackArrowTool.prototype.onClicked = function() {
	for (var i = lp.list.layers.length - 1; i >= 0; i--) {
		var layer = lp.list.layers[i];
		if (layer.locked || !layer.contentVisible || !layer.content) {
			continue;
		}
		if (layer.content.isPointInContour(getMouseX(), getMouseY())) {
			contourManager.setActive(layer.content);
			return null;
		}
	}
};*/
BlackArrowTool.prototype.onPressed = function() {
	this.start = {x:getMouseX(), y:getMouseY()};
	Tool.prototype.onPressed.call(this);
};
BlackArrowTool.prototype.onReleased = function() {
	Tool.prototype.onReleased.call(this);
};
BlackArrowTool.prototype.update = function() {
	Tool.prototype.update.call(this);
};
BlackArrowTool.prototype.draw = function() {
	Tool.prototype.draw.call(this);
	var x = this.x + 5;
	var y = this.y + 5;
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