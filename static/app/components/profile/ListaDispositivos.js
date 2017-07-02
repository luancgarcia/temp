import React from 'react';
import Reflux, { Component } from 'reflux';

import ActionsDevice from '../../actions/ActionsDevice';
import StoreDevice from '../../stores/StoreDevice';


class ListaDispositivos extends Component {

	constructor(props) {
		super(props);

		this.stores = [StoreDevice];

		this.state = {
			list_devices: this.props.dados
		}

		this.deleteDevice = this.deleteDevice.bind(this);
	}

	componentWillReceiveProps(nextProps) {
    	this.setState({
    		list_devices: nextProps.dados
    	})
    }


    deleteDevice(device) {
    	ActionsDevice.deleteDevice(device);
    }

	render(){
		
		return this.state.list_devices.length > 0 ? (

			<div>
				{this.state.list_devices.map((device, y) => {
					return(
						<div className="linha" key={ y }>
							<div className="col">Device: { device.label }</div>
							<div className="col"><a className="icon-remove-device" href="javascript:;" onClick={ ()=> this.deleteDevice(device.id) } title="Excluir Dispositivo"></a></div>
						</div>
					)
				})}
			</div>
		) : (
			<div className="linha">
				<p className='col'>Nenhum dispositivo cadastrado.</p>
			</div>
		)
	}
};


export default ListaDispositivos;