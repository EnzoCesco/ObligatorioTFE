import { combineReducers } from 'redux'
import { initialState } from './initialState.js';

/* ---- REDUCERS ---- */ 

export const appReducers = combineReducers({
  loginManager,
  menuManager,
  expensesManager
})

function loginManager(state = initialState, action){

  switch(action.type){

    case "LOGIN":

      let {responseCode, rApiKey, rId, rMessage } = action.message;


      if(responseCode === 200){
        return( { ...state, loginStatus: "loged", apiKey: rApiKey, id: rId, message : rMessage } );
      }
      else{
        return( { ...state, loginStatus: "guest", apiKey: "", id: "", message : rMessage });
      }

    case "OPEN_REGISTRATION" :

      return( { ...state, loginStatus: "register"});

    case "REGISTER":
      let resMessage = action.message.rMessage;
      let resCode = action.message.responseCode;

      if(resCode === 200){
        return( { ...state, loginStatus: "guest", message : "Registro Exitoso" } );
      }
      else{
        return( { ...state, loginStatus: "register", apiKey: "", id: "", message : resMessage } );
      }

    default:
      return state;

  }
}

function menuManager(state = initialState, action){

  switch(action.type){
  
    case "CHANGE_MAINCOMPONENT":
      return( { ...state, selectedComponent: action.payload});
    
    default:
      return state;
      
  }
}

function expensesManager(state = initialState, action){

  switch(action.type){

    case "EXPENSES_GROUPS_LOAD":

      return ( { ...state, expensesGroupList: action.payload});

    default:
      return state;

  }

}

export default appReducers