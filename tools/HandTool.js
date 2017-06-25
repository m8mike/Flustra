var HandTool = function(x, y) {
	Tool.call(this, x, y);
	this.toolName = "Hand tool";
	this.start = {x:0, y:0};
	this.offset = {x:0, y:0};
	this.scaleBefore = 1;
	this.movingStarted = false;
	this.scalingStarted = false;
};
HandTool.prototype = Object.create(Tool.prototype);
HandTool.prototype.onClicked = function() {
	
};
HandTool.prototype.onRightPressed = function() {
	if (!this.scalingStarted) {
		this.scalingStarted = true;
		this.start.x = mouseX;
		this.start.y = mouseY;
		this.offset.x = nav.camera.x;
		this.offset.y = nav.camera.y;
		this.scaleBefore = nav.camera.scaleRatio;
	}
};
HandTool.prototype.onPressed = function() {
	//Tool.prototype.onPressed.call(this);
	if (!this.movingStarted && !this.scalingStarted) {
		if (keyPressed && keyCode === CONTROL) {
			this.scalingStarted = true;
			this.start.x = mouseX;
			this.start.y = mouseY;
			this.offset.x = nav.camera.x;
			this.offset.y = nav.camera.y;
			this.scaleBefore = nav.camera.scaleRatio;
			return null;
		}
		this.movingStarted = true;
		this.start.x = getMouseX();
		this.start.y = getMouseY();
	}
};
HandTool.prototype.onRightReleased = function() {
	if (this.scalingStarted) {
		nav.camera.scaleRatio = this.scaleBefore + (mouseY - this.start.y) / window.innerHeight;
		nav.camera.x = this.offset.x + this.start.x/this.scaleBefore - this.start.x/nav.camera.scaleRatio;
		nav.camera.y = this.offset.y + this.start.y/this.scaleBefore - this.start.y/nav.camera.scaleRatio;
		this.start.x = 0;
		this.start.y = 0;
		this.scalingStarted = false;
	}
};
HandTool.prototype.onReleased = function() {
	//Tool.prototype.onReleased.call(this);
	if (this.movingStarted) {
		this.movingStarted = false;
		nav.camera.x += (getMouseX() - this.start.x)/nav.camera.scaleRatio;
		nav.camera.y += (getMouseY() - this.start.y)/nav.camera.scaleRatio;
		this.start.x = 0;
		this.start.y = 0;
	}
	if (this.scalingStarted) {
		nav.camera.scaleRatio = this.scaleBefore + (mouseY - this.start.y) / window.innerHeight;
		nav.camera.x = this.offset.x + this.start.x/this.scaleBefore - this.start.x/nav.camera.scaleRatio;
		nav.camera.y = this.offset.y + this.start.y/this.scaleBefore - this.start.y/nav.camera.scaleRatio;
		this.start.x = 0;
		this.start.y = 0;
		this.scalingStarted = false;
	}
};
HandTool.prototype.update = function() {
	//Tool.prototype.update.call(this);
	if (this.scalingStarted) {
		nav.camera.scaleRatio = this.scaleBefore + (mouseY - this.start.y) / window.innerHeight;
		nav.camera.x = this.offset.x + this.start.x/this.scaleBefore - this.start.x/nav.camera.scaleRatio;
		nav.camera.y = this.offset.y + this.start.y/this.scaleBefore - this.start.y/nav.camera.scaleRatio;
	} else if (this.movingStarted) {
		nav.camera.x += (getMouseX() - this.start.x)/nav.camera.scaleRatio;
		nav.camera.y += (getMouseY() - this.start.y)/nav.camera.scaleRatio;
		this.start.x = getMouseX();
		this.start.y = getMouseY();
	}
};
HandTool.prototype.draw = function() {
	Tool.prototype.draw.call(this);
	var x = this.x + 5;
	var y = this.y + 5;
	pushMatrix();
	translate(x+1, y+1);
	scale(0.3, 0.3);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(23.6, 64.8);
	ctx.bezierCurveTo(23.6, 64.8, 22.0, 54.7, 19.0, 51.6);
	ctx.bezierCurveTo(15.9, 48.6, -0.4, 34.7, 3.0, 29.6);
	ctx.bezierCurveTo(6.3, 24.5, 19.9, 35.7, 19.9, 35.7);
	ctx.bezierCurveTo(19.9, 35.7, 21.9, 25.5, 15.5, 16.4);
	ctx.bezierCurveTo(8.5, 6.5, 23.0, -1.8, 30.4, 25.9);
	ctx.bezierCurveTo(30.4, 25.9, 32.5, 20.8, 30.4, 9.9);
	ctx.bezierCurveTo(29.4, 4.9, 37.5, -4.7, 41.9, 11.6);
	ctx.bezierCurveTo(43.0, 15.3, 41.9, 27.2, 41.9, 27.2);
	ctx.bezierCurveTo(41.9, 27.2, 43.5, 21.1, 43.7, 14.9);
	ctx.bezierCurveTo(43.9, 8.7, 44.8, 3.8, 49.1, 6.2);
	ctx.bezierCurveTo(55.4, 9.8, 53.5, 22.8, 52.0, 29.9);
	ctx.bezierCurveTo(52.0, 29.9, 55.4, 12.0, 60.4, 17.7);
	ctx.bezierCurveTo(65.3, 23.5, 62.9, 43.5, 56.3, 52.0);
	ctx.bezierCurveTo(53.9, 55.0, 53.8, 64.8, 53.8, 64.8);
	ctx.lineTo(23.6, 64.8);
	ctx.closePath();
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.fill();
	ctx.lineWidth = 5.0;
	ctx.strokeStyle = "rgb(12, 13, 14)";
	ctx.stroke();
	ctx.restore();
	popMatrix();
};