var ResizablePanel = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.movingStarted = false;
    this.sideMoving = '';
};
ResizablePanel.prototype.drawCornerCircle = function(x, y) {
    stroke(0, 0, 0);
    fill(204, 204, 204);
    ellipse(x, y, 8, 8);
};
ResizablePanel.prototype.drawSideLine = function(x, y, x1, y1) {
    stroke(255, 0, 0);
    line(x, y, x1, y1);
};
ResizablePanel.prototype.drawCorner = function(corner) {
    var x = this.x;
    var y = this.y;
    if (corner.includes("R")) {
        x += this.w;
    }
    if (corner.includes("D")) {
        y += this.h;
    }
    this.drawCornerCircle(x, y);
};
ResizablePanel.prototype.drawSide = function(side) {
    switch (side) {
        case "L":
            this.drawSideLine(this.x, this.y, this.x, this.y + this.h);
        break;
        case "R":
            this.drawSideLine(this.x + this.w, this.y, this.x + this.w, this.y + this.h);
        break;
        case "U":
            this.drawSideLine(this.x, this.y, this.x + this.w, this.y);
        break;
        case "D":
            this.drawSideLine(this.x, this.y + this.h, this.x + this.w, this.y + this.h);
        break;
    }
};
ResizablePanel.prototype.checkCorners = function() {
    if (this.movingStarted) {
        if (this.sideMoving.length === 2) {
            this.drawCorner(this.sideMoving);
        } else if (this.sideMoving.length === 1) {
            this.drawSide(this.sideMoving);
        }
    } else if (dist(mouseX, mouseY, this.x, this.y) < 5) {
        this.drawCorner("LU");
    } else if (dist(mouseX, mouseY, this.x + this.w, this.y) < 5) {
        this.drawCorner("RU");
    } else if (dist(mouseX, mouseY, this.x, this.y + this.h) < 5) {
        this.drawCorner("LD");
    } else if (dist(mouseX, mouseY, this.x + this.w, this.y + this.h) < 5) {
        this.drawCorner("RD");
    } else if (Math.abs(mouseX - this.x) < 5) {
        this.drawSide("L");
    } else if (Math.abs(mouseX - (this.x + this.w)) < 5) {
        this.drawSide("R");
    } else if (Math.abs(mouseY - this.y) < 5) {
        this.drawSide("U");
    } else if (Math.abs(mouseY - (this.y + this.h)) < 5) {
        this.drawSide("D");
    }
};
ResizablePanel.prototype.checkSide = function() {
    if (dist(mouseX, mouseY, this.x, this.y) < 10) {
        this.sideMoving = "LU";
    } else if (dist(mouseX, mouseY, this.x + this.w, this.y) < 10) {
        this.sideMoving = "RU";
    } else if (dist(mouseX, mouseY, this.x, this.y + this.h) < 10) {
        this.sideMoving = "LD";
    } else if (dist(mouseX, mouseY, this.x + this.w, this.y + this.h) < 10) {
        this.sideMoving = "RD";
    } else if (Math.abs(mouseX - this.x) < 5) {
        this.sideMoving = "L";
    } else if (Math.abs(mouseX - (this.x + this.w)) < 5) {
        this.sideMoving = "R";
    } else if (Math.abs(mouseY - this.y) < 5) {
        this.sideMoving = "U";
    } else if (Math.abs(mouseY - (this.y + this.h)) < 5) {
        this.sideMoving = "D";
    }
};
ResizablePanel.prototype.resize = function() {
    var MIN_WIDTH = 100;
    if (this.sideMoving.includes("L")) {
        if (mouseX < this.x + this.w - MIN_WIDTH) {
            this.w = this.x - mouseX + this.w;
            this.x = mouseX;
        } else {
            this.x = this.w + this.x - MIN_WIDTH;
            this.w = MIN_WIDTH;
        }
    } else if (this.sideMoving.includes("R")) {
        if (mouseX > this.x + MIN_WIDTH) {
            this.w = mouseX-this.x;
        } else {
            this.w = MIN_WIDTH;
        }
    }
    var MIN_HEIGHT = 100;
    if (this.sideMoving.includes("U")) {
        if (mouseY < this.y + this.h - MIN_HEIGHT) {
            this.h = this.y - mouseY + this.h;
            this.y = mouseY;
        } else {
            this.y = this.h + this.y - MIN_HEIGHT;
            this.h = MIN_HEIGHT;
        }
    } else if (this.sideMoving.includes("D")) {
        if (mouseY > this.y + MIN_HEIGHT) {
            this.h = mouseY-this.y;
        } else {
            this.h = MIN_HEIGHT;
        }
    }
};
ResizablePanel.prototype.draw = function() {
    stroke(0, 0, 0);
    fill(92, 92, 92);
    rect(this.x, this.y, this.w, this.h);
    noFill();
    rect(this.x + 5, this.y + 15, this.w - 10, this.h - 30);
    this.checkCorners();
};