import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import DoneIcon from '@material-ui/icons/Done';
import CancleIcon from '@material-ui/icons/CancelOutlined';
import ModifyIcon from '@material-ui/icons/EditOutlined';
import {
	Modal,
	Button,
	Paper,
	Typography,
	Input,
	Grid,
	Select,
	MenuItem,
	CardActions,
	CardMedia,
	Snackbar,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { uploadImage } from '../../../config/firebase';
import defaultLogo from '../../../images/sample-logo.png';

const useStyles = makeStyles((theme) => ({
	modalStyle: {
		position: 'absolute',
		width: '40%',
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
	modalTitle: {
		textAlign: 'center',
	},
	modalForm: {
		margin: theme.spacing(3, 4, 0, 0),
		width: '100%',
	},
	formInput: {
		width: '100%',
		marginBottom: theme.spacing(3),
	},
	modalAction: {
		justifyContent: 'center',
	},
	companyLogo: {
		width: 160,
		height: 200,
	},
}));

const types = ['プロダクト', 'アウトソーシング', 'その他'];

const initCompany = {
	name: '',
	address: '',
	site: '',
	type: 'その他',
	rating: 0,
	logo: defaultLogo,
	is_active: 1,
	totalReview: 0,
};

export default function ModalCompany(props) {
	const classes = useStyles();
	const [company, setCompany] = useState(props.company);
	const [open, setOpen] = React.useState(false);
	const [error, setError] = useState('');
	const [openSnackBar, setOpenSnackBar] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setError('');
		setCompany(props.company);
	};

	const handleChange = (event) => {
		setCompany({
			...company,
			[event.target.name]: event.target.value,
		});
	};

	const handleChangeLogo = async (event) => {
		const urlLogo = await uploadImage(event.target.files[0]);
		if (urlLogo === "") {
			alert('Action fails!');
			setOpen(false);
		} else {
			setCompany({
				...company,
				[event.target.name]: urlLogo,
			});
		}
	};

	const checkAllValidate = () => {
		if (company.name === "") {
			setError('企業名を入力してください。');
			return false;
		} else if (company.site === "") {
			setError('ホームページを入力してください。');
			return false;
		} else if (props.onCheckValidate('name', company.name)) {
			setError('この企業名は既に存在しました。');
			return false;
		} else if (props.onCheckValidate('site', company.site)) {
			setError('このウェブサイトは既に存在しました。');
			return false;
		} else {
			return true;
		}
	};

	const handleSumit = () => {
		setError('');
		if (props.title === 'New') {
			if (checkAllValidate()) {
				props.onAddSubmit(company);
				setCompany(initCompany);
				setOpen(false);
				setOpenSnackBar(true);
			}
		} else {
			if (company.name === "") {
				setError('企業名を入力してください。');
			} else {
				props.onUpdate(company);
				setCompany(company);
				setOpen(false);
				setOpenSnackBar(true);
				setError('');
			}
		}
	};
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
					企業の追加に成功しました。
				</Alert>
			</Snackbar>
			<Button
				variant='contained'
				color='primary'
				aria-haspopup='true'
				style={props.title !== 'New' ? {width:100}:{width:120}}
				onClick={handleOpen}
			>
				{props.title !== 'New' ? <ModifyIcon /> : <AddIcon />}
				{props.title !== 'New' ? '編集' : '企業追加'}
			</Button>
			<Modal open={open} onClose={handleClose}>
				<Paper className={classes.modalStyle}>
					<Typography
						component='h4'
						variant='h5'
						className={classes.modalTitle}
					>
						{props.title !== 'New' ? '企業編集' : '企業追加'}
					</Typography>
					{error && (
						<Alert variant='filled' severity='error'>
							{error}
						</Alert>
					)}
					<form className={classes.modalForm} noValidate>
						<Typography>企業名</Typography>
						<Input
							placeholder='企業名'
							value={company.name}
							name='name'
							id='name'
							className={classes.formInput}
							onChange={handleChange}
						/>
						<Typography>住所</Typography>
						<Input
							placeholder='住所'
							value={company.address}
							name='address'
							id='address'
							className={classes.formInput}
							onChange={handleChange}
						/>
						<Typography>ウェブサイト</Typography>
						<Input
							placeholder='ウェブサイト'
							value={company.site}
							name='site'
							id='site'
							className={classes.formInput}
							onChange={handleChange}
						/>
						<Grid container>
							<Grid item xs={3}>
								<Typography>分野</Typography>
							</Grid>
							<Grid item xs={9}>
								<Select
									className={classes.formInput}
									value={company.type}
									name='type'
									id='type'
									onChange={handleChange}
								>
									{types.map((type) => (
										<MenuItem value={type}>{type}</MenuItem>
									))}
								</Select>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs={3}>
								<Typography>ロゴ</Typography>
							</Grid>
							<Grid item xs={9}>
								{props.title === 'New' ? (
									<Input
										id='logo'
										name='logo'
										type='file'
										className={classes.formInput}
										onChange={handleChangeLogo}
									/>
								) : (
									<div>
										<CardMedia
											className={classes.companyLogo}
											image={
												company.logo !== "" ? company.logo : defaultLogo
											}
											title={company.name + '-text'}
										/>
										<Input
											id='logo'
											name='logo'
											type='file'
											className={classes.formInput}
											onChange={handleChangeLogo}
										/>
									</div>
								)}
							</Grid>
						</Grid>
						<Grid container className={classes.modalAction}>
							<CardActions>
								<Button
									variant='contained'
									color='primary'
									size='small'
									onClick={handleSumit}
								>
									<DoneIcon />
									保存
								</Button>
								<Button
									variant='contained'
									color='secondary'
									size='small'

									onClick={handleClose}
								>
									<CancleIcon />
									キャンセル
								</Button>
							</CardActions>
						</Grid>
					</form>
				</Paper>
			</Modal>
		</div>
	);
}
