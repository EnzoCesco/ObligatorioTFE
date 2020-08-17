import React , { Component }from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

export class SummaryPerGroup extends Component {

    renderTableData() {

        let expensesList = this.props.expensesList;
        console.log(expensesList);
        let expensesGroupList = this.props.expensesGroupList;
        
        expensesGroupList.forEach(id => {
            id.total = 0;
            id.cantidad = 0;
        })

        expensesList.forEach( expense => {

            let {id,nombre,monto,usuario,rubro} = expense;   
          
            let index = expensesGroupList.findIndex((element) => element.id === rubro);
            
            if(index !== -1){
                expensesGroupList[index].total = expensesGroupList[index].total + parseInt(monto);
                expensesGroupList[index].cantidad = expensesGroupList[index].cantidad + 1;
            }
            
        })

        return expensesGroupList.map((expenseGroup) => {
            const { id, nombre, total, cantidad} = expenseGroup 
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{nombre}</td>
                    <td>{total}</td>
                    <td>{cantidad}</td>
                </tr>
            )
        })

    }

    render(){
        if(this.props.loginState !== "loged"){
            return(<Redirect to="/"/>);
        }
        else{
            console.log("Summary RENDERING...");
            return( 
                <>
                    {this.renderTableData()}
                </>
            );
        }
    };

}

let mapStateToProps = state => ({
    loginState : state.loginManager.loginStatus,
    expensesList : state.expensesManager.expensesList,
    expensesGroupList : state.expensesManager.expensesGroupList,
    expensesList : state.expensesManager.expensesList
})

export default connect(mapStateToProps)(SummaryPerGroup);



