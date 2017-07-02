var React = require('react');
var Reflux = require('reflux');
var ActionsVideos = require('../actions/ActionsVideos');
var axios = require('axios');

var StoreVideos = Reflux.createStore({
    
    /**
    * Actions que assinaram (podem usar) essa store.
    */
    listenables: [ActionsVideos],

    /**
    * Lista de videos
    */
    videos: [],

    programas: [],

    categorias: [],

    busca : [],

    queryBusca : "",

    userlists: [],

    /**
    * Metodo padrao chamado no mixin.
    */ 
    init: function() {
        this.load();
    },


    /**
    * Define metodo que busca da API, a lista de videos e a lista de menus. 
    * Passando a categoria busca a pagina.
    * @params categoria - categoria do video.
    */ 
    load: function(categoria){

        //this.getUserLists();

        // if(this.videos.length == 0){

            axios.get(API_URL + "publishing/applications/" + APP_ID + ".json")
            .then(function(response){

                var cliente_id = response.data.auth_client_id ? response.data.auth_client_id : null;
                var featured = response.data.featured ? response.data.featured : null;
                var page = response.data.pages ? response.data.pages[0] : null;

                // if( this.userlists == 0 ){
                //     var pageCollections = page.collections;
                // }else{

                //     // Adiciona os trilhos do usuário, do primeiro ao último, sem remover os demais trilhos

                //     for( var i=0; i<this.userlists.length ; i++ ){
                //         page.collections.splice(i, 0, this.userlists[i]);
                //     }

                // }
                
                var dado = {
                    cliente_id: cliente_id,
                    featured : featured,
                    pages: response.data.pages, 
                    page: page, 
                    collections: page.collections
                }

                this.videos = dado;

                this.montaMenu();
                
                this.trigger(this.videos);
  
            }.bind(this));
        // }
        // else{
        //     this.trigger(this.videos);
        // }

    },

    /**
    * Busca pagina por categoria
    * @params categoria - categoria da pagina.
    */ 
    getCategorias: function(categoria){

        if(this.videos.length == 0){
            return;
        };

        var page = this.videos.pages.filter(function(value){
            return value.slug == categoria;
        });

        this.videos["page"] = page[0];
        this.videos["collections"] = page[0].collections;

        this.trigger(this.videos);
    },

    setSearch : function(status){
        this.videos["isSearch"] = status;
    },

    /**
    * Cria lista com os menus do site.
    */  
    montaMenu: function(){
        var menu = [];
        var submenu = [];
        var that = this;

        this.setSearch(false);

        this.videos.pages.forEach(function(value, index) { 
           
            /**
            * type 5: Search
            */

            if(value.type === 5){
                that.setSearch(true);
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
        this.videos["menu"] = menu;
    },

    getUserLists: function(){
       
        if( localStorage.getItem("u_id") == undefined ||  localStorage.getItem("u_id") == ""){
            this.getUserListsArray([]);
        }else{
            axios.get(API_URL + "userexperience/home/?token="+ localStorage.getItem("u_id") )
                .then(function(response){
                    
                    this.getUserListsArray(response.data);
      
                }.bind(this));
        }

    },

    getUserListsArray: function(data){
        
        for( var i=0; i<data.length ; i++ ){
            this.videos.collections.splice(i, 0, data[i]);
        }

        this.trigger(this.videos);
        // this.userlists = data;


    },

    /**
    * Get programas
    */
    // getProgramas: function(slug){
    getProgramas: function(program_slug){
       // axios.get(API_URL + "videos/?program_slug=" + slug)
        

       axios.get(API_URL + "videos/programs/" + program_slug+ "/episodes/")
            .then(function(response){
                var list = [];

                for( var i=0 ; i<response.data.length ; i++ ){
                    list.push({ name: response.data[i].name, videos: response.data[i].videos, format: response.data[i].format });
                }

                var dado = {
                    collections: list
                }

                this.programas = dado;

                this.trigger(this.programas);
  
            }.bind(this));
    
    },

    getCategories: function(category_id){

       axios.get(API_URL + "videos/?category_id="+category_id+"&application_id="+ APP_ID)
            .then(function(response){
                var dado = {
                    collections: [{ name: response.data.results[0].categories[0].name, videos: response.data.results, format: "card" }]
                }

                this.categorias = dado;

                this.trigger(this.categorias);
  
            }.bind(this));
    
    },

    getVideoSelecionado : function(id){
 
         axios.get(API_URL + "videos/"+ id)
            .then(function(response){
                this.videos["videoSelecionado"] = response.data
                this.trigger(this.videos);
  
            }.bind(this));
    },

    /**
    * Get busca
    * @params q = termo da pesquisa
    * @params application_id = id da aplicacao.
    */
    getBusca: function(query, page){
        this.queryBusca = query;

        if(!this.queryBusca){
            this.queryBusca = query;
        }
        else{
            if(this.queryBusca != query){
                this.queryBusca = query;
                this.busca = []
            }
        }

        var page_video = page ? "&page_video=" + page : "";

        axios.get(API_URL + "videos/?q=" + this.queryBusca + "&application_id=" + APP_ID + "&page_size=30"+page_video)
        .then(function(response){
            
            this.busca = response.data ? response.data : [];
            this.busca["query"] = this.queryBusca;
            this.trigger(this.busca);

        }.bind(this)); 
    
    },

    addBusca: function(response, query){
        if(response.data.results.length > 0){
            if(this.busca.results && this.busca.results.length > 0){

                //Atualiza proxima pagina
                this.busca.next = response.data.next;

                //concatena resultados
                this.busca.results = this.busca.results.concat(response.data.results);
                
            }
            else{
                this.busca = response.data;
            }
            this.busca["query"] = query;
        };
    },

    updateBusca: function(url){
        axios.get(url)
        .then(function(response){
            this.addBusca(response, this.queryBusca);
            this.trigger(this.busca);
        }.bind(this)); 
    }

});

module.exports = StoreVideos;
