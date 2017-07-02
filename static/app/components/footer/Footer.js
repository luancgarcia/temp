var React = require("react");
var NomeEmpresa = require("../shared/NomeEmpresa.js");
var MenuSite = require("../menu/MenuSite.js");
var MenuSac = require("../menu/MenuSac.js");
var SigaNos = require("./SigaNos.js");

var Footer = React.createClass({


	render: function(){
		var menu = this.props.menu ? this.props.menu : "";
		// return false;
		return (
			<footer>
				<div className="container">
					<div className="col-4">
						<NomeEmpresa url="/" src="/static/images/logo.png" alt="Sara Nossa Terra" />
					</div>
					<div className="col-2">
						<MenuSite menu={menu}/>
					</div>
					<div className="col-3">
						<MenuSac />
					</div>
					<div className="col-3">
						<SigaNos />
					</div>
				</div>
			</footer>
		);
	}
});

module.exports = Footer;