import React from 'react';
import Reflux, { Store } from 'reflux';

import ActionsModalAlert from '../actions/ActionsModalAlert';

import {DataUtils} from '../components/utils/DataUtils';

class StoreModalAlert extends Store {

    constructor() {
        super();

        this.listenables = [ActionsModalAlert];

        this.state = {
            show: false,
            showConfirmButton: false,
            confirmButtonText: '',
            showCancelButton: false,
            cancelButtonText: '',
            title: '',
            text: ''
        };

    }

    closeAlert(){
        this.setState({
            show: false
        });
    }

    onConfirm(){
        this.state.onConfirm(this.state.confirmParams);
        this.closeAlert();
    }

    onCancel(){
        this.state.onCancel(this.state.cancelParams);
        this.closeAlert();
    }

    keepWatching(video,confirmCallback,cancelCallback){
        this.setState({
            show: true,
            showConfirmButton: true,
            confirmButtonText:'Sim',
            showCancelButton:true,
            cancelButtonText:'Iniciar novamente',
            title:'',
            text:`Continuar assistindo de onde parou (${DataUtils.convertTime(video.timeElapsed)})?`,
            onConfirm: confirmCallback,
            confirmParams: video.id,
            onCancel: cancelCallback,
            cancelParams: video
        });
    }

    blocked(){
        this.setState({
            show: true,
            showCancelButton:true,
            cancelButtonText:'voltar',
            title:'Video bloqueado para usuários não logados.',
            onCancel: () => null,
            cancelParams: null
        });
    }

};

export default StoreModalAlert;
