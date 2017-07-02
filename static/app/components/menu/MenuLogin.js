import React from 'react';
import Reflux, { Component } from 'reflux';
import Route, { Link } from 'react-router';

import ActionsLogin from '../../actions/ActionsLogin';
import StoreLogin from '../../stores/StoreLogin';

class MenuLogin extends Component{

	constructor(props){
		super(props);

		this.stores = [StoreLogin];

	}

	setEstado(valor){
		this.setState({
			estado: valor
		});	
	}

	logout() {
		ActionsLogin.logout();
	}

	render() {		
		let infoLogin = this.props.user;
		let url_peril = url + "perfil/";
		let _estado = this.state.estado;

		return infoLogin ? (
			<div
				onMouseEnter={ () => this.setEstado("open")}
				onMouseLeave={ () => this.setEstado("")}
				className={"menuLogado " + _estado }>

				<a href="javascript:;" title={ infoLogin.user_name } className="userAvatar">
					<div className="userAvatar" style={{backgroundImage: 'url(' + infoLogin.avatar + ')'}} />
					<p className="userName">{ infoLogin.user_name }</p>
				</a>
				<div className="menuLogado__div">
					<ul>
						<li>
							<Link to={ url_peril } title="Perfil"><i className="icon-profile"></i>Perfil</Link>
						</li>
						<li>
							<a onClick={ this.logout } href="javascript:;" title="Sair"><i className="icon-logout"></i>Sair</a>
						</li>
					</ul>
				</div>
			</div>
		) : null;
	}
}

export default MenuLogin;
