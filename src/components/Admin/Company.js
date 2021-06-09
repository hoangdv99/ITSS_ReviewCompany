import React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Grid, Card, CardActionArea, CardContent, CardActions, Button, CardMedia} from '@material-ui/core';
import GradeIcon from "@material-ui/icons/Grade";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import RemoveIcon from '@material-ui/icons/DeleteOutline';

import ModalCompany from './ModalCompany';

const useStyles = makeStyles({
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
        paddingRight:10,
    },
    oneCompany: {
        marginTop:10,
        marginBottom:10,
    }
});

export default function FeaturedPost(props) {
  const classes = useStyles();
  const { post } = props;

  const [company, setCompany] = useState({
    name: 'test',
    address: 'test',
    site: 'test',
    type: 'test',
    rating: 0,
    logo: 'https://i.picsum.photos/id/654/200/300.jpg?hmac=JhhoLGzzNeSmL5tgcWbz2N4DiYmrpTPsjKCw4MeIcps',
    is_active: 1,
  });

  const totalStar = [0,0,0,0,0];
  const fillStar = (stars) => {
    for(let i = 0; i < stars; i++){
      totalStar[i] = 1;
    }
  }
  const resetStar = () => {
      totalStar.map(i=>0);
  }
  return (
    <Grid item xs={12} className={classes.oneCompany}>
        <Card className={classes.card}>
            <CardActionArea component="a" href="#" className={classes.cardActionArea}>
                <CardMedia className={classes.cardMedia} image={post.logo} title={post.logoText} />
                <CardContent className={classes.companyDetails}>
                    <Typography className={classes.title} component="h2" variant="h5">
                    {post.name}
                    </Typography>
                    {fillStar(post.rating)}
                    {totalStar.map(
                        i=>(
                            i == 1? <GradeIcon style={{color:'yellow'}}/>:<StarOutlineIcon/>
                        )
                    )}
                    {resetStar()}
                    <Typography variant="subtitle1" color="textSecondary">
                        {post.type}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {post.address}
                    </Typography>
                </CardContent>
            </CardActionArea>

            <CardActions>
                <ModalCompany company={company} title="Modify"/>
                <Button variant="contained" color="secondary" size="small">
                    <RemoveIcon/>
                    Delete
                </Button>
            </CardActions>
        </Card>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};
