import React from 'react';
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

export default function Company(props) {
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
                    image={company.logo !== "" ? company.logo : "https://bitly.com.vn/i76yfb"}
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

            <CardActions>
                <ModalCompany company={company} title="Modify" onUpdate={props.onUpdate}/>
                <Button 
                    variant="contained" color="secondary" size="small" 
                    onClick={()=>handleRemove(company)}>
                    <RemoveIcon/>
                    Delete
                </Button>
            </CardActions>
        </Card>
    </Grid>
  );
}