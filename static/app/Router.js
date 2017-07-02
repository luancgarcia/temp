import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouter, { Router, Route, IndexRoute, browserHistory } from 'react-router';


import Main from './components/Main';
import Home from './components/home/Home';
import Details from './components/home/Details';

const url = '/teste';
exports.start = function() {

	ReactDOM.render((
		<Router history={ browserHistory }>

			<Route path={ url } component={ Main }>
				<IndexRoute component={ Home }></IndexRoute>
				<Route component={ Details } path={ url + "details/:id" } ></Route>				
			</Route>



		</Router>
   ), document.getElementById('app'));
};
