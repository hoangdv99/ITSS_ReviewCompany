import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Header from '../../components/Company/Header';
import MainFeaturedPost from '../../components/Company/MainFeaturedPost';
import FeaturedPost from '../../components/Company/FeaturedPost';
import Main from '../../components/Company/Main';
import Sidebar from '../../components/Company/Sidebar';
import firebase from 'firebase';
import Footer from '../../components/Company/Footer';
import Pagination from '@material-ui/lab/Pagination';
import Company from "../../components/Admin/Company";
import useCoStorage from "../../hooks/coStorage";
import {firestore, getCompanies} from "../../config/firebase";
const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
        justifyContent:'center'
    },
}));

const sections = [
    { title: 'Technology', url: '#' },
    { title: 'Design', url: '#' },
    { title: 'Culture', url: '#' },
    { title: 'Business', url: '#' },
    { title: 'Politics', url: '#' },
    { title: 'Opinion', url: '#' },
    { title: 'Science', url: '#' },
    { title: 'Health', url: '#' },
    { title: 'Style', url: '#' },
    { title: 'Travel', url: '#' },
];

const mainFeaturedPost = {
    title: 'Title of a longer featured blog post',
    description:
        "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imgText: 'main image description',
    linkText: 'Continue reading…',
};

function ListCompany() {
    const classes = useStyles();
    const limitPerPage = 10;
    const [page, setPage] = React.useState(1);
    const [listCompany, setListCompany] = React.useState([]);
    const [companies, addCompany, updateCompany, removeCompany] = useCoStorage();
    const handleChange = (event, value) => {
        setPage(value);
        console.log(value);
    };
    useEffect(()=>{
        setListCompany(companies.slice((page-1)*limitPerPage,(page-1)*limitPerPage+limitPerPage));
        console.log(parseInt(5/3));
    },[page,companies])
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="REVIEW COMPANY" sections={sections} />
                <main>
                    <MainFeaturedPost post={mainFeaturedPost} />
                    <Grid container spacing={5} className={classes.mainGrid}>
                        <Grid>
                            <Pagination count={parseInt(companies.length/limitPerPage)*limitPerPage<companies.length?parseInt(companies.length/limitPerPage)+1:parseInt(companies.length/limitPerPage)} variant="outlined" shape="rounded" page={page} onChange={handleChange}/>
                            {listCompany.length>0 && listCompany.map((co, i) => (
                                <FeaturedPost key={i} company={co} onUpdate={updateCompany} onRemove={removeCompany}/>
                            ))}
                            <Pagination count={parseInt(companies.length/limitPerPage)*limitPerPage<companies.length?parseInt(companies.length/limitPerPage)+1:parseInt(companies.length/limitPerPage)} variant="outlined" shape="rounded" page={page} onChange={handleChange}/>
                        </Grid>
                    </Grid>
                </main>
            </Container>
            <Footer title="Team 2" description="From team 2 with love" />
        </React.Fragment>
    );
}
export default ListCompany;
