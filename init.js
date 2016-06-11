var lp;
void setup() {
	size(window.innerWidth, window.innerHeight);
	//background(255, 255, 255);
	lp = new LayersPanel(window.innerWidth - 210, 10, 210, window.innerHeight - 20);
	lp.draw();
	/*canvas.addEventListener('mousewheel',function(event){
		mouseController.wheel(event);
		return false; 
	}, false);*/
}
void draw() {
	background(255, 255, 255);
	lp.draw();
	if (lp.movingStarted) {
		lp.resize();
	}
}
void mousePressed() {
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
	if (mouseButton === LEFT) {
		lp.onReleased();
	}
	if (lp.movingStarted && mouseButton === LEFT) {
		lp.movingStarted = false;
		lp.sideMoving = '';
	}
}