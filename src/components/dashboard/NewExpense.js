import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Title from './Title';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  root: {
    '& > *': {
      margin: theme.spacing(4),
      width: '25vw',
    },
  },
}));

export default function NewExpense() {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState(false);
    let [newExpenseText, setTextChange] = useState(0);
    let [newExpenseGroup, setGroupChange] = useState(0);
    let [newExpenseAmount, setAmountChange] = useState(0);
    const userId = useSelector((state) =>  state.loginManager.id);
    const apiKey = useSelector((state) =>  state.loginManager.apiKey);
    const expensesGroupList = useSelector((state) =>  state.expensesManager.expensesGroupList);
    const expensesMessage = useSelector((state) =>  state.expensesManager.expensesMessage);

    const dispatch = useDispatch();

    let handleTextChange = e => {
        setTextChange( e.target.value );
    };

    let handleGroupChange = e => {
        setGroupChange( e.target.value );
    };

    let handleAmountChange = e => {
        setAmountChange( e.target.value );
    };

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

    const createExpense = () => {
        
        let newExpense = {nombre: newExpenseText, monto: newExpenseAmount,
                            idUsuario: userId, idRubro: newExpenseGroup}
                            
        let update = new Date().getTime();   

        if(newExpense.idRubro === 0){
            dispatch({type: "EXPENSE_CREATE_ERROR", payload : {
                message: "Debe Seleccionar Un Rubro",
                lastUpdate : update
            }})
            changeSeverity(1);
            handleClick();
        }
        else{
            if(newExpense.nombre === 0){
                dispatch({type: "EXPENSE_CREATE_ERROR", payload : {
                    message: "Debe Ingresar un Nombre",
                    lastUpdate : update
                }})
                changeSeverity(1);
                handleClick();
            } 
            else{
                if(newExpense.monto <= 0){
                    dispatch({type: "EXPENSE_CREATE_ERROR", payload : {
                        message: "El monto debe ser superior a 0",
                        lastUpdate : update
                    }})
                    changeSeverity(1);
                    handleClick();
                }
                else{
                    if(isNaN(newExpense.monto)){
                        dispatch({type: "EXPENSE_CREATE_ERROR", payload : {
                            message: "El monto debe ser un Numero",
                            lastUpdate : update
                        }})
                        changeSeverity(1);
                        handleClick(); 
                    }
                    else{
                        if(newExpense.nombre === "Total"){
                            dispatch({type: "EXPENSE_CREATE_ERROR", payload : {
                                message: "El Nombre 'Total' esta reservado por el Sistema, Debe Modificarlo",
                                lastUpdate : update
                            }})
                            changeSeverity(1);
                            handleClick(); 
                        }
                        else{
                            const url = 'http://xpense.develotion.com/gastos.php';
                                    
                            fetch(url, {
                                method: 'POST',
                                body: JSON.stringify(newExpense),
                                headers : {
                                    'Content-Type': 'application/json',
                                    'apikey' : apiKey},
                                    cache: 'no-cache'
                            })
                            .then(res => res.json())
                            .then((result) => {
                                
                                if(result["codigo"] === 200){
                                    dispatch({type: "EXPENSE_CREATE", payload : {
                                        expenseId : result["idGasto"], 
                                        message: result["mensaje"],
                                        lastUpdate : update
                                    }})
                                    changeSeverity(0);
                                    handleClick();
                                }
                                else{
                                    dispatch({type: "EXPENSE_CREATE", payload : {
                                        expenseId : result["idGasto"], 
                                        message: result["mensaje"],
                                        lastUpdate : update
                                    }})
                                    changeSeverity(1);
                                    handleClick();
                                }})
                            };
                        }
                    }
                }
        }          
    }
                

    const optionItems = expensesGroupList.map((expense) =>
        <option value={expense.id}>{expense.nombre}</option>
    );

  return (
    <React.Fragment>

      <Title>Nuevo Gasto</Title>
        <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="expenseGroup-native-required">Rubro</InputLabel>
            <Select
                native
                onChange={handleGroupChange}
                name="expenseGroup"
                inputProps={{
                id: 'expense-group',
                }}
            >
                <option aria-label="None" value="" />
                {optionItems}
            </Select>
            <FormHelperText>Required</FormHelperText>
        </FormControl>

        <TextField id="expense-text" label="Nombre" onChange={handleTextChange}  />
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="standard-adornment-amount">Monto</InputLabel>
          <Input
            id="expense-amount"
            onChange={handleAmountChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
        <Button variant="contained" color="primary" size="small" className={classes.button}
        startIcon={<SaveIcon />} onClick={createExpense} >
            Guardar Gasto
        </Button>

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