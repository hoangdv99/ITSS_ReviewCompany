import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {CssBaseline, Container, Breadcrumbs, Link, Grid, Typography} from '@material-ui/core';
import AdminHeader from '../../../components/Admin/Header';
import ModalCompany from '../../../components/Admin/ModalCompany';
import Company from '../../../components/Admin/Company';
import Footer from '../../../components/Company/Footer';
import { useAuth } from '../../../contexts/AuthContext';
import useCoStorage from '../../../hooks/coStorage';

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
    }
}));

export default function ListCompany() {
    const classes = useStyles();
    const {currentUser} = useAuth();
    const [companies, addCompany, updateCompany, removeCompany] = useCoStorage();

    const company = {
        name: "",
        address: "",
        site: "",
        type: "others",
        rating: 0,
        logo: "https://bitly.com.vn/i76yfb",
        is_active: 1,
        totalReview:0,
    }

    const handleClick = (event) => {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
        console.log(companies)
    }

    const handleAdd = (item) => {
        addCompany(item);
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container className={classes.mainPage}>
                <AdminHeader />
                <Grid container className={classes.oneRow}>
                    <Grid item xs={8}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link color="inherit" href="/admin" onClick={handleClick}>
                                admin
                            </Link>
                            <Typography color="textPrimary">companies</Typography>
                        </Breadcrumbs>
                    </Grid>
                    <Grid item xs={4} className={classes.addBtn}>
                        <ModalCompany  company={company} title="New" onAddSubmit={handleAdd}/>
                    </Grid>
                </Grid>

                <Grid container className={classes.oneRow}>
                        {companies.map((co, i) => (
                            <Company key={i} company={co} onUpdate={updateCompany} onRemove={removeCompany}/>
                        ))}
                </Grid>
            </Container>
            <Footer title="Team 2" description="From team 2 with love" />
        </React.Fragment>
    );
}
