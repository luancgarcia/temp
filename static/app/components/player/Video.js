import React from 'react';
import Reflux, { Component } from 'reflux';

import ActionsLogin from '../../actions/ActionsLogin';
import ActionsPlayer from '../../actions/ActionsPlayer';

import StorePlayer from '../../stores/StorePlayer';
import StoreLogin from '../../stores/StoreLogin';

// import SweetAlert from 'sweetalert-react';

import ActionsModalAlert from '../../actions/ActionsModalAlert';

import GA from '../ga/GA';

class Video extends Component {

	constructor(props) {
		super(props);

		this.stores = [StorePlayer, StoreLogin];

        //Instancia os métodos do component GA
        this.ga = new GA();

		this.state = {
			videoObj: { },
			typeVideo: '',
			showAlert: localStorage.getItem('user') ? !!JSON.parse(localStorage.getItem('user')).u_id : false
		}

		this.attachPlayer = this.attachPlayer.bind(this);
		this.convertTime = this.convertTime.bind(this);
		this.backToBeginAndAttachPlayer = this.backToBeginAndAttachPlayer.bind(this);
	}

	componentDidMount() {

        if(this.props.videoObj && this.props.typeVideo == 'multicam'){
            ActionsPlayer.loadPlayer(this.props.videoObj, 'multicam');
        } else {
			ActionsPlayer.loadPlayer(this.props.videoObj, 'unicam');
		}
		this.setState({
			videoObj: this.props.videoObj,
			typeVideo: this.props.typeVideo,
			showAlert: localStorage.getItem('user') ? !!JSON.parse(localStorage.getItem('user')).u_id : false
		})

		if( this.props.videoObj.timeElapsed > 15 ){
			ActionsModalAlert.keepWatching(this.props.videoObj, this.attachPlayer, this.backToBeginAndAttachPlayer );
		}

	}

	backToBeginAndAttachPlayer(video){
		ActionsPlayer.backToBegin(video);
        this.attachPlayer(video.id);
	}

	attachPlayer(videoID) {		
		if(this.state.userID || this.state.videoObj.free) {
			ActionsPlayer.attachMedia(videoID,`buttom-overlay-play_${videoID}`);

			this.ga.statusLogin( this.state.userID == false ? 'nao-logado' : 'logado'  );

	        this.ga.videoPlay(
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

		} else if(!this.state.videoObj.free) {
			ActionsLogin.showModal(true);
		}
	}

	subtitleState(onOff, estado){
		let sub = document.getElementById('subtitles');
		let show = this.refs.Ligada;
		let hide = this.refs.Desligada;

		if(onOff) {
			sub.style.visibility = 'visible';
		}  else {
			sub.style.visibility = 'hidden';
		}
		if(estado == "Desligada") {
			show.className = "subItem";
			hide.className = "subItem icon-check";
		} else {
			hide.className = "subItem";
			show.className = "subItem icon-check";
		}
	}

	openSubtitle() {
		let listaLegenda = this.refs.listaLegenda;
		let icon = this.refs.iconSubtitle

		if(listaLegenda.className == 'off') {
			listaLegenda.className = 'show';
			icon.className = 'icon-subtitle active';
		} else {
			listaLegenda.className = 'off';
			icon.className = 'icon-subtitle';
		}
	}

	convertTime(input) {
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

	render() {
        let classVideo = "video " + this.state.typeVideo; // validar se a classe é unicam ou multicam
		let video = this.state.videoObj;
		let subtitles = video.subtitles;
		return  video ?
            (<div className={ classVideo }>
				<h2 className="title" id={ `title_${video.id}`  }>{ video.title }</h2>
				<video id={ `videoHLS_${video.id}`  } poster= { video.thumb || video.card } onClick={(event) => ActionsPlayer.playPauseVideo(`videoHLS_${video.id}`,`buttom-play_${video.id}`) }></video>

				{subtitles != null ?
					<div id="subtitles"></div>
				:
					''
				}

				<div className="videoHLS__barStatus">
					{this.state.typeVideo === 'unicam' ?
		              	<div className="buffered_c videoCentered" id={ `buffered_c_${video.id}`  }>
		                    <div className="buffered_progress" id={ `buffered_progress_${video.id}`  }></div>
		                    <div className="buffered_indicator" id={ `buffered_indicator_${video.id}`  }></div>
		                </div>
		            :
		            	<div className="buffered_c videoCentered live">
		                    <div className="buffered_progress"></div>
		                </div>

		        	}

		        	<div className="videoHLS__time">
		        		{this.state.typeVideo === 'unicam' ?

		                    <p className="videoHLS__current" id={ `time_${video.id}`  }></p>

			            :
			            	<p className="live">
			            		live
			            	</p>
			        	}
		        	</div>

	                <div className="videoHLS__buttonsVideo">
	                	{this.state.typeVideo === 'unicam' ?
	                    	<button className="icon-fast-bw button-rew" onClick={() => ActionsPlayer.rewFFVideo('rew',`videoHLS_${video.id}`) } id={ `buttom-rew_${video.id}`  }></button>
	                    : '' }

	                    <button className="icon-pause" onClick={() => ActionsPlayer.playPauseVideo(`videoHLS_${video.id}`,`buttom-play_${video.id}`) } id={ `buttom-play_${video.id}`  }></button>

	                    {this.state.typeVideo === 'unicam' ?
	                    	<button className="icon-fast-fw button-ff" onClick={() => ActionsPlayer.rewFFVideo('ff',`videoHLS_${video.id}`) } id={ `buttom-ff_${video.id}`  }></button>
	                    : '' }
	                </div>

	                <div className="videoHLS__actionsVideos">
	                    {subtitles != null ?
		                    <div className="legenda">
								<h6 className="icon-subtitle" id="icon-subtitle" ref="iconSubtitle" onClick={ () => this.openSubtitle() }></h6>
							    <ul ref="listaLegenda" className="off" id="listaLegenda">
							        <li>
							            <a

							            	onClick={() => this.subtitleState(false, "Desligada")}
							            	href="javascript:;"
							            	className="subItem"
							            	ref="Desligada"
							            	title="Desligada">Desligada</a>

							        </li>
							        <li>
							            <a
							            	onClick={() => this.subtitleState(true, "Ligada")}
							            	href="javascript:;"
							            	className="subItem icon-check"
							            	ref="Ligada"
							            	title="Ligada">Ligada</a>
							        </li>
							    </ul>
							</div>
						: null }
	                    <button className="icon-resize-full button-fullscreen" id={ `button-fullscreen_${video.id}`  }></button>
	                </div>
	            </div>

                <div className="videoHLS__overlay"></div>
				{this.state.typeVideo === 'unicam' ? (
					<div><a href="javascript:;" className="icon-play videoHLS__play" onClick={() => this.attachPlayer(video.id) } id={ `buttom-overlay-play_${video.id}`  }></a>
					</div>)
				: null}
            </div>) : ''

	}
}

export default Video;
