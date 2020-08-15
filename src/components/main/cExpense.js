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
        
    }
    
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
                    <input type = "button" value="CARGAR GASTO"></input>
                </>
            );
        }
    };
}

let mapStateToProps = state => ({
    loginState : state.loginManager.loginStatus,
    apiKey : state.loginManager.apiKey,
    userId : state.loginManager.id,
    expenseGroupList : state.expensesManager.expensesGroupList
})

const mapDispatchToProps = dispatch => {
    return{
        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CExpense);