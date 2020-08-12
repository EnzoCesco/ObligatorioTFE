import React from 'react';
import './App.css';
import Login from './components/login/login.js'
import Menu from './components/menu/menu.js'
import Register from './components/register/register.js'
import { connect } from 'react-redux';

export class App extends React.Component {

  
  
  render(){

      console.log(this.props.userState);

      return (
        <>

          { this.props.userState === "guest" ? <Login></Login> : <></>} 

          { this.props.userState === "register" ? <Register></Register> : <></>} 

          { this.props.userState === "loged" ? <Menu></Menu> : <></>}
         
          
        </>
      );

  }

}

let mapStateToProps = state => ({
  userState : state.loginManager.loginStatus
});


export default connect(mapStateToProps)(App);


