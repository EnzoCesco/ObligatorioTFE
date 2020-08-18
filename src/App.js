import React from 'react';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Main from './components/Main.js'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export class App extends React.Component {

  render(){

      return (
          <Router>
            <Switch>
              <Route exact path="/" component={Login}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/main" component={Main}/>
            </Switch>
          </Router>
      );

  }
}

let mapStateToProps = state => ({
  userState : state.loginManager.loginStatus
});


export default connect(mapStateToProps)(App);


