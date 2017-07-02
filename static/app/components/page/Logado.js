import React, { Component } from 'react';


class Logado extends Component {
	componentDidMount(){
		window.opener.postMessage(window.location.search, URL_SERVICE);
		window.close();
	}

	render(){
	    return (
	    	<div>
				{ this.props.children }
	    	</div>
    	)
	}
};

module.exports = Logado;
