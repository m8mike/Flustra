var canvas;

function init() {
	canvas = document.getElementById("canvas");
	var processingInstance = new Processing(canvas, sketchProc);
};