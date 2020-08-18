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
    
    case "LOGOUT":

      return ( initialState );

    case "OPEN_REGISTRATION" :

      return( { ...state, loginStatus: "register"});

    case "REGISTER":
      if(action.message.responseCode=== 200){
        return( { ...state, loginStatus: "guest", message : "Registro Exitoso" } );
      }
      else{
        return( { ...state, loginStatus: "register", apiKey: "", id: "", message : action.message.rMessage } );
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

    case "EXPENSE_CREATE":
      return ( { ...state, expensesMessage: action.payload.message, lastUpdate: action.payload.lastUpdate})

    case "EXPENSE_CREATE_ERROR":
      return ( { ...state, expensesMessage: action.payload.message, lastUpdate: action.payload.lastUpdate})
 
    case "EXPENSES_LOAD":
      return ( { ...state, expensesList: action.payload});

    case "EXPENSE_DELETE":
      return ( {  ...state, expensesMessage: action.payload.message, lastUpdate: action.payload.lastUpdate});

    default:
      return state;

  }

}



export default appReducers