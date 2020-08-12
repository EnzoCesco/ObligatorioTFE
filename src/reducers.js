import { combineReducers } from 'redux'
import { initialState } from './initialState.js';
/* import { } from './actions' */ 

/* ---- REDUCERS ---- */ 

export const appReducers = combineReducers({
  loginManager 
})

function loginManager(state = initialState, action){

  let {responseCode, rApiKey, rId, rMessage } = action.message;
  
  switch(action.type){

    case "LOGIN":

      if(responseCode === 200){
        return( { ...state, loginStatus: "loged", apiKey: rApiKey, id: rId, message : rMessage } );
      }
      else{
        return( { ...state, loginStatus: "guest", apiKey: "", id: "", message : rMessage });
      }

    case "OPEN_REGISTRATION" :
      return( { ...state, loginStatus: "register", apiKey: "", id: "", message : "" });

    case "REGISTER":

      if(responseCode === 200){
        return( { ...state, loginStatus: "guest", apiKey: rApiKey, id: rId, message : rMessage } );
      }
      else{
        return( { ...state, loginStatus: "guest", apiKey: "", id: "", message : rMessage } );
      }

    default:
      return state;

  }
}

export default appReducers