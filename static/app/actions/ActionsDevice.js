var Reflux = require('reflux');
var ActionsDevice = Reflux.createActions([
	"activateDevice",
	"getDevices",
	"deleteDevice"
]);

module.exports = ActionsDevice;