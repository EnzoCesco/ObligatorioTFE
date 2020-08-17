
export const initialState = ({

    loginStatus : "guest",
    apiKey : "",
    id : "",
    message : "",
    expensesMessage : "",
    expensesGroupList : [{id:-1, nombre: 'Cargando...'}],
    expensesList : [{id:-1, nombre: 'Cargando...'}],
    lastUpdate: new Date().getTime()
    
  });
