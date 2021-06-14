import React from 'react';
import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import DoneIcon from '@material-ui/icons/Done';
import CancleIcon from '@material-ui/icons/CancelOutlined';
import ModifyIcon from '@material-ui/icons/EditOutlined';
import {Modal, Button, Paper, Typography, Input, Grid, Select, MenuItem, CardActions, CardMedia} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import {uploadImage} from '../../../config/firebase';

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
];

const initCompany = {
  name: "",
  address: "",
  site: "",
  type: "others",
  rating: 0,
  logo: "sample-logo.png",
  is_active: 1,
  totalReview:0,
}

export default function ModalCompany(props) {
  const classes = useStyles();
  const [company, setCompany] = useState(props.company);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState('');

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
    const urlLogo = await uploadImage(event.target.files[0]);
    console.log(urlLogo);
    if(urlLogo === ""){
      alert("Action fails!");
      setOpen(false);
    }else{
      setCompany({
        ...company,
        [event.target.name]: urlLogo,
      })
    }
  }

  const checkAllValidate = () => {
    if(company.name === "" || company.site === ""){
      setError('Name and site can not null!');
      return false;
    }else if(props.onCheckValidate('name', company.name)){
      setError('Name exist!');
      return false;
    }else if(props.onCheckValidate('site', company.site)){
      setError('Site exist!');
      return false;
    }else{
      return true;
    }
  }

  const handleSumit = () => {
    setError('');
    if(props.title === "New"){
      if(checkAllValidate()){
        props.onAddSubmit(company);
        setCompany(initCompany);
        setOpen(false);
      }
    }else{
      if(company.name === ""){
        setError('Name is must be filled!');
      }else{
        props.onUpdate(company);
        setCompany(company);
        setOpen(false); 
      }
    }
  }

  return (
    <div>
    <Button variant="contained" color="primary" aria-haspopup="true" onClick={handleOpen}>
        {props.title !== 'New' ? <ModifyIcon/> : <AddIcon/>}
        {props.title !== 'New'? props.title : props.title + ` company`}
    </Button>
      <Modal open={open} onClose={handleClose}>
        <Paper className={classes.modalStyle}>
            <Typography component="h4" variant="h5" className={classes.modalTitle}>
                {props.title} Company
            </Typography>
            {error && <Alert variant="filled" severity="error">{error}</Alert>}
            <form className={classes.modalForm} noValidate>
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
                            className={classes.formInput}
                            value={company.type}
                            name="type"
                            id="type"
                            onChange={handleChange}
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
                        {
                          props.title === 'New' ? 
                          <Input 
                            id="logo" 
                            name="logo" 
                            type="file" 
                            className={classes.formInput}
                            onChange={handleChangeLogo}
                            /> 
                            :
                          <div>
                            <CardMedia 
                              className={classes.companyLogo}
                              image={company.logo !== "" ? company.logo : "sample-logo.png"}
                              title={company.name + "-text"}
                            />
                            <Input 
                              id="logo" 
                              name="logo" 
                              type="file" 
                              className={classes.formInput}
                              onChange={handleChangeLogo}
                              />
                          </div>
                        }
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
                            Cancle
                        </Button>
                    </CardActions>
                </Grid>
            </form>
        </Paper>
      </Modal>
    </div>
  );
}