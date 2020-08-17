import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../dashboard/title.js';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));

export default function Orders(rows) {

    const apiKey = useSelector((state) =>  state.loginManager.apiKey);
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

    const classes = useStyles();
    let trueRow = rows.rows;
    if(trueRow[0] !== undefined && trueRow[0].id !== -1){
        return (
            <Grid item xs={10}>
            <Paper className={classes.paper}>
                <Title>Ultimas Compras</Title>
                <Table size="small">
                    <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Rubro</TableCell>
                        <TableCell align="right">Monto</TableCell>
                        <TableCell align="right"> </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {trueRow.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.nombre}</TableCell>
                            <TableCell>{row.rubroDesc}</TableCell>
                            <TableCell align="right">{row.monto}</TableCell>
                            <TableCell align="left">
                                <IconButton aria-label="delete" className={classes.margin} onClick={() => deleteExpenseHandler(row.id)}>
                                    <DeleteForeverIcon fontSize="large" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </Paper>
            </Grid>
        );
    }
    else{
        return (
            <React.Fragment>
            <Title>Ultimas Compras</Title>
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
                    <TableCell>Aun no se Registraron Compras</TableCell>
                </TableBody>
            </Table>
            </React.Fragment>
        )
    }
  
}
