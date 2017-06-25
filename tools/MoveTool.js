var MoveTool = function(x, y) {
	Tool.call(this, x, y);
	this.toolName = "Move";
    this.start = {x:0, y:0};
    this.finish = {x:0, y:0};
	this.movingStarted = false;
};
MoveTool.prototype = Object.create(Tool.prototype);
MoveTool.prototype.onClicked = function() {
	
};
MoveTool.prototype.onPressed = function() {
	Tool.prototype.onPressed.call(this);
	
};
MoveTool.prototype.onReleased = function() {
	Tool.prototype.onReleased.call(this);
	var layers = lp.list.getVisibleLayers();
	this.finish.x = getMouseX();
	this.finish.y = getMouseY();
	if (this.movingStarted) {
		this.movingStarted = false;
		var offsetX = getMouseX() - this.start.x;
		var offsetY = getMouseY() - this.start.y;
		//move every selected layer
		var contoursToMove = [];
		for (var i = 0; i < layers.length; i++) {
			var layer = layers[i];
			if (!layer.content || !layer.contentSelected) {
				continue;
			}
			contoursToMove.push(layer.content);
			layer.content.move(offsetX, offsetY);
		}
		history.addCommand(new MoveCommand(contoursToMove, offsetX, offsetY));
	} else {
		this.movingStarted = true;
		this.start.x = getMouseX();
		this.start.y = getMouseY();
		this.finish = {x:this.start.x, y:this.start.y};
	}
};
MoveTool.prototype.onEsc = function() {
    this.start = {x:0, y:0};
    this.finish = {x:0, y:0};
	this.movingStarted = false;
};
MoveTool.prototype.update = function() {
	Tool.prototype.update.call(this);
	if (this.movingStarted) {
		pushMatrix();
		scale(1/nav.camera.scaleRatio);
		translate(getMouseX() - this.start.x + nav.camera.x * nav.camera.scaleRatio, 
				  getMouseY() - this.start.y + nav.camera.y * nav.camera.scaleRatio);
		strokeWeight(1);
		stroke(0, 0, 0);
		var visibleLayers = lp.list.getVisibleLayers();
		for (var i = 0; i < visibleLayers.length; i++) {
			var layer = visibleLayers[i];
			if (!layer.content || !layer.contentSelected) {
				continue;
			}
			layer.content.drawHandlers();
		}
		popMatrix();
	}
};
MoveTool.prototype.draw = function() {
	Tool.prototype.draw.call(this);
	var x = this.x + 5;
	var y = this.y + 5;
	pushMatrix();
	translate(x-3, y-1);
	scale(1.5, 1.5);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
	// move/
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(7.3, 14.5);
	ctx.lineTo(2.8, 14.5);
	ctx.lineTo(2.8, 10.0);
	ctx.lineTo(7.3, 10.0);
	ctx.lineTo(7.3, 14.5);
	ctx.closePath();
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.fill();
	ctx.stroke();

	// move/
	ctx.beginPath();
	ctx.moveTo(16.3, 5.5);
	ctx.lineTo(11.7, 5.5);
	ctx.lineTo(11.7, 0.9);
	ctx.lineTo(16.3, 0.9);
	ctx.lineTo(16.3, 5.5);
	ctx.closePath();
	ctx.fillStyle = "rgb(0, 255, 0)";
	ctx.fill();
	ctx.stroke();

	// move/
	ctx.beginPath();
	ctx.moveTo(7.3, 10.0);
	ctx.lineTo(10.8, 6.4);
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.strokeStyle = "rgb(0, 255, 0)";
	ctx.fill();
	ctx.stroke();

	// move/
	ctx.beginPath();
	ctx.moveTo(7.9, 6.4);
	ctx.lineTo(10.8, 6.4);
	ctx.lineTo(10.8, 9.0);
	ctx.stroke();
	ctx.restore();
	popMatrix();
};