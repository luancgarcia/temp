import React from 'react';
import Reflux, { Store } from 'reflux';

import ActionsAlert from '../actions/ActionsAlert';


class StoreAlert extends Store {

    constructor() {
        super();

        this.listenables = [ActionsAlert],

        this.state = {
            alertOpened: false,
            alertStatus: '',
            alertMsg: ''
        };

    }

    _open(status, msg) {
        this.setState({
            alertOpened: true,
            alertStatus: status,
            alertMsg: msg
        });
        setTimeout(() => {
            this.setState({
                alertOpened: false,
                alertStatus: '',
                alertMsg: ''
            });
        },3000)
    }

    success(msg){
        this._open('success',msg);
    }

    warning(msg){
        this._open('warning',msg);
    }

    info(msg){
        this._open('info',msg);
    }

    error(msg){
        this._open('error',msg);
    }

};

export default StoreAlert;
