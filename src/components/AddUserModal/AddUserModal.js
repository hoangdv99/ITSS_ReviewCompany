import {Backdrop, Button, Fade, Modal, Snackbar, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import React, { useState } from 'react';
import { createNewUser } from '../../config/firebase';
import './AddUserModal.css';
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		width: '40%',
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		borderRadius: '5px',
	},
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: '25ch',
	},
	buttonGroup: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
	},
	button: {
		margin: '10px',
	},
}));

function AddUserModal({ users, setUsers }) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [error, setError] = useState('');
	const [openSnackBar, setOpenSnackBar] = React.useState(false);
	function handleOpen() {
		setOpen(true);
	}

	function handleClose() {
		setOpen(false);
		setError('');
	}

	async function handleAdd() {
		if (name === '') {
			setError('名前を入力してください。');
		} else if (email === '') {
			setError('メールアドレスを入力してください。');
		} else if (pass === '') {
			setError('パスワードを入力してください。');
		} else {
			try {
				await createNewUser({ name, email, pass });
				setUsers([...users, { name, email, pass }]);
				handleClose();
				setOpenSnackBar(true);
				setError('');
			} catch (err) {
				if (err) {
					setError(err.message);
				}
			}
		}

	}
	const handleCloseSnackBar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnackBar(false);
	};
	return (
		<div>
			<Snackbar
				open={openSnackBar}
				autoHideDuration={2000}
				onClose={handleCloseSnackBar}
			>
				<Alert onClose={handleCloseSnackBar} severity='success'>
					管理者の追加に成功しました。
				</Alert>
			</Snackbar>
			<Button
				variant='contained'
				color='primary'
				aria-haspopup='true'
				onClick={handleOpen}
			>
				<AddIcon />
				管理者追加
			</Button>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<h2>管理者追加</h2>
						{error !== '' ? <Alert variant='filled' severity='error'>
							{error}
						</Alert> : ''}
						<form className={classes.root} noValidate autoComplete='off'>
							<TextField
								variant='outlined'
								margin='normal'
								required
								fullWidth
								id='name'
								label='名前'
								name='name'
								autoComplete='name'
								onChange={(e) => setName(e.target.value)}
							/>
							<TextField
								variant='outlined'
								margin='normal'
								required
								fullWidth
								id='email'
								label='メールアドレス'
								name='email'
								autoComplete='email'
								onChange={(e) => setEmail(e.target.value)}
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
								onChange={(e) => setPass(e.target.value)}
							/>

							<div className={classes.buttonGroup}>
								<Button
									variant='contained'
									color='primary'
									className={classes.button}
									onClick={handleAdd}
								>
									追加
								</Button>
								<Button
									variant='contained'
									className={classes.button}
									onClick={handleClose}
								>
									キャンセル
								</Button>
							</div>
						</form>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}

export default AddUserModal;
