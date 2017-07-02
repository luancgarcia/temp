import React from 'react';
import Reflux from 'reflux';

import StoreLogin from '../../stores/StoreLogin';
import ActionsLogin from '../../actions/ActionsLogin';

import StoreAlert from '../../stores/StoreAlert';
import ActionsAlert from '../../actions/ActionsAlert';

import AuthorizedComponent from '../utils/AuthorizedComponent';

import DadosUsuario from '../profile/DadosUsuario';
import Dispositivos from '../profile/Dispositivos';
// import DadosPagamento from './DadosPagamento';

class Profile extends AuthorizedComponent {

	constructor(props){
		super(props);

		this.stores = [StoreLogin];

		this.userRoles = localStorage.getItem('user') !== '' ? JSON.parse(localStorage.getItem('user')).profile : [];
		this.notAuthorizedPath = url;
	}

	componentWillMount(){
		ActionsLogin.getUserData();

		super.componentWillMount();
	}
	
	render(){


		return( this.state.user ?
			<section className="perfil">

				<header>
					<div className="container">
						<h1>CONFIGURAÇÕES</h1>
					</div>
				</header>

				<DadosUsuario />
				<Dispositivos />
				{/*

				<DadosPagamento />*/}

			</section>
		: null);

	}

};

export default Profile;
