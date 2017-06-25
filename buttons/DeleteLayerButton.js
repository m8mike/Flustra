var DeleteLayerButton = function(x, y, name, action) {
    ToolButton.apply(this, arguments);
};
DeleteLayerButton.prototype = Object.create(ToolButton.prototype);
DeleteLayerButton.prototype.drawIcon = function() {
    ToolButton.prototype.drawIcon.call(this);
    drawDeletelayer(this.x, this.y);
};
var drawDeletelayer = function(x, y) {
    pushMatrix();
    translate(x+2, y-1);
    scale(1.5);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    // deleteOn/
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0.0, 2.8);
    ctx.bezierCurveTo(0.0, 2.0, 1.4, 2.5, 1.9, 1.9);
    ctx.bezierCurveTo(2.3, 1.3, 2.2, 0.5, 4.1, 0.5);
    ctx.bezierCurveTo(6.0, 0.5, 5.9, 1.4, 6.3, 1.9);
    ctx.bezierCurveTo(6.8, 2.5, 8.3, 2.0, 8.3, 2.8);
    ctx.bezierCurveTo(8.3, 3.5, 8.3, 3.5, 8.3, 3.5);
    ctx.lineTo(0.0, 3.5);
    ctx.lineTo(0.0, 2.8);
    ctx.closePath();
    ctx.fillStyle = "rgb(12, 13, 14)";
    ctx.fill();

    // deleteOn/
    ctx.beginPath();
    ctx.moveTo(0.0, 3.4);
    ctx.bezierCurveTo(0.0, 2.6, 1.4, 3.1, 1.9, 2.5);
    ctx.bezierCurveTo(2.3, 2.0, 2.2, 1.1, 4.1, 1.1);
    ctx.bezierCurveTo(6.0, 1.1, 5.9, 2.0, 6.3, 2.6);
    ctx.bezierCurveTo(6.8, 3.1, 8.3, 2.7, 8.3, 3.4);
    ctx.bezierCurveTo(8.3, 4.2, 8.3, 4.2, 8.3, 4.2);
    ctx.lineTo(0.0, 4.2);
    ctx.lineTo(0.0, 3.4);
    ctx.closePath();
    ctx.fillStyle = "rgb(211, 211, 210)";
    ctx.fill();

    // deleteOn/
    ctx.beginPath();
    ctx.moveTo(5.4, 2.3);
    ctx.bezierCurveTo(5.4, 2.5, 4.8, 2.8, 4.1, 2.8);
    ctx.bezierCurveTo(3.4, 2.8, 2.8, 2.5, 2.8, 2.3);
    ctx.bezierCurveTo(2.8, 2.0, 3.4, 1.8, 4.1, 1.8);
    ctx.bezierCurveTo(4.8, 1.8, 5.4, 2.0, 5.4, 2.3);
    ctx.closePath();
    ctx.fillStyle = "rgb(12, 13, 14)";
    ctx.fill();

    // deleteOn/
    ctx.beginPath();
    ctx.moveTo(0.7, 4.8);
    ctx.lineTo(7.5, 4.8);
    ctx.lineTo(7.5, 9.5);
    ctx.lineTo(0.7, 9.5);
    ctx.lineTo(0.7, 4.8);
    ctx.closePath();
    ctx.fillStyle = "rgb(211, 211, 210)";
    ctx.fill();

    // deleteOn/
    ctx.beginPath();
    ctx.moveTo(0.0, 4.2);
    ctx.lineTo(8.3, 4.2);
    ctx.lineTo(8.3, 4.9);
    ctx.lineTo(0.0, 4.9);
    ctx.lineTo(0.0, 4.2);
    ctx.closePath();
    ctx.fillStyle = "rgb(85, 85, 85)";
    ctx.fill();

    // deleteOn/
    ctx.beginPath();
    ctx.moveTo(1.5, 4.9);
    ctx.bezierCurveTo(1.5, 4.9, 1.5, 6.8, 1.5, 7.2);
    ctx.bezierCurveTo(1.5, 7.6, 1.5, 8.7, 1.9, 8.7);
    ctx.bezierCurveTo(2.2, 8.7, 2.3, 7.6, 2.3, 7.2);
    ctx.bezierCurveTo(2.3, 6.8, 2.3, 4.9, 2.3, 4.9);
    ctx.lineTo(1.5, 4.9);
    ctx.closePath();
    ctx.fill();

    // deleteOn/
    ctx.beginPath();
    ctx.moveTo(3.0, 4.9);
    ctx.bezierCurveTo(3.0, 4.9, 3.0, 6.8, 3.0, 7.2);
    ctx.bezierCurveTo(3.0, 7.6, 3.0, 8.7, 3.4, 8.7);
    ctx.bezierCurveTo(3.7, 8.7, 3.8, 7.6, 3.8, 7.2);
    ctx.bezierCurveTo(3.8, 6.8, 3.8, 4.9, 3.8, 4.9);
    ctx.lineTo(3.0, 4.9);
    ctx.closePath();
    ctx.fill();

    // deleteOn/
    ctx.beginPath();
    ctx.moveTo(4.5, 4.9);
    ctx.bezierCurveTo(4.5, 4.9, 4.5, 6.8, 4.5, 7.2);
    ctx.bezierCurveTo(4.5, 7.6, 4.5, 8.7, 4.9, 8.7);
    ctx.bezierCurveTo(5.2, 8.7, 5.3, 7.6, 5.3, 7.2);
    ctx.bezierCurveTo(5.3, 6.8, 5.3, 4.9, 5.3, 4.9);
    ctx.lineTo(4.5, 4.9);
    ctx.closePath();
    ctx.fill();

    // deleteOn/
    ctx.beginPath();
    ctx.moveTo(6.0, 4.9);
    ctx.bezierCurveTo(6.0, 4.9, 6.0, 6.8, 6.0, 7.2);
    ctx.bezierCurveTo(6.0, 7.6, 6.0, 8.7, 6.4, 8.7);
    ctx.bezierCurveTo(6.7, 8.7, 6.8, 7.6, 6.8, 7.2);
    ctx.bezierCurveTo(6.8, 6.8, 6.8, 4.9, 6.8, 4.9);
    ctx.lineTo(6.0, 4.9);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    popMatrix();
};