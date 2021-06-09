import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {CssBaseline, Container, Breadcrumbs, Link, Grid, Typography} from '@material-ui/core';

import Header from '../../../components/Admin/Header';
import ModalCompany from '../../../components/Admin/ModalCompany';
import Company from '../../../components/Admin/Company';
import Footer from '../../../components/Company/Footer';

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

    const [companies, addCompany] = useCoStorage();
    
    const company = {
        name: "",
        address: "",
        site: "",
        type: "",
        rating: 0,
        logo: "",
        is_active: 1,
    }

    const handleClick = (event) => {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    const handleAdd = item => {
        addCompany(item);
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container className={classes.mainPage}>
                <Header title="REVIEW COMPANY" username = "admin1" />

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
                        <ModalCompany company={company} title="New" onSubmit={handleAdd}/>
                    </Grid>
                </Grid>

                <Grid container className={classes.oneRow}>
                        {companies.map((post) => (
                            <Company key={post.title} post={post}/>
                        ))}
                </Grid>
            </Container>
            <Footer title="Team 2" description="From team 2 with love" />
        </React.Fragment>
    );
}
