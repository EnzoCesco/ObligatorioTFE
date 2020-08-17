import React, { Component }from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import Dashboard from './Dashboard.js';

export class Main extends Component {
    
    constructor(){
        super();
        this.state = {
            expensesList: [],
            lastUpdate: '' 
        }
      }

    loadExpensesGroups() {

        fetch ("http://xpense.develotion.com/rubros.php",{
            method: "GET",
            headers:{
                'Content-Type': 'application/json',
                'apikey' : this.props.apiKey},
            cache: 'no-cache'
        })
            .then(res => res.json())
            .then((result) => {
                if(result["codigo"] === 200){
                    let expensesGroup = result["rubros"].map(eg => ({...eg, total: 0, cantidad: 0}))
                    this.props.saveExpensesGroupList(expensesGroup)
                }
                else{
                    this.props.saveExpensesGroupList([{ id: -1, rubro: "Data Error" }])
                }
            })

    };

    loadExpenses() { 
        let expenses = [];
        
        const url = 'http://xpense.develotion.com/gastos.php?id=' + this.props.userId;

        fetch (url ,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'apikey' : this.props.apiKey},
            cache: 'no-cache'
        })
            .then(res => res.json())
            .then((result) => {
                if(result["codigo"] === 200){
                    expenses = (result["gastos"])
                }
                else{
                    expenses = ([{ id: -1, rubro: "error de comunicacion" }])
                }
                this.props.saveExpensesList(expenses);
                this.setState({expensesList : expenses, lastUpdate : this.props.lastUpdate});
            })

    };

    shouldComponentUpdate(nextState) {
        if (this.state.lastUpdate === nextState.lastUpdate) {
          return false;
        } 
        else {
          return true;
        }
    }

    render(){
        if(this.props.loginState !== "loged"){
            return(<Redirect to="/"/>);
        }
        else{
            this.loadExpensesGroups();
            this.loadExpenses();
            console.log("MAIN RENDERING...");
            return( 
                <Dashboard/>
            )
        }
    };
}

let mapStateToProps = state => ({
    loginState : state.loginManager.loginStatus,
    selectedComponent : state.menuManager.selectedComponent,
    apiKey : state.loginManager.apiKey,
    userId : state.loginManager.id,
    lastUpdate : state.expensesManager.lastUpdate
})

const mapDispatchToProps = dispatch => {
    return{
        saveExpensesGroupList: (list) => dispatch({type: "EXPENSES_GROUPS_LOAD", payload: list}),
        saveExpensesList: (list) => dispatch({type: "EXPENSES_LOAD", payload: list})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
