var NewSublayerButton = function(x, y, name, action) {
    ToolButton.apply(this, arguments);
};
NewSublayerButton.prototype = Object.create(ToolButton.prototype);
NewSublayerButton.prototype.drawIcon = function() {
    ToolButton.prototype.drawIcon.call(this);
    drawNewSublayer(this.x, this.y);
};
var drawNewSublayer = function(x, y) {
    pushMatrix();
    translate(x, y-1);
    scale(1.4);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    // newSublayerOn/
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0.4, 0.8);
    ctx.lineTo(1.4, 0.8);
    ctx.lineTo(1.4, 3.1);
    ctx.lineTo(2.7, 3.1);
    ctx.lineTo(2.7, 1.2);
    ctx.lineTo(5.7, 3.9);
    ctx.lineTo(4.9, 4.4);
    ctx.lineTo(0.4, 4.1);
    ctx.lineTo(0.4, 0.8);
    ctx.closePath();
    ctx.fillStyle = "rgb(12, 13, 14)";
    ctx.fill();

    // newSublayerOn/
    ctx.beginPath();
    ctx.moveTo(0.4, 1.7);
    ctx.lineTo(1.2, 1.7);
    ctx.lineTo(1.2, 3.8);
    ctx.lineTo(2.7, 3.8);
    ctx.lineTo(2.7, 2.1);
    ctx.lineTo(5.1, 4.2);
    ctx.lineTo(2.7, 6.6);
    ctx.lineTo(2.7, 4.6);
    ctx.lineTo(0.4, 4.6);
    ctx.lineTo(0.4, 1.7);
    ctx.closePath();
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fill();

    // newSublayerOn/
    ctx.beginPath();
    ctx.moveTo(5.0, 5.9);
    ctx.lineTo(5.0, 1.7);
    ctx.lineTo(11.7, 1.7);
    ctx.lineTo(11.7, 8.2);
    ctx.lineTo(7.5, 8.2);
    ctx.lineTo(5.0, 5.9);
    ctx.closePath();
    ctx.fillStyle = "rgb(12, 13, 14)";
    ctx.fill();

    // newSublayerOn/
    ctx.beginPath();
    ctx.moveTo(5.0, 2.4);
    ctx.lineTo(10.9, 2.4);
    ctx.lineTo(10.9, 8.2);
    ctx.lineTo(7.9, 8.2);
    ctx.lineTo(7.9, 5.3);
    ctx.lineTo(5.0, 5.3);
    ctx.lineTo(5.0, 2.4);
    ctx.closePath();
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fill();

    // newSublayerOn/
    ctx.beginPath();
    ctx.moveTo(5.0, 5.9);
    ctx.lineTo(7.5, 5.9);
    ctx.lineTo(7.5, 8.2);
    ctx.lineTo(5.0, 5.9);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    popMatrix();
};