var ScaleTool = function(x, y) {
	Tool.call(this, x, y);
	this.toolName = "Scale";
    this.center = {x:0, y:0};
    this.start = {x:0, y:0};
    this.finish = {x:0, y:0};
	this.centerSelected = false;
	this.startSelected = false;
};
ScaleTool.prototype = Object.create(Tool.prototype);
ScaleTool.prototype.onClicked = function() {
	
};
ScaleTool.prototype.onPressed = function() {
	Tool.prototype.onPressed.call(this);
};
ScaleTool.prototype.onReleased = function() {
	Tool.prototype.onReleased.call(this);
	if (!this.centerSelected && !this.startSelected) {
		this.centerSelected = true;
		this.center.x = getMouseX();
		this.center.y = getMouseY();
	} else if (this.centerSelected && !this.startSelected) {
		if (getMouseX() == this.center.x && getMouseY() == this.center.y) {
			return null;
		}
		this.startSelected = true;
		this.start.x = getMouseX();
		this.start.y = getMouseY();
	} else if (this.startSelected) {
		var center = this.center;
		var start = this.start;
		var ratio = dist(getMouseX(), getMouseY(), center.x, center.y) / dist(start.x, start.y, center.x, center.y);
		var visibleLayers = lp.list.getVisibleLayers();
		var contentToScale = [];
		for (var i = 0; i < visibleLayers.length; i++) {
			var layer = visibleLayers[i];
			if (!layer.content || !layer.contentSelected) {
				continue;
			}
			layer.content.scale(center, ratio);
			contentToScale.push(layer.content);
		}
		history.addCommand(new ScaleCommand(contentToScale, center, ratio));
		this.center = {x:0, y:0};
		this.start = {x:0, y:0};
		this.finish = {x:0, y:0};
		this.centerSelected = false;
		this.startSelected = false;
	}
};
ScaleTool.prototype.onEsc = function() {
	this.center = {x:0, y:0};
	this.start = {x:0, y:0};
	this.finish = {x:0, y:0};
	this.centerSelected = false;
	this.startSelected = false;
};
ScaleTool.prototype.update = function() {
	Tool.prototype.update.call(this);
	if (this.centerSelected) {
		stroke(0, 0, 0);
		strokeWeight(1);
		noFill();
		var center = this.center;
		var start = this.start;
		pushMatrix();
		scale(1/nav.camera.scaleRatio);
		translate(nav.camera.x * nav.camera.scaleRatio, 
				  nav.camera.y * nav.camera.scaleRatio);
		if (this.startSelected) {
			line(center.x, center.y, start.x, start.y);
			line(center.x, center.y, getMouseX(), getMouseY());
			pushMatrix();
			translate(center.x, center.y);
			var ratio = dist(getMouseX(), getMouseY(), center.x, center.y) / dist(start.x, start.y, center.x, center.y);
			scale(ratio);
			translate(-center.x, -center.y);
			var visibleLayers = lp.list.getVisibleLayers();
			for (var i = 0; i < visibleLayers.length; i++) {
				var layer = visibleLayers[i];
				if (!layer.content || !layer.contentSelected) {
					continue;
				}
				layer.content.drawHandlers();
			}
			popMatrix();
		} else {
			line(center.x, center.y, getMouseX(), getMouseY());
		}
		popMatrix();
	}
};
ScaleTool.prototype.draw = function() {
	Tool.prototype.draw.call(this);
	var x = this.x + 5;
	var y = this.y + 5;
	pushMatrix();
	translate(x-1, y);
	scale(1.5, 1.5);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
	
	// scale/
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(13.8, 13.8);
	ctx.lineTo(0.5, 13.8);
	ctx.lineTo(0.5, 0.5);
	ctx.lineTo(13.8, 0.5);
	ctx.lineTo(13.8, 13.8);
	ctx.closePath();
	ctx.fillStyle = "rgb(0, 255, 0)";
	ctx.fill();
	ctx.stroke();

	// scale/
	ctx.beginPath();
	ctx.moveTo(7.1, 7.4);
	ctx.lineTo(11.6, 2.8);
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.fill();
	ctx.stroke();

	// scale/
	ctx.beginPath();
	ctx.moveTo(7.9, 2.8);
	ctx.lineTo(11.6, 2.8);
	ctx.lineTo(11.6, 6.2);
	ctx.stroke();

	// scale/
	ctx.beginPath();
	ctx.moveTo(7.9, 13.6);
	ctx.lineTo(0.8, 13.6);
	ctx.lineTo(0.8, 6.4);
	ctx.lineTo(7.9, 6.4);
	ctx.lineTo(7.9, 13.6);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	popMatrix();
};