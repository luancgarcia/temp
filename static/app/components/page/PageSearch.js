import React from 'react';
import Reflux, { Component } from 'reflux';
import Lists from '../lists/Lists';

import Loading from '../shared/Loading.js';

import ActionsSearch from '../../actions/ActionsSearch';
import StoreSearch from '../../stores/StoreSearch';

import GA from '../ga/GA';

class PageSearch extends Component {

    constructor (props){
        super(props);

        // Chama os dados dos slides
        this.stores = [StoreSearch];

        //Instancia os métodos do component GA
        this.ga = new GA();
    }

    componentWillMount() {
        ActionsSearch.findResults({q:this.props.location.query.q});
        super.componentWillMount();
    }

    componentDidUpdate(){
        let query = this.props.location.query.q;
        let results = this.state.result.count > 0 ? this.state.result.count+'-resultados' : 'nenhum-resultado';
        this.ga.geralBusca(query,results);
    }

	render(){

        let query = this.props.location.query.q;
		return( this.state.result ?

            this.state.result.count > 0 ?
                <section className="home">

                    <Lists id="mylist-busca" title={`${this.state.result.count} resultados encontrados para o termo: ${query}`} lists={ this.state.result.results } where='search' />
                </section>
    		: (
                <section className="home">
                    <section className="container">
                        <h2>Nenhum resultado encontrado com o termo: {query}</h2>

                    </section>
            </section>
        ) : <section className="home">
            <section className="container">
                <Loading visibilidade={true} />

            </section>
        </section>);
	}
}

export default PageSearch;
