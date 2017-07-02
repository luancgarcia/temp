var React = require("react");

function Copywriter(props) {
	var copywriter = props.texto ? 
		 (
			<section className="copywriter">
				<div className="container">
					<p>© 2016 {props.texto} - Todos os direitos reservados</p>

					<div className="SocialFooter">
						<a href="" className="icon-facebook" target="_blank"></a>
						<a href="" className="icon-twitter" target="_blank"></a>
						<a href="" className="icon-google" target="_blank"></a>
						<a href="" className="icon-android" target="_blank"></a>
						<a href="" className="icon-apple" target="_blank"></a>
					</div>
				</div>
			</section>
		)
	: null;
	return copywriter;
};

Copywriter.propTypes = {
	texto: React.PropTypes.string
};

module.exports = Copywriter;
