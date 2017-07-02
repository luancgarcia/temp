import React from 'react';
import Reflux, { Component } from 'reflux';
import Lists from '../lists/Lists';

import ActionsPrograms from '../../actions/ActionsPrograms';
import StorePrograms from '../../stores/StorePrograms';

class PageProgram extends Component {

    constructor (props){
        super(props);

        // Chama os dados dos slides
        this.stores = [StorePrograms];

        this.backgroundStyle = this.backgroundStyle.bind(this);
    }

    componentWillMount(){
		ActionsPrograms.getProgramByID(this.props.routeParams.programSlug);
		super.componentWillMount();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            program: null,
            visibilidade: true
        });
        ActionsPrograms.getProgramByID(nextProps.routeParams.programSlug);
    }

    backgroundStyle() {
        return {
            background: `url("${this.state.program.background ? this.state.program.background.file : ''}") 0 50% no-repeat`,
            backgroundSize: '100%'
        }
    }

	render(){
		return !!this.state.program ?
            (<div className="page">
                <div className="header-title" style={this.backgroundStyle()}>
                    <div className="container">
                        <h1>{ this.state.program.name }</h1>
                    </div>
                </div>
                <section className="page container">
                    <section className="contentPage">


                        {this.state.program.lists.map((list,x) => {
                            return(
                                <Lists key={ x } id={ `list-${x}` } lists={ list } where='home' />
                            )
                        }) }

                    </section>
                </section>
            </div>) : (<div className="page"></div>)

	}
}

export default PageProgram;
