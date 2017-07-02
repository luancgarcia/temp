import Reflux, { Store } from 'reflux';
import axios from 'axios';
import Api from './Api';

class StoreHome extends Store {

	constructor(){
		super();
		this.api = new Api();

		this.state = {
			user : []
		}

		this.api.auth().then((response) => {
		    this.setState({
		    	user: response.data
		    });

		   	
		}).catch((error) => {
			console.log(error);
		});

		this.api.getConfig().then((response) => {
			console.log('getconfig:', response);
		    this.setState({
		    	user: response.data
		    });		   	
		}).catch((error) => {

			console.log('getconfigerror: ', error);
		});

		// axios.get(API_URL).then((response) => {
		//     console.log('sdf', response);
		   	
		// }).catch((error) => {
		// 	console.log(error);
		// });

		// axios.post(API_URL)
		//   .then(function (response) {
		//     console.log(response);
		//   })
		//   .catch(function (error) {
		//     console.log(error);
		//   });

		// Pega os dados de slides da home
		// this.api.getConfig().then((response) => {
		// 	console.log('config: ', response);
		// 	// this.setState({
		// 	// 	listSlides: response.data.pages[0].collections,
		// 	// 	featured: response.data.featured
		// 	// });
		// })
		// .catch((error) => {
		// 	console.log(error);
		// });
	}


}

export default StoreHome;