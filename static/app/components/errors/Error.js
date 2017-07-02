var React = require("react");

function Error(props) {
	var erro = props.texto ? 
		 (
			<div className="container">
				<p className="error">{props.texto}</p>
			</div>
		)
	: null;
	return erro;
};

Error.propTypes = {
	texto: React.PropTypes.string
};

module.exports = Error;