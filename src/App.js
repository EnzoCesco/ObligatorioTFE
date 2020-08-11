import React from 'react';
import './App.css';
import Login from './login/login.js'
import {createStore, combineReducers} from 'redux';
import { Provider } from 'react-redux';

const initialState = {

  loginStatus : "guest",
  apiKey : "",
  id : "",
  message : "",
  loginErrorMessage : "",
  taskList: []
  
};

/* ---- REDUCERS ---- */ 

function loginManager(state = initialState, action){
  
  let {responseCode, rApiKey, rId, rMessage} = {};

  if(action.message !== undefined){
    let {responseCode, rApiKey, rId, rMessage} = action.message;
  }

  switch(action.type){
    case "LOGIN":
      if(responseCode === 200){
        return( { ...state, loginStatus: "loged", apiKey: rApiKey, id: rId, message : rMessage } );
      }
      else{
        return( { ...state, loginStatus: "guest", apiKey: "", id: "", message : rMessage } );
      }

    default:
      return state;

  }
}

let rootReducer = combineReducers({loginManager});

/* ---- CREATE STORE ---- */ 

const store = createStore(rootReducer);

/* ---- APP ---- */ 

class App extends React.Component {

  render(){

      return (
        <Provider store={store}>
          <div className="loginScreen">
            <div className="container">
              <Login></Login>
            </div>
          </div>
        </Provider>
      );

  }

}

export default App;
