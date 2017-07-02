var React = require("react");

function sigaNos(props) {
	var sigaNos = 
		 (		
			<div className="sigaNos">
				<h6>Siga-nos</h6>
				<ul>
					<li><a href="javascript:;" className="icon-twitter-bird" title="Twitter"></a></li>
					<li><a href="javascript:;" className="icon-facebook" title="Facebook"></a></li>
					<li><a href="javascript:;" className="icon-youtube-play" title="Youtube"></a></li>
					<li><a href="javascript:;" className="icon-instagram" title="Instagram"></a></li>
					<li><a href="javascript:;" className="icon-gplus" title="Google mais"></a></li>
				</ul>
			</div>
		)
	return sigaNos;
};

module.exports = sigaNos;
