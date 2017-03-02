var lp;
var tools;
var contourManager;
var colorSelect;
var nav;

var ctrlKey = false;
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
	tools.activeTool.update();
	colorSelect.update();
}
void mousePressed() {
	if (mouseButton === RIGHT) {
		tools.activeTool.onRightPressed();
		return null;
	}
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
		if (colorSelect.onPressed()) {
			
		} else if (mouseButton === LEFT) {
			tools.activeTool.onPressed();
		} else if (mouseButton === RIGHT) {
			tools.activeTool.onRightPressed();
		}
	}
}
void mouseReleased() {
	if (mouseButton === RIGHT) {
		tools.activeTool.onRightReleased();
		return null;
	}
	if (lp.movingStarted) {
		lp.movingStarted = false;
		lp.sideMoving = '';
		//var canvas = document.getElementById("canvas");
		//canvas.style.cursor = "auto";
	}
	lp.onReleased();
	if (tools.onReleased()) {
		return null;
	}
	if (colorSelect.onReleased()) {
		return null;
	}
	if (lp.checkMouse()) {
		return null;
	}
	tools.activeTool.onReleased();
}
void mouseClicked() {
	if (!tools.checkMouse() && !lp.checkMouse() && !colorSelect.checkMouse()) {
		tools.activeTool.onClicked();
	}
}
void mouseOut() {
	lp.movingStarted = false;
	lp.sideMoving = '';
}
function KeyPress(e) {
	var evtobj = window.event? event : e;
	if (evtobj.keyCode == 65 && evtobj.ctrlKey) {
		lp.selectEverything();
	} else if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
		alert("Ctrl+z");
	} else if (evtobj.keyCode == 27) {
		tools.activeTool.onEsc();
	}
}
document.onkeydown = KeyPress;
float getMouseX() {
	return nav.camera.scaleRatio * (mouseX - nav.camera.x);
}
float getMouseY() {
	return nav.camera.scaleRatio * (mouseY - nav.camera.y);
}