import React from 'react';
import Reflux, { Component } from 'reflux';
import { Link } from 'react-router';

import ActionsVideo from '../../actions/ActionsVideo';
import StoreVideo from '../../stores/StoreVideo';

import Video from '../player/Video';
import Lists from '../lists/Lists';
import ListMetadata from '../lists/ListMetadata';
import ButtonMyList from '../lists/ButtonMyList';

import ActionsModalAlert from '../../actions/ActionsModalAlert';

import ActionsLogin from '../../actions/ActionsLogin';
import StoreLogin from '../../stores/StoreLogin';

class PageVideo extends Component {

    constructor(props) {
        super(props);

        this.stores = [StoreVideo,StoreLogin];
    }

    componentWillMount() {
        if(this.props.route.path.indexOf('multicam') === 1){
            ActionsVideo.getMulticamVideos();
        } else {
            ActionsVideo.getVideo(this.props.routeParams.videoID);
        }

        super.componentWillMount();
    }

    componentDidUpdate(){
    	if( this.state.showModal == false ){
	    	if( !this.state.video.free && !this.state.isLogged ){
	    		ActionsModalAlert.blocked();
	    	}
    	}
    }

    render() {
        let video = this.state.video;
        let related = video.related;

        return(
            <div className="PageVideo">
				<section className="ComponentPlayer">
					<div className="container">
						{this.state.viewType ?
							this.state.viewType === 'unicam' ?
							(<Video typeVideo="unicam" videoObj={this.state.video}/>)
							: (this.state.videos ? this.state.videos.map((value, x) => {
								return (<Video typeVideo="multicam" key={x} videoObj={ value }/>)
							}) : '')
						 : null}

                    </div>
                </section>

				{this.state.viewType === 'unicam' ? (
					<section className="palco-info">
						<div className="container">
							<ListMetadata detailsMetadata={ video } referrer="page"/>
						</div>
					</section>
				): ''}

				{related ? (
					<div className="container">
		                <Lists lists={ [related] } where='video' />
					</div>
				) : ''}

			</div>
		);
	}

};

export default PageVideo;
