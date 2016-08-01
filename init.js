var lp;
var contourManager;
void setup() {
	size(window.innerWidth, window.innerHeight);
	//background(255, 255, 255);
	contourManager = new ContourManager();
	lp = new LayersPanel(window.innerWidth - 210, 10, 210, window.innerHeight - 20);
	lp.draw();
	/*canvas.addEventListener('mousewheel',function(event){
		mouseController.wheel(event);
		return false; 
	}, false);*/
}
void draw() {
	background(255, 255, 255);
	contourManager.update();
	lp.draw();
	if (lp.movingStarted) {
		lp.resize();
	}
}
void mousePressed() {
	var resizeOffset = 5;
	if ((mouseX > lp.x - resizeOffset) && (mouseX < lp.x + lp.w + resizeOffset) &&
		(mouseY > lp.y - resizeOffset) && (mouseY < lp.y + lp.h + resizeOffset)) {
		if (!lp.movingStarted && mouseButton === LEFT) {
			lp.checkSide();
			//var canvas = document.getElementById("canvas");
			//canvas.style.cursor = "ew-resize";
			if (lp.sideMoving.length > 0 && lp.sideMoving.length < 3) {
				lp.movingStarted = true;
			} else {
				lp.onPressed();
			}
		}
	} else {
		if (mouseButton === LEFT) {
			contourManager.onPressed();
		}
	}
}
void mouseReleased() {
	if (lp.movingStarted && mouseButton === LEFT) {
		lp.movingStarted = false;
		lp.sideMoving = '';
		//var canvas = document.getElementById("canvas");
		//canvas.style.cursor = "auto";
	}
	if (mouseButton === LEFT) {
		contourManager.onReleased();
		lp.onReleased();
	}
}
void mouseOut() {
	lp.movingStarted = false;
	lp.sideMoving = '';
}