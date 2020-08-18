import React, {Component} from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Title from './Title.js';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25vw',
        },
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    depositContext: {
        flex: 1,
      },
}));

const formatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'UYU',
    minimumFractionDigits: 2
  })

function CenteredGrid({totalAmount, totalQuantiy}) {
  const classes = useStyles();
  let Average;
  if(totalAmount === 0 || totalQuantiy === 0){
    Average = "No se Ingresaron Compras";
  }
  else{
    Average = Math.round((totalAmount/totalQuantiy) * 100) / 100;
  }

  return (
    <React.Fragment>
        <Title>Estadísticas generales :</Title>
        <Grid container spacing={4}>
        {(totalAmount === 0) ? 
            <Grid item xs={12}>
                <Paper className={classes.paper}><b>AUN NO SE INGRESARON GASTOS</b></Paper>
            </Grid>
            
            : 
            <>
            <Grid item xs={12}>
                <Paper className={classes.paper}><b>Total Gastado :</b> {formatter.format(totalAmount)}</Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}><b>Cantidad de Compras : </b>{totalQuantiy}</Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}><b>Promedio por Compra : </b>{formatter.format(Average)}</Paper>
            </Grid>
            </>
            }

      </Grid>
    </React.Fragment>
  );
}

class TotalExpenses extends Component {

    constructor(){
      super();
      this.state = {
          user: "",
          password: ""
      }
    }

    calculateTotals = () => {
        let list = this.props.expensesList;
        let tAmount = 0;
        let tQuantiy = 0;

        list.forEach( expense => {
            if(expense.rubro !== -1){
                tAmount = tAmount + parseInt(expense.monto);
                tQuantiy = tQuantiy + 1;
            }
        })

        return { tAmount:tAmount, tQuantiy: tQuantiy };
    }

    render(){
        let totals = this.calculateTotals();
        return( <CenteredGrid totalAmount={totals.tAmount} totalQuantiy={totals.tQuantiy} ></CenteredGrid> );
      }
  }
  
  
  let mapStateToProps = state => ({
    expensesList : state.expensesManager.expensesList
  });
  

  export default connect(mapStateToProps)(TotalExpenses);