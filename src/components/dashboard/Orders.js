import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Title from './Title';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  header: {
    color : "rgb(255, 255, 255)",
    backgroundColor : '#3f50b5'
  },
  total: {
    color : '#FFFFFF',
    backgroundColor : '#757ce8'
  }
}));

export default function Orders() {

  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState(false);
  const classes = useStyles();
  const apiKey = useSelector((state) =>  state.loginManager.apiKey);
  const expensesGroupList = useSelector((state) =>  state.expensesManager.expensesGroupList);
  const expensesMessage = useSelector((state) =>  state.expensesManager.expensesMessage);
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
            changeSeverity(0);
            handleClick();
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

    /*let reversedList = expensesList.reverse();*/

    let totalAmount = 0;

    expensesList.forEach(expense => {
        let index = expensesGroupList.findIndex((element) => element.id === expense.rubro);
        if(index !== -1){
            expense.rubroDesc = expensesGroupList[index].nombre;
        }
        totalAmount = totalAmount + parseInt(expense.monto);
    })

    const listWithTotal = [...expensesList, {nombre : "Total", monto: totalAmount}]

    return listWithTotal;
  }

  const rows = handeExpensesList();

   /* Manejo del SnackBar */ 
   const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  
  const changeSeverity = (severity) => {
    (severity === 0) ? setSeverity('success') : setSeverity('error');
  }

  const formatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'UYU',
    minimumFractionDigits: 2
  })

  return (
    <React.Fragment>
      <Title>Gastos Recientes</Title>
      <Table size="small">
        <TableHead >
          <TableRow className={classes.header}>
            <TableCell className={classes.header}>ID</TableCell>
            <TableCell className={classes.header}>Nombre</TableCell>
            <TableCell className={classes.header}>Rubro</TableCell>
            <TableCell className={classes.header} align="right">Monto</TableCell>
            <TableCell className={classes.header}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rows.length !== 0) ? 
          rows.map((row) => (
            (row.nombre !== 'Total') ? 
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.nombre}</TableCell>
                <TableCell>{row.rubroDesc}</TableCell>
                <TableCell align="right">{formatter.format(row.monto)}</TableCell>
                <TableCell align="center">
                  <IconButton aria-label="delete"  onClick={() => deleteExpenseHandler(row.id)}>
                      <DeleteForeverIcon style={{ fontSize: 20 }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            :
              <TableRow className={classes.total} key={row.id}>
                <TableCell className={classes.total}></TableCell>
                <TableCell className={classes.total}><b>{row.nombre}</b></TableCell>
                <TableCell className={classes.total}></TableCell>
                <TableCell className={classes.total} align="right"><b>{formatter.format(row.monto)}</b></TableCell>
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
      <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {expensesMessage}
                </Alert>
            </Snackbar>
        </div>
    </React.Fragment>
  );
}