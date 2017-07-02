import React, { Component } from 'react';
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share';

const { FacebookShareButton, GooglePlusShareButton, TwitterShareButton } = ShareButtons;

class ListMetadata extends Component{

    constructor(props){
        super(props);

        this.renderContentRating = this.renderContentRating.bind(this);
        this.renderCategories = this.renderCategories.bind(this);
        this.renderYear = this.renderYear.bind(this);
        this.renderDuration = this.renderDuration.bind(this);
        this.renderDescription = this.renderDescription.bind(this);
        this.renderActors = this.renderActors.bind(this);
        this.renderDirectors = this.renderDirectors.bind(this);
    }

    convertTime(input) {
        let sec_num = parseInt(input, 10);
        let hours = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        let seconds = sec_num - (hours * 3600) - (minutes * 60);

        switch(hours){
            case isNaN:
            case 0:
                hours = '';
                break;
            default:
                hours = hours + 'h';
                break;
        }

        switch(minutes){
            case isNaN:
            case 0:
                minutes = '';
                break;
            default:
                minutes = minutes + 'min';
                break;
        }

        let time = hours + minutes;
        return time;
    }

    renderContentRating(content_rating){
        if(content_rating){
            return(
                <span
                    id="content_rating"
                    className="meta"
                    style={{backgroundColor: content_rating.color}}
                    title={ content_rating.title }>
                        { content_rating.label }
                </span>
            )
        }else{
            return null;
        }
    }

    renderCategories(categories){
        if(categories){
            return(
                <span
                    id="categories"
                    className="meta"><span className="label">Gênero: </span>
                    { categories.map( ( category , key ) => {
                        return(
                            <span key={key}>
                                { category.name }
                                { categories.length-1 > key ? ', ' : null }
                            </span>
                        )
                    })}
                </span>
            )
        }else{
            return null;
        }
    }

    renderYear(year){
        if(year){
            return(
                <span
                    id="year"
                    className="meta"><span className="label">Ano: </span>
                    { year }
                </span>
            )
        }else{
            return null;
        }
    }

    renderDuration(duration){
        if(duration){
            return(
                <span
                    id="duration"
                    className="meta"><span className="label">Duração: </span>
                    { this.convertTime(duration) }
                </span>
            )
        }else{
            return null;
        }
    }

    renderDescription(description){
        if(description){
            return(
                <div
                    id="description"
                     className="line">
                    { description }
                </div>
            )
        }else{
            return null;
        }
    }

    renderActors(actors){
        let actorsString = '';
        for(let index in actors) {
            actorsString += actors[index].name + (actors.length-1 > index ? ', ' : '');
        }
        if(actors){
            return(
                <div
                    id="actors"
                     className="line">
                    <p>
                        <strong>Elenco: </strong>
                        <span>
                            { actorsString }
                        </span>
                    </p>
                </div>
            )
        }else{
            return null;
        }
    }

    renderDirectors(directors){
        let directorsString = '';
        for(let index in directors) {
            directorsString += directors[index].name + (directors.length-1 > index ? ', ' : '');
        }
        if(directors){
            return(
                <div
                    id="directors"
                    className="line">
                    <p>
                        <strong>Direção: </strong>
                        <span>
                            { directorsString }
                        </span>
                    </p>
                </div>
            )
        }else{
            return null;
        }
    }

    render(){
        let detailInfo = this.props.detailsMetadata;
        let shareUrl = window.location.origin + "/video/" + detailInfo.id;
        
        return(
            <div className={`detailsVideo__metadata l-${this.props.referrer}`}>

                <p className="title-video">{detailInfo.episode_slug ? `${detailInfo.episode_slug} - ` : ''}{detailInfo.title}</p>
                {detailInfo.program && detailInfo.program.name ? (<p className="title-program">{detailInfo.program.name}</p>): null}

                <div id="metadata" className="line">
                    { this.renderContentRating(detailInfo.content_rating) }
                    { this.renderCategories(detailInfo.categories) }
                    { this.renderYear(detailInfo.year) }
                    { this.renderDuration(detailInfo.duration) }
                </div>

                { this.renderDescription(detailInfo.description) }
                { this.renderActors(detailInfo.actors) }
                { this.renderDirectors(detailInfo.directors) }


                <div className="shareButtons">
                    <p className="shareText">Compartilhe: </p>
                    <FacebookShareButton 
                        url={ shareUrl }                
                        title={detailInfo.program ? detailInfo.program.name : null}
                        description={detailInfo.description}
                        picture={detailInfo.thumb || detailInfo.card}>
                        <span className="share icon-facebook-square"></span>
                    </FacebookShareButton>

                    <TwitterShareButton 
                        url={ shareUrl }                
                        title={detailInfo.program ? detailInfo.program.name : null}>
                        <span className="share icon-twitter-square"></span>
                    </TwitterShareButton>

                    <GooglePlusShareButton 
                        url={ shareUrl }>
                        <span className="share icon-google-square"></span>
                    </GooglePlusShareButton>
                </div>
            </div>

        )
    }

}

export default ListMetadata;
