import { makeStyles } from '@material-ui/core'
import React from 'react'
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import BusinessIcon from '@material-ui/icons/Business';
import CreateIcon from '@material-ui/icons/Create';
import Button from '@material-ui/core/Button';
import ModalReview from "../ModalReview";
import ModalRequestNewCompany from "../ModalRequestNewCompany";
import useCoStorage from "../../../hooks/coStorage";

const useStyles = makeStyles({
    companyInfo__logo: {
        width: 80,
        height: 80
    },
    companyInfoCompanyPage: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#fff',
        padding: 10
    },
    companyInfo: {
        display: 'flex',
        flex: 8
    },
    companyInfo__detail: {

    },
    companyInfo__name__rating: {
        display: 'flex',
        justifyItems: 'center',
    },
    companyInfo__name: {
        marginTop: 0,
        marginRight: 10,
        marginLeft: 10
    },
    companyInfo__rating: {
        margin: 0,
        paddingTop: 2
    },
    companyInfo__location: {
        display: 'flex',
        marginLeft: 10
    },
    companyAction: {
        flex: 2
    }
})


export default function CompanyInfo({ company }) {
    const classes = useStyles();
    const [companies, addCompany, updateCompany, removeCompany] = useCoStorage();
    console.log(company)
    return (
        <div className={classes.companyInfoCompanyPage}>
            <div className={classes.companyInfo}>
                <img src={company.logo} className={classes.companyInfo__logo} alt="logo" />
                <div className={classes.companyInfo__detail}>
                    <div className={classes.companyInfo__name__rating}>
                        <h2 style={{color: '#1188b8'}} className={classes.companyInfo__name}>{company.name}</h2>
                        <Box component="fieldset" mb={3} borderColor="transparent" className={classes.companyInfo__rating}>
                            <Rating name="read-only" value={company.rating} precision={1} readOnly />
                        </Box>
                    </div>
                    <div className={classes.companyInfo__location}>
                        <BusinessIcon />
                        <div>{company.address}</div>
                    </div>
                </div>
            </div>
            <div className={classes.companyAction}>
                {/*<Button*/}
                {/*    style={{backgroundColor: '#23d160', borderRadius: 20}}*/}
                {/*    variant="contained"*/}
                {/*    color="primary"*/}
                {/*    size="large"*/}
                {/*    className={classes.button}*/}
                {/*    startIcon={<CreateIcon />}*/}

                {/*>*/}
                {/*    Write review*/}
                {/*</Button>*/}
                <ModalReview company={company}/>
            </div>
        </div>
    )
}
