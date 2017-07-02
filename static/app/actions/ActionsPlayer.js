var Reflux = require('reflux');
var ActionsPlayer = Reflux.createActions([
	"loadPlayer",
	"attachMedia",
	"backToBegin",
	"playPauseVideo",
	"rewFFVideo",
	"toggleFullScreen",
	"getTimeVideo"
]);

module.exports = ActionsPlayer;
