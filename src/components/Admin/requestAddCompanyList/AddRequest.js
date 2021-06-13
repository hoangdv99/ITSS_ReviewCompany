import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Card, CardActionArea, CardContent, CardActions, IconButton, CardMedia, Grow } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { firestore } from '../../../config/firebase';

const useStyles = makeStyles({
    center: {
        margin: 'auto',
        marginTop: '30px',
    },
    card: {
        display: 'flex',
        height: 140,
    },
    cardActionArea: {
        display: 'flex',
    },
    companyDetails: {
        flex: 1
    },
    cardMedia: {
        width: 160,
        height: '100%',
    },
    title: {
        display: 'flex',
        paddingRight: 10,
    },
    oneCompany: {
        marginTop: 10,
        marginBottom: 10,
    }
});

export default function AddRequest() {
    const classes = useStyles();

    const [companies, setCompanies] = useState([])
    var companyNumber = companies.length

    const fetchCompanies = async () => {
        const companiesRef = firestore.collection('companies');
        const snapshot = await companiesRef.where("is_active", "==", 0).get();
        snapshot.docs.forEach(company => {
            setCompanies(companies => [...companies, { ...company.data(), id: company.id }]);
        });
    }

    useEffect(() => {
        fetchCompanies()
    }, [])

    async function handleAccept(id) {
        try {
            console.log(id)
            await firestore.collection('companies').doc(id).update({
                is_active: 1
            })
            document.getElementById("company-card-" + id).remove()
            companyNumber -= 1
        } catch (err) {
            alert("Something went wrong")
        }
    }

    async function handleReject(id) {
        try {
            await firestore.collection('companies').doc(id).delete()
            document.getElementById("company-card-" + id).remove()
            companyNumber -= 1
        } catch (err) {
            alert("Something went wrong")
        }
    }

    return (
        <Grid container className={classes.oneRow}>
            {(companyNumber == 0) &&
                <Grid className={classes.center}>
                    <Typography align="center" variant="h4" color="textSecondary">
                        nothing left to check
                    </Typography>
                </Grid>
            }
            {companies.map((company) => (
                <Grid item xs={12} className={classes.oneCompany} key={company.id} id={"company-card-" + company.id}>
                    <Card className={classes.card}>
                        <CardActionArea className={classes.cardActionArea}>
                            <CardMedia
                                className={classes.cardMedia}
                                image={company.logo !== "" ? company.logo : "../../../..//../public/no_imega.png"}
                                title={company.name + "-text"} />
                            <CardContent className={classes.companyDetails}>
                                <Typography className={classes.title} component="h2" variant="h5">
                                    {company.name}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {company.type}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {company.address}
                                </Typography>
                            </CardContent>
                        </CardActionArea>

                        <CardActions>
                            <IconButton
                                variant="contained" color="primary"
                                fontSize="large"
                                onClick={() => handleAccept(company.id)}>
                                <AddCircleIcon />
                            </IconButton >
                            <IconButton
                                variant="contained" color="secondary"
                                fontSize="large"
                                onClick={() => handleReject(company.id)}>
                                <CancelIcon />
                            </IconButton >
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}
