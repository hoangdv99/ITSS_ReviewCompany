import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Menu from '@material-ui/core/Menu';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import CompanyIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/AddCircle';
import UserIcon from '@material-ui/icons/AccountCircle'
import DropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useAuth } from '../../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
    userArea: {
        textAlign: 'right',
        paddingTop: 20,
    },
    homeLogo: {
        textAlign: 'center',
        paddingTop: 25,
    },
    
}));

export default function Header(props) {
    const classes = useStyles();
    const {title, username} = props;

    const [value, setValue] = React.useState(0);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const { signOut } = useAuth();

    const history = useHistory();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    async function handleLogOut() {
        try {
            await signOut()
            history.push('/')
        } catch (e) {
            console.log(e.message);
        }
    }
   
    return (
        <React.Fragment>
            <Toolbar className={classes.toolbar}>
                < Grid container>
                    <Grid item xs = {1} className={classes.homeLogo}>
                        <Link component="button" variant="body2" to="/companies">
                            Home
                        </Link>
                    </Grid>
                    <Grid item xs = {8}>
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                            <Tab icon={<CompanyIcon/>} label="companies" />
                            <Tab icon={<AddIcon/>} label="company add request"  />
                            <Tab icon={<UserIcon/>} label="admins"  />
                        </Tabs>
                    </Grid>
                    <Grid item xs ={3} className={classes.userArea}>
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            {username}
                            <DropDownIcon/>
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleLogOut}>Logout</MenuItem>

                        </Menu>
                    </Grid>
                </Grid>
            </Toolbar>
        </React.Fragment>
    );
}

Header.propTypes = {
    sections: PropTypes.array,
    title: PropTypes.string,
};

