import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddCircleOutline';

import Header from '../../../components/Admin/Header';
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

const data = [
    {
        name: 'Samsung',
        address: 'Seoul, Korea',
        rating: 4,
        type: 'technology',
        logo: 'https://source.unsplash.com/random',
        logoText: 'Image Text',
    },
    {
        name: 'Toyota',
        address: 'Tokyo, Japan',
        rating: 5,
        type: 'car',
        logo: 'https://source.unsplash.com/random',
        logoText: 'Image Text',
    },
];

export default function ListCompany() {
    const classes = useStyles();

    const [companies] = useCoStorage();

    const handleClick = (event) => {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    const handleAdd = (event) => {
        console.info('You clicked a breadcrumb.');
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
                        <Button variant="contained" color="primary" aria-haspopup="true" onClick={handleAdd}>
                            <AddIcon/>
                            Add new Company
                        </Button>
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
