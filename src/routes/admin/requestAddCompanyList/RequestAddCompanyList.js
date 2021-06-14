import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	CssBaseline,
	Container,
	Breadcrumbs,
	Link,
	Grid,
	Typography,
} from '@material-ui/core';
import AddRequest from '../../../components/Admin/requestAddCompanyList/AddRequest';
import Header from '../../../components/Admin/Header';
import { useAuth } from '../../../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
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
}));

export default function RequestAddCompanyList() {
	const classes = useStyles();
	const { currentUser } = useAuth();

	return (
		<React.Fragment>
			<CssBaseline />
			<Container className={classes.mainPage}>
				<Header title='ADMIN LIST' username={currentUser.email} />{' '}
				{/*Can fix currentUser khi refresh */}
				{/* <Grid container className={classes.oneRow}>
                    <Grid item xs={8}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link color="inherit" href="/admin">
                                admin
                            </Link>
                            <Typography color="textPrimary">request-list</Typography>
                        </Breadcrumbs>
                    </Grid>
                </Grid> */}
				<AddRequest />
			</Container>
		</React.Fragment>
	);
}
