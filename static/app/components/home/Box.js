import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

class Box extends Component {


	render() {
		let data = this.props.data;
		
		return(
			<div className="box">
				<Link to={'details/'+data.id}>
					<span className="avatar"><img src={data.user.avatar_url} /></span>
					<figure>
						<img src={ data.images.teaser } />
					</figure>
					<footer>
						<h3 className="title">{ data.title }</h3>
						<p>Followers: { data.user.followers_count }</p>
					</footer>
				</Link>
			</div>
		) 
	} 

}

export default Box;