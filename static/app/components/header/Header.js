import React from "react";
import Reflux, { Component } from 'reflux';

import Logo from "./Logo";
import Menu from "../menu/Menu";

class Header extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<header className="headerPage">
				<div className="container">

					<Logo alt={ APP_NAME } />
					<Menu hasSearch={this.props.hasSearch}/>

				</div>
			</header>
		);
	}
};

export default Header;
