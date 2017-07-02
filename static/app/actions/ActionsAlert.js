var Reflux = require('reflux');
var ActionsAlert = Reflux.createActions([
	"success",
	"warning",
	"info",
	"error"
]);

module.exports = ActionsAlert;
