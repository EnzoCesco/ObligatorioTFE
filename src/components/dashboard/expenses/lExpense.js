import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import Order from './orders.js';

export class LExpense extends Component {
    
    renderTableData() {

        let expensesList = this.props.expensesList;

        if(expensesList.length > 10){
            expensesList = expensesList.slice(expensesList.length-10,expensesList.length);
        }

        return expensesList.map((expense) => {
            const { id, nombre, monto, usuario, rubro } = expense 
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{nombre}</td>
                    <td>{monto}</td>
                    <td>{usuario}</td>
                    <td>{rubro}</td>
                    <td>
                        <input 
                        key={id}rty
                        onClick={this.deleteExpense}
                        value= "Borrar"
                        type="button"
                        id = {id}
                        >
                        </input>
                    </td>
                </tr>
            )
        })
    }

    renderTableTotal() {

        let expensesList = this.props.expensesList;
        let totalAmount = 0;

        if(expensesList.length > 10){
            expensesList = expensesList.slice(expensesList.length-10,expensesList.length);
        }

        expensesList.forEach(expense =>
            totalAmount = totalAmount + parseInt(expense.monto)
        )

        return  (
            <tr>
                <td>TOTAL : </td>
                <td>{totalAmount}</td>
            </tr>
        )
    }

    handeExpensesList = () => {

        let expensesList = this.props.expensesList;

        if(expensesList.length > 10){
            expensesList = expensesList.slice(expensesList.length-10,expensesList.length);
        }

        expensesList.forEach(expense => {
            let index = this.props.expensesGroupList.findIndex((element) => element.id === expense.rubro);
            if(index !== -1){
                expense.rubroDesc = this.props.expensesGroupList[index].nombre;
            }
        })

        return expensesList;
    }

    render(){
        if(this.props.loginState !== "loged"){
            return(<Redirect to="/"/>);
        }
        else{
            console.log("LIST RENDERING...");
            return( 
                <>
                    <Order rows={this.handeExpensesList()}></Order>
                </>
            );
        }
    };
}

let mapStateToProps = state => ({
    loginState : state.loginManager.loginStatus,
    expensesList : state.expensesManager.expensesList,
    apiKey : state.loginManager.apiKey,
    expensesGroupList : state.expensesManager.expensesGroupList
})

const mapDispatchToProps = dispatch => {
    return{
        deleteExpense: (expense) => dispatch({type: "EXPENSE_DELETE", payload: expense})
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(LExpense);



