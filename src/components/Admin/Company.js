import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import GradeIcon from "@material-ui/icons/Grade";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import RemoveIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/EditOutlined';

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
                <Button variant="contained" color="primary" size="small">
                    <AddIcon/>
                    Edit
                </Button>
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
