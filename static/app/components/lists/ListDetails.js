import React, { Component } from 'react';

import ImageLoader from 'react-imageloader';
import Loading from  '../shared/Loading';

import ListMetadata from './ListMetadata';

import ButtonWatchNow from './ButtonWatchNow';
import ButtonMyList from './ButtonMyList';

import GA from '../ga/GA';

class ListDetails extends Component {

    constructor(props){
        super(props);

        //Instancia os métodos do component GA
        this.ga = new GA();

        this.preloader = this.preloader.bind(this);
        this.errorMessage = this.errorMessage.bind(this);

    }

    preloader() {
          return (<Loading visibilidade="true" type="image"/>);
    }

    errorMessage() {
        return (
          <div>
            <h2>Something went wrong!</h2>
          </div>
        );
     }

    render(){

        this.props.details ? this.ga.clickDetailsVideo( this.props.details.program.name , this.props.details.title ) : null;

        return this.props.details ? (

            <section className="detailsVideo">
                <div className="detailsVideo_container">

                    <div className="row">
                        <div className={this.props.details.thumb ? 'detailsVideo__content' : 'col-xs-offset-2 detailsVideo__content'}>
                            <ListMetadata detailsMetadata={ this.props.details } />
                        </div>

                        <div className='col-6 detailsVideo__photo'>
                            <ImageLoader
                                src={this.props.details.thumb || url+'static/images/placeholder-thumb.jpg'}
                                wrapper={React.DOM.div}
                                preloader={this.preloader}>
                                {this.errorMessage()}
                            </ImageLoader>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 detailsVideo__links">
                            <ButtonWatchNow detailsMetadata={ this.props.details } />
                            <ButtonMyList detailsMetadata={ this.props.details } />
                        </div>
                    </div>

                </div>
            </section>
        ) : null;

    }
}

export default ListDetails;