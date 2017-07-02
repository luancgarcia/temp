import React, { Component } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router';
import ListDetails from './ListDetails';

import ImageLoader from 'react-imageloader';

import ActionsLogin from '../../actions/ActionsLogin';
import StoreLogin from '../../stores/StoreLogin';

class SampleNextArrow extends Component{
    render() {
        return <button {...this.props} ></button>
    }
}

class SamplePrevArrow extends Component{
    render() {
        return <button {...this.props} ></button>
    }
}

class Lists extends Component{

    constructor(props){
        super(props);

        this.state = {
            configSlider_thumb: {
                dots: false,
                infinite: false,
                speed: 500,
                slidesToShow: 4,
                slidesToScroll: 1,
                draggable: false,
                nextArrow: <SampleNextArrow />,
                prevArrow: <SamplePrevArrow />,
                responsive: [
                    {
                        breakpoint: 1239,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 960,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 720,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    },

                    {
                        breakpoint: 545,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ],
            },
            configSlider_card: {
                dots: false,
                infinite: false,
                speed: 500,
                slidesToShow: 6,
                slidesToScroll: 1,
                nextArrow: <SampleNextArrow />,
                prevArrow: <SamplePrevArrow />,
                responsive: [
                    {
                        breakpoint: 1239,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 960,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 720,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    },

                    {
                        breakpoint: 545,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ],
            },
            configSlider_panel: {
                dots: false,
                infinite: false,
                speed: 500,
                slidesToShow: 6,
                slidesToScroll: 1,
                className: 'l-panel',
                nextArrow: <SampleNextArrow />,
                prevArrow: <SamplePrevArrow />,
                responsive: [
                    {
                        breakpoint: 1239,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 960,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 720,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    },

                    {
                        breakpoint: 545,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ],
            },
            videoSelected : null,
            detailsVideo : "",
            activelist: null,
            typeList: [],
            name: '',
            format: ''
        }

        this.stores = [StoreLogin];

        this.formatToShow = this.formatToShow.bind(this);
        this.showDetailsVideo = this.showDetailsVideo.bind(this);
        this.closeDetailsVideo = this.closeDetailsVideo.bind(this);

    }

    setStateByProps(nextProps){
        switch(nextProps.where){
            case 'home':
                this.setState({
                    typeList: nextProps.lists.videos,
                    name: nextProps.lists.name,
                    format: nextProps.lists.format
                });
                break;
            case 'video':
                this.setState({
                    typeList: nextProps.lists[0].videos,
                    name: 'Vídeos Relacionados',
                    format: nextProps.lists[0].format
                });
                break;
            case 'watchlater':
                this.setState({
                    typeList: nextProps.lists.videos,
                    name: nextProps.lists.name,
                    format: nextProps.lists.format
                });
                break;
            case 'search':
                this.setState({
                    typeList: nextProps.lists,
                    name: nextProps.title,
                    format: 'panel'
                });
                break;
        }
    }

    componentWillMount() {
        this.setStateByProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setStateByProps(nextProps);
    }

    //Mostrar ou esconder detalhes do video.
    showDetailsVideo(index, detailsVideo){
        this.setState({
            videoSelected: index,
            detailsVideo: detailsVideo
        });
    }

    closeDetailsVideo(){
        this.setState({
            videoSelected: null,
            detailsVideo: ''
        });
    }

    formatToShow(){
        let configSlider = {};
        switch(this.state.format){
            case 'thumb':
                configSlider = this.state.configSlider_thumb;
                if(this.state.typeList.length <= configSlider.slidesToShow) {
                    configSlider.arrows = false;
                }
                return configSlider;
                break;
            case 'card':
                configSlider = this.state.configSlider_card;
                if(this.state.typeList.length <= configSlider.slidesToShow) {
                    configSlider.arrows = false;
                }
                return configSlider;
                break;
            case 'panel':
                configSlider = this.state.configSlider_panel;
                if(this.state.typeList.length <= configSlider.slidesToShow) {
                    configSlider.arrows = false;
                }
                return configSlider;
                break;
            default:
                configSlider = this.state.configSlider_thumb;
                if(this.state.typeList.length <= configSlider.slidesToShow) {
                    configSlider.arrows = false;
                }
                return configSlider;
                break;
        }
    }

    render(){

        let typeList = this.state.typeList;
        let name = this.state.name;
        let format = this.state.format;
        let image = this.state.image;

        return typeList.length > 0 ?
            (
                <section className="listVideos">
                <div className="listVideos__container">
                    <h3>{ name }</h3>
                    <Slider { ...this.formatToShow() }>
                        {typeList.map((valueVideo, y) => {
                            let url_default = valueVideo.slug && valueVideo.slug != '' ? valueVideo.slug : valueVideo.id;
                            switch(format){
                                 case "thumb":
                                     image = valueVideo.thumb || '/static/images/placeholder-'+format+'.jpg';
                                     break;
                                 case "card":
                                 case "panel":
                                     image = valueVideo.card || '/static/images/placeholder-card.jpg';
                                     break;
                                 default:
                                     image = '/static/images/placeholder-'+format+'.jpg';
                             }

                            return(
                                <div key={y} className={this.state.videoSelected == y ? "list-videos-selected " : " " + format} >
                                    <div className="listVideos__divVideo" id={ valueVideo.id }>
                                        <Link
                                            className="listVideos__video"
                                            to={url + "video/" + url_default}
                                            title="Play">
                                            <ImageLoader
                                                    src={image}
                                                    wrapper={React.DOM.div}
                                                    preloader={this.preloader}>
                                                    Imagem Indisponivel!
                                            </ImageLoader>
                                            <span className="icon-play listVideos__play"></span>
                                            <span className="listVideos__overlay"></span>
                                        </Link>
                                        <div className="listVideos__detailsVideo">
                                            <p className='title-video' title={valueVideo.episode_slug ? `${valueVideo.episode_slug} - ${valueVideo.title}` : valueVideo.title}>{valueVideo.episode_slug ? `${valueVideo.episode_slug} - ` : ''}{valueVideo.title}</p>
                                            {valueVideo.program && valueVideo.program.name  ? (<p className='title-program'>{valueVideo.program.name}</p>): null}
                                        </div>

                                        <div className="listVideos__showDetails">
                                            <a
                                                onClick={ () => this.showDetailsVideo(y, valueVideo) }
                                                className="icon icon-angle-down"
                                                href="javascript:;"
                                                title="Exibir mais detalhes">
                                            </a>
                                            <a
                                                onClick={ () => this.closeDetailsVideo() }
                                                className="icon icon-angle-up"
                                                href="javascript:;"
                                                title="Esconder detalhes">
                                            </a>
                                        </div>

                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                    <ListDetails details={ this.state.detailsVideo } id={ this.props.id } />
                </div>
            </section>
        )
        : null
    }


}

export default Lists;
