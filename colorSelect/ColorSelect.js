var ColorSelect = function() {
	this.fillColor = {r:255, g:255, b:0};
	this.strokeColor = {r:0, g:255, b:0};
	this.switchColors = new SwitchColors(100, window.innerHeight - 150);
	this.defaultColors = new DefaultColors(0, window.innerHeight - 50);
};
ColorSelect.prototype.draw = function() {
	//noStroke();
	fill(color(this.strokeColor.r, this.strokeColor.g, this.strokeColor.b));
	rect(0, window.innerHeight - 150, 100, 100);
	fill(color(this.fillColor.r, this.fillColor.g, this.fillColor.b));
	rect(50, window.innerHeight - 100, 100, 100);
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
ColorSelect.prototype.setFillColor = function(r, g, b) {
	this.fillColor.r = r;
	this.fillColor.g = g;
	this.fillColor.b = b;
};
ColorSelect.prototype.setStrokeColor = function(r, g, b) {
	this.strokeColor.r = r;
	this.strokeColor.g = g;
	this.strokeColor.b = b;
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
ColorSelect.prototype.onReleased = function() {
	if (mouseX > 50 && mouseX < 150 && mouseY > window.innerHeight - 100 && mouseY < window.innerHeight) {
		this.closePopups();
		var target = this;
		this.pf = new ColorCanvas.PickerPopup({color: colorToString(this.fillColor)}, target.setFillColor, target);
		this.pf.open({left: 100, top:window.innerHeight - 300});
		return true;
	} else if (mouseX > 0 && mouseX < 100 && mouseY > window.innerHeight - 150 && mouseY < window.innerHeight - 50) {
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