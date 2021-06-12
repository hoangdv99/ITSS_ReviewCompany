import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import GradeIcon from "@material-ui/icons/Grade";
import StarOutlineIcon from "@material-ui/icons/StarOutline";

import {Button, CardActions} from "@material-ui/core";
import ModalCompany from "../Admin/ModalCompany";
import RemoveIcon from "@material-ui/icons/DeleteOutline";

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
    backgroundPosition: 'center',
    marginTop:10,
    marginBottom:10,
    width:window.innerWidth * 0.9
  }
});
export default function FeaturedPost(props) {
  const classes = useStyles();
  const company  = props.company;
  const totalStar = [0,0,0,0,0];
  const fillStar = (stars) => {
    for(let i = 0; i < stars; i++){
      totalStar[i] = 1;
    }
  }
  const resetStar = () => {
    totalStar.map(i=>0);
  }

  const handleRemove = async (item) => {
    await props.onRemove(item)
  }

  return (
      <Grid item xs={12} className={classes.oneCompany}>
        <Card className={classes.card}>
          <CardActionArea component="a" href="#" className={classes.cardActionArea}>
            <CardMedia
                className={classes.cardMedia}
                image={company.logo !== "" ? company.logo : "https://source.unsplash.com/random"}
                title={company.name + "-text"} />
            <CardContent className={classes.companyDetails}>
              <Typography className={classes.title} component="h2" variant="h5">
                {company.name}
              </Typography>
              {fillStar(company.rating)}
              {totalStar.map(
                  i=>(
                      i == 1? <GradeIcon style={{color:'yellow'}}/>:<StarOutlineIcon/>
                  )
              )}
              {resetStar()}
              <Typography variant="subtitle1" color="textSecondary">
                {company.type}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {company.address}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};
