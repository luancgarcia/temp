var Reflux = require('reflux');
var ActionsLogin = Reflux.createActions([
	"login",
	"getUserData",
	"showModal",
	"logout",
	"updateUser"
]);

module.exports = ActionsLogin;
