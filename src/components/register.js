import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp({userChange,passwordChange,register,error}) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrarse
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="user"
                label="Usuario"
                name="user"
                autoComplete="user"
                onChange={userChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange = {passwordChange}
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {register}
          >
            Registrarse
          </Button>
          <h4 className="error" style={{color: 'red', textAlign: 'center'}}>{error}</h4>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Ya estas Registrado ? Ingresa!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export class Register extends Component {

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

    registerUser = () => {

        let auth = { usuario : this.state.user , password : this.state.password };

        fetch ("http://xpense.develotion.com/usuarios.php",{
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
                        rId : result["id"],
                        rMessage : "REGISTRO EXITOSO"
                    })
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
        return( <SignUp 
                    userChange = {this.handleUserChange}
                    passwordChange = {this.handlePasswordChange}
                    register = {this.registerUser}
                    error = {this.props.registerErrorMessage}/> );    
    };

}

let mapStateToProps = state => ({
    registerErrorMessage : state.loginManager.message
});

const mapDispatchToProps = dispatch => {
    return{
        loginResult: (result) => dispatch({type: "REGISTER", message: result}) 
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
