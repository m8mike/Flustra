var ColorSelect = function() {
	this.fillColor = {r:255, g:255, b:0, a:255};
	this.strokeColor = {r:0, g:255, b:0, a:255};
	this.fillEnabled = true;
	this.strokeEnabled = true;
	this.switchColors = new SwitchColors(100, window.innerHeight - 150);
	this.defaultColors = new DefaultColors(0, window.innerHeight - 50);
	this.strokeWidth = 5;
	this.oldStrokeWidth = 5;
	this.dragWidth = false;
	this.dragStart = 0;
};
ColorSelect.prototype.draw = function() {
	stroke(0, 0, 0);
	fill(92, 92, 92);
	rect(0, window.innerHeight - 180, 100, 30);
	fill(255, 255, 255);
	var widthStr = this.strokeWidth + " px";
	text("stroke", 50 - textWidth("stroke") / 2, window.innerHeight - 167);
	text(widthStr, 50 - textWidth(widthStr) / 2, window.innerHeight - 155);
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
ColorSelect.prototype.setColor = function(f, s) {
	this.fillColor.r = f.r;
	this.fillColor.g = f.g;
	this.fillColor.b = f.b;
	this.fillColor.a = f.a;
	this.strokeColor.r = s.r;
	this.strokeColor.g = s.g;
	this.strokeColor.b = s.b;
	this.strokeColor.a = s.a;
};
ColorSelect.prototype.getColors = function() {
	var fillColor = this.fillColor;
	var strokeColor = this.strokeColor;
	var f = {
		r:fillColor.r,
		g:fillColor.g,
		b:fillColor.b,
		a:fillColor.a
	};
	var s = {
		r:strokeColor.r,
		g:strokeColor.g,
		b:strokeColor.b,
		a:strokeColor.a
	};
	var c = {f:f, s:s};
	return c;
};
ColorSelect.prototype.setFillColor = function(r, g, b, a) {
	var colors = this.getColors();
	this.fillColor.r = r;
	this.fillColor.g = g;
	this.fillColor.b = b;
	this.fillColor.a = a;
	var colorSelect = this;
	history.addCommand(new ColorChangeCommand(colorSelect, colors.f, colors.s, this.fillColor, this.strokeColor));
};
ColorSelect.prototype.setStrokeColor = function(r, g, b, a) {
	var colors = this.getColors();
	this.strokeColor.r = r;
	this.strokeColor.g = g;
	this.strokeColor.b = b;
	this.strokeColor.a = a;
	var colorSelect = this;
	history.addCommand(new ColorChangeCommand(colorSelect, colors.f, colors.s, this.fillColor, this.strokeColor));
};
ColorSelect.prototype.update = function() {
	this.draw();
	if (!mousePressed) {
		if (this.dragWidth) {
			this.dragWidth = false;
			this.addStrokeChangeCommandToHistory();
		}
	}
	if (this.dragWidth) {
		if (this.oldStrokeWidth + this.dragStart - mouseY >= 1) {
			this.strokeWidth = this.oldStrokeWidth + this.dragStart - mouseY;
		} else {
			this.strokeWidth = 1;
		}
		var layers = lp.list.getVisibleLayers();
		for (var i = 0; i < layers.length; i++) {
			if (layers[i].contentSelected && layers[i].content) {
				layers[i].content.strokeWidth = this.strokeWidth;
			}
		}
	}
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
	} else if (mouseX > 0 && mouseX < 100 && mouseY > window.innerHeight - 180 && mouseY < window.innerHeight - 150) {
		this.dragWidth = true;
		this.dragStart = mouseY;
		this.oldStrokeWidth = this.strokeWidth;
		this.oldStrokeWidths = [];
		var layers = lp.list.getVisibleLayers();
		for (var i = 0; i < layers.length; i++) {
			if (layers[i].contentSelected && layers[i].content) {
				this.oldStrokeWidths.push(layers[i].content.strokeWidth);
			}
		}
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
	} else if (mouseX > 0 && mouseX < 100 && mouseY > window.innerHeight - 180 && mouseY < window.innerHeight - 150) {
		return true;
	}
	return false;
};
ColorSelect.prototype.addStrokeChangeCommandToHistory = function() {
	var contents = [];
	var layers = lp.list.getVisibleLayers();
	for (var i = 0; i < layers.length; i++) {
		if (layers[i].contentSelected && layers[i].content) {
			contents.push(layers[i].content);
		}
	}
	history.addCommand(new StrokeChangeCommand(contents, this.oldStrokeWidths, this.strokeWidth));
};
ColorSelect.prototype.onReleased = function() {
	if (this.dragWidth) {
		this.dragWidth = false;
		this.addStrokeChangeCommandToHistory();
		return true;
	}
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