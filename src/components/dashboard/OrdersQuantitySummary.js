import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { useSelector } from 'react-redux';
import ActivePie from '../charts/ActivePie.js';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  header: {
    color : "rgb(255, 255, 255)",
    backgroundColor : '#3f50b5'
  },
  
}));

export default function OrdersQuantitySummary() {

  const classes = useStyles();
  const expensesGroupList = useSelector((state) =>  state.expensesManager.expensesGroupList);
  let expensesList = useSelector((state) =>  state.expensesManager.expensesList);

  const renderTableData = () => {

    expensesGroupList.forEach(id => {
        id.total = 0;
        id.cantidad = 0;
    })

    let totalQuantity = 0;
    let totalAmount = 0;

    expensesList.forEach( expense => {

        let {id,nombre,monto,usuario,rubro} = expense;   
      
        let index = expensesGroupList.findIndex((element) => element.id === rubro);

        if(index !== -1){
            expensesGroupList[index].cantidad = expensesGroupList[index].cantidad + 1;
            totalQuantity = totalQuantity + 1;
        }
        
    })

    let totalExpensesGroupList = expensesGroupList.filter(rubro => rubro.cantidad !== 0 );

    return totalExpensesGroupList;

}

  const rows = renderTableData();
  
  return (
    <React.Fragment>
      <Title>Compras por Rubro</Title>
      <Table size="small">
        <TableHead>
          <TableRow className={classes.header}>
            <TableCell className={classes.header} >Rubro</TableCell>
            <TableCell className={classes.header} align="right">Cantidad Compras</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rows.length !== 0)? 
          rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.nombre}</TableCell>
              <TableCell align="right">{row.cantidad}</TableCell>
            </TableRow>
          ))
          : 
          <TableRow>
            <h2>AUN NO SE INGRESARON GASTOS</h2>
          </TableRow>
          }
        </TableBody>
      </Table>
      <ActivePie data={rows}></ActivePie>
      <div className={classes.seeMore}>
      </div>
      
    </React.Fragment>
  );
}