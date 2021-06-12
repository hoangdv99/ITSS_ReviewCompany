import React from 'react';
import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import DoneIcon from '@material-ui/icons/Done';
import CancleIcon from '@material-ui/icons/CancelOutlined';
import ModifyIcon from '@material-ui/icons/EditOutlined';
import {Modal, Button, Paper, Typography, Input, Grid, Select, MenuItem, CardActions, CardMedia} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import {uploadImage} from '../../config/firebase';
import Alert from '@material-ui/lab/Alert';
const useStyles = makeStyles((theme) => ({
    modalStyle: {
        position: 'absolute',
        width: '40%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    modalTitle: {
        textAlign: 'center',
    },
    modalForm: {
        margin: theme.spacing(3, 4, 0, 0),
        width: '100%'
    },
    formInput: {
        width: '100%',
        marginBottom: theme.spacing(3),
    },
    modalAction: {
        justifyContent: 'center'
    },
    companyLogo: {
        width: 160,
        height: 200,
    }
}));

const types = [
    'technology',
    'abc',
    'xyz',
    'others'
]

export default function ModalRequestNewCompany(props) {
    const classes = useStyles();
    const [company, setCompany] = useState(props.company);
    const [open, setOpen] = React.useState(false);
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [fileUpload, setFileUpload] = React.useState('');
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setCompany({
            ...company,
            [event.target.name]: event.target.value,
        })
    }

    const handleChangeLogo = async event => {
        setFileUpload(event.target.files[0]);
    }
    const handleClick = () => {
        setOpenSnackBar(true);
    };

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    };
    const handleSumit = async () => {
        const urlLogo = await uploadImage(fileUpload);
        console.log(urlLogo);
        if(urlLogo === ""){
            alert("Action fails!");
            setOpen(false);
        }else{
            setCompany({
                ...company,
                logo: urlLogo,
            })
        }
        props.onAddSubmit({
            ...company,
            logo: urlLogo,
        });
        setCompany({})
        setOpen(false);
        setOpenSnackBar(true);
    }
    return (
        <div>
            <Snackbar open={openSnackBar} autoHideDuration={2000} onClose={handleCloseSnackBar}>
                <Alert onClose={handleCloseSnackBar} severity="success">
                    Yêu cầu thêm mới công ty thành công!
                </Alert>
            </Snackbar>
            <Button variant="outlined" size="small" aria-haspopup="true" onClick={handleOpen}>
                {props.title !== 'New'? props.title : props.title + ` company`}
            </Button>
            <Modal open={open} onClose={handleClose}>
                <Paper className={classes.modalStyle}>
                    <Typography component="h4" variant="h5" className={classes.modalTitle}>
                        {props.title} Company
                    </Typography>
                    <form className={classes.modalForm}>
                        <Typography>Name</Typography>
                        <Input
                            placeholder="company's name"
                            value={company.name}
                            name="name"
                            id="name"
                            className={classes.formInput}
                            onChange={handleChange}
                        />
                        <Typography>Address</Typography>
                        <Input
                            placeholder="company's address"
                            value={company.address}
                            name="address"
                            id="address"
                            className={classes.formInput}
                            onChange={handleChange}
                        />
                        <Typography>Website</Typography>
                        <Input
                            placeholder="company's website"
                            value={company.site}
                            name="site"
                            id="site"
                            className={classes.formInput}
                            onChange={handleChange}
                        />
                        <Grid container>
                            <Grid item xs={3}>
                                <Typography>Type</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Select
                                    value={company.type}
                                    name="type"
                                    id="type"
                                    onChange={handleChange}
                                    input={<Input className={classes.formInput} />}
                                >
                                    {types.map((type) => (
                                        <MenuItem  value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={3}>
                                <Typography>Logo</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                        <Input
                                            id="logo"
                                            name="logo"
                                            type="file"
                                            className={classes.formInput}
                                            onChange={handleChangeLogo}
                                        />
                            </Grid>
                        </Grid>
                        <Grid container className={classes.modalAction}>
                            <CardActions>
                                <Button variant="contained" color="primary" size="small"
                                        onClick={()=>handleSumit()}>
                                    <DoneIcon/>
                                    Save
                                </Button>
                                <Button variant="contained" color="secondary" size="small" onClick={handleClose}>
                                    <CancleIcon/>
                                    Cancel
                                </Button>
                            </CardActions>
                        </Grid>
                    </form>
                </Paper>
            </Modal>
        </div>
    );
}
