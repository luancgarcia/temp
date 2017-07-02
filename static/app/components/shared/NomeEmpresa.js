var React = require("react");

function NomeEmpresa(props) {
	var url = props.url ? props.url : "javascript:;";
	var NomeEmpresa = props.src || props.alt ? 
		 (
			<div className="nomeEmpresa">
				<h1>
					<a href={url} title={props.alt}>{props.alt}</a>
				</h1>
			</div>
		)
	: null;
	return NomeEmpresa;
};

NomeEmpresa.propTypes = {
	src: React.PropTypes.string,
	alt: React.PropTypes.string,
};

module.exports = NomeEmpresa;