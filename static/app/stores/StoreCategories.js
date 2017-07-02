import Reflux, { Store } from 'reflux';
import axios from 'axios';

import ActionsCategories from '../actions/ActionsCategories';

class StoreCategories extends Store {

	constructor(){
		super();

		this.listenables = [ActionsCategories],

		this.state = {
			listCategories: [],
			category: null
		}

	}

	getCategories(category_slug){

		// Pega os dados de slides de programas
		console.log(category_slug);

		axios.get(API_URL + "videos/?category_slug="+category_slug+"&application_id="+ APP_ID)
		.then((response) => {

			this.setState({
				listCategories: [{ 
					name: response.data.results[0].categories[0].name, 
					videos: response.data.results, 
					format: "card" 
				}]
			});

		})
		.catch((error) => {
		});

	}

	getCategoryByID(category_slug){
		// Pega os dados de slides de programas
		console.log(category_slug);

		axios.get(API_URL + "videos/?category_slug="+category_slug+"&application_id="+ APP_ID)
		.then((response) => {

			this.setState({
				category: {
					name: response.data.results[0].categories[0].name,
					lists: [
						{
							name: 'Todos',
							format: 'card',
							videos: response.data.results
						}
					]
				},
				visibilidade: false
			});

		})
		.catch((error) => {
		});

	}

}

export default StoreCategories;
