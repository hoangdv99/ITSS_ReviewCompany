import React, {useEffect} from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import CancleIcon from '@material-ui/icons/CancelOutlined';
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
	Snackbar, CardMedia,
} from '@material-ui/core';
import { uploadImage } from '../../config/firebase';
import Alert from '@material-ui/lab/Alert';
import useCoStorage from '../../hooks/coStorage';
import defaultLogo from "../../images/sample-logo.png";
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

const types = ['プロダクト', 'アウトソーシン', 'その他'];

export default function ModalRequestNewCompany(props) {
	const classes = useStyles();
	const [companies, addCompany, updateCompany, removeCompany] = useCoStorage();
	const [company, setCompany] = useState(props.company);
	const [open, setOpen] = React.useState(false);
	const [openSnackBar, setOpenSnackBar] = React.useState(false);
	const [reload, setReload] = React.useState(false);
	const [error, setError] = React.useState('');
	const [fileUpload, setFileUpload] = React.useState('');
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setCompany(props.company);
		setOpen(false);
		setError('');
	};

	const handleChange = (event) => {
		setCompany({
			...company,
			[event.target.name]: event.target.value,
		});
	};

	const handleChangeLogo = async (event) => {
		setFileUpload(event.target.files[0]);
	};

	const handleCloseSnackBar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnackBar(false);
	};
	const handleSumit = async () => {
		const urlLogo = fileUpload && (await uploadImage(fileUpload));
		if (urlLogo === "") {
		} else {
			setCompany({
				...company,
				logo: urlLogo,
			});
		}
		props.onAddSubmit({
			...company,
			logo: urlLogo ? urlLogo : company.logo,
		});
		setCompany(props.company);
		setOpen(false);
		setOpenSnackBar(true);
		setReload(!reload);
		setError('');
	};
	const checkExist = (key, data) => {
		let check = false;
		companies.map((i) => {
			if (i[key] == data) {
				check = true;
			}
		});
		return check;
	};
	const onValidate = () => {
		setError('');
		if (!company.name) {
			setError('企業名を入力してください。');
		} else if (checkExist('name', company.name)) {
			setError('この企業名は既に存在しました。');
		} else if (!company.site) {
			setError('ホームページを入力してください。');
		} else if (checkExist('site', company.site)) {
			setError('このホームページは既に存在しました。');
		} else {
			handleSumit();
		}
	};
	return (
		<div>
			<Snackbar
				open={openSnackBar}
				autoHideDuration={2000}
				onClose={handleCloseSnackBar}
			>
				<Alert onClose={handleCloseSnackBar} severity='success'>
					企業追加のリクエストに成功しました。
				</Alert>
			</Snackbar>
			<Button
				variant='outlined'
				size='small'
				aria-haspopup='true'
				onClick={handleOpen}
			>
				{props.title !== 'New' ? '編集' : '企業追加リクエスト'}
			</Button>
			<Modal open={open} onClose={handleClose}>
				<Paper className={classes.modalStyle}>
					<Typography
						component='h4'
						variant='h5'
						className={classes.modalTitle}
					>
						{props.title !== 'New' ? '企業編集' : '企業追加リクエスト'}
					</Typography>
					{error !== '' ?
						<Alert variant='filled' severity='error'>
							{error}
						</Alert> : ''}
					<form className={classes.modalForm}>
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
							placeholder='ホームページ'
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
									value={company.type}
									name='type'
									id='type'
									onChange={handleChange}
									input={<Input className={classes.formInput} />}
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
								<Input
									id='logo'
									name='logo'
									type='file'
									className={classes.formInput}
									onChange={handleChangeLogo}
								/>
							</Grid>
						</Grid>
						<Grid container className={classes.modalAction}>
							<CardActions>
								<Button
									variant='contained'
									color='primary'
									size='small'
									onClick={() => onValidate()}
								>
									<DoneIcon />
									送信
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
