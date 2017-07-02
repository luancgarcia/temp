import Reflux, { Store } from 'reflux';
import axios from 'axios';

import ActionsPrograms from '../actions/ActionsPrograms';

class StorePrograms extends Store {

	constructor(){
		super();

		this.listenables = [ActionsPrograms],

		this.state = {
			listPrograms: [],
			program: null
		}

	}

	getPrograms(program_slug){

		// Pega os dados de slides de programas
		axios.get(API_URL + "videos/programs/" + program_slug+ "/episodes/")
		.then((response) => {

            var list = [];

            for( var i=0 ; i< response.data.length ; i++ ){
                list.push({ name: response.data[i].name, videos: response.data[i].videos, format: response.data[i].format });
            }

			this.setState({
				listPrograms: list,
				program: null
			});

		})
		.catch((error) => {
		});

	}

	getProgramByID(program_slug){

		// Pega os dados de slides de programas
		axios.get(API_URL + "videos/programs/" + program_slug+ "/episodes/")
		.then((response) => {

            var lists = [];

            for( var i=0 ; i< response.data.length ; i++ ){
                lists.push({ name: response.data[i].name, videos: response.data[i].videos, format: response.data[i].format });
            }

			this.setState({
				listPrograms: null,
				program: {
					name: response.data[0].videos[0].program.name,
					background: response.data[0].videos[0].program.images[0],
					lists: lists,
				}

			});

		})
		.catch((error) => {
		});

	}

}

export default StorePrograms;
