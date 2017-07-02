import axios from 'axios';

class Subtitle {
	
	constructor() {
		this.legendas = [];
	    this.callbackLoad = null;
	    this.legendaAtual = null;
	    this.ultimaLegenda = null;
	    this.blocoCoringa = "|x|X|x|";
	}
	
    // Utilizado para manobras com strings (replace, split, etc).
    

    // Métodos 'Privados' ------------------------------------------------------------------------------------

    // Método chamado quando o ajax executado pelo load falha
    _loadError(jqXHR, textStatus, errorThrown) {
        //console.error("Não foi possível carregar a legenda através desta URL. ( "+ textStatus + " / "+ errorThrown+ ")");
        if(this.callbackLoad != null) {
            this.callbackLoad(false);
        }
    }

    // Método chamado quando o ajax executado pelo load tem sucesso
    _loadSuccess(data){
        let normalizada = this._normalizaLinhas(data);
        let partes = this._splitBlocos(normalizada);
        let indiceLegenda = 0;

        for(let i=0; i<partes.length; i++) {

            let bloco = this._trim(partes[i]);

            if(bloco == "") {
                //console.warn("Bloco vazio (i == "+ i +")");
                continue;
            }else {

                let legenda = this._blocoLegendaParse(partes[i]);

                if(legenda){
                    legenda.indice = indiceLegenda;
                    this.legendas.push(legenda);
                    indiceLegenda++;
                }
            }
        }

        if(this.callbackLoad != null) {
            this.callbackLoad(true);
        }
    }

    // Útils .................................................................................................
    // Normaliza quebra de linhas
    _normalizaLinhas(s){
        return s.replace( /\r\n|\r|\n/g, '\n' );
    }

    // Elimina espaços e quebras de linha, no inicio e/ou no fim da string
    _trim(s){
        //console.log(s)
        return s.replace( /^\s+|\s+$|^\n+|\n+$/g,"" );
    }

    // Converte strings no formato 00:00:00.000 para milisegundos
    _str2ms(str){

        if(str.indexOf(":") == -1){
            return;
        }

        let partes = str.split(":");
        let horas = parseFloat(partes[0]);
        let minutos = parseFloat(partes[1]);
        let segundos = parseFloat(partes[2].replace(",", "."));
        return (segundos + (minutos * 60) + (horas * 60 * 60)) * 1000;
    }

    // Divide a legenda em blocos, de acordo com seus índices
    _splitBlocos(legenda){
        let pattern = /\n{2,}(\d+\n)/gim;
        let legendaMarcada = legenda.replace(pattern, this.blocoCoringa + "$1");
        return legendaMarcada.split(this.blocoCoringa);
    }

    // Parser do bloco de legenda
    _blocoLegendaParse(bloco){
        let regex = new RegExp("(\\d+)\\n(.+)\\n(.+|\n+)");
        let final = bloco.replace(regex, "$1"+ this.blocoCoringa +"$2"+ this.blocoCoringa +"$3").split(this.blocoCoringa);

        if(typeof(final) != "undefined" && final.length >= 3) {

            let tempos = final[1].split(" --> ");
            let inicio = this._trim(tempos[0]);
            let fim = this._trim(tempos[1]);

            return {
                "indice": parseInt(final[0]),
                "in_ms": this._str2ms(inicio),
                "in_str": inicio,
                "out_ms": this._str2ms(fim),
                "out_str": fim,
                "texto": final[2].replace(/\n+/gm, "<br />")
            };
        }else {
            console.error("Bloco inválido.");
        }

    }



    // Métodos 'Públicos' ------------------------------------------------------------------------------------
    // Carrega a legenda e encaminha pro parse (via _loadSuccess)
    load(url, callback){
    	console.log(url);
        this.callbackLoad = callback;

        axios.get(url, {
        	responseType: "text"
        }).then((response) => {
        	console.log(response);
            this._loadSuccess(response.data);
        }).catch((error) =>{
        	console.log('não foi possível pegar a legenda: ', error);
            this._loadError(error);
        });
    }

    // Encontra a legenda correta para o tempo
    getLegenda(tempoExecucao){
        let textoLegenda = "";

        // Valida se a legenda atual ainda deve permanecer ativa
        if(this.legendaAtual != null &&
           this.legendaAtual.in_ms <= tempoExecucao &&
           this.legendaAtual.out_ms >= tempoExecucao) {
            return this.legendaAtual.texto;
        }

        let legendasPossiveis = this.legendas;

        // Analisa se é possível diminuir o tamanho do array que será
        // utilizado para buscar a legenda
        if(this.ultimaLegenda != null){
            if(tempoExecucao >= this.ultimaLegenda.out_ms) {
                legendasPossiveis = this.legendas.slice(this.ultimaLegenda.indice);
            }
        }

        // TODO: Criar lógica para que, se não houver seek, considerar um range
        // pequeno de legendas, limitando a quantidade baseado em this.ultimaLegenda + X possíveis

        // Varre array de possíveis legendas buscando o match de tempo
        for(let i=0; i<legendasPossiveis.length; i++) {
            let legenda = legendasPossiveis[i];

            if(legenda.in_ms <= tempoExecucao && legenda.out_ms >= tempoExecucao) {
                this.ultimaLegenda = legenda;
                this.legendaAtual = legenda;
                textoLegenda = legenda.texto;
            }
        }

        // Limpa seleção da legenda atual, visto que nenhuma será exibida
        if(textoLegenda == "") {
            this.legendaAtual = null;
        }

        return textoLegenda;
    }

    // componentDidMoutn() {
    // 	this._init();	
    // }
    
}

export default Subtitle;