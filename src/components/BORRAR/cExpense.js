import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";


export class CExpense extends React.Component {
    
    constructor(){
        super();
        this.state = {
            newExpenseText : '',
            newExpenseGroup : 1,
            newExpenseAmount : 0,
        }
      }

    handleTextChange = e => {
        this.setState( { newExpenseText: e.target.value } );
    };
    handleGroupChange = e => {
        this.setState( { newExpenseGroup: e.target.value } );
    };
    handleAmountChange = e => {
        this.setState( { newExpenseAmount: e.target.value } );
    };

    createExpense = () => {
        
        let newExpense = {nombre: this.state.newExpenseText, monto: this.state.newExpenseAmount,
                            idUsuario: this.props.userId, idRubro: this.state.newExpenseGroup }
                            
        const url = 'http://xpense.develotion.com/gastos.php';
                            
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(newExpense),
            headers : {
                'Content-Type': 'application/json',
                'apikey' : this.props.apiKey},
                cache: 'no-cache'
        })
        .then(res => res.json())
        .then((result) => {
            let update = new Date().getTime();
            if(result["codigo"] === 200){
                this.props.saveExpense({
                    expenseId : result["idGasto"], 
                    message: result["mensaje"],
                    lastUpdate : update
                })
            }
            else{
                this.props.saveExpense({
                    expenseId : result["idGasto"], 
                    message: result["mensaje"],
                    lastUpdate : update
                })
            }
        })
    };
    
    render(){
       
        let expenseGroup = this.props.expenseGroupList;
        let optionItems = expenseGroup.map((expense) =>
                <option value={expense.id}>{expense.nombre}</option>
            );
        
        if(this.props.loginState !== "loged"){
            return(<Redirect to="/"/>);
        }
        else{
            return( 
                <>
                    <div>
                        <select onChange={this.handleGroupChange}>
                            {optionItems}
                        </select>
                    </div>
                    <input type = "text" onChange={this.handleTextChange}></input>
                    <input type = "number" min="0" onChange={this.handleAmountChange}></input>
                    <input type = "button" value="CARGAR GASTO" onClick={this.createExpense}></input>
                    <h4>{this.props.expensesMessage}</h4>
                </>
            );
        }
    };
}

let mapStateToProps = state => ({
    loginState : state.loginManager.loginStatus,
    apiKey : state.loginManager.apiKey,
    userId : state.loginManager.id,
    expenseGroupList : state.expensesManager.expensesGroupList,
    expensesMessage : state.expensesManager.expensesMessage
})

const mapDispatchToProps = dispatch => {
    return{
        saveExpense: (expense) => dispatch({type: "EXPENSE_CREATE", payload: expense})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CExpense);