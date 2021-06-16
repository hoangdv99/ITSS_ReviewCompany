import React, { useEffect } from 'react';
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
	Snackbar,
} from '@material-ui/core';
import { firestore } from '../../config/firebase';
import Alert from '@material-ui/lab/Alert';
import CreateIcon from '@material-ui/icons/Create';
import moment from 'moment';
import CompanyInfo from './CompanyDetail/CompanyInfo';
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

const types = [1, 2, 3, 4, 5];

export default function ModalReview({
	company,
	reviews,
	setReviews,
	setCompany,
	reload,
	setReload,
}) {
	const classes = useStyles();
	const [reviewCompany, setReviewCompany] = useState({
		companyId: company.id,
		reviewer: '',
		position: '',
		text: '',
		rating: '',
		created_at: moment().format(),
	});
	const [open, setOpen] = React.useState(false);
	const [openSnackBar, setOpenSnackBar] = React.useState(false);
	const [fileUpload, setFileUpload] = React.useState('');
	const [totalRating, setTotalRating] = React.useState(0);
	const [error, setError] = React.useState('');
	const handleOpen = () => {
		setOpen(true);
	};
	useEffect(() => {}, []);
	const handleClose = () => {
		setReviewCompany({
			companyId: company.id,
			reviewer: '',
			position: '',
			text: '',
			rating: '',
			created_at: moment().format(),
		});
		setOpen(false);
	};
	const handleChange = (event) => {
		setReviewCompany({
			...reviewCompany,
			[event.target.name]: event.target.value,
		});
	};
	const handleCloseSnackBar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnackBar(false);
	};
	const addReview = async ({ item }) => {
		try {
			const model = firestore.collection('reviews');
			await model.add(item);
			setReviews([...reviews, item]);
		} catch (err) {
			console.log(err);
		}
	};
	const updateCompanyRating = async () => {
		try {
			const model = firestore.collection('companies').doc(company.id);
			await model.update({
				rating:
					(company.rating * company.totalReview + reviewCompany.rating) /
					(company.totalReview + 1),
				totalReview: company.totalReview + 1,
			});
		} catch (err) {
			console.log(err);
		}
	};
	const handleSubmit = async () => {
		addReview({ item: reviewCompany });
		setOpen(false);
		updateCompanyRating();
		setCompany({
			...company,
			rating:
				(company.rating * company.totalReview + reviewCompany.rating) /
				(company.totalReview + 1),
		});
		setReviewCompany({
			companyId: company.id,
			reviewer: '',
			position: '',
			text: '',
			rating: '',
			created_at: moment().format(),
		});
		setOpenSnackBar(true);
		setReload(!reload);
	};
	const onValidate = () => {
		setError('');
		console.log(company);
		if (!reviewCompany.reviewer) {
			setError('レビューアを入力してください。');
		} else if (!reviewCompany.text) {
			setError('内容を入力してください。');
		} else if (!reviewCompany.rating) {
			setError('評価を選択してください。');
		} else {
			handleSubmit();
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
					レビューの追加に成功しました。
				</Alert>
			</Snackbar>
			<Button
				style={{ backgroundColor: '#23d160', borderRadius: 20 }}
				variant='contained'
				color='primary'
				size='large'
				className={classes.button}
				startIcon={<CreateIcon />}
				onClick={handleOpen}
			>
				レビュー追加
			</Button>
			<Modal open={open} onClose={handleClose}>
				<Paper className={classes.modalStyle}>
					<Typography
						component='h4'
						variant='h5'
						className={classes.modalTitle}
					>
						レビュー追加
					</Typography>
					<form className={classes.modalForm}>
						<Typography>レビューア</Typography>
						<Input
							placeholder='レビューア'
							value={reviewCompany.reviewer}
							name='reviewer'
							id='reviewer'
							className={classes.formInput}
							onChange={handleChange}
						/>
						<Typography>仕事</Typography>
						<Input
							placeholder='仕事'
							value={reviewCompany.address}
							name='position'
							id='position'
							className={classes.formInput}
							onChange={handleChange}
						/>
						<Typography>内容</Typography>
						<Input
							placeholder='内容'
							value={reviewCompany.text}
							name='text'
							id='text'
							className={classes.formInput}
							onChange={handleChange}
						/>
						<Grid container>
							<Grid item xs={3}>
								<Typography>評価</Typography>
							</Grid>
							<Grid item xs={9}>
								<Select
									value={reviewCompany.rating}
									name='rating'
									id='rating'
									onChange={handleChange}
									input={<Input className={classes.formInput} />}
								>
									{types.map((type) => (
										<MenuItem value={type}>{type}</MenuItem>
									))}
								</Select>
							</Grid>
						</Grid>
						{error !== '' ? <p className='error'>{error}</p> : ''}
						<Grid container className={classes.modalAction}>
							<CardActions>
								<Button
									variant='contained'
									color='primary'
									size='small'
									onClick={onValidate}
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
