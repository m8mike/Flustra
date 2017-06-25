var RotateTool = function(x, y) {
	Tool.call(this, x, y);
	this.toolName = "Rotate";
    this.center = {x:0, y:0};
    this.start = {x:0, y:0};
    this.finish = {x:0, y:0};
	this.centerSelected = false;
	this.startSelected = false;
};
RotateTool.prototype = Object.create(Tool.prototype);
RotateTool.prototype.onClicked = function() {
	
};
RotateTool.prototype.onPressed = function() {
	Tool.prototype.onPressed.call(this);
};
RotateTool.prototype.onReleased = function() {
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
		var startAngle = Math.atan2(start.y - center.y, start.x - center.x);
		var finishAngle = Math.atan2(getMouseY() - center.y, getMouseX() - center.x);
		var angle = finishAngle - startAngle;
		var visibleLayers = lp.list.getVisibleLayers();
		var contentToRotate = [];
		for (var i = 0; i < visibleLayers.length; i++) {
			var layer = visibleLayers[i];
			if (!layer.content || !layer.contentSelected) {
				continue;
			}
			layer.content.rotate(center, angle);
			contentToRotate.push(layer.content);
		}
		history.addCommand(new RotateCommand(contentToRotate, center, angle));
		this.center = {x:0, y:0};
		this.start = {x:0, y:0};
		this.finish = {x:0, y:0};
		this.centerSelected = false;
		this.startSelected = false;
	}
};
RotateTool.prototype.onEsc = function() {
	this.center = {x:0, y:0};
	this.start = {x:0, y:0};
	this.finish = {x:0, y:0};
	this.centerSelected = false;
	this.startSelected = false;
};
RotateTool.prototype.update = function() {
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
			var startAngle = Math.atan2(start.y - center.y, start.x - center.x);
			var finishAngle = Math.atan2(getMouseY() - center.y, getMouseX() - center.x);
			if (finishAngle < startAngle) {
				finishAngle += 2 * PI;
			}
			var radius = dist(start.x, start.y, center.x, center.y) * 2;
			line(center.x, center.y, center.x + radius/2*cos(finishAngle), center.y + radius/2*sin(finishAngle));
			if (finishAngle - startAngle > PI) {
				arc(center.x, center.y, radius, radius, finishAngle-2*PI, startAngle);
			} else {
				arc(center.x, center.y, radius, radius, startAngle, finishAngle);
			}
			pushMatrix();
			translate(center.x, center.y);
			rotate(finishAngle - startAngle);
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
RotateTool.prototype.draw = function() {
	Tool.prototype.draw.call(this);
	var x = this.x + 5;
	var y = this.y + 5;
	pushMatrix();
	translate(x-2, y - 6);
	scale(1.5, 1.5);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
	// rotate/
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(4.6, 14.9);
	ctx.lineTo(0.6, 14.9);
	ctx.lineTo(0.6, 4.5);
	ctx.lineTo(4.6, 4.5);
	ctx.lineTo(4.6, 14.9);
	ctx.closePath();
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.fill();
	ctx.stroke();

	// rotate/
	ctx.beginPath();
	ctx.moveTo(9.0, 18.4);
	ctx.lineTo(6.2, 15.6);
	ctx.lineTo(13.5, 8.2);
	ctx.lineTo(16.3, 11.0);
	ctx.lineTo(9.0, 18.4);
	ctx.closePath();
	ctx.fillStyle = "rgb(0, 255, 0)";
	ctx.fill();
	ctx.stroke();

	ctx.strokeStyle = "rgb(0, 255, 0)";
	// rotate/
	ctx.beginPath();
	ctx.moveTo(10.8, 6.6);
	ctx.lineTo(10.8, 9.0);
	ctx.lineTo(8.6, 9.0);
	ctx.stroke();

	// rotate/
	ctx.beginPath();
	ctx.moveTo(4.6, 7.2);
	ctx.bezierCurveTo(4.6, 7.2, 8.0, 5.9, 10.8, 9.0);
	ctx.stroke();
	ctx.restore();
	popMatrix();
};