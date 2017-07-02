import Reflux, { Store } from 'reflux';
import axios from 'axios';

import Api from './Api';

import ActionsSearch from '../actions/ActionsSearch';

class StoreSearch extends Store {

	constructor(){
		super();
		this.api = new Api();

		this.listenables = [ActionsSearch],

		this.state = {
			result: null
		}

	}

	findResults(data){
		data.application_id = APP_ID;
		data.page_size = 30;

		this.api.findResults(data).then((result) => {
			this.setState({result: result.data});
		})

	}

}

export default StoreSearch;
