import React from 'react';
import Reflux, { Component } from 'reflux';

import ActionsInfo from '../../actions/ActionsInfo';
import StoreInfo from '../../stores/StoreInfo';

class PageInfo extends Component{

	constructor(props){
		super(props);

		this.stores = [StoreInfo];
	}

	componentWillMount(){
		ActionsInfo.getPage(this.props.params.pageSlug);
		super.componentWillMount();
	}

	componentDidUpdate(prevProps){
		if( prevProps.params.pageSlug !== this.props.params.pageSlug ){
			ActionsInfo.getPage(this.props.params.pageSlug);
		}
	}

	render(){
		return(
			<section className="page container">
				<section className="contentPage">
					<h2 className="name">{ this.state.listContent.name }</h2>
					<p className="content">{ this.state.listContent.content }</p>
				</section>
			</section>
		)
	}
}

export default PageInfo;