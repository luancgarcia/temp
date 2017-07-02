import React from 'react';
import Reflux, { Component } from 'reflux';

import StoreAlert from '../../stores/StoreAlert';

class FeedbackAlert extends Component {

    constructor(props) {
        super(props);

        this.stores = [StoreAlert];
    }

    render() {
        let clName = 'ok';
        switch (this.state.alertStatus) {
            case 'success':
                break;
            case 'info':
                clName = 'info-1'
                break;
            case 'warning':
                clName = 'attention'
                break;
            case 'error':
                clName = 'cancel'
                break;
            default:

        }

        return ( this.state.alertOpened ?
            <div className={`fb-alert-wrapper l-${this.state.alertStatus}`}>
                <i className={`icon-${clName}`}></i><p>{this.state.alertMsg}</p>
            </div>
        : null )
    }
}

export default FeedbackAlert;
