import React from 'react';
import './App.css';
import Login from './components/login/login.js'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { initialState } from './initialState.js';


/* ---- REDUCERS ---- */ 

function reducer(state = initialState, action){
  switch(action.type){
    case "LOGIN":
      let {responseCode, rApiKey, rId, rMessage} = action.message;
      if(responseCode === 200){
        return( { ...state, loginStatus: "loged", apiKey: rApiKey, id: rId, message : rMessage } );
      }
      else{
        console.log(action.message);
        return( { ...state, loginStatus: "guest", apiKey: "", id: "", message : rMessage });
      }

    default:
      return state;

  }
}

/* ---- CREATE STORE ---- */ 

const store = createStore(reducer);

/* ---- APP ---- */ 

class App extends React.Component {

  render(){

      return (
        <Provider store={store}>
              <Login></Login>
        </Provider>
      );

  }

}

export default App;
