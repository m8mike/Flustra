var ContourManager = function() {
	this.contour = new Contour();
};
ContourManager.prototype.onPressed = function() {
	var contour = this.contour;
    if (contour.closed) {
        if (!contour.points.length) {
            return null;
        }
        if (dist(contour.points[0].x, contour.points[0].y, mouseX, mouseY) < 4) {
            contour.points.splice(0, 1);
            if (contour.points.length <= 1) {
                contour.closed = false;
            }
            return null;
        }
    } else if (contour.points.length === 1) {
        if (dist(contour.points[0].x, contour.points[0].y, mouseX, mouseY) < 4) {
            contour.points.splice(0, 1);
            return null;
        }
    } else if (contour.points.length > 1) {
        if (dist(contour.points[0].x, contour.points[0].y, mouseX, mouseY) < 4) {
            contour.closed = true;
            return null;
        }
    }
    for (var i = 1; i < contour.points.length; i++) {
        if (dist(contour.points[i].x, contour.points[i].y, mouseX, mouseY) < 4) {
            contour.points.splice(i, 1);
            if (contour.points.length === 1) {
                contour.closed = false;
            }
            return null;
        }
    }
    if (contour.closed) {
        println("new contour");
        return null;
    }
    contour.add(mouseX, mouseY);
    contour.setMoving(true);
};
ContourManager.prototype.onReleased = function() {
    this.contour.setMoving(false);
};
ContourManager.prototype.update = function() {
    //background(255, 255, 255);
	var contour = this.contour;
    if (contour.isMoving()) {
        contour.updateAnchors(mouseX, mouseY);
    }
    contour.draw();
};