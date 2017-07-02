import React, { PropTypes } from "react";
import Reflux, { Component } from 'reflux';

import MaskedInput from 'react-maskedinput';

import StoreLogin from '../../stores/StoreLogin';
import ActionsLogin from '../../actions/ActionsLogin';

class DadosUsuario extends Component {

	constructor(props){
		super(props);
		this.stores = [StoreLogin];
		
		this.state = {
			cpf: '',
			nascimento: '',
			telefone: ''
		}
	}

	componentWillMount(props){
		ActionsLogin.getUserData();	
		super.componentWillMount(props);
	}

	componentDidMount() {
		this.setState({
			cpf: this.state.user.cpf,
			nascimento: this.state.user.birth,
			telefone: this.state.user.phone
		});
	}

	validateForm() {
		let valid = true;
		
		let border = "1px solid red";
		let bgcolor = "#ffe6e6";
		
		let required = document.getElementsByClassName("required");		
		let field_name = document.getElementsByClassName("perfil__name");
		let field_cpf = document.getElementsByClassName("perfil__cpf");
		let field_nascimento = document.getElementsByClassName("perfil__dataNascimento");
		let field_telefone = document.getElementsByClassName("perfil__telefone");

		let _telefone = parseInt(field_telefone[0].value.replace(" ","").replace(".", "").replace("-","").replace("(","").replace(")","").replace("_",""));
		
		for(let i =0; i < required.length; i++) {
			if(required[i].value.length == 0 ) {
				required[i].style.border = border;
				required[i].style.backgroundColor = bgcolor;
				valid = false;
			} else {
				required[i].removeAttribute("style");
				let pai = required[i].parentElement;
				if(pai.children[1]){
					pai.removeChild(pai.children[1])
				}
				// console.log(required[i].parentElement);
			}
		}

		if(field_name[0].value.length <= 2) {
			if(field_name[0].parentElement.children[1]) {return}
			let node_name = document.createElement("span");
			let divPai = field_name[0].parentElement; 
			let textname = document.createTextNode("Campo deve conter no mínimo 3 caracteres");
			node_name.appendChild(textname);

			field_name[0].style.border = border;
			field_name[0].style.backgroundColor = bgcolor;
			
			divPai.appendChild(node_name);
			valid = false;
		}

		if(!this.IsCPF(this.state.cpf)) {
			if(field_cpf[0].parentElement.children[1]) {return}
			let node_cpf = document.createElement("span");
			let divPai = field_cpf[0].parentElement; 
			let textcpf = document.createTextNode("Cpf inválido.");
			node_cpf.appendChild(textcpf);

			field_cpf[0].style.border = border;
			field_cpf[0].style.backgroundColor = bgcolor;
			
			divPai.appendChild(node_cpf);
			valid = false;
		}

		if(!this.validaData(field_nascimento[0].value)){
			if(field_nascimento[0].parentElement.children[1]) {return}
			let node_data = document.createElement("span");
			let divPai = field_nascimento[0].parentElement; 
			let textdata = document.createTextNode("Data inválida.");
			node_data.appendChild(textdata);

			field_nascimento[0].style.border = border;
			field_nascimento[0].style.backgroundColor = bgcolor;
			
			divPai.appendChild(node_data);
			valid = false;
		} 
		
		if(_telefone.toString().length < 11) {
			if(field_telefone[0].parentElement.children[1]) {return}
			let node_tel = document.createElement("span");
			let divPai = field_telefone[0].parentElement; 
			let textphone = document.createTextNode("Telefone inválido.");
			node_tel.appendChild(textphone);

			field_telefone[0].style.border = border;
			field_telefone[0].style.backgroundColor = bgcolor;
			
			divPai.appendChild(node_tel);
			valid = false;
		}
		
		if(valid) { return true } else { return false;}

	}

	validaData(data){
		let date = data;
		let ardt = new Array;
		let ExpReg = new RegExp("(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}");
		ardt = date.split("/");
		let erro = false;

		if ( date.search(ExpReg)==-1){
			erro = true;
		}
		else if (((ardt[1]==4)||(ardt[1]==6)||(ardt[1]==9)||(ardt[1]==11))&&(ardt[0]>30))
			erro = true;
		else if ( ardt[1]==2) {
			if ((ardt[0]>28)&&((ardt[2]%4)!=0))
				erro = true;
			if ((ardt[0]>29)&&((ardt[2]%4)==0))
				erro = true;
		}
		if (erro) {
			// console.log(" não é uma data válida!!!");
			return false;
		}
		return true;
	}

