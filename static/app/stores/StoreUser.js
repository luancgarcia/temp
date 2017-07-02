import React from 'react';
import Reflux, { Store } from 'reflux';
import ActionsUser from '../actions/ActionsUser';
import ActionsAlert from '../actions/ActionsAlert';

import axios from 'axios';

class StoreUser extends Store{

    constructor(){
        super();

        this.listenables = [ActionsUser],

        this.state = {
            watchLaterList: [],
            watchLaterVideo: null,
            video_id: null
        }
    }

    getWatchLater(){

       axios.get(API_URL + "userexperience/watchlater/?token=" + JSON.parse( localStorage.getItem("user") ).u_id )
            .then( (response) => {

                let list = [];

                for( var i=0 ; i<response.data.results.length ; i++ ){
                    list.push( response.data.results[i].video );
                }

                let listReturn = [
                    {
                        id:0,
                        format: 'thumb',
                        name: 'Minha Lista',
                        videos: list
                    }
                ];

                this.setState({
                    watchLaterList: listReturn
                })
            })
            .catch( (error) => {

            });

    }

    postWatchLater(video_id){

       axios.post(API_URL + "userexperience/watchlater/",
            {
                token: JSON.parse( localStorage.getItem("user") ).u_id,
                video: video_id
            })
            .then( (response) => {

                this.verifyWatchLaterVideo(video_id);

                ActionsAlert.success('Vídeo incluído em "Minha Lista"');
            })
            .catch( (error) => {
            });

    }

    deleteWatchLater(video_id){

       axios.delete(API_URL + "userexperience/watchlater/" + video_id +  "/?token=" + JSON.parse( localStorage.getItem("user") ).u_id )
            .then( (response) => {

                this.verifyWatchLaterVideo(video_id);
                ActionsAlert.success('Vídeo removido com sucesso!');

            })
            .catch( (error) => {
            });

    }

    verifyWatchLaterVideo(video_id){

        let wtv = null;

        axios.get(API_URL + "userexperience/watchlater/?token=" + JSON.parse( localStorage.getItem("user") ).u_id )
            .then( (response) => {
                for( var i=0 ; i<response.data.results.length ; i++ ){

                    wtv = false;

                    if( video_id == response.data.results[i].video.id ){

                        wtv = true;
                        break;

                    }
                }

                this.setState({
                    watchLaterVideo: wtv,
                    video_id: video_id
                })

            })
            .catch( (error) => {
            });


    }



}

export default StoreUser;
