// var React = require("react");
// var Reflux = require('reflux');

// var ActionsLogin = require("../../actions/ActionsLogin");
// var StoreLogin = require('../../stores/StoreLogin');

// class EnsureLoggedInContainer extends React.Component {
//   componentDidMount() {
//     const { dispatch, currentURL } = this.props

//     if (!isLoggedIn) {
//       // set the current url/path for future redirection (we use a Redux action)
//       // then redirect (we use a React Router method)
//       dispatch(setRedirectUrl(currentURL))
//       browserHistory.replace("/")
//     }
//   }

//   render() {
//     if (isLoggedIn) {
//       return this.props.children
//     } else {
//       return null
//     }
//   }
// }

// // Grab a reference to the current URL. If this is a web app and you are
// // using React Router, you can use `ownProps` to find the URL. Other
// // platforms (Native) or routing libraries have similar ways to find
// // the current position in the app.
// function mapStateToProps(state, ownProps) {
//   return {
//     isLoggedIn: ActionsLogin.isLogado(),
//     currentURL: ownProps.location.pathname
//   }
// }

// export default connect(mapStateToProps)(EnsureLoggedInContainer)

var React = require("react");
var Reflux = require('reflux');

var $ = require('jquery');

var ActionsPerfil = require("../../actions/ActionsPerfil");
var StorePerfil = require('../../stores/StorePerfil');

var ActionsLogin = require("../../actions/ActionsLogin");
var StoreLogin = require('../../stores/StoreLogin');

var ValidaUsuarioLogado = React.createClass({

  mixins: [
    Reflux.connectFilter(StoreLogin, "storelogin", function(response) {
 
           if(!response){
            window.location.href = url
           }

          this.setState({
            isLoggedIn: response
          })
         
      })
    ],

  getInitialState: function(){
    return {
      isLoggedIn : false
    }
  },
  componentWillMount: function(){
    ActionsLogin.funcIsLogado();
  },

  render: function(){

    if (this.state.isLoggedIn) {
      return this.props.children
    } else {
      return null
    }

  },

});

module.exports = ValidaUsuarioLogado;