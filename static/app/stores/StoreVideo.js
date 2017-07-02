import React from 'react';
import Reflux, { Store } from 'reflux';
import ActionsVideo from '../actions/ActionsVideo';
import SweetAlert from 'sweetalert-react';

import Api from './Api';

class StoreVideo extends Store {

    constructor() {
        super();
        this.api = new Api();

        this.listenables = [ActionsVideo],

        this.state = {
            video: {},
            videos: {},
            viewType: null,
        }
    }

    getVideo(videoID) {
        let userID = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).u_id : false;

        this.api.getVideo(videoID).then((responseVideo) => {
            let videoObject = responseVideo.data;
            
            if(userID) {
            
                this.api.getPlayback(videoID, userID).then((responsePlayback) => {
                    let currentTime = 0;
                    
                    if(responsePlayback.data.time) {
                        currentTime = parseInt(responsePlayback.data.time);
                    }
                    videoObject.timeElapsed = currentTime;
                    
                    this.setState({
                        video: videoObject, 
                        viewType:'unicam'
                    });

                }).catch((error) => {
                    // localStorage.setItem("seek", 0);
                    console.log("err: ", error);
                });
            } else if(!videoObject.free) {
                
                this.setState({showAlert: true, viewType:'unicam', msg: 'Você precisa estar logado para ver este vídeo.', video: videoObject });

            }else {
                this.setState({video: videoObject, viewType:'unicam'});
            }
        })
        .catch((error) => {
          console.log('error: StoreVideo',error);
        });
    }

    getMulticamVideos() {
        this.api.getMulticamVideos().then((response) => {
            this.setState({videos: response.data, viewType:'multicam'});
        })
        .catch((error) => {

          console.log('error: Multicam Videos',error);
        });
    }
};

export default StoreVideo;
