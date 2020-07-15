import React, { useState } from 'react';
import { loginUser } from '../services/authServices';
import { useGlobalState } from '../config/globalState';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
		<Link color="inherit" href="https://material-ui.com/">
		  Tooth Inc
		</Link>{' '}
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


const Login = ({ history }) => {
	const classes = useStyles();
	const { dispatch } = useGlobalState();
	const initialFormState = {
		username: '',
		password: '',
	};
	const [userDetails, setUserDetails] = useState(initialFormState);
	const [errorMessage, setErrorMessage] = useState(null);

	function handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		setUserDetails({
			...userDetails,
			[name]: value,
		});
	}

	function handleSubmit(event) {
		event.preventDefault();
		console.log('submit');
		loginUser(userDetails)
			.then(() => {
				dispatch({
					type: 'setLoggedInUser',
					data: userDetails.username,
				});
				dispatch({
					type: 'setAdminUser',
					data: userDetails.username,
				});
				history.push('/dashboard');
			})
			.catch((error) => {
				if (error.response && error.response.status === 401)
					setErrorMessage(
						'Authentication failed. Please check your username and password.'
					);
				else
					setErrorMessage(
						'There may be a problem with the server. Please try again after a few moments.'
					);
			});
	}

	return (
		<Grid data-cy="login-form" container component="main" className={classes.root} onSubmit={handleSubmit}>
			{errorMessage && <p>{errorMessage}</p>}
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
				data-cy="username"
				  variant="outlined"
				  margin="normal"
				  required
				  fullWidth
				  id="username"
				  label="Username"
				  name="username"
				  autoComplete="username"
				  onChange={handleChange}
				  autoFocus
				/>
				<TextField
				data-cy="password"
				  variant="outlined"
				  margin="normal"
				  required
				  fullWidth
				  name="password"
				  label="Password"
				  type="password"
				  id="password"
				  autoComplete="current-password"
				  onChange={handleChange}
				/>
				<FormControlLabel
				  control={<Checkbox value="remember" color="primary" />}
				  label="Remember me"
				/>
				<Button
				  type="submit"
				  fullWidth
				  variant="contained"
				  color="primary"
				  className={classes.submit}
				  data-cy="login-button" 
				>
				  Login
				</Button>
				<Grid container>
				  <Grid item xs>
					<Link href="#" variant="body2">
					  Forgot password?
					</Link>
				  </Grid>
				  <Grid item>
					<Link href="#" variant="body2">
					  {"Don't have an account? Sign Up"}
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


};

export default Login;
