import React from 'react';
import Reflux, { Component } from 'reflux';

import ActionsLogin from '../../actions/ActionsLogin';
import StoreLogin from '../../stores/StoreLogin';

class Login extends Component {

	constructor(props){
		super(props);

		this.stores = [StoreLogin];

	}

	verifyLogin() {
		window.addEventListener('load', () => {
			var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
			var messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';

			window[eventMethod](messageEvent,(e) => {
				let fbId = '';
				if(localStorage.getItem('user')){
					fbId = localStorage.getItem('user');
				} else {
					fbId = e.data.split("code=")[1];
				}
				ActionsLogin.login(fbId);
			},false);
		});

	}

	componentWillReceiveProps (props){
		if(props.showModal){
			$("body")[0].setAttribute("style", "overflow: hidden");
		} else {
			$("body")[0].setAttribute("style", "overflow: initial");
		}

	}

	componentDidMount() {
		this.verifyLogin();
	}

	render() {

	    return this.state.showModal ? (
		    <section className="login">
		    	<div className="login_wrapper">
		    		<a href="javascript:;" onClick={() => ActionsLogin.showModal(false)} className="login__fechar icon-cancel"></a>
					<iframe src={AUTH_URL + "?client_id=" + this.props.client_id + "&redirect_uri=" + this.props.urlRetorno}></iframe>
				</div>
				<div className="login_overlay" onClick={() => ActionsLogin.showModal(false)}></div>
		    </section>
		) : null
	}
}

export default Login;
