var AddImageCommand = function(imageContent, layer) {
	Command.call(this, [imageContent]);
	this.layer = layer;
};
AddImageCommand.prototype = Object.create(Command.prototype);
AddImageCommand.prototype.undo = function() {
	Command.prototype.undo.call(this);
	lp.list.deleteLayer(this.layer);
};
AddImageCommand.prototype.redo = function() {
	Command.prototype.redo.call(this);
	var imageContent = this.targets[0];
	this.layer = lp.list.addImage(imageContent);
};