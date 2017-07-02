var Reflux = require('reflux');
var ActionsModalAlert = Reflux.createActions([
	"onConfirm",
	"onCancel",
	"keepWatching",
	"blocked"
]);

module.exports = ActionsModalAlert;
