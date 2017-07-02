import React from 'react';
import Reflux, { Store } from 'reflux';
import ActionsDevice from '../actions/ActionsDevice';
import ActionsAlert from '../actions/ActionsAlert';

import Api from './Api';

class StoreDevice extends Store {

    constructor() {
        super();

        this.api = new Api();

        this.listenables = [ActionsDevice];

        this.state = {
            dados: [],
            userID: JSON.parse(localStorage.getItem("user")).u_id
        }
    }

    activateDevice(code){
        
        if(!code){ 
            ActionsAlert.error('Insira um código válido!');           
            return;
        }

        this.api.activateDevice({
            challenge_code: code,
            token: this.state.userID     
        }).then((response) => {
            // console.log("activate: ", response);
            ActionsAlert.success('Device ativado com sucesso!');   
            this.getDevices();
        }).catch((error) => {  
            console.log(error);
        });

    }

    getDevices(){
        let userID = JSON.parse(localStorage.getItem("user")).u_id;

        this.api.getDevices(this.state.userID).then((response) => {
            this.setState({
                list_devices: response.data.results
            })
        }).catch((error) => {  
            console.log("err: ", error);
        });

    }

    deleteDevice(device) {

        this.api.deleteDevice(this.state.userID, device).then((response) => {

            if(response.status == 204){
                ActionsAlert.success('Device removido com sucesso!');  
                this.getDevices();
            }
        }).catch((error) => {  
            console.log(error);
        });
    }

};

export default StoreDevice;
