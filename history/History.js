var History = function() {
    this.commands = [];
};
History.prototype.addCommand = function(command) {
	if (this.currentCommand < this.commands.length - 1) {
		this.commands.splice(this.currentCommand + 1, this.commands.length - this.currentCommand);
	}
	this.commands.push(command);
	this.currentCommand = this.commands.length - 1;
};
History.prototype.undo = function() {
	if (this.commands.length == 0 || this.currentCommand < 0) {
		return null;
	}
	this.commands[this.currentCommand].undo();
	this.currentCommand--;
};
History.prototype.redo = function() {
	if (this.commands.length == 0) {
		return null;
	}
	if (this.currentCommand < this.commands.length - 1) {
		this.currentCommand++;
		this.commands[this.currentCommand].redo();
	}
};