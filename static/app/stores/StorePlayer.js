import React from 'react';
import Reflux, { Store } from 'reflux';
import ActionsPlayer from '../actions/ActionsPlayer';

var hls;
import Api from './Api';
import Subtitle from '../components/utils/Subtitle';

import GA from '../components/ga/GA';

class StorePlayer extends Store {

    constructor() {
        super();
        this.api = new Api();

        //Instancia os métodos do component GA
        this.ga = new GA();

        this.listenables = [ActionsPlayer],

        this.state = {
            typeVideo: '',
            userID: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).u_id : false,
            ready: false,
            videoObj: []
        }

        this.events ={
            load : [],
            buffer : [],
            video : [],
            level : [],
            bitrate : []
        }

        this.timeSend = 0;
        this.videoEnded = false;
        this.legenda = new Subtitle();
    }

    loadPlayer(videoObj, typeVideo) {
        let lastStartPosition,
            lastDuration,
            videoID = videoObj.id,
            userID = this.state.userID;

        var currentTime;

        // Esse state é para disparar eventos GA
        this.setState({videoObj: videoObj});

        this.events.t0 = performance.now();

        this.setState({ready:true});


        if(Hls.isSupported()) {

            var video = document.getElementById("videoHLS_"+videoID);

            hls = new Hls({autoStartLoad:typeVideo !== 'unicam'});

            if (typeVideo !== 'unicam'){
                hls.loadSource(videoObj.url);
                hls.attachMedia(video);
            }
            hls.on(Hls.Events.MEDIA_ATTACHED,() => {
                hls.loadSource(videoObj.url);

                if(typeVideo == 'unicam'){
                    currentTime = this.videoEnded ? 0 : videoObj.timeElapsed;
                    this._timeUpdate("videoHLS_"+videoID, "time_"+videoID, videoObj);
                    this._eventosCanvas(videoID, hls.bufferTime);
                    clearInterval(this.timeSend);
                    this.timeSend = setInterval(() => { this._timeSend(videoID)},15000);
                    this._playListeners(videoID);
                    this._onPlayVideo(videoID);
                    this._onEndedVideo(videoID);

                    if(videoObj.subtitles != null ) {
                        let subtitles = 'http://dev.globosatplay4k.stormsec.com.br/media/legendas/srt/GUITAR_CENTER_SESSIONS_2013_-_THE_SMASHING_PUMPKINS_HD_LE.srt';
                        this.legenda.load(subtitles);
                    }

                }
                this._eventosHover("videoHLS_"+videoID);
                this._ativarDesativarFullScreen("videoHLS_"+videoID, "button-fullscreen_"+videoID);
            });

            hls.on(Hls.Events.MANIFEST_PARSED,() => {
                if(typeVideo == 'unicam'){
                    hls.startLoad(currentTime);

                }
                if(typeVideo == 'unicam'){
                    var buttonPlay = document.getElementById('buttom-overlay-play_'+videoID);
                    buttonPlay.style.display = 'none';
                } else {
                    video.play();
                }
            });

            if(typeVideo == 'unicam'){
                hls.on(Hls.Events.FRAG_BUFFERED, (event,data) => {

                    if(video.length == 0){
                        hls.destroy()
                    }

                    let configEvent = {
                        type : data.frag.type + " fragment",
                        id : data.frag.level,
                        id2 : data.frag.sn,
                        time : data.stats.trequest - this.events.t0,
                        latency : data.stats.tfirst - data.stats.trequest,
                        load : data.stats.tload - data.stats.tfirst,
                        parsing : data.stats.tparsed - data.stats.tload,
                        buffer : data.stats.tbuffered - data.stats.tparsed,
                        duration : data.stats.tbuffered - data.stats.tfirst,
                        bw : Math.round(8*data.stats.total/(data.stats.tbuffered - data.stats.tfirst)),
                        size : data.stats.total
                    };

                    this.events.load.push(configEvent);

                    this.events.bitrate.push({
                        time : performance.now() - this.events.t0,
                        bitrate : event.bw ,
                        duration : data.frag.duration,
                        level : event.id
                    });

                    if(hls.bufferTimer === undefined) {
                        this.events.buffer.push({ time : 0, buffer : 0, pos: 0});
                        hls.bufferTimer = window.setInterval(() => this._checkBuffer(videoID, hls.bufferTimer, currentTime, lastDuration), 100);
                    }

                });



            }
        }

    }

    attachMedia(videoID, buttonID) {
        var video = document.getElementById('videoHLS_'+videoID);
        var buttonPlay = document.getElementById(buttonID);
        hls.attachMedia(video);
        video.play();

        buttonPlay.classList.remove('icon-play');
        buttonPlay.classList.add('icon-loading');
    }

    backToBegin(videoObj) {
        videoObj.timeElapsed = 0;
        this.loadPlayer(videoObj, 'unicam');
    }

    playPauseVideo(videoID,buttonID) {

        let video = document.getElementById(videoID);
        let button = document.getElementById(buttonID);

        if(video.paused) {
            video.play();
            button.classList.add("icon-pause");
            button.classList.remove("icon-play");
        }else {
            video.pause();
            button.classList.add("icon-play");
            button.classList.remove("icon-pause");

            this.ga.videoPause(
                this.state.videoObj.content_type,
                this.state.videoObj.id,
                this.state.videoObj.free == true ? 'aberto' : 'fechado',
                this.state.videoObj.channel.name,
                this.state.videoObj.categories[0].name,
                this.state.videoObj.program.name,
                this.state.videoObj.season,
                this.state.videoObj.episode_slug,
                this.state.videoObj.title
            );

        }
    }

    rewFFVideo(type, videoID) {

        let video = document.getElementById(videoID);
        if(type == 'rew'){
            video.currentTime -= 10;
        } else {
            video.currentTime += 10;
        }

    }

    toggleFullScreen(videoID) {
        let video = document.getElementById(videoID);

        if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
            if (video.requestFullScreen || video.mozRequestFullScreen || video.webkitRequestFullScreen) {
                if (video.requestFullScreen) {
                    video.requestFullScreen();
                }
                else if (video.mozRequestFullScreen) {
                    video.mozRequestFullScreen();
                }
                else if (video.webkitRequestFullScreen) {
                    video.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            }
        }
        else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }

    _onEndedVideo(videoID, videoObj){
        let video = document.getElementById("videoHLS_"+videoID);

        video.addEventListener("ended", () => {
            this.videoEnded = true;

            this._timeSend(videoID, 0);

            let buttonPlay = document.getElementById('buttom-overlay-play_'+videoID);
            buttonPlay.setAttribute("class", "videoHLS__play icon-play");
            buttonPlay.style.display = 'block';
        });
    }

    _onPlayVideo(videoID){
        let video = document.getElementById("videoHLS_"+videoID);
        let progressBar = document.getElementById("buffered_c_"+videoID);
        let currentProgressBar = document.getElementById("buffered_progress_"+videoID);
        let indicatorProgressBar = document.getElementById("buffered_indicator_"+videoID);

        video.addEventListener("seeked", () => {
            setTimeout(() =>{
                currentProgressBar.style.left = indicatorProgressBar.offsetLeft - progressBar.offsetLeft + indicatorProgressBar.offsetWidth + 'px';
            },1000);

        });
    }

    _convertTime(input) {
        var sec_num = parseInt(input, 10);
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (isNaN(hours)) {
            hours = "00";
        }
        if (isNaN(minutes)) {
            minutes = "00";
        }
        if (isNaN(seconds)) {
            seconds = "00";
        }

        var time = hours + ':' + minutes + ':' + seconds;
        return time;
    }

    _playerActions(videoID, action) {
        let video = document.getElementById(videoID);

        switch (action) {
            case "play":
                video.play();
                break;
            case "pause":
                //clearInterval(buffer_video);
                video.pause();
                break;
            case "forward":
                video.currentTime += 30;
                break;
            case "backward":
                video.currentTime -= 30;
                break;
        }
    }

    _timeUpdate(videoID, timeID, videoObj) {

        let video = document.getElementById(videoID);
        let time = document.getElementById(timeID);

        video.addEventListener("timeupdate", () => {

            let current_time = this._convertTime(video.currentTime);
            let duration = this._convertTime(video.duration);
            let progress = parseInt(((video.currentTime / video.duration) * 100), 10);

            time.innerHTML = current_time;

            if(videoObj.subtitles != null) {
                let ms = video.currentTime * 1000;
                document.getElementById("subtitles").innerHTML = this.legenda.getLegenda(ms);
            }

        }, false);
    }

    _timeSend(videoID, time) {
        if(this.state.userID) {
            let video = document.getElementById("videoHLS_"+videoID);
            let newTime = 0;

            if(!time && time != 0) {
                newTime = parseInt((video.currentTime),10);
            } else {
                newTime = time;
            }

            this.api.playback({
                token: this.state.userID,
                video: videoID,
                time: newTime
            });
        }
    }


    _ativarDesativarFullScreen(videoID, buttonID) {
        let video = document.getElementById(videoID);
        let button = document.getElementById(buttonID);

        button.addEventListener("click",(event) => {
            this.toggleFullScreen(videoID);
        });

        video.addEventListener('webkitfullscreenchange mozfullscreenchange fullscreenchange',(e) => {
            let state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
            let body = document.getElementsByTagName('body')[0];

            if(state){
                body.classList.add("fullscreen");
            }
            else{
                body.classList.remove("fullscreen");
            }
        });

    }

    _eventosCanvas(videoID, bufferTime) {
        let video = document.getElementById("videoHLS_"+videoID);
        let progressBar = document.getElementById("buffered_c_"+videoID);
        let currentProgressBar = document.getElementById("buffered_progress_"+videoID);

        let setCurrentTime = (progressBar, currentProgressBar, event) => {
            var target = (event.offsetX - progressBar.offsetLeft) / progressBar.width * video.duration;
            video.currentTime = target;
            currentProgressBar.style.left = event.offsetX - progressBar.offsetLeft + 'px';
        }

        progressBar.addEventListener("click", (event) => {
            setCurrentTime(progressBar, currentProgressBar, event);
        });

         progressBar.addEventListener("mousemove", (event) => {
            if(event.which == 1){
                setCurrentTime(progressBar, currentProgressBar, event);
            }
        });
    }

    _eventosHover(videoID) {

        let iconSub = document.getElementById('icon-subtitle');
        let boxSubtitle = document.getElementById('listaLegenda');

        let video = document.getElementById(videoID).parentNode,
            justHidden = false,
            j,
            HoverEvent = (event) => {
                if (!justHidden) {

                    video.classList.add("componentsVisible");

                    justHidden = false;
                    clearTimeout(j);
                    var closest = function(el) {
                        return el.classList.contains("videoHLS__barStatus") ? true : !(el && el.classList.contains("video")) && closest(el.parentNode);
                    };



                    if(!event.target.classList.contains("videoHLS__barStatus") && !closest(event.target)){
                        video.style.cursor = 'pointer';
                        j = setTimeout(() => {
                            video.style.cursor = 'none';

                            video.classList.remove("componentsVisible");
                            iconSub.classList.remove("active");
                            boxSubtitle.className = "off";

                            justHidden = true;

                            setTimeout (function () {
                                justHidden = false;
                            }, 500);

                        }, 1000);
                    }

                }
            };

        video.addEventListener("mousemove", HoverEvent, false);
        video.addEventListener("mouseout", HoverEvent, false);
    }

    _playListeners(videoID) {
        var video = document.getElementById("videoHLS_"+videoID);


        video.onplay = () => {
            clearInterval(this.timeSend);
            this.timeSend = setInterval(() => { this._timeSend(videoID)},15000);
        };
        video.onpause = () => {
            // console.log()
            clearInterval(this.timeSend);
            // this._timeSend(videoID);
        };
    }

    _checkBuffer(videoID, bufferTimer, lastStartPosition, lastDuration) {

        var bufferingIdx = -1;
        var video = document.getElementById("videoHLS_"+videoID);
        var canvas = document.getElementById("buffered_c_"+videoID);
        var buffered_progress = document.getElementById("buffered_progress_"+videoID);
        var buffered_indicator = document.getElementById("buffered_indicator_"+videoID);

        let newEvent = {

        }
        if(!video){
            clearInterval(bufferTimer);
            return;
        }

        var buffered = video.buffered;
        var bufferingDuration;

        if (buffered) {
            if(!canvas.offset || canvas.width !== video.clientWidth) {
                canvas.width = video.clientWidth;
            }

            var pos = video.currentTime;
            var bufferLen;

            for (var i = 0, bufferLen = 0; i < buffered.length; i++) {

                var start = buffered.start(i)/video.duration * canvas.width;
                var end = buffered.end(i)/video.duration * canvas.width;


                buffered_progress.style.width = Math.max(2, end-start) +"px";

                if(pos >= buffered.start(i) && pos < buffered.end(i)) {
                    // play position is inside this buffer TimeRange, retrieve end of buffer position and buffer length
                    bufferLen = buffered.end(i) - pos;
                }

            }

            // check if we are in buffering / or playback ended state
            if(bufferLen <= 0.1 && video.paused === false && (pos-lastStartPosition) > 0.5) {
                // don't create buffering event if we are at the end of the playlist, don't report ended for live playlist
                if(lastDuration - pos <= 0.5  && this.events.isLive === false) {

                }
                else {
                    // we are not at the end of the playlist ... real buffering
                    if(bufferingIdx !== -1) {
                        bufferingDuration = performance.now() - this.events.t0 - this.events.video[bufferingIdx].time;
                        this.events.video[bufferingIdx].duration = bufferingDuration;
                        this.events.video[bufferingIdx].name = bufferingDuration;
                    }
                    else {
                        this.events.video.push({ type : 'buffering' , time : performance.now() - this.events.t0 });
                        bufferingIdx = this.events.video.length-1;
                    }
                }
            }

            if(bufferLen > 0.1 && bufferingIdx !=-1) {

                bufferingDuration = performance.now() - this.events.t0 - this.events.video[bufferingIdx].time;

                this.events.video[bufferingIdx].duration = bufferingDuration;
                this.events.video[bufferingIdx].name = bufferingDuration;

                // we are out of buffering state
                bufferingIdx = -1;

            }

            // update buffer/position for current Time
            var event = {
                time : performance.now() - this.events.t0,
                buffer : Math.round(bufferLen*1000),
                pos: Math.round(pos*1000)
            };

            var bufEvents = this.events.buffer;
            var bufEventLen = bufEvents.length;

            if(bufEventLen > 1) {
                var event0 = bufEvents[bufEventLen-2];
                var event1 = bufEvents[bufEventLen-1];
                var slopeBuf0 = (event0.buffer - event1.buffer)/(event0.time-event1.time);
                var slopeBuf1 = (event1.buffer - event.buffer)/(event1.time-event.time);
                var slopePos0 = (event0.pos - event1.pos)/(event0.time-event1.time);
                var slopePos1 = (event1.pos - event.pos)/(event1.time-event.time);

                // compute slopes. if less than 30% difference, remove event1
                if((slopeBuf0 === slopeBuf1 || Math.abs(slopeBuf0/slopeBuf1 -1) <= 0.3) &&
                (slopePos0 === slopePos1 || Math.abs(slopePos0/slopePos1 -1) <= 0.3))
                {
                    bufEvents.pop();
                }
            }

            this.events.buffer.push(event);

            var indicadorWidth = parseInt(buffered_indicator.offsetWidth) - 1;
            var videoPlaybackQuality = video.getVideoPlaybackQuality;
            var x = video.currentTime / video.duration * (canvas.width - indicadorWidth);

            // Code for Safari
            buffered_indicator.style.left = x + "px";
            // Code for IE9
            // buffered_indicator.style.msTransform = "translateX(" + x + "px)";
            // Standard syntax
            // buffered_indicator.style.transform = "translateX(" + x + "px)";
            // buffered_progress.style.left = x + 'px';

            if(x == (canvas.width - indicadorWidth)){
                $(".videoHLS__button-play").addClass("icon-play").removeClass("icon-pause");
            }
        }
    }

};

export default StorePlayer;
