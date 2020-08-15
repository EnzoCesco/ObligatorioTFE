import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <label color="inherit" href="">
        Enzo Cesco - Obligatorio Taller Front End
      </label>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignInSide({userChange,passwordChange,login,error}) {

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="User"
              label="Usuario"
              name="user"
              autoComplete="user"
              autoFocus
              onChange={userChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = {passwordChange}
            />
            <h4 className="error" style={{color: 'red', textAlign: 'center'}}>{error}</h4>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {login}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"No tienes Usuario? Registrate"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

class Login extends Component {

  constructor(){
    super();
    this.state = {
        user: "",
        password: ""
    }
  }

  handleUserChange = e => {
    this.setState( { user: e.target.value } );
  };
  
  handlePasswordChange = e => {
    this.setState( { password: e.target.value } );
  };

  validateLogin = () => {

    let auth = { usuario : this.state.user , password : this.state.password };
    fetch ("http://xpense.develotion.com/login.php",{
        method: "POST",
        body: JSON.stringify(auth),
        headers:{'Content-Type': 'application/json'}
    })
        .then(res => res.json())
        .then((result) => {
            if(result["codigo"] === 200){
                this.props.loginResult({
                    responseCode : result["codigo"], 
                    rApiKey: result["apiKey"],
                    rId : result["id"]})
            }
            else{
                this.props.loginResult({
                    responseCode : result["codigo"], 
                    rMessage : result["mensaje"]})
            }
        })
  };

  showRegister = () => {
    this.props.changeToRegister();
  }

  render(){
    if(this.props.loginState === "loged"){
      return(<Redirect to="/main"/>);
    }
    else{
      return( <SignInSide 
                userChange = {this.handleUserChange}
                passwordChange = {this.handlePasswordChange}
                login = {this.validateLogin}
                error = {this.props.loginErrorMessage} /> );
    }
  };
}


let mapStateToProps = state => ({
  loginErrorMessage : state.loginManager.message,
  loginState : state.loginManager.loginStatus
});

const mapDispatchToProps = dispatch => {
  return{
      loginResult: (result) => dispatch({type: "LOGIN", message: result}),
      changeToRegister: () => dispatch({type: "OPEN_REGISTRATION"})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);