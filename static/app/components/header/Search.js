import React from 'react';
import Reflux, { Component } from 'reflux';
import Router from '../../Router.js';

import StoreConfig from '../../stores/StoreConfig';
import ActionsConfig from '../../actions/ActionsConfig';

class Search extends Component {

	constructor(props){
		super(props);

		this.search = this.search.bind(this);
		this._onChange = this._onChange.bind(this);

		this.mapStoreToState(StoreConfig,(fromConfig) => {
			let query = '';
			if (fromConfig.queryString && fromConfig.queryString.q){
				query = fromConfig.queryString.q;
			}

			return {query}
		})
	}

	search(event){
		event.preventDefault();
		let query = this.state.query;
		if(query.length <= 0 ) return;
		window.location.href = url + "busca?q=" + query;
	}

	_onChange(e) {
		this.setState({query: e.target.value});
	}

	render(){
		return this.props.hasSearch ? (
			<div className="formSearch">
				<form onSubmit={(event) => this.search(event)} action="" className="formSearch_form" method="get">
					<button className="icon-search"></button>
					<input placeholder="Buscar por..." type="text" value={this.state.query} onChange={this._onChange}/>
				</form>
			</div>
		): null;

	}
};

export default Search;
