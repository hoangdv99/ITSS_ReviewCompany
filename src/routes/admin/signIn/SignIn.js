import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Link, useHistory } from 'react-router-dom';
import {
	Avatar,
	Button, Container, CssBaseline, Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Alert from '@material-ui/lab/Alert';
import { useAuth } from '../../../contexts/AuthContext';

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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignUp() {
	const classes = useStyles();

	const [state, setState] = React.useState({
		email: "",
		password: "",
	})
	const { signIn } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	useEffect(() => {
		return () => {
		  setState({});
		};
	}, []);
	

	function handleChange(evt) {
		const value = evt.target.value;
		setState({
			...state,
			[evt.target.name]: value
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			setError('');
			setLoading(true);
			await signIn(state.email, state.password);
			history.push('/admin/admin-list');
		} catch (e) {
			setError('Fail to sign in');
		}
		setLoading(false);
	}

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					ログイン
				</Typography>
				{error && (
					<Alert variant='filled' severity='error'>
						{error}
					</Alert>
				)}
				<ValidatorForm
					onSubmit={handleSubmit}
					onError={errors => console.log(errors)}
				>
					<TextValidator
						variant='outlined'
						margin='normal'
						required
						fullWidth
						label='パスワード'
						name="email"
						value={state.email}
						onChange={handleChange}
						validators={['required', 'isEmail']}
						errorMessages={['メールが必要です！', 'このメールは無効です']}
					/>
					<TextValidator
						variant='outlined'
						margin='normal'
						required
						fullWidth
						label='パスワード'
						type='password'
						name="password"
						value={state.password}
						onChange={handleChange}
						validators={['required']}
						errorMessages={['パスワードが必要です']}
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
						disabled={loading}
					>
						ログイン
					</Button>
					<Typography align='center' variant='subtitle1'>
						管理者でない場合は、
						<Link to='/'>ホームページ</Link>
						に戻ってください
					</Typography>
				</ValidatorForm>
			</div>
		</Container>
	);
}
