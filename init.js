var lp;
var tools;
var contourManager;
var colorSelect;
var nav;
void setup() {
	size(window.innerWidth, window.innerHeight);
	//background(255, 255, 255);
	lp = new LayersPanel(window.innerWidth - 210, 10, 210, window.innerHeight - 20 - 200);
	tools = new ToolsPanel(0, 20, 60, window.innerHeight - 20 - 200);
	nav = new Navigator(window.innerWidth - 210, window.innerHeight - 10 - 200, 210, 200);
	//nav.draw();
	lp.draw();
	colorSelect = new ColorSelect();
	contourManager = new ContourManager(lp);
	/*canvas.addEventListener('mousewheel',function(event){
		mouseController.wheel(event);
		return false; 
	}, false);*/
}
void draw() {
	background(255, 255, 255);
	lp.draw();
	tools.draw();
	if (lp.movingStarted) {
		lp.resize();
	}
	contourManager.update();
	colorSelect.update();
}
void mousePressed() {
	var resizeOffset = 5;
	if (tools.onPressed()) {
		
	} else if ((mouseX > lp.x - resizeOffset) && (mouseX < lp.x + lp.w + resizeOffset) &&
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
		if (mouseButton === LEFT && !colorSelect.onPressed()) {
			contourManager.onPressed();
		}
	}
}
void mouseReleased() {
	if (mouseButton !== LEFT) {
		return null;
	}
	if (lp.movingStarted) {
		lp.movingStarted = false;
		lp.sideMoving = '';
		//var canvas = document.getElementById("canvas");
		//canvas.style.cursor = "auto";
	}
	contourManager.onReleased();
	lp.onReleased();
	if (tools.onReleased()) {
		return null;
	}
	if (colorSelect.onReleased()) {
		return null;
	}
}
void mouseOut() {
	lp.movingStarted = false;
	lp.sideMoving = '';
}