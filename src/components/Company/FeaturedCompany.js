import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Grid, Card, CardActionArea, CardContent, CardMedia} from '@material-ui/core/';
import GradeIcon from "@material-ui/icons/Grade";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import { Link } from 'react-router-dom';

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
    paddingRight: 10,
  },
  oneCompany: {
    backgroundPosition: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: window.innerWidth * 0.9
  }
});
export default function FeaturedCompany(props) {
  const classes = useStyles();
  const company = props.company;
  const totalStar = [0, 0, 0, 0, 0];
  const fillStar = (stars) => {
    for (let i = 0; i < stars; i++) {
      totalStar[i] = 1;
    }
  }
  const resetStar = () => {
    totalStar.map(i => 0);
  }

  const linkParam = '/company/' + company.id;
  return (
    <Grid item xs={12} className={classes.oneCompany}>
      <Card className={classes.card}>

        <CardActionArea component="a" className={classes.cardActionArea}>
          <CardMedia
            className={classes.cardMedia}
            image={company.logo !== "" ? company.logo : "sample-logo.png"}
            title={company.name + "-text"} />       
            <CardContent className={classes.companyDetails}>
              <Link to={linkParam} style={{ textDecoration: 'none', color: '#1188b8' }}>
                <Typography className={classes.title} component="h2" variant="h5">
                  {company.name}<b>({company.totalReview})</b>
                </Typography>
              </Link>
              {fillStar(parseInt(company.rating))}
              {totalStar.map(
                i => (
                  i == 1 ? <GradeIcon style={{ color: 'yellow' }} /> : <StarOutlineIcon />
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
    </Grid >
  );
}

FeaturedCompany.propTypes = {
  post: PropTypes.object,
};
