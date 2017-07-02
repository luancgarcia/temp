import React, { Component } from 'react';
import ReactGA from 'react-ga';

class GA extends Component {
    constructor(props){
        super(props);

        this.clickDetailsVideo = this.clickDetailsVideo.bind(this);
        this.statusLogin = this.statusLogin.bind(this);
        this.videoPlay = this.videoPlay.bind(this);
    }

    // Evento é chamado quando o usuário assiste a um conteúdo na plataforma
    // %logado_ou_nao-logado%
    statusLogin(status){
      return(
        ReactGA.event({
          category: 'Status - Login',
          action: APP_NAME,
          label: status
        })
      )
    }

    // Evento é chamado quando o usuário clica em detalhes de qualquer vídeo que esteja em um trilho
    // %Programa%|%Nome_do_asset%
    clickDetailsVideo(program,episode){
      return(
        ReactGA.event({
          category: 'Clique - Detalhes',
          action: APP_NAME,
          label: program + '|' + episode
        })
      )
    }

    // Evento é chamado quando o player se monta, o vídeo é autorizado a ser transmitido e se inicia
    // %vod ou live%|%ID%||%Exibição%|%Canal%|%Categoria%|%Programa%|%#Temp%|%#Ep%|%Nome_do_asset%
    videoPlay(typeVideo,id,free,channel,category,program,season,episode,title){
      return(
        ReactGA.event({
          category: 'Video - Play',
          action: APP_NAME,
          label: typeVideo + '|' + id + '||' + free + '|' + channel + '|' + category + '|' + program + '|' + season + '|' + episode + '|' + title
        })
      )
    }

    // Evento é chamado quando ha pause no video
    // %vod ou live%|%ID Globovideos%||%Exibição%|%Canal%|%Categoria%|%Programa%|%#Temp%|%#Ep%|%Nome_do_asset%
    videoPause(typeVideo,id,free,channel,category,program,season,episode,title){
      return(
        ReactGA.event({
          category: 'Video - Pause',
          action: APP_NAME,
          label: typeVideo + '|' + id + '||' + free + '|' + channel + '|' + category + '|' + program + '|' + season + '|' + episode + '|' + title
        })
      )
    }

    // Evento é chamado quando o usuário utiliza o formulário de busca
    // %Query%|%Quantidade_de_resultados(ou 'nenhum-resultado')%
    geralBusca(query,results){
      return(
        ReactGA.event({
          category: 'Geral - Busca',
          action: APP_NAME,
          label: query + '|' + results
        })
      )
    }


}

export default GA;