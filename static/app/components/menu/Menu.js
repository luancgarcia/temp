import React from 'react';
import Reflux, { Component } from 'reflux';
import Route, { Link } from 'react-router';

import Search from "../header/Search";
import MenuLogin from './MenuLogin';

import ActionsLogin from '../../actions/ActionsLogin';

import StoreMenu from '../../stores/StoreMenu';
import StoreLogin from '../../stores/StoreLogin';

import GA from '../ga/GA';

class Menu extends Component{

    constructor(props){
        super(props);

        this.state = {
            stateDropDown: '',
            listSubmenu: [],
            type:'',
            showSubMenu: '',
            valueTop: ''
        }

        //Instancia os métodos do component GA
        this.ga = new GA();

        // Chama os dados do menu
        this.stores = [StoreMenu, StoreLogin];

        this.renderMenuList = this.renderMenuList.bind(this);
        this.renderSubmenuList = this.renderSubmenuList.bind(this);
    }

    /* DropDown */
    setStateDropDown(value){
        this.setState({
            stateDropDown: value
        });
    }

    login(e) {
        e.preventDefault();
        if(!this.state.isLogged){
            ActionsLogin.showModal(true);
        } else {
            ActionsLogin.logout();
        }
    }

    /** Monta o menu dependendo do tipo
        type 1: Home
        type 2: Categorias
        type 3: Programas
        type 4: Sobre
        type 5: Busca
        type 6: Login
        type 7: Multicam
    */
    menuLink(value,key){
        switch(value.type){
            case 1:
                return (
                    <Link
                        id={ key }
                        to={ url }
                        title={ value.name }
                        onMouseEnter= { () => this.subMenuMouseLeave() }>
                            <i className={ "icon-" + value.icon }></i>
                            <span>{ value.name }</span>
                            { this.menuSeparator(value) }
                    </Link>

                )
                break;

            case 2:
            case 3:
                return (
                    <Link
                        id={ key }
                        className="hasSubmenu"
                        to={ url }
                        title={ value.name }
                        onClick={e => e.preventDefault()}
                        onMouseEnter= { () => this.subMenuMouseEnter(value.slug, key) }>
                            <i className={ "icon-" + value.icon }></i>
                            <span>{ value.name }</span>
                            { this.menuSeparator(value) }
                    </Link>

                )
                break;

            /* O login precisa de tratamento */
            case 5:
                return null;
                break;

            case 6:
                return this.state.isLogged ? null:(
                    <Link
                        id={ key }
                        to=""
                        onClick={ e => this.login(e) }
                        title={value.name}
                        onMouseEnter= { () => this.subMenuMouseLeave() }>
                            <i className={ "icon-" + value.icon }></i>
                            <span>{ value.name }</span>
                            { this.menuSeparator(value) }
                    </Link>

                )
                break;

            default:
                return (
                    <Link
                        id={ key }
                        to={ url + value.slug + '/' }
                        title={ value.name }
                        onMouseEnter= { () => this.subMenuMouseLeave() }>
                            <i className={ "icon-" + value.icon }></i>
                            <span>{ value.name }</span>
                            { this.menuSeparator(value) }
                    </Link>

                )
                break;

        }


    }

    /* Cria um separador nos itens do menu */
    menuSeparator(value){
        if( value.separator ){
            return(
                <div className="menuDropDown__separador"></div>
            );
        }
    }

    /** Monta o submenu dependendo do tipo
        type 2: Categorias
        type 3: Programas
    */
    subMenuMouseEnter(slug,key){

        var menu = this.state.listMenu.filter(function(value){
            return value.slug == slug
        });

        switch(menu[0].type){
            case 2:
                this.setState({
                    listSubmenu: menu[0].categories,
                    type: menu[0].slug,
                    showSubMenu: 'active',
                    valueTop: document.getElementById(key).offsetTop
                });
                break;

            case 3:
                this.setState({
                    listSubmenu: menu[0].programs,
                    type: menu[0].slug,
                    showSubMenu: 'active',
                    valueTop: document.getElementById(key).offsetTop
                });
                break;

            default:
                this.setState({
                    listSubmenu: [],
                    showSubMenu: ''
                });
                break;

        }

    }

    subMenuMouseLeave(){

        this.setState({
            listSubmenu: [],
            showSubMenu: ''
        });

    }

    // Quebra um submenu gigante em blocos, se for pequeno não faz nada
    menuPaginate(){

        let oldArray = this.state.listSubmenu;
        let newArray = [];

        if( oldArray.length > 20 ){
            let size = parseInt( oldArray.length/3 , 10 ); // Size of chunks you are after
            let j = 0; // This helps us keep track of the child arrays

            for (var i = 0; i < oldArray.length; i++) {
              if (i % size === 0) {
                j++
              }
              if(!newArray[j]) newArray[j] = [];
              newArray[j].push(oldArray[i])
            }

        }else{
            newArray.push(oldArray);
        }

        return newArray;

    }

    renderMenuList() {
        return this.state.listMenu.map((value, key) => {
            return(
                <li key={key}>{ this.menuLink(value,key) }</li>
            )
        })
    }
    renderSubmenuList() {
        return this.menuPaginate().map((value, key) => {
           return(

               <div key={key} className="submenu__div">
                   <ul>
                       { value.map((value2, key2) => {

                               // Esse trecho é uma gambiarra enquanto categorias não retorna slug via api
                                let slug = value2.slug && value2.slug != '' ? value2.slug : value2.id;
                               // Fim trecho

                           return(
                               <li key={ key2 }>
                                   <Link to={url + this.state.type + "/" + slug} title={ value2.name}>
                                       {value2.name}
                                   </Link>
                               </li>
                           )
                       }) }

                   </ul>
               </div>
           )
       })
    }

    componentWillMount(){
        ActionsLogin.getUserData();
        super.componentWillMount();
    }

    render(){

        return(
            <div className="col-right">
                <Search hasSearch={this.props.hasSearch}/>

                <div
                    onMouseEnter={ () => this.setStateDropDown("open") }
                    onMouseLeave={ () => this.setStateDropDown("") }
                    className={ "menuDropDown " + this.state.stateDropDown }>

                    {/*<button className="icon-menu menuDropDown__button"></button>*/}
                    <button className={ "c-hamburger " + this.state.stateDropDown }>
                      <span>toggle menu</span>
                    </button>

                    <div className="menuDropDown__div">
                        <nav className="menuDropDown__nav" onMouseLeave={ () => this.subMenuMouseLeave() }>
                            <ul>
                                { this.renderMenuList() }
                            </ul>

                            {/* Imprime o submenu no hover do item do menu */}
                            <div className={"submenu " + this.state.showSubMenu} style={{ top: this.state.valueTop+'px' }}>

                                { this.renderSubmenuList() }

                            </div>

                        </nav>
                    </div>

                </div>

                <MenuLogin user={ this.state.user }/>

            </div>
        )
    }

}

export default Menu;