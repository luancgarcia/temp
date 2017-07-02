import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Box extends Component {


	render() {
		let data = this.props.data;
		return(
			<div className="box">
				<h3>{ data.title }</h3>
				<figure>
					<img src={ data.images.teaser } />
				</figure>
			</div>
		) 
	} 

}

export default Box;