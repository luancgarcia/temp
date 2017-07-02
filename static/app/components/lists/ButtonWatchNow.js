import React, { Component } from 'react';

import { Link } from 'react-router';

class ButtonWatchNow extends Component{

	constructor(props){
		super(props);

	}

	render(){
		return(
            <Link
                className="btnWatchNow"
                to={url + "video/" + this.props.detailsMetadata.id}
                title="ASSISTIR AGORA">
                	<i className="icon-play"></i>
                	<span>ASSISTIR AGORA</span>
            </Link>
		)
	}

}

export default ButtonWatchNow;