var ContourManager = function() {
	
};
ContourManager.prototype.setActive = function(contour) {
	if (this.contour) {
		this.contour.active = false;
		this.contour.fixColor();
	}
	this.contour = contour;
	contour.active = true;
	contour.showAnchors();
	colorSelect.setFillColor(contour.fillColor.r, contour.fillColor.g, 
							 contour.fillColor.b, contour.fillColor.a);
	colorSelect.setStrokeColor(contour.strokeColor.r, contour.strokeColor.g, 
							   contour.strokeColor.b, contour.strokeColor.a);
	contour.fillColor = colorSelect.fillColor;
	contour.strokeColor = colorSelect.strokeColor;
	contour.fillEnabled = colorSelect.fillEnabled;
	contour.strokeEnabled = colorSelect.strokeEnabled;
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
	var points = contour.points;
	var maxDist = 4 * nav.camera.scaleRatio;
    if (contour.closed) {
        if (!points.length) {
            return null;
        }
        if (dist(points[0].x, points[0].y, getMouseX(), getMouseY()) < maxDist) {
            points.splice(0, 1);
            if (points.length <= 1) {
                contour.closed = false;
            }
            return null;
        }
		this.addContour();
		contour = this.contour;
    } else if (points.length === 1) {
        if (dist(points[0].x, points[0].y, getMouseX(), getMouseY()) < maxDist) {
            points.splice(0, 1);
            return null;
        }
    } else if (points.length > 1) {
        if (dist(points[0].x, points[0].y, getMouseX(), getMouseY()) < maxDist) {
            contour.closed = true;
            return null;
        }
    }
    for (var i = 1; i < points.length; i++) {
        if (dist(points[i].x, points[i].y, getMouseX(), getMouseY()) < maxDist) {
            points.splice(i, 1);
            if (points.length === 1) {
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