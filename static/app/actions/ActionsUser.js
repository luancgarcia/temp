var Reflux = require('reflux');
var ActionsUser = Reflux.createActions([
	"getWatchLater",
	"postWatchLater",
	"deleteWatchLater",
	"verifyWatchLaterVideo"
]);

module.exports = ActionsUser;