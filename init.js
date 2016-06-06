draw = function() {
	background(255, 255, 255);
	lp.draw();
	if (lp.movingStarted) {
		lp.resize();
	}
};
mousePressed = function() {
	if (!lp.movingStarted && mouseButton === LEFT) {
		lp.checkSide();
		if (lp.sideMoving !== '') {
			lp.movingStarted = true;
		} else {
			lp.onPressed();
		}
	}
};
mouseReleased = function() {
	if (mouseButton === LEFT) {
		lp.onReleased();
	}
	if (lp.movingStarted && mouseButton === LEFT) {
		lp.movingStarted = false;
		lp.sideMoving = '';
	}
};