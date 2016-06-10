var lp;
void setup() {
	size(window.innerWidth, window.innerHeight);
	//background(255, 255, 255);
	lp = new LayersPanel(window.innerWidth - 210, 10, 210, window.innerHeight - 20);
	lp.layers.push(new Layer("Layer 1", null));
	lp.draw();
	/*canvas.addEventListener('mousewheel',function(event){
		mouseController.wheel(event);
		return false; 
	}, false);*/
}
var draw() {
	background(255, 255, 255);
	lp.draw();
	if (lp.movingStarted) {
		lp.resize();
	}
}
void mousePressed() {
	console.log("pressed");
	if (!lp.movingStarted && mouseButton === LEFT) {
		lp.checkSide();
		if (lp.sideMoving !== '') {
			lp.movingStarted = true;
		} else {
			lp.onPressed();
		}
	}
}
void mouseReleased() {
	console.log("released");
	if (mouseButton === LEFT) {
		lp.onReleased();
	}
	if (lp.movingStarted && mouseButton === LEFT) {
		lp.movingStarted = false;
		lp.sideMoving = '';
	}
}