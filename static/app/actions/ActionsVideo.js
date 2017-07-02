var Reflux = require('reflux');
var ActionsVideos = Reflux.createActions([
	"getVideo",
	"getMulticamVideos",
	"loadPlayer",
	"playPauseVideo",
	"rewFFVideo",
	"toggleFullScreen",
	"getTimeVideo"
]);

module.exports = ActionsVideos;
