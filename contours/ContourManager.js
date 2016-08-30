var ContourManager = function() {
	
};
ContourManager.prototype.setActive = function(contour) {
	if (this.contour) {
		this.contour.active = false;
		this.contour.fixColor();
	}
	this.contour = contour;
	this.contour.active = true;
	colorSelect.setFillColor(this.contour.fillColor.r, this.contour.fillColor.g, this.contour.fillColor.b);
	colorSelect.setStrokeColor(this.contour.strokeColor.r, this.contour.strokeColor.g, this.contour.strokeColor.b);
	this.contour.fillColor = colorSelect.fillColor;
	this.contour.strokeColor = colorSelect.strokeColor;
	this.contour.fillEnabled = colorSelect.fillEnabled;
	this.contour.strokeEnabled = colorSelect.strokeEnabled;
};
ContourManager.prototype.addContour = function() {
	if (this.contour) {
		this.contour.active = false;
		this.contour.fixColor();
	}
	this.contour = new Contour();
	lp.list.addContour(this.contour);
};
ContourManager.prototype.onPressed = function() {
	if (!this.contour) {
		this.addContour();
	}
	var contour = this.contour;
    if (contour.closed) {
        if (!contour.points.length) {
            return null;
        }
        if (dist(contour.points[0].x, contour.points[0].y, getMouseX(), getMouseY()) < 4) {
            contour.points.splice(0, 1);
            if (contour.points.length <= 1) {
                contour.closed = false;
            }
            return null;
        }
		this.addContour();
		contour = this.contour;
    } else if (contour.points.length === 1) {
        if (dist(contour.points[0].x, contour.points[0].y, getMouseX(), getMouseY()) < 4) {
            contour.points.splice(0, 1);
            return null;
        }
    } else if (contour.points.length > 1) {
        if (dist(contour.points[0].x, contour.points[0].y, getMouseX(), getMouseY()) < 4) {
            contour.closed = true;
            return null;
        }
    }
    for (var i = 1; i < contour.points.length; i++) {
        if (dist(contour.points[i].x, contour.points[i].y, getMouseX(), getMouseY()) < 4) {
            contour.points.splice(i, 1);
            if (contour.points.length === 1) {
                contour.closed = false;
            }
            return null;
        }
    }
    contour.add(getMouseX(), getMouseY());
    contour.setMoving(true);
};
ContourManager.prototype.onReleased = function() {
	if (!this.contour) {
		return null;
	}
    this.contour.setMoving(false);
};
ContourManager.prototype.update = function() {
	if (!this.contour) {
		return null;
	}
	var contour = this.contour;
    if (contour.isMoving()) {
        contour.updateAnchors(getMouseX(), getMouseY());
    }
};