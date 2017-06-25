var LayerDrawingPart = function(parent) {
	this.parent = parent;
};
LayerDrawingPart.prototype.draw = function(x, y, w, h) {
	this.drawBackground(x, y, w, h);
	if (this.parent.contentVisible) {
		if (this.parent.parentsVisible()) {
			drawEye(x, y, false);
		} else {
			drawEye(x, y, true);
		}
	}
    if (this.parent.locked) {
		drawLock(x+20, y);
	}
	if (this.parent.active) {
		drawCheckMark(x+40, y);
	}
    this.drawColor(x+60, y+1, this.parent.color);
	this.drawText(x+90+this.parent.countParents()*20, y+16);
	if (this.parent.children.length == 0) {
		return true;
	}
	if (this.parent.childrenVisible) {
		this.drawTriangleOpen(x+70+this.parent.countParents()*20, y+2);
		for (var i = 0; i < this.parent.children.length; i++) {
			if (this.parent.children[i].deleted) {
				this.parent.children.splice(i, 1);
				break;
			}
		}
	} else {
		this.drawTriangle(x+70+this.parent.countParents()*20, y);
	 }
	return true;
};
LayerDrawingPart.prototype.drawBackground = function(x, y, w, h) {
	stroke(0, 0, 0);
	if (this.parent.layerSelected) {
		fill(255, 154, 87);
	} else if (this.parent.children.length > 0) {
		fill(97, 97, 97);
	} else {
		fill(112, 112, 112);
		//fill(0, 0, 0);
	}
    rect(x, y, w, h);
	stroke(100, 100, 100);
	line(x + 20, y + 1, x + 20, y + 19);
	line(x + 40, y + 1, x + 40, y + 19);
};
LayerDrawingPart.prototype.drawText = function(x, y) {
	fill(255,255,255);
	noStroke();
	text(this.parent.name, x, y);
};
LayerDrawingPart.prototype.drawTriangle = function(x, y) {
	noStroke();
	fill(color(255, 255, 255));
	triangle(x, y+4, x+10, y+10, x, y+16);
};
LayerDrawingPart.prototype.drawTriangleOpen = function(x, y) {
	noStroke();
	fill(color(255, 255, 255));
	pushMatrix();
	translate(x+15, y+5);
	pushMatrix();
	rotate(Math.PI/2);
	triangle(0, 4, 10, 10, 0, 16);
	popMatrix();
	popMatrix();
};
LayerDrawingPart.prototype.drawColor = function(x, y, col) {
	noStroke();
	fill(col.r, col.g, col.b, col.a);
	rect(x, y, 5, 19);
};
var drawCheckMark = function(x, y) {
	noStroke();
	fill(color(255, 255, 255));
	pushMatrix();
	translate(x + 3, y + 7);
	beginShape();
	vertex(0,0);
	vertex(5,5);
	vertex(15,-5);
	vertex(15,0);
	vertex(5,10);
	vertex(0,5);
	vertex(0,0);
	endShape();
	popMatrix();
};
var drawEye = function(x, y, grey) {
    pushMatrix();
    translate(x+2, y+5);
    scale(1.5);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    // eye/
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0.8, 2.9);
    ctx.bezierCurveTo(0.8, 2.9, 2.5, 0.3, 5.7, 0.3);
    ctx.bezierCurveTo(8.9, 0.3, 10.3, 2.9, 10.3, 2.9);
    ctx.lineTo(10.3, 4.2);
    ctx.bezierCurveTo(10.3, 4.2, 9.5, 6.7, 5.5, 6.7);
    ctx.bezierCurveTo(1.6, 6.7, 0.8, 4.4, 0.8, 4.4);
    ctx.lineTo(0.8, 2.9);
    ctx.closePath();
    ctx.fillStyle = grey?"rgb(155, 155, 155)":"rgb(255, 255, 255)";
    ctx.fill();

    // eye/
    ctx.beginPath();
    ctx.moveTo(1.8, 3.2);
    ctx.bezierCurveTo(1.8, 3.2, 2.9, 1.2, 5.8, 1.2);
    ctx.bezierCurveTo(8.6, 1.2, 9.5, 3.2, 9.5, 3.2);
    ctx.bezierCurveTo(9.5, 3.2, 5.8, 0.4, 1.8, 3.2);
    ctx.closePath();
    ctx.fillStyle = "rgb(12, 13, 14)";
    ctx.fill();

    // eye/
    ctx.beginPath();
    ctx.moveTo(2.9, 2.6);
    ctx.bezierCurveTo(2.9, 2.6, 5.9, 0.5, 7.9, 2.2);
    ctx.bezierCurveTo(7.9, 2.2, 8.6, 3.6, 7.5, 4.8);
    ctx.bezierCurveTo(6.5, 6.0, 3.7, 5.4, 3.2, 4.4);
    ctx.bezierCurveTo(2.8, 3.6, 2.9, 2.6, 2.9, 2.6);
    ctx.closePath();
    ctx.fill();

    // eye/
    ctx.beginPath();
    ctx.moveTo(7.2, 2.9);
    ctx.bezierCurveTo(7.2, 3.4, 6.8, 3.9, 6.3, 3.9);
    ctx.bezierCurveTo(5.7, 3.9, 5.3, 3.4, 5.3, 2.9);
    ctx.bezierCurveTo(5.3, 2.4, 5.7, 1.9, 6.3, 1.9);
    ctx.bezierCurveTo(6.8, 1.9, 7.2, 2.4, 7.2, 2.9);
    ctx.closePath();
    ctx.fillStyle = grey?"rgb(155, 155, 155)":"rgb(255, 255, 255)";
    ctx.fill();

    // eye/
    ctx.beginPath();
    ctx.moveTo(0.7, 2.9);
    ctx.bezierCurveTo(0.7, 2.9, 2.2, 0.0, 5.7, 0.0);
    ctx.bezierCurveTo(9.2, 0.0, 10.3, 2.9, 10.3, 2.9);
    ctx.bezierCurveTo(10.3, 2.9, 5.7, -2.0, 0.7, 2.9);
    ctx.closePath();
    ctx.fillStyle = "rgb(12, 13, 14)";
    ctx.fill();
    ctx.restore();
    popMatrix();
};
var drawLock = function(x, y) {
    pushMatrix();
    translate(x+5, y+3);
	scale(1.5);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    // lock/ 
    ctx.save();
    ctx.beginPath();

    // lock/ /
    ctx.moveTo(0.7, 3.1);
    ctx.bezierCurveTo(0.7, 3.1, 0.4, 0.0, 3.1, 0.0);
    ctx.bezierCurveTo(5.8, 0.0, 5.6, 3.1, 5.6, 3.1);
    ctx.lineTo(6.3, 3.1);
    ctx.bezierCurveTo(6.3, 3.1, 6.3, 5.4, 6.3, 7.1);
    ctx.bezierCurveTo(6.3, 8.9, 0.0, 8.6, 0.0, 7.1);
    ctx.bezierCurveTo(0.0, 5.6, 0.0, 3.1, 0.0, 3.1);
    ctx.lineTo(0.7, 3.1);
    ctx.closePath();

    // lock/ /
    ctx.moveTo(4.7, 3.1);
    ctx.bezierCurveTo(4.7, 3.1, 4.9, 0.8, 3.1, 0.8);
    ctx.bezierCurveTo(1.4, 0.8, 1.6, 3.1, 1.6, 3.1);
    ctx.lineTo(4.7, 3.1);
    ctx.closePath();
    ctx.fillStyle = "rgb(12, 13, 14)";
    ctx.fill();

    // lock/ 
    ctx.beginPath();

    // lock/ /
    ctx.moveTo(0.7, 3.6);
    ctx.bezierCurveTo(0.7, 3.6, 0.4, 0.5, 3.1, 0.5);
    ctx.bezierCurveTo(5.8, 0.5, 5.6, 3.5, 5.6, 3.5);
    ctx.lineTo(6.3, 3.5);
    ctx.bezierCurveTo(6.3, 3.5, 6.3, 5.9, 6.3, 7.6);
    ctx.bezierCurveTo(6.3, 9.3, 0.0, 9.1, 0.0, 7.6);
    ctx.bezierCurveTo(0.0, 6.1, 0.0, 3.6, 0.0, 3.6);
    ctx.lineTo(0.7, 3.6);
    ctx.closePath();

    // lock/ /
    ctx.moveTo(4.7, 3.6);
    ctx.bezierCurveTo(4.7, 3.6, 4.9, 1.3, 3.1, 1.3);
    ctx.bezierCurveTo(1.4, 1.3, 1.6, 3.6, 1.6, 3.6);
    ctx.lineTo(4.7, 3.6);
    ctx.closePath();
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fill();

    // lock/
    ctx.beginPath();
    ctx.moveTo(3.9, 7.1);
    ctx.lineTo(2.4, 7.1);
    ctx.lineTo(2.4, 5.4);
    ctx.lineTo(3.9, 5.4);
    ctx.lineTo(3.9, 7.1);
    ctx.closePath();
    ctx.fillStyle = "rgb(12, 13, 14)";
    ctx.fill();
    ctx.restore();
    popMatrix();
};