import React from 'react';
import './register.css';
import { connect } from 'react-redux';

export class Register extends React.Component {

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

    registerUser = () => {

        let auth = { usuario : this.state.user , password : this.state.password };

        fetch ("http://xpense.develotion.com/usuarios.php",{
            method: "POST",
            body: JSON.stringify(auth),
            headers:{'Content-Type': 'application/json'}
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result)
                if(result["codigo"] === 200){
                    this.props.loginResult({
                        responseCode : result["codigo"], 
                        rApiKey: result["apiKey"],
                        rId : result["id"],
                        rMessage : "REGISTRO EXITOSO"
                    })
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
                <div className = "registerContainer">
                    <h3>NUEVO USUARIO</h3>
                    <div className="register">

                        <label htmlFor="user" className="register">
                            USUARIO :
                            <input type="text" id="user" className="register" onChange={this.handleUserChange}></input>
                        </label>
                        
                        <label htmlFor="password" className="login">
                            CONTRASEÑA :
                            <input type = "password" id="password" className="register" onChange={this.handlePasswordChange} ></input>
                        </label>

                        <input type="button"  value="Registrar Usuario" className="register" onClick={this.registerUser}></input>

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
    registerErrorMessage : state.loginManager.message
});

const mapDispatchToProps = dispatch => {
    return{
        loginResult: (result) => dispatch({type: "REGISTER", message: result}),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
