import React from 'react';
import Reflux, { Component } from 'reflux';

import ActionsLogin from '../../actions/ActionsLogin';
import StoreLogin from '../../stores/StoreLogin';

import ActionsUser from '../../actions/ActionsUser';
import StoreUser from '../../stores/StoreUser';

import { Link } from 'react-router';

class ButtonMyList extends Component{

	constructor(props){
		super(props);

		this.stores = [StoreLogin];

		this.mapStoreToState(StoreUser, (fromUser) => {
            if(fromUser.video_id === this.props.detailsMetadata.id){
                return fromUser;
            }
        });

	}

	componentWillReceiveProps(nextProps) {
        if(nextProps.detailsMetadata.id != this.props.detailsMetadata.id && this.state.isLogged) {
            ActionsUser.verifyWatchLaterVideo(nextProps.detailsMetadata.id);
            this.setState({
                watchLaterVideo: null
            })
        }
    }

    componentDidMount(){
        if( this.state.isLogged ){
    	   ActionsUser.verifyWatchLaterVideo(this.props.detailsMetadata.id);
            this.setState({
                watchLaterVideo: null
            })
        }
    }

	render(){
		return(
			this.state.watchLaterVideo !== null ?
                this.state.watchLaterVideo ?
                    <Link
                        
                        onClick={() => ActionsUser.deleteWatchLater(this.props.detailsMetadata.id)}
                        id={ this.props.detailsMetadata.id }
                        className="btnMyList"
                        title="REMOVER DA LISTA">
                            <i className="icon-remove-from-list"></i>
                            <span>REMOVER DA LISTA</span>
                    </Link>
                :
                    <Link
                        
                        onClick={() => ActionsUser.postWatchLater(this.props.detailsMetadata.id)}
                        id={ this.props.detailsMetadata.id }
                        className="btnMyList"
                        title="ASSISTIR MAIS TARDE">
                            <i className="icon-add-to-list"></i>
                            <span>ASSISTIR MAIS TARDE</span>
                    </Link>
            : null
		)
	}

}

export default ButtonMyList;