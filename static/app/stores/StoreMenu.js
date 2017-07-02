import Reflux, {Store} from 'reflux';
import axios from 'axios';
import Api from './Api';

import ActionsMenu from '../actions/ActionsMenu';

class StoreMenu extends Store{

	constructor(){
		super();
		this.api = new Api();

		this.listenables = [ActionsMenu];

		this.state = {
			listMenu: []
		}

		// Tem que passar o endpoint do menu quando for criado pelo backend
		// Pega os dados do menu
		this.api.getConfig().then((response) => {
			this.setState({
				listMenu: response.data.pages
			});
		})
		.catch((error) => {
			console.log(error);
		});

	}

}

export default StoreMenu;
