import Reflux, { Store } from 'reflux';
import ReactRouter from 'react-router';

import ActionsConfig from '../actions/ActionsConfig';

import Api from './Api';

class StoreConfig extends Store {

    constructor() {
        super();
        this.api = new Api();

        this.listenables = [ActionsConfig];

        this.state = {
            cached: false,
            menu: [],
            collections: [],
            categories: [],
            programs: [],
            featured: [],
            pages: [],
            current: false,
            page: false,
            client_id: null,
            hasSearch: false,
            queryString: {}
        };

        this.api.getConfig().then((response) => {

            let featured = response.data.featured ? response.data.featured : null;
            let page = response.data.pages ? response.data.pages[0] : null;
            let collections = [];
            let categories = [];
            let programs = [];
            let current = 'home';

            response.data.pages.forEach((value, index) => {

                if (window.location.pathname.replace('/','') === value.slug) {
                    collections = page.collections;
                    categories = page.categories;
                    programs = page.programs;
                    current = value.slug;
                }
            });

            let queryString = this._getQueryString();

            let result = this._montaMenu(response.data.pages);

            this.setState({
                cached: true,
                menu: result.menu,
                collections: collections,
                categories: categories,
                programs: programs,
                featured: featured,
                pages: response.data.pages,
                current: current,
                page: page,
                client_id: response.data.auth_client_id,
                hasSearch: result.hasSearch,
                queryString: queryString
            });

        });

    }
    _getQueryString() {
        let result = {};
        window.location.search.slice(1).split('&').forEach((pair) => {
            pair = pair.split('=');
            result[pair[0]] = decodeURIComponent(pair[1] || '');
        });
        return result;
    }

    /**
    * Cria lista com os menus do site.
    */
    _montaMenu(pages){
        var menu = [];
        var submenu = [];
        let hasSearch = false;
        let collections = []

        pages.forEach((value, index) => {

            /**
            * type 5: Search
            */

            if(value.type === 5){
                hasSearch = true;
                return;
            }

            if( value.programs.length > 0 ){
                submenu = value.programs
            }
            else if( value.categories.length > 0 ){
                submenu = value.categories;
            }
            else{
                submenu = [];
            }

            menu.push({
                name : value.name,
                icon : value.icon,
                slug : value.slug,
                type : value.type,
                submenu : submenu
            });
        });
        return {menu, hasSearch};


    }

    hasSearch() {
        return this.state.hasSearch;
    }

    hasControlAccess() {
        return this.state.hasControlAccess;
    }

    hasFeatured() {
        return this.state.hasFeatured;
    }

};


module.exports = StoreConfig;
