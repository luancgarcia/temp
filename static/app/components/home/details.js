import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const api = {
    baseUrl: 'https://api.dribbble.com/v1/shots',
    client_id: '04e0cabe39b68eba31d3d107faf3dc259d45448242bd4af0716fa042a4e2d072'
};

class Details extends Component {

	constructor(props){
		super(props);

		this.state = {
			id: props.params.id,
			image: null,
			title: null,
			avatar_url: null, 
			bio: null,

		}
	}

	componentDidMount() {
		axios.get(api.baseUrl + '/' + this.state.id + '?access_token='+api.client_id)
            .then((response) => {
            	console.log(response);
            	let res = response.data;
                this.setState({	
                	image: res.images.teaser,
                	title: res.title,
                	avatar_url: res.user.avatar_url,
                	bio: res.user.bio,
                	followers: res.user.followers_count,
                	name: res.user.name,
                	description: res.description

                })
            }).catch((err) => {
                
                console.log(err);
            })
	}


	render() {
		
		return(
			<div className='PageDetails'>
				<div className='Shot'>				
					<figure>
						<img src={ this.state.image } />
					</figure>
					<div className='info'>
						<h3 className="title">{ this.state.title }</h3>
						<p>Followers: { this.state.followers }</p>
					</div>				
				</div>
				<div className='others-details'>
					<header>
						<figure><span className='avatar'><img src={ this.state.avatar_url } /></span></figure>
						<h4 className='title'>{ this.state.name }</h4>
					</header>

					<article>
						<div dangerouslySetInnerHTML={ {__html: this.state.description} } />
					</article>
				</div>
			</div>
			
		) 
	} 

}

export default Details;