import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import moment from 'moment'


// import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
// import IconButton from '@material-ui/core/IconButton';
// import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
// import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
// import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import clsx from 'clsx';
// import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100%",
        marginBottom: 10
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    cardHeader: {
        display: 'flex',
        flexDirection: 'row'
    },
    cardHeaderRating: {
        padding: 0,
        marginLeft: 10
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

export default function ReviewCard({ review }) {
    const classes = useStyles();
    // const [expanded, setExpanded] = React.useState(false);

    // const handleExpandClick = () => {
    //     setExpanded(!expanded);
    // };
    console.log(review)

    return (
        <Card className={classes.root}>
            <CardHeader
                title={
                    <div className={classes.cardHeader}>
                        <div style={{ display: 'flex', flex: 9 }}>
                            <span>{review.reviewer} ({review.position})</span>
                            <Box component="fieldset" mb={3} borderColor="transparent" className={classes.cardHeaderRating}>
                                <Rating name="read-only" value={review.rating} precision={1} readOnly />
                            </Box>
                        </div>
                        <span style={{ fontSize: 18, color: 'grayText', flex: 1 }}>{moment(review.created_at).format('DD/MM/YYYY HH:mm')}</span>
                    </div>
                }
                style={{ paddingBottom: 0 }}
            />
            <CardContent style={{ paddingTop: 0 }}>
                <Typography variant="body1" color="textPrimary" component="h5">
                    { review.text }
                </Typography>
            </CardContent>
            {/* <CardActions className={classes.cardActions}>
                <Button
                    variant="text"
                    color="inherit"
                    className={classes.button}
                    startIcon={<ThumbUpAltOutlinedIcon />}
                >
                    Like
                </Button>
                <Button
                    variant="text"
                    color="inherit"
                    className={classes.button}
                    startIcon={<ThumbDownAltOutlinedIcon />}
                >
                    Dislike
                </Button>
                <Button
                    variant="text"
                    color="inherit"
                    className={classes.button}
                    startIcon={<ChatBubbleOutlineOutlinedIcon />}
                >
                    Reply
                </Button>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                        minutes.
                    </Typography>
                    <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                        heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                        browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                        and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                        pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                        without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                        medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                        again without stirring, until mussels have opened and rice is just tender, 5 to 7
                        minutes more. (Discard any mussels that don’t open.)
                    </Typography>
                    <Typography>
                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                </CardContent>
            </Collapse> */}
        </Card>
    );
}
