var List = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.allItems = [];
    this.scrollBar = new ScrollBar(this.x + this.w, this.y, 350);
};
List.prototype.add = function() {
    this.allItems.push(new Item());
    var fullLength = this.allItems.length * 50;
    if (fullLength < this.h) {
        this.scrollBar.size = this.scrollBar.maxSize;
    } else {
        this.scrollBar.size = this.scrollBar.maxSize * this.h / fullLength;
    }
};
List.prototype.draw = function() {
    fill(99, 99, 99);
    rect(this.x, this.y, this.w, this.h);
    for (var i = 0; i < this.allItems.length; i++) {
        this.allItems[i].draw(this.x, this.y + items.length * 50, this.w, 50);
        items.push(this.allItems[i]);
    }
    this.scrollBar.draw();
};