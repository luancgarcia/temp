import Reflux, { Store } from 'reflux';
import axios from 'axios';
import Api from './Api';

import ActionsInfo from '../actions/ActionsInfo';

class StoreInfo extends Store{

	constructor(){
		super();
		this.api = new Api();

		this.listenables = [ActionsInfo],

		this.state = {
			listContent: []
		}
	}

	getPage(pageSlug){

		// Tem que passar o endpoint do menu quando for criado pelo backend
		// Pega os dados do menu
		// Type 4 é página de conteúdo livre
		this.api.getConfig().then((response) => {

			let _content = [];

			for( var i=0 ; i<response.data.pages.length ; i++ ){
				if( (response.data.pages[i].slug == pageSlug)  && (response.data.pages[i].type == 4) ){
					_content = response.data.pages[i];
					break;
				}
			}

			if( _content == '' ){
				window.location.href = url + "not-found/";
			}

			this.setState({
				listContent: _content
			});

		})
		.catch((error) => {
			console.log(error);
		});

	}
	
}

export default StoreInfo;