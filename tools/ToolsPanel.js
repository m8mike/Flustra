var ToolsPanel = function(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.tools = [];
	//this.tools.push(new BlackArrowTool(this.x, this.y));
	this.tools.push(new WhiteArrowTool(this.x, this.y));
	this.tools.push(new HandTool(this.x + 30, this.y));
	this.tools.push(new PenTool(this.x, this.y + 30));
	this.activeTool = this.tools[this.tools.length - 1];
	this.tools.push(new AngleTool(this.x + 30, this.y + 30));
	this.tools.push(new RemovePointTool(this.x, this.y + 60));
	this.tools.push(new AddPointTool(this.x + 30, this.y + 60));
	this.tools.push(new PictureTool(this.x, this.y + 90));
	this.tools.push(new FreeTransformTool(this.x + 30, this.y + 90));
	this.tools.push(new UndoTool(this.x, this.y + 120));
	this.tools.push(new RedoTool(this.x + 30, this.y + 120));
	this.tools.push(new SaveTool(this.x, this.y + 150));
	this.tools.push(new LoadTool(this.x + 30, this.y + 150));
};
ToolsPanel.prototype.draw = function() {
	stroke(0, 0, 0);
	fill(92, 92, 92);
	rect(this.x, this.y, this.w, this.h);
	for (var i = 0; i < this.tools.length; i++) {
		this.tools[i].draw();
	}
	this.activeTool.update();
};
ToolsPanel.prototype.checkMouse = function() {
	if (mouseX > this.x && mouseX < (this.x + this.w) && mouseY > this.y && mouseY < (this.y + this.h)) {
		return true;
	}
}
ToolsPanel.prototype.onPressed = function() {
	return this.checkMouse();
};
ToolsPanel.prototype.onReleased = function() {
	if (this.checkMouse()) {
		for (var i = 0; i < this.tools.length; i++) {
			if (this.tools[i].checkMouse()) {
				this.tools[i].setActive();
				return true;
			}
		}
		return true;
	}
	return false;
};