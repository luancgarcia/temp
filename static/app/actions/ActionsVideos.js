var Reflux = require('reflux');
var ActionsVideos = Reflux.createActions([ 
	"load",
	"getMenu",
	"getVideo",
	"getCategorias",//verificar se está sendo usado
	"getCategories",
	"getProgramas",
	"getUserLists",
	"getBusca",
	"updateBusca",
	"getPrograma",
	"getVideoSelecionado",
	"postWatchLater",
	"deleteWatchLater",
	"verifyWatchLater"
]);

module.exports = ActionsVideos;
