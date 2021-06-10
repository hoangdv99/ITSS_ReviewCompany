import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import GradeIcon from "@material-ui/icons/Grade";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import GroupIcon from "@material-ui/icons/Group";

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
    title: {
      display: 'flex',
      paddingRight:10,
    }
});

export default function FeaturedPost(props) {
  const classes = useStyles();
  const { post } = props;
  const totalStar = [1,1,1,0,0];
  return (
      <Grid style={{marginTop:10,marginLeft:20,marginBottom:10}}>
        <CardActionArea component="a" href="#">
          <Card className={classes.card}>
            <Hidden xsDown>
              <CardMedia className={classes.cardMedia} image={post.image} title={post.imageTitle} />
            </Hidden>
            <div className={classes.cardDetails}>
              <CardContent>
                <div className={classes.title}>
                  <Typography component="h2" variant="h5">
                    Ten cong ty
                  </Typography>
                  <div>
                    {totalStar.map(
                        i=>(
                          i == 1? <GradeIcon style={{color:'yellow'}}/>:<StarOutlineIcon/>
                        )
                    )}
                  </div>
                  <Typography component="h2" variant="h5">
                    (9)
                  </Typography>
                </div>
                <div className={classes.title}>
                  <div className={classes.title}>
                    <BusinessCenterIcon/>
                    <Typography variant="subtitle1" color="textSecondary" style={{paddingLeft:5}}>
                      Loai hinh
                    </Typography>
                  </div>
                  <div className={classes.title}>
                    <GroupIcon/>
                    <Typography variant="subtitle1" color="textSecondary" style={{paddingLeft:5}}>
                      50-150
                    </Typography>
                  </div>
                </div>
                <Typography variant="subtitle1" color="textSecondary">
                  {post.description}
                </Typography>
              </CardContent>
            </div>
          </Card>
        </CardActionArea>
      </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};
