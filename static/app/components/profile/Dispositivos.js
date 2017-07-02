import React from 'react';
import Reflux, { Component } from 'reflux';

import ActionsDevice from '../../actions/ActionsDevice';
import StoreDevice from '../../stores/StoreDevice';
import ListaDispositivos from './ListaDispositivos';

class Dispositivos extends Component {

	// mixins: [
	//     Reflux.connectFilter(StorePerfil, "storeperfil"(response) {
	//     	console.log(response.data.results.length > 0);
	//     	// if(response.data.results.length > 0) {
	//     		this.setState({
	//     			list_devices: response.data.results
	//     		})
	//     	// }
	//         // debugger;
	//     })
 //    ],

 	constructor(props) {
 		super(props);

 		this.stores = [StoreDevice];
 		this.state = {
 			list_devices: []
 		}
 	}


    activeDevice(device) {
    	ActionsDevice.activateDevice(device);
    }
    

    componentWillMount(){
    	ActionsDevice.getDevices();
    	super.componentWillMount();
    }

	render(){
		let that = this;
		return(
			<div>
				<section className="perfil__dispositivos">
					<div className="container">	
						
						<div className="perfil__dispositivos__div">
							<div className="perfil__dispositivos__div--ativacao">
								<h2>Ativação de dispositivos</h2>
								<p>Ative aqui os aplicativos para Xbox 360, Xbox One e SmarTVs</p>
								<p>Ao acessar o aplicativo nestes dispositivos, você verá um código que precisa ser inserido no campo abaixo para que o uso seja liberado.</p>

								<div>
									<input type="text" ref="challange_code_tv" />
									<button className="btnSubmit" title="Ativar" onClick={ ()=> this.activeDevice(this.refs.challange_code_tv.value) }>
										<i className="icon-activate"></i>
										Ativar
									</button>
								</div>
							</div>
							<div className="perfil__dispositivos__div--dispositivos">
								<h2>Seus dispositivos</h2>
								<div className="table dispositivos__table"> 
									<ListaDispositivos dados={ that.state.list_devices } />
								</div>
							</div>
						</div>
					</div>		
				</section>
			</div>
		);
	}

};

export default Dispositivos;