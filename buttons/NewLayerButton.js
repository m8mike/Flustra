var NewLayerButton = function(x, y, name, action) {
    ToolButton.apply(this, arguments);
};
NewLayerButton.prototype = Object.create(ToolButton.prototype);
NewLayerButton.prototype.drawIcon = function() {
    ToolButton.prototype.drawIcon.call(this);
    drawNewLayer(this.x, this.y);
};
var drawNewLayer = function(x, y) {
    pushMatrix();
    translate(x+1, y);
    scale(1.4);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    // newLayerOn/
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0.4, 5.7);
    ctx.lineTo(0.4, 0.4);
    ctx.lineTo(8.8, 0.4);
    ctx.lineTo(8.8, 8.6);
    ctx.lineTo(3.5, 8.6);
    ctx.lineTo(0.4, 5.7);
    ctx.closePath();
    ctx.fillStyle = "rgb(12, 13, 14)";
    ctx.fill();

    // newLayerOn/
    ctx.beginPath();
    ctx.moveTo(0.4, 1.3);
    ctx.lineTo(7.9, 1.3);
    ctx.lineTo(7.9, 8.6);
    ctx.lineTo(4.1, 8.6);
    ctx.lineTo(4.1, 5.0);
    ctx.lineTo(0.4, 5.0);
    ctx.lineTo(0.4, 1.3);
    ctx.closePath();
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fill();

    // newLayerOn/
    ctx.beginPath();
    ctx.moveTo(0.4, 5.7);
    ctx.lineTo(3.5, 5.7);
    ctx.lineTo(3.5, 8.6);
    ctx.lineTo(0.4, 5.7);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    popMatrix();
};