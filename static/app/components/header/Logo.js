import React from "react";
import Reflux, { Component } from 'reflux';

class Logo extends Component {

	render() {
		return (
			<div className="col-left">
				<div className="LogoHeader">
					<h1>
						<a href={ url } title={ this.props.alt }>{ this.props.alt }</a>
					</h1>
				</div>
			</div>
		);
	}
};

export default Logo;
