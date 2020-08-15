import React, { Component }from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import Menu  from './menu.js';
import CExpense from './cExpense.js';
import LExpense from './lExpense.js';
import './main.css';

export class Main extends Component {
    
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
                    console.log(result["rubros"]);
                    this.props.saveExpensesList(result["rubros"])
                }
                else{
                    this.props.saveExpensesList([{ id: -1, rubro: "Data Error" }])
                }
            })

    };


    render(){
        if(this.props.loginState !== "loged"){
            return(<Redirect to="/"/>);
        }
        else{
            this.loadExpensesGroups();
            return( 
                <>
                <Menu></Menu>
                <div className = "container">
                    { (this.props.selectedComponent === 0 ) ? <CExpense/> : <></>}
                    { (this.props.selectedComponent === 1 ) ? <LExpense></LExpense> : <></>}
                    { (this.props.selectedComponent === 2 ) ? <h1>COMPONENTE 2</h1> : <></>}
                    { (this.props.selectedComponent === 3 ) ? <h1>COMPONENTE 3</h1> : <></>}
                    { (this.props.selectedComponent === 4 ) ? <h1>COMPONENTE 4</h1> : <></>}
                </div>
                </>
            )
        }
    };
}

let mapStateToProps = state => ({
    loginState : state.loginManager.loginStatus,
    selectedComponent : state.menuManager.selectedComponent,
    apiKey : state.loginManager.apiKey,
    userId : state.loginManager.id
})

const mapDispatchToProps = dispatch => {
    return{
        saveExpensesList: (list) => dispatch({type: "EXPENSES_GROUPS_LOAD", payload: list})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
