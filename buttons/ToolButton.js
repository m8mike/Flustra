var ToolButton = function(x, y, name, action) {
    this.x = x;
    this.y = y;
    this.w = 14;
    this.h = 14;
    this.name = name;
    this.action = action;
    this.pressed = false;
    this.mouseIsOver = false;
};
ToolButton.prototype.drawIcon = function() {};
ToolButton.prototype.draw = function() {
    if (this.pressed && this.mouseIsOver) {
        stroke(0, 0, 0);
        fill(41, 41, 41);
    } else if (this.mouseIsOver) {
        stroke(255, 255, 255);
        fill(145, 145, 145);
    } else {
        noStroke();
        fill(77, 77, 77);
    }
    rect(this.x, this.y, this.w, this.h);
    this.drawIcon();
};
ToolButton.prototype.onOver = function() {
    if (mouseX > this.x && mouseX < this.x + 14 &&
        mouseY > this.y && mouseY < this.y + 14) {
        this.mouseIsOver = true;
    } else {
        this.mouseIsOver = false;
    }
    return this.mouseIsOver;
};
ToolButton.prototype.onPressed = function() {
    this.pressed = this.onOver();
};
ToolButton.prototype.onReleased = function() {
    this.pressed = this.onOver();
    if (this.pressed && this.action) {
        this.action();
    }
    this.pressed = false;
};
var drawNewSublayer = function() {
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
};