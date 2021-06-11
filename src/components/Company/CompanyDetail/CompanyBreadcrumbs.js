import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 15
    },

    link: {
        display: 'flex',
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
}));

export default function CompanyBreadcrumbs({company}) {
    const classes = useStyles();

    return (
        <Breadcrumbs aria-label="breadcrumb" className={classes.root}>
            <Link color="inherit" href="/" className={classes.link}>
                <HomeIcon className={classes.icon} />
                Homepage
            </Link>
            <Link
                color="inherit"
                className={classes.link}
            >
                {company.name}
            </Link>
        </Breadcrumbs>
    );
}
