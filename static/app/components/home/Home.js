import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import InfiniteScroll from '../utils/InfiniteScroll';

import Shot from './Shot';

const api = {
    baseUrl: 'https://api.dribbble.com/v1/shots',
    client_id: '04e0cabe39b68eba31d3d107faf3dc259d45448242bd4af0716fa042a4e2d072'
};

class Home extends Component {

    constructor (props){
        super(props);
        
        this.state = {
            tracks: [],
            hasMoreItems: true,
            pagination: 0
        };       
        
    }

    loadItems(page) {
        axios.get(api.baseUrl + '?access_token='+api.client_id+'&page='+ page +'&per_page=1')
            .then((response) => {

                if(response) {                    

                    let tracks = this.state.tracks;
                    let data = response.data;

                    data.map((res) => {
                        tracks.push(res);

                        this.setState({
                            tracks: tracks
                        })
                    })
                }
            }).catch((err) => {
                this.setState({
                    hasMoreItems: false
                });
                console.log(err);
            })
    }

    render(){
        let loader = <div>loading...</div>;

        let items = [];

        this.state.tracks.map((track, i) => {
            items.push(
                <Shot data={ track } key={ i } />
            );
        });
        return (    
        
            <InfiniteScroll
                pageStart={0}
                loadMore={this.loadItems.bind(this)}
                hasMore={this.state.hasMoreItems}
                loader={loader}>
                    
                { items }
                
            </InfiniteScroll>
                
            
        );

    }

};

export default Home;