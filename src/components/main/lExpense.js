import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";


export class LExpense extends React.Component {
    
    constructor(){
        super();
        this.state = {
            expensesList: []
        }
      }

    componentDidMount() {

        let expenses = [];


        const uri = 'http://xpense.develotion.com/gastos.php?id=' + this.props.userId;

        console.log(" id : "  + this.props.userId);
        console.log(" key : " + this.props.apiKey);
        console.log(" url : " + uri);

        fetch (uri ,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'apikey' : this.props.apiKey},
            cache: 'no-cache'
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                if(result["codigo"] === 200){
                    expenses = (result["gastos"])
                    if(expenses.length > 10){
                        expenses = expenses.slice(expenses.length-10,expenses.length);
                    }
                }
                else{
                    expenses = ([{ id: -1, rubro: "error de comunicacion" }])
                }
                this.setState({expensesList : expenses});
            })

        };

    renderTableData() {
        return this.state.expensesList.map((expense, index) => {
            const { id, nombre, monto, usuario, rubro } = expense 
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{nombre}</td>
                    <td>{monto}</td>
                    <td>{usuario}</td>
                    <td>{rubro}</td>
                </tr>
            )
        })
    }

    render(){

        if(this.props.loginState !== "loged"){
            return(<Redirect to="/"/>);
        }
        else{
            return( 
                <>
                    <div>
                        <h1 id='title'>Table</h1>
                        <table id='students'>
                        <tbody>
                            {this.renderTableData()}  
                        </tbody>
                        </table>
                    </div>
                </>
            );
        }
    };
}

let mapStateToProps = state => ({
    loginState : state.loginManager.loginStatus,
    apiKey : state.loginManager.apiKey,
    userId : state.loginManager.id
})

const mapDispatchToProps = dispatch => {
    return{
       
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LExpense);



