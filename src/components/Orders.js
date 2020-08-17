import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { useSelector, useDispatch } from 'react-redux';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {

  const classes = useStyles();

  const apiKey = useSelector((state) =>  state.loginManager.apiKey);
  const expensesGroupList = useSelector((state) =>  state.expensesManager.expensesGroupList);
  let expensesList = useSelector((state) =>  state.expensesManager.expensesList);
  

  const dispatch = useDispatch();

  const deleteExpenseHandler = (id) => {

    let deleteExpenseId = {idGasto: id}
                        
    const url = 'http://xpense.develotion.com/gastos.php';
                        
    fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(deleteExpenseId),
        headers : {
            'Content-Type': 'application/json',
            'apikey' : apiKey},
            cache: 'no-cache'
    })
    .then(res => res.json())
    .then((result) => {
        let update = new Date().getTime();
        if(result["codigo"] === 200){
            dispatch({type: "EXPENSE_DELETE", payload: {
                expenseId : result["idGasto"], 
                message: result["mensaje"],
                lastUpdate : update
            }});
        }
        else{
            dispatch({type: "EXPENSE_DELETE", payload:{
                expenseId : result["idGasto"], 
                message: result["mensaje"],
                lastUpdate : update
            }});
        }
    })
  };

  const handeExpensesList = () => {

    if(expensesList.length > 10){
        expensesList = expensesList.slice(expensesList.length-10,expensesList.length); 
    }

    expensesList = expensesList.reverse();

    expensesList.forEach(expense => {
        let index = expensesGroupList.findIndex((element) => element.id === expense.rubro);
        if(index !== -1){
            expense.rubroDesc = expensesGroupList[index].nombre;
        }
    })

    return expensesList;
  }

  const rows = handeExpensesList();

  return (
    <React.Fragment>
      <Title>Gastos Recientes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Rubro</TableCell>
            <TableCell align="right">Monto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rows.length !== 0)? 
          rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.nombre}</TableCell>
              <TableCell>{row.rubroDesc}</TableCell>
              <TableCell align="right">{row.monto}</TableCell>
              <IconButton aria-label="delete"  onClick={() => deleteExpenseHandler(row.id)}>
                  <DeleteForeverIcon style={{ fontSize: 20 }} />
              </IconButton>
            </TableRow>
          ))
          : 
          <TableRow>
            <h2>AUN NO SE INGRESARON GASTOS</h2>
          </TableRow>
          }
          
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
      </div>
    </React.Fragment>
  );
}