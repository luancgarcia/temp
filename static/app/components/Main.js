import React from 'react';
import Reflux, { Component } from 'reflux';

// pagina responsavel pelas configuracoes iniciais do projeto
class Main extends Component {

	constructor(props) {
		super(props);

	}

	render(){

		return (

			<div>
				{ this.props.children }
			</div>
		)

	}
};

export default Main;