	IsCPF(cpf){
		cpf = cpf.replace(/[^\d]+/g,'');    
		if(cpf == '') return false; 
		// Elimina CPFs invalidos conhecidos    
		if (cpf.length != 11 || 
			cpf == "00000000000" || 
			cpf == "11111111111" || 
			cpf == "22222222222" || 
			cpf == "33333333333" || 
			cpf == "44444444444" || 
			cpf == "55555555555" || 
			cpf == "66666666666" || 
			cpf == "77777777777" || 
			cpf == "88888888888" || 
			cpf == "99999999999")
		    return false;       
		// Valida 1o digito 
		let add = 0;    
		for (let i=0; i < 9; i ++)       
			add += parseInt(cpf.charAt(i)) * (10 - i);  
			let rev = 11 - (add % 11);  
			if (rev == 10 || rev == 11)     
			    rev = 0;    
			if (rev != parseInt(cpf.charAt(9)))     
			    return false;       
		// Valida 2o digito 
		add = 0;    
		for (let i = 0; i < 10; i ++)        
			add += parseInt(cpf.charAt(i)) * (11 - i);  
		rev = 11 - (add % 11);  
		
		if (rev == 10 || rev == 11) 
			rev = 0;    
		
		if (rev != parseInt(cpf.charAt(10)))
			return false;       
		
		return true;   
	}

	updateProfile(){	

		if( !this.validateForm() ) return false;

		let code = JSON.parse( this.state.userID ).u_id;
	

		if(!code){
			return;
		}

		let obj = {
			name : this.refs.perfil_name.value,
			email :  this.refs.perfil_email.value,
			phone : this.state.telefone,
			birthdate :  this.state.nascimento,
			cpf : this.state.cpf
		}

		ActionsLogin.updateUser(code, obj);

		return false;
	}

	onChangeValue(e) {
		let stateChange = {}
		stateChange[e.target.name] = e.target.value;
		if(e.target.name == 'nascimento') {
			stateChange[e.target.name] = this.convertToYYYYMMDD(e.target.value);
		}
		this.setState(stateChange);
	}

	convertToYYYYMMDD(newDate) {
		
		if( newDate == "" ){
			return null;
		}else{
			let dateParts = newDate.split(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
			return dateParts[3] + "-" + dateParts[2] + "-" + dateParts[1];
		}

	}

	convertToDDMMYYYY(newDate) {
		if( newDate == undefined ){
			return null;
		}else{
			let dateParts = newDate.split('-');
			return dateParts[2] + dateParts[1] + dateParts[0];
		}
	}

	
	render(){
		let user = this.state.user;
		let name = user.user_name || "";
		let avatar = user.avatar || "/static/images/foto.jpg";
		let cpf = user.cpf || "";
		let birth = this.convertToDDMMYYYY(user.birth) || "";
		let email = user.email || "";
		let phone = user.phone || "";

		return(
			<div>
				<section className="perfil__dadosUsuario">	
					
					<div className="container">		
						<h2>Seus dados</h2>
						<div className="perfil__dadosUsuario__div">
							<div className="perfil__dadosUsuario__div--foto">
								<img src={ avatar } className="perfil__image" title="" />
								{/*<input type="file" className="perfil__foto" />
								<a href="javascript:;" onClick={this.cliqueFile}>Adicione uma foto</a>*/}
							</div>
							<div ref="perfil__table" className="perfil__table table">
								<div className="linha">
									<div className="col col1">Nome</div>
									<div className="col col2">
										{/*<input type="text" className="perfil__name" />*/}
										<input type="text" name="perfil__name" ref="perfil_name" className="perfil__name required" defaultValue={ name } />
									</div>
								</div>
								<div className="linha">
									<div className="col col1">CPF</div>
									<div className="col col2">
										{/*<input type="text" className="perfil__cpf" />*/}
										<MaskedInput mask="111.111.111-11" name="cpf" ref="perfil_cpf" className="perfil__cpf required" value={ cpf } onChange={ (e) => this.onChangeValue(e) }/>
									</div>
								</div>
								<div className="linha">
									<div className="col col1">Data de nascimento</div>
									<div className="col col2"> 
										{/*<input type="text" className="perfil__dataNascimento" />*/}
										<MaskedInput mask="11/11/1111" name="nascimento" ref="perfil_nascimento" className="perfil__dataNascimento required" value={ birth } onChange={ (e) => this.onChangeValue(e) }/>
									</div>
								</div>
								<div className="linha desabilitado">
									<div className="col col1">E-mail</div>
									<div className="col col2">
										<input type="text" name="perfil__email" className="perfil__email" ref="perfil_email" value={ email } readOnly="readOnly" />
									</div>
								</div>
								<div className="linha">
									<div className="col col1">Telefone</div>
									<div className="col col2 telefone">										
										<MaskedInput mask="(11) 11111-1111" name="telefone" ref="perfil_telefone" className="perfil__telefone required" value={ phone } onChange={ (e) => this.onChangeValue(e) } />
									</div>
								</div>
								<div className="linha">
									<div className="col col1"></div>
									<div className="col col2">											
										<button onClick={ () => this.updateProfile() } className="btnSubmit" title="Salvar"><i className="icon-save"></i>Salvar</button>
										<span className="perfilTxtSubmit" style={{display: 'none'}}>&nbsp;&nbsp;Perfil salvo com sucesso!</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);

	}

};

export default DadosUsuario;