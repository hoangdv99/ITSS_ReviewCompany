
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
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import GradeIcon from '@material-ui/icons/Grade';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import GroupIcon from '@material-ui/icons/Group';
import ApartmentIcon from '@material-ui/icons/Apartment';
const useStyles = makeStyles({
    card: {
        display: 'flex',
    },
    title: {
        display: 'flex',
        paddingRight:10,
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
});

export default function CardCompany(props) {
    const classes = useStyles();
    const { item } = props;

    return (
        <Grid item xs={12} md={6}>
            <CardActionArea component="a" href="#" onClick={()=>{console.log('click')}}>
                <Card className={classes.card}>
                    <Hidden xsDown>
                        <CardMedia className={classes.cardMedia} image={'https://source.unsplash.com/random'} title={'123'} />
                    </Hidden>
                    <div className={classes.cardDetails}>
                        <CardContent>
                            <div className={classes.title}>
                            <Typography component="h2" variant="h5">
                                 Ten cong ty
                            </Typography>
                                <div>
                                    <GradeIcon style={{color:'yellow'}}/>
                                    <GradeIcon style={{color:'yellow'}}/>
                                    <StarOutlineIcon/>
                                    <StarOutlineIcon/>
                                    <StarOutlineIcon/>
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
                            <div className={classes.title}>
                                 <ApartmentIcon/>
                                 <Typography variant="subtitle1" color="textSecondary" style={{paddingLeft:5}}>
                                      Dia chi
                                 </Typography>
                            </div>
                        </CardContent>
                    </div>
                </Card>
            </CardActionArea>
        </Grid>
    );
}

CardCompany.propTypes = {
    post: PropTypes.object,
};
