var canvas, stage, exportRoot;
/*var units = [];//from logic.js
var selectionTool;//from logic.js
var addWizard = function(x, y) {
	exportRoot = new lib.wizardus();
	exportRoot.scaleX = 0.1;
	exportRoot.scaleY = 0.1;
	exportRoot.x = x - 10.12;
	exportRoot.y = y - 14.25;
	exportRoot.cacheScale = 0.1;
	exportRoot.cache(10, 10, 20.24, 28.5);
	exportRoot.snapToPixel = true;
	stage.addChild(exportRoot);
	return exportRoot;
};*/

function init() {
	canvas = document.getElementById("canvas");
	//stage = new createjs.Stage(canvas);
	//stage.update();
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var processingInstance = new Processing(canvas, sketchProc);
	/*var selectionToolShape = new createjs.Shape();
	stage.addChild(selectionToolShape);
	createjs.Ticker.setFPS(24);
	createjs.Ticker.addEventListener("tick", function(e) {
		//console.log(createjs.Ticker.getMeasuredFPS());
		stage.update();
		for (var i = 0; i < units.length; i++) {
			if (Math.random() < 0.5) {
				continue;
			}
			if (units[i].destination) {
				units[i].costume.updateCache();
			} else {
				continue;
			}
			if (units[i].destination.x < units[i].x){
				units[i].costume.scaleX = -Math.abs(units[i].costume.scaleX);
			} else {
				units[i].costume.scaleX = Math.abs(units[i].costume.scaleX);
			}
		}
		selectionToolShape.graphics.clear();
		if (selectionTool) {
			if (selectionTool.started) {
				selectionToolShape.alpha = 0.5;
				selectionToolShape.graphics.beginFill("#0000FF").drawRect(
						selectionTool.start.x, selectionTool.start.y, 
						selectionTool.finish.x - selectionTool.start.x, 
						selectionTool.finish.y - selectionTool.start.y);
			}
		}
	});*/
};