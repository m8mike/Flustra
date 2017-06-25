var LoadTool = function(x, y) {
	Tool.call(this, x, y);
	this.toolName = "Load";
};
LoadTool.prototype = Object.create(Tool.prototype);
LoadTool.prototype.onClicked = function() {
	
};
LoadTool.prototype.parseLayers = function(codeString) {
	//println(codeString);
	//console.log("start");
	var findIds = function(from, what) {
		var i = from.indexOf(what);
		if (i == -1) {
			return [];
		}
		var whereTo = [i];
		var a = i+1;
		while (a != i) {
			a = from.indexOf(what, a+1);
			if (a != -1 && a != i) {
				whereTo.push(a);
			}
		}
		return whereTo;
	};
	
	var shapes = findIds(codeString, "beginShape();");
	if (!shapes) {
		return null;
	}
	if (shapes.length <= 1) {
		return null;
	}
	
	var fills = findIds(codeString, "fill(");
	var fillColors = findIds(codeString, "fill(color(");
	var noFills = findIds(codeString, "noFill(");
	var strokes = findIds(codeString, "stroke(");
	var strokeColors = findIds(codeString, "stroke(color(");
	var noStrokes = findIds(codeString, "noStroke(");
	var extractNumbers = function(startI, from) {
		var endI = from.indexOf(")", startI);
		var subStr = from.substring(startI, endI);
		return subStr.split(",");
	};
	var findFillBefore = function(what, from) {
		var max = -1;
		for (var i = 0; i < fills.length; i++) {
			if (fills[i] > max && fills[i] < what) {
				max = fills[i];
			}
		}
		for (var i = 0; i < fillColors.length; i++) {
			if (fillColors[i] > max && fillColors[i] < what) {
				max = fillColors[i];
			}
		}
		for (var i = 0; i < noFills.length; i++) {
			if (noFills[i] > max && noFills[i] < what) {
				max = noFills[i];
			}
		}
		var r = 255;
		var g = 255;
		var b = 255;
		var a = 255;
		if (from[max] == "n") {
			a = 0;
			var col = {r:r, g:g, b:b, a:a};
			//console.log("{r:" + r + ", g:" + g + ", b:" + b + ", a:" + a +"};");
			return col;
		}
		if (from[max + 5] == "c") {
			var fillRGBA = extractNumbers(max + 11, from);
			r = parseFloat(fillRGBA[0]);
			g = parseFloat(fillRGBA[1]);
			b = parseFloat(fillRGBA[2]);
			a = parseFloat(fillRGBA[3]);
			var col = {r:r, g:g, b:b, a:a};
			//console.log("col{r:" + r + ", g:" + g + ", b:" + b + ", a:" + a +"};");
			return col;
		}
		var fillRGB = extractNumbers(max + 5, from);
		r = parseFloat(fillRGB[0]);
		g = parseFloat(fillRGB[1]);
		b = parseFloat(fillRGB[2]);
		var col = {r:r, g:g, b:b, a:a};
		//console.log("{r:" + r + ", g:" + g + ", b:" + b + ", a:" + a +"};");
		return col;
	};
	
	var findStrokeBefore = function(what, from) {
		var max = -1;
		for (var i = 0; i < strokes.length; i++) {
			if (strokes[i] > max && strokes[i] < what) {
				max = strokes[i];
			}
		}
		for (var i = 0; i < strokeColors.length; i++) {
			if (strokeColors[i] > max && strokeColors[i] < what) {
				max = strokeColors[i];
			}
		}
		for (var i = 0; i < noStrokes.length; i++) {
			if (noStrokes[i] > max && noStrokes[i] < what) {
				max = noStrokes[i];
			}
		}
		var r = 255;
		var g = 255;
		var b = 255;
		var a = 255;
		if (from[max] == "n") {
			a = 0;
			var col = {r:r, g:g, b:b, a:a};
			//console.log("{r:" + r + ", g:" + g + ", b:" + b + ", a:" + a +"};");
			return col;
		}
		if (from[max + 5] == "c") {
			var strokeRGBA = extractNumbers(max + 11, from);
			r = parseFloat(strokeRGBA[0]);
			g = parseFloat(strokeRGBA[1]);
			b = parseFloat(strokeRGBA[2]);
			a = parseFloat(strokeRGBA[3]);
			var col = {r:r, g:g, b:b, a:a};
			//console.log("col{r:" + r + ", g:" + g + ", b:" + b + ", a:" + a +"};");
			return col;
		}
		var strokeRGB = extractNumbers(max + 5, from);
		r = parseFloat(strokeRGB[0]);
		g = parseFloat(strokeRGB[1]);
		b = parseFloat(strokeRGB[2]);
		var col = {r:r, g:g, b:b, a:a};
		//console.log("{r:" + r + ", g:" + g + ", b:" + b + ", a:" + a +"};");
		return col;
	};
	
	var i = shapes[0];
	//console.log("beginShape();");
	var vi = codeString.indexOf("vertex(", i);
	var pointsSplit = extractNumbers(vi + 7, codeString);
	var contour = new Contour();
	lp.list.addContour(contour);
	contour.fillColor = findFillBefore(i, codeString);
	contour.strokeColor = findStrokeBefore(i, codeString);
	contour.add(parseFloat(pointsSplit[0]), parseFloat(pointsSplit[1]));
	//console.log(pointsSplit);
	var nextBeginShapeId = 1;
	while (true) {
		var bi = codeString.indexOf("bezierVertex(", i);
		if (bi < i) {
			break;
		}
		if (shapes.length > nextBeginShapeId) {
			if (bi > shapes[nextBeginShapeId]) {
				//console.log("beginShape();");
				var vi = codeString.indexOf("vertex(", i);
				var pointsSplit = extractNumbers(vi + 7, codeString);
				contour = new Contour();
				lp.list.addContour(contour);
				contour.add(parseFloat(pointsSplit[0]), parseFloat(pointsSplit[1]));
				contour.fillColor = findFillBefore(vi, codeString);
				contour.strokeColor = findStrokeBefore(vi, codeString);
				//console.log(pointsSplit);
				nextBeginShapeId++;
			}
		}
		var rbi = codeString.indexOf(")", bi);
		if (bi == -1 || rbi == -1 || rbi < bi) {
			return null;
		}
		var pointsSplit = extractNumbers(bi + 13, codeString);
		if ((codeString.indexOf("bezierVertex(", bi+1) < codeString.indexOf("beginShape();", bi+1)) ||
			((codeString.indexOf("bezierVertex(", bi+1) != -1) && (codeString.indexOf("beginShape();", bi+1) == -1))) {
			var points = contour.points;
			var point = points[points.length - 1];
			contour.add(parseFloat(pointsSplit[4]), parseFloat(pointsSplit[5]));
			var lastPoint = points[points.length - 1];
			point.anchorPoint1.x = parseFloat(pointsSplit[0]);
			point.anchorPoint1.y = parseFloat(pointsSplit[1]);
			lastPoint.anchorPoint2.x = parseFloat(pointsSplit[2]);
			lastPoint.anchorPoint2.y = parseFloat(pointsSplit[3]);
		} else {
			//treat like an end
			var points = contour.points;
			var point = points[points.length - 1];
			var lastPoint = points[0];
			point.anchorPoint1.x = parseFloat(pointsSplit[0]);
			point.anchorPoint1.y = parseFloat(pointsSplit[1]);
			lastPoint.anchorPoint2.x = parseFloat(pointsSplit[2]);
			lastPoint.anchorPoint2.y = parseFloat(pointsSplit[3]);
			contour.closed = true;
		}
		//console.log(pointsSplit);
		i = bi + 1;
	}
	this.ps.close();
};
LoadTool.prototype.setActive = function() {
	/*var layers = localStorage.getItem('layers');
	if (layers) {
		lp.list.layers = layers;
	}*/
	var load = this;
	this.ps = new CodeLoadInputPopup({color: "0x000000", name: "???"}, load.parseLayers, load);
	this.ps.open({left: 50, top:20});
};
LoadTool.prototype.onPressed = function() {
	Tool.prototype.onPressed.call(this);
};
LoadTool.prototype.onReleased = function() {
	Tool.prototype.onReleased.call(this);
};
LoadTool.prototype.update = function() {
	Tool.prototype.update.call(this);
};
LoadTool.prototype.draw = function() {
	Tool.prototype.draw.call(this);
	var x = this.x + 5;
	var y = this.y + 5;
	pushMatrix();
	translate(x+1, y+1);
	scale(0.3, 0.3);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
	// load/
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(57.9, 15.0);
	ctx.lineTo(43.8, 4.7);
	ctx.lineTo(6.3, 7.1);
	ctx.lineTo(5.3, 53.3);
	ctx.lineTo(36.6, 58.1);
	ctx.lineTo(57.9, 58.1);
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.fill();

	// load/
	ctx.beginPath();
	ctx.moveTo(36.6, 58.1);
	ctx.lineTo(2.5, 58.1);
	ctx.lineTo(2.5, 2.5);
	ctx.lineTo(49.1, 2.5);
	ctx.lineTo(57.9, 12.1);
	ctx.lineTo(57.9, 23.0);
	ctx.lineTo(52.1, 23.0);
	ctx.lineTo(51.8, 14.1);
	ctx.lineTo(46.2, 9.4);
	ctx.lineTo(8.8, 9.1);
	ctx.lineTo(8.8, 52.1);
	ctx.lineTo(31.6, 52.1);
	ctx.lineTo(36.6, 58.1);
	ctx.closePath();
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.fill();

	// load/
	ctx.beginPath();
	ctx.moveTo(16.7, 30.3);
	ctx.lineTo(16.7, 7.5);
	ctx.lineTo(31.6, 7.5);
	ctx.lineTo(31.6, 23.7);
	ctx.lineTo(37.6, 23.7);
	ctx.lineTo(37.6, 7.1);
	ctx.lineTo(43.8, 7.1);
	ctx.lineTo(43.8, 30.3);
	ctx.lineTo(16.7, 30.3);
	ctx.closePath();
	ctx.fill();

	// load/
	ctx.beginPath();
	ctx.moveTo(58.0, 60.4);
	ctx.lineTo(45.4, 60.4);
	ctx.lineTo(45.4, 44.7);
	ctx.lineTo(33.1, 44.7);
	ctx.lineTo(51.7, 24.1);
	ctx.lineTo(70.1, 44.5);
	ctx.lineTo(58.0, 44.5);
	ctx.lineTo(58.0, 60.4);
	ctx.closePath();
	ctx.fill();
	ctx.restore();
	popMatrix();
};