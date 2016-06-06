console.log("init")
var canvas, lp;
setup = function() {
	console.log("setup");
	canvas = document.getElementById("canvas");
	size(window.innerWidth, window.innerHeight);
	//background(255, 255, 255);
	lp = new LayersPanel(window.innerWidth - 210, 10, 200, window.innerHeight - 20);
	lp.draw();
};
draw = function() {
	console.log("draw");
	background(255, 255, 255);
	lp.draw();
	if (lp.movingStarted) {
		lp.resize();
	}
};
mousePressed = function() {
	console.log("mousePressed");
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
	console.log("mouseReleased");
	if (mouseButton === LEFT) {
		lp.onReleased();
	}
	if (lp.movingStarted && mouseButton === LEFT) {
		lp.movingStarted = false;
		lp.sideMoving = '';
	}
};