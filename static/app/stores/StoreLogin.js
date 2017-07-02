import React from 'react';
import Reflux, { Store } from 'reflux';
import ActionsLogin from '../actions/ActionsLogin';
import ActionsAlert from '../actions/ActionsAlert';

import Api from './Api';

class StoreLogin extends Store {

    constructor() {
        super();
        this.api = new Api();

        this.listenables = [ActionsLogin],

        this.state = {
            showModal: false,
            isLogged: false,
            type: 'pass',
            userID: false,
            user: null
        }
    }

    login(fbId) {
        this.api.auth({code:fbId,client_id:APP_ID}).then((response) => {
            $("body")[0].setAttribute("style", "overflow: initial");
            $("body").addClass("logado");
            /*
            * REFATORACAO PARA VALIDACAO DE CADASTRO
            * RESPONSE ESTÁ VINDO COMO STRING COM "ERRO BAD REQUEST ID"
            */
            localStorage.setItem("user", JSON.stringify({u_id:fbId,profile:['regular']}));
            this.getUserData();            
        });
    }

    setUserData(response){
        // console.log("set: ", response);
        let user = {
            'user_name': response.data.name,
            'birth': response.data.birthdate,
            'avatar': response.data.picture,
            'email': response.data.email,
            'cpf': response.data.cpf,
            'phone': response.data.phone
        }
        this.setState({
            isLogged: true,
            type: 'facebook',
            userID: localStorage.getItem("user"),
            showModal: false,
            user: user
        });
    }

    getUserData() {
        if (!this.state.user){
            if(localStorage.getItem("user")){
                let id = JSON.parse(localStorage.getItem("user")).u_id;
                this.api.getUser(id).then((response) => {
                    this.setUserData(response);
                    
                })
                .catch((error) => {

                    console.log('error: User',error.data.detail);
                });
            }
        }
    }

    showModal(exibir) {
        if(exibir){
            document.body.setAttribute("style", "overflow: hidden");
            this.setState({showModal: true});
        }
        else{
            document.body.setAttribute("style", "overflow: initial");
            this.setState({showModal: false});
        }
    }
    
    logout() {
        localStorage.setItem("user", "");
        $("body").removeClass("logado");
        this.setState({
            login: false,
            isLogged: false,
            showModal: false,
            code: ""
        });

        window.location.href = url;
    }

    updateUser(code, obj){

        if(!code){
            return;
        }

        this.api.updateUser(code, {
            name: obj.name,
            email: obj.email,
            birthdate: obj.birthdate,
            cpf: obj.cpf,
            phone: obj.phone
        }).then((response) => {
            this.setUserData(response);

            ActionsAlert.success('Dados atualizados com sucesso!');
            // aqui entra funcao para mostrar modal de sucesso no topo da tela

        }).catch((error) => {
            ActionsAlert.error(error);
        });

    }

};

export default StoreLogin;
