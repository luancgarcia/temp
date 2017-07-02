import React from 'react';
import Reflux, { Component } from 'reflux';

import SweetAlert from 'sweetalert-react';

import ActionsModalAlert from '../../actions/ActionsModalAlert';
import StoreModalAlert from '../../stores/StoreModalAlert';

class ModalAlert extends Component {

    constructor(props) {
        super(props);

        this.stores = [StoreModalAlert];

    }

    render() {
        return(
            <SweetAlert
                show={this.state.show}
                showCancelButton={this.state.showCancelButton}
                showConfirmButton={this.state.showConfirmButton}
                confirmButtonText={this.state.confirmButtonText}
                cancelButtonText={this.state.cancelButtonText}
                title={this.state.title}
                text={this.state.text}
                onConfirm={ () => ActionsModalAlert.onConfirm() }
                onCancel={ () => ActionsModalAlert.onCancel() }
            />

        )
    }
}

export default ModalAlert;
