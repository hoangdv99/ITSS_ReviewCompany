import React, { useRef, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Container,
	Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
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

	const emailRef = useRef();
	const passwordRef = useRef();
	const { signIn } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			setError('');
			setLoading(true);
			await signIn(emailRef.current.value, passwordRef.current.value);
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
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='email'
						label='メールアドレス'
						name='email'
						autoComplete='email'
						autoFocus
						inputRef={emailRef}
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='password'
						label='パスワード'
						type='password'
						id='password'
						autoComplete='current-password'
						inputRef={passwordRef}
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
				</form>
			</div>
		</Container>
	);
}
