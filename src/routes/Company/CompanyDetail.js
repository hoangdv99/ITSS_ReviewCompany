import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Review from '../Feedback/Review';
import CompanyBreadCrumbs from '../../components/Company/CompanyDetail/CompanyBreadcrumbs';
import CompanyInfo from '../../components/Company/CompanyDetail/CompanyInfo';
import { firestore } from '../../config/firebase';
import { useParams } from 'react-router';

// const company = {
//     name: 'BKAV',
//     address: '1 Đại Cồ Việt, Giải Phóng, Hai Bà Trưng, Hà Nội',
//     logo: 'https://i.picsum.photos/id/1003/1181/1772.jpg?hmac=oN9fHMXiqe9Zq2RM6XT-RVZkojgPnECWwyEF1RvvTZk',
//     rating: 3,
//     active: true,
//     id: '1seOf0JNJTHTJQM8Dc3y'
// };

const useStyles = makeStyles({
    root: {
        marginLeft: 50,
        marginRight: 50
    }
});

export default function CompanyDetail() {
    const classes = useStyles();
    const { companyId } = useParams();
    const [company, setCompany] = useState(null);
    const [reviews, setReviews] = useState([]);
    
    useEffect(() => {
        (async () => {
            const _company = (await firestore.collection('companies').doc(companyId).get()).data()
            _company.id = companyId;
            setCompany(_company);
        })();
    }, [companyId]);

    return (
        <div>
            { company && (
                <div className={classes.root}>
                    <CompanyBreadCrumbs company={company} />
                    <CompanyInfo company={company} reviews={reviews} setReviews={setReviews} />
                    <Review company={company} reviews={reviews} setReviews={setReviews} />
                </div>
            ) }
        </div>
    )
}
