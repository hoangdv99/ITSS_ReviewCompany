import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	CssBaseline,
	Container,
	Grid,
	Typography,
} from '@material-ui/core';
import AddRequest from '../../../components/Admin/requestAddCompanyList/AddRequest';
import Header from '../../../components/Admin/Header';
import { useAuth } from '../../../contexts/AuthContext';
import { firestore } from '../../../config/firebase';

const useStyles = makeStyles((theme) => ({
	center: {
		margin: 'auto',
		marginTop: theme.spacing(8)
	},
	mainGrid: {
		marginTop: theme.spacing(3),
	},
	oneRow: {
		marginTop: theme.spacing(2),
	},
	addBtn: {
		textAlign: 'right',
	},
	mainPage: {
		maxWidth: 'lg',
		minHeight: 600,
	},
	hideSort: {

	}
}));

export default function RequestAddCompanyList() {
	const classes = useStyles();
	const { currentUser } = useAuth();
	const [companies, setCompanies] = useState([]);
	const [numberOfCompanies, setNumberOfCompanies] = useState(0);

	const fetchCompanies = async () => {
		const companiesRef = firestore.collection('companies');
		const snapshot = await companiesRef.where('is_active', '==', 0).get();
		snapshot.docs.forEach((company) => {
			setCompanies((companies) => [
				...companies,
				{ ...company.data(), id: company.id },
			]);
			setNumberOfCompanies(snapshot.size);
			console.log(snapshot.size)
		});
	};

	useEffect(() => {
		fetchCompanies();
	}, []);

	async function handleAccept(co) {
		try {
			await firestore.collection('companies').doc(co.id).update({
				is_active: 1,
			})
			const _companies = companies.filter(company => company.id !== co.id)
			console.log(numberOfCompanies)
			setNumberOfCompanies(numberOfCompanies - 1)
			setCompanies(_companies)
		} catch (err) {
			console.log('Something went wrong');
		}
	}

	async function handleReject(co) {
		try {
			await firestore.collection('companies').doc(co.id).delete();
			const _companies = companies.filter(company => company.id !== co.id)
			setNumberOfCompanies(numberOfCompanies - 1)
			setCompanies(_companies)
		} catch (err) {
			console.log('Something went wrong');
		}
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<Container className={classes.mainPage}>
				<Header title='ADMIN LIST' username={currentUser.email} />
				<Grid container className={classes.oneRow}>
                    <Grid item xs={8}>
					</Grid>
                </Grid>
				{numberOfCompanies === 0
				? (
				<Grid className={classes.center}>
					<Typography align='center' variant='h4' color='textSecondary'>
						現在企業追加リクエストがありません。
					</Typography>
				</Grid>
				)
				: (<AddRequest className={classes.mainGrid} companies={companies} handleAccept={handleAccept} handleReject={handleReject} />)}
			</Container>
		</React.Fragment>
	);
}
