var Point = function(x, y) {
	this.x = x;
	this.y = y;
};
var polarToCartesian = function(polar) {
	var cartesian = new Point(0, 0);
	cartesian.x = polar.r * Math.cos(polar.fi);
	cartesian.y = polar.r * Math.sin(polar.fi);
	return cartesian;
};
var cartesianToPolar = function(cartesian) {
	var polar = {};
	polar.r = Math.sqrt(Math.pow(cartesian.x, 2) + Math.pow(cartesian.y, 2));
	polar.fi = Math.atan2(cartesian.y, cartesian.x);
};
var pointsDistance = function(point1, point2) {
	return Math.sqrt(Math.pow(point2.x-point1.x,2)+Math.pow(point2.y-point1.y,2));
};
Point.prototype.multiply = function(multiplier) {
	this.x *= multiplier;
	this.y *= multiplier;
};
Point.prototype.add = function(value) {
	this.x += value;
	this.y += value;
};
var subtractPoints = function (point1, point2) {
	var resultPoint = {};
	resultPoint.x = point1.x - point2.x;
	resultPoint.y = point1.y - point2.y;
	return resultPoint;
};
var addPoints = function (point1, point2) {
	var resultPoint = {};
	resultPoint.x = point1.x + point2.x;
	resultPoint.y = point1.y + point2.y;
	return resultPoint;
};