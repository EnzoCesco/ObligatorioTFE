
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddBoxIcon from '@material-ui/icons/AddBox';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

function ScrollableTabsButtonForce({menuOption}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    menuOption (newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab icon={<AddBoxIcon />} label="ALTA DE GASTO" {...a11yProps(0)} />
          <Tab icon={<FormatListBulletedIcon />} label="LISTA DE GASTOS"  {...a11yProps(1)} />
          <Tab icon={<LocalAtmIcon />} label="GASTOS POR RUBRO" {...a11yProps(2)} />
          <Tab icon={<ShoppingCartIcon />} label="COMPRAS POR RUBRO" {...a11yProps(3)} />
          <Tab icon={<GraphicEqIcon />} label="ESTADISTICAS GENERALES" {...a11yProps(4)} />
        </Tabs>
      </AppBar>

    </div>
  );
}

class Menu extends Component { 

  handleMenuChange = menuId => {
    console.log(menuId);
    this.props.changeComponent( menuId );
  };

   render(){
       return(
        <ScrollableTabsButtonForce menuOption = {this.handleMenuChange}/>
       )
   };

}

let mapStateToProps = state => ({
    selectedComponent : state.menuManager.selectedComponent
});

const mapDispatchToProps = dispatch => {
    return{
        changeComponent: (id) => dispatch({type: "CHANGE_MAINCOMPONENT", payload: id})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

