var React = require('react');
var Reflux = require('reflux');
var ActionsLogin = require('../actions/ActionsLogin');
var axios = require('axios');
var Main = require('../components/Main');

var StoreStatic = Reflux.createStore({
    
    listenables: [ActionsLogin],
    login : [],
    isLogado : false,
    code : null,

    init: function() {
        this.auth();
    },


    auth: function(code, verificar){
        if(!code){
            return;
        }

        this.code = code;

        axios.get(AUTH_URL + "token/?code=" + code)
        //axios.get("http://localhost:8000/auth/token/?code=" + code)
            .then(function(response){
                $("body")[0].setAttribute("style", "overflow: initial");
                $("body").addClass("logado");
                localStorage.setItem("u_id", this.code);
                this.login = response.data;
                this.isLogado = true;
                this.trigger(this.login);
                
                // console.log(Main);
                // Main.forceUpdate();
        }.bind(this));
    },

    funcIsLogado: function(){
        this.trigger(this.isLogado);
    },

    exibirJanela: function(exibir){
        if(exibir){
            $("body")[0].setAttribute("style", "overflow: hidden");
            this.trigger("exibirJanela"); 
        }
        else{
            $("body")[0].setAttribute("style", "overflow: initial");
            this.trigger("fecharJanela");
        }
           
    },

    getDados: function(){
        this.trigger(this.login);
    },
    
    logout: function(){
        localStorage.setItem("u_id", "");
        $("body").removeClass("logado");
        this.login = {deslogado : true};
        this.trigger(this.login);
    }

});

module.exports = StoreStatic;
