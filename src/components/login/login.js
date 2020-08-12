import React from 'react';
import './login.css';
import { connect } from 'react-redux';

export class Login extends React.Component {

    constructor(){
        super();
        this.state = {
            user: "",
            password: ""
        }
    }

    handleUserChange = e => {
        this.setState( { user: e.target.value } );
    };

    handlePasswordChange = e => {
        this.setState( { password: e.target.value } );
    };

    validateLogin = () => {

        let auth = { usuario : this.state.user , password : this.state.password };

        fetch ("http://xpense.develotion.com/login.php",{
            method: "POST",
            body: JSON.stringify(auth),
            headers:{'Content-Type': 'application/json'}
        })
            .then(res => res.json())
            .then((result) => {
                if(result["codigo"] === 200){
                    this.props.loginResult({
                        responseCode : result["codigo"], 
                        rApiKey: result["apiKey"],
                        rId : result["id"]})
                }
                else{
                    this.props.loginResult({
                        responseCode : result["codigo"], 
                        rMessage : result["mensaje"]})
                }
            })
    };

    showRegister = () => {
        this.props.changeToRegister();
    }

    render(){
        return( 
                <>
                <div className = "loginContainer">
                    <div className="login">

                        <label htmlFor="user" className="login">
                            USUARIO :
                            <input type="text" id="user" className="login" onChange={this.handleUserChange}></input>
                        </label>
                        
                        <label htmlFor="password" className="login">
                            CONTRASEÑA :
                            <input type = "password" id="password" className="login" onChange={this.handlePasswordChange} ></input>
                        </label>

                        <input type="button"  value="INGRESAR" className="login" onClick={this.validateLogin}></input>

                        <input type="button"  value="REGISTRARSE" className="login" onClick={this.showRegister}></input>

                        
                    </div>
                    <div>
                        <h4>{this.props.loginErrorMessage}</h4>
                    </div>
                </div>
                </>
        )
    }
    ;

}



let mapStateToProps = state => ({
    loginErrorMessage : state.loginManager.message
});

const mapDispatchToProps = dispatch => {
    return{
        loginResult: (result) => dispatch({type: "LOGIN", message: result}),
        changeToRegister: () => dispatch({type: "OPEN_REGISTRATION"})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
