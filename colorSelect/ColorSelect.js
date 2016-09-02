var ColorSelect = function() {
	this.fillColor = {r:255, g:255, b:0, a:255};
	this.strokeColor = {r:0, g:255, b:0, a:255};
	this.fillEnabled = true;
	this.strokeEnabled = true;
	this.switchColors = new SwitchColors(100, window.innerHeight - 150);
	this.defaultColors = new DefaultColors(0, window.innerHeight - 50);
};
ColorSelect.prototype.draw = function() {
	if (this.strokeEnabled) {
		stroke(0, 0, 0);
		strokeWeight(1);
		//fill(color(this.strokeColor.r, this.strokeColor.g, this.strokeColor.b));
		fill(this.strokeColor.r, this.strokeColor.g, this.strokeColor.b, this.strokeColor.a);
		rect(0, window.innerHeight - 150, 100, 100);
	} else {
		stroke(0, 0, 0);
		strokeWeight(1);
		fill(255, 255, 255);
		rect(0, window.innerHeight - 150, 100, 100);
		stroke(255, 0, 0);
		strokeWeight(4);
		line(99, window.innerHeight - 148, 2, window.innerHeight - 51);
	}
	if (this.fillEnabled) {
		stroke(0, 0, 0);
		strokeWeight(1);
		//fill(color(this.fillColor.r, this.fillColor.g, this.fillColor.b));
		fill(this.fillColor.r, this.fillColor.g, this.fillColor.b, this.fillColor.a);
		rect(50, window.innerHeight - 100, 100, 100);
	} else {
		stroke(0, 0, 0);
		strokeWeight(1);
		fill(255, 255, 255);
		rect(50, window.innerHeight - 100, 100, 100);
		stroke(255, 0, 0);
		strokeWeight(4);
		line(149, window.innerHeight - 98, 52, window.innerHeight - 1);
	}
	stroke(0, 0, 0);
	strokeWeight(1);
	fill(255, 255, 255);
	rect(0, window.innerHeight - 70, 20, 20);
	rect(50, window.innerHeight - 20, 20, 20);
	stroke(255, 0, 0);
	strokeWeight(2);
	line(19, window.innerHeight - 68, 1, window.innerHeight - 50);
	line(69, window.innerHeight - 18, 51, window.innerHeight);
	strokeWeight(1);
	stroke(0, 0, 0);
	this.switchColors.draw();
	this.defaultColors.draw();
};
ColorSelect.prototype.closePopups = function() {
	if (this.pf) {
		this.pf.close();
	}
	if (this.ps) {
		this.ps.close();
	}
};
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function colorToString(col) {
	return rgbToHex(col.r, col.g, col.b);
}
ColorSelect.prototype.setFillColor = function(r, g, b, a) {
	this.fillColor.r = r;
	this.fillColor.g = g;
	this.fillColor.b = b;
	this.fillColor.a = a;
};
ColorSelect.prototype.setStrokeColor = function(r, g, b, a) {
	this.strokeColor.r = r;
	this.strokeColor.g = g;
	this.strokeColor.b = b;
	this.strokeColor.a = a;
};
ColorSelect.prototype.update = function() {
	this.draw();
};
ColorSelect.prototype.onPressed = function() {
	if (mouseX > 50 && mouseX < 150 && mouseY > window.innerHeight - 100 && mouseY < window.innerHeight) {
		return true;
	} else if (mouseX > 0 && mouseX < 100 && mouseY > window.innerHeight - 150 && mouseY < window.innerHeight - 50) {
		return true;
	} else if (this.switchColors.onPressed()) {
		return true;
	} else if (this.defaultColors.onPressed()) {
		return true;
	}
	return false;
};
ColorSelect.prototype.setFillEnabled = function(enabled) {
	this.fillEnabled = enabled;
	if (contourManager.contour) {
		contourManager.contour.fillEnabled = enabled;
	}
};
ColorSelect.prototype.setStrokeEnabled = function(enabled) {
	this.strokeEnabled = enabled;
	if (contourManager.contour) {
		contourManager.contour.strokeEnabled = enabled;
	}
};
ColorSelect.prototype.checkMouse = function() {
	if (mouseX > 50 && mouseX < 70 && mouseY > window.innerHeight - 20 && mouseY < window.innerHeight) {
		return true;
	} else if (mouseX > 50 && mouseX < 150 && mouseY > window.innerHeight - 100 && mouseY < window.innerHeight) {
		return true;
	} else if (mouseX > 0 && mouseX < 20 && mouseY > window.innerHeight - 70 && mouseY < window.innerHeight - 50) {
		return true;
	} else if (mouseX > 0 && mouseX < 100 && mouseY > window.innerHeight - 150 && mouseY < window.innerHeight - 50) {
		return true;
	} else if (this.defaultColors.checkMouse() || this.switchColors.checkMouse()) {
		return true;
	}
	return false;
};
ColorSelect.prototype.onReleased = function() {
	if (mouseX > 50 && mouseX < 70 && mouseY > window.innerHeight - 20 && mouseY < window.innerHeight) {
		this.setFillEnabled(false);
		return true;
	} else if (mouseX > 50 && mouseX < 150 && mouseY > window.innerHeight - 100 && mouseY < window.innerHeight) {
		this.setFillEnabled(true);
		this.closePopups();
		var target = this;
		this.pf = new ColorCanvas.PickerPopup({color: colorToString(this.fillColor)}, target.setFillColor, target);
		this.pf.open({left: 100, top:window.innerHeight - 300});
		return true;
	} else if (mouseX > 0 && mouseX < 20 && mouseY > window.innerHeight - 70 && mouseY < window.innerHeight - 50) {
		this.setStrokeEnabled(false);
		return true;
	} else if (mouseX > 0 && mouseX < 100 && mouseY > window.innerHeight - 150 && mouseY < window.innerHeight - 50) {
		this.setStrokeEnabled(true);
		this.closePopups();
		var target = this;
		this.ps = new ColorCanvas.PickerPopup({color: colorToString(this.strokeColor)}, target.setStrokeColor, target);
		this.ps.open({left: 50, top:window.innerHeight - 350});
		return true;
	} else if (this.switchColors.onReleased()) {
		return true;
	} else if (this.defaultColors.onReleased()) {
		return true;
	}
	return false;
};