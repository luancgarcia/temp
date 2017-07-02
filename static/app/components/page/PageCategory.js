import React from 'react';
import Reflux, { Component } from 'reflux';
import Lists from '../lists/Lists';

import ActionsCategories from '../../actions/ActionsCategories';
import StoreCategories from '../../stores/StoreCategories';

class PageCategory extends Component {

    constructor (props){
        super(props);

        // Chama os dados dos slides
        this.stores = [StoreCategories];

        this.backgroundStyle = this.backgroundStyle.bind(this);
    }

    componentWillMount(){
        ActionsCategories.getCategoryByID(this.props.routeParams.programSlug);
        super.componentWillMount();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            category: null,
            visibilidade: true
        })

        ActionsCategories.getCategoryByID(nextProps.routeParams.programSlug);
    }

    backgroundStyle() {
        return {
            background: `url("${this.state.category.background ? this.state.category.background : ''}") 0 50% no-repeat`,
            backgroundSize: '100%'
        }
    }

    render(){
		return !!this.state.category ?
            (<div className="page">
                <div className="header-title" style={this.backgroundStyle()}>
                    <div className="container">
                        <h1>{ this.state.category.name }</h1>
                    </div>
                </div>
                <section className="page container">
                    <section className="contentPage">


                        {this.state.category.lists.map((list,x) => {
                            return(
                                <Lists key={ x } id={ `list-${x}` } lists={ list } where='home' />
                            )
                        }) }

                    </section>
                </section>
            </div>): (<div className="page"></div>)

	}
}

export default PageCategory;
