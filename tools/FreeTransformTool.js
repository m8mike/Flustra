var FreeTransformTool = function(x, y) {
	Tool.call(this, x, y);
	this.toolName = "Free transform tool";
};
FreeTransformTool.prototype = Object.create(Tool.prototype);
FreeTransformTool.prototype.onClicked = function() {
	
};
FreeTransformTool.prototype.setActive = function() {
	
};
FreeTransformTool.prototype.onPressed = function() {
	Tool.prototype.onPressed.call(this);
};
FreeTransformTool.prototype.onReleased = function() {
	Tool.prototype.onReleased.call(this);
};
FreeTransformTool.prototype.update = function() {
	Tool.prototype.update.call(this);
};
FreeTransformTool.prototype.draw = function() {
	Tool.prototype.draw.call(this);
	var x = this.x + 5;
	var y = this.y + 5;
	fill(255, 255, 255);
	noStroke();
	pushMatrix();
	translate(x+11, y+10);
	scale(0.5);
	pushMatrix();
	triangle(-10, -15, 0, -25, 10, -15);
	rect(-5, -15, 10, 15);
	popMatrix();
	pushMatrix();
	rotate(Math.PI/2);
	triangle(-10, -15, 0, -25, 10, -15);
	rect(-5, -15, 10, 15);
	popMatrix();
	pushMatrix();
	rotate(Math.PI);
	triangle(-10, -15, 0, -25, 10, -15);
	rect(-5, -15, 10, 15);
	popMatrix();
	pushMatrix();
	rotate(-Math.PI/2);
	triangle(-10, -15, 0, -25, 10, -15);
	rect(-5, -15, 10, 15);
	popMatrix();
	popMatrix();
	stroke(0, 0, 0);
};