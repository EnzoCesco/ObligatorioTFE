
export const initialState = ({

    loginStatus : "guest",
    apiKey : "",
    id : "",
    message : "",
    expensesMessage : "",
    expensesGroupList : [{id:-1, nombre: 'Cargando...'}],
    expensesList : [],
    lastUpdate: new Date().getTime()
    
  });
