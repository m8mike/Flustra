var canvas, lp;
var mousePressed = function() {
	lp.checkSide();
	if (lp.sideMoving !== '') {
		lp.movingStarted = true;
	} else {
		lp.onPressed();
	}
};
setup = function() {
	canvas = document.getElementById("canvas");
	canvas.onmousedown = function(e){
		mousePressed();
	}
	size(window.innerWidth, window.innerHeight);
	//background(255, 255, 255);
	lp = new LayersPanel(window.innerWidth - 210, 10, 210, window.innerHeight - 20);
	lp.layers.push(new Layer("Layer 1", null));
	lp.draw();
	/*canvas.addEventListener('mousewheel',function(event){
		mouseController.wheel(event);
		return false; 
	}, false);*/
};
draw = function() {
	background(255, 255, 255);
	lp.draw();
	if (lp.movingStarted) {
		lp.resize();
	}
	if (!lp.movingStarted && mousePressed && mouseButton === LEFT) {
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