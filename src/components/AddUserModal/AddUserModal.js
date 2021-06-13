import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import React, { useState } from "react";
import { createNewUser } from "../../config/firebase";
import "./AddUserModal.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "40%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "5px",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  buttonGroup: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    margin: "10px",
  },
}));

function AddUserModal({users, setUsers}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setError("");
  }

  async function handleAdd() {
    try {
      await createNewUser({ name, email, pass });
      setUsers([...users, {name, email, pass}]);
      handleClose();
    } catch (err) {
      if (err) {
        setError(err.message);
      }
    }
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        aria-haspopup="true"
        onClick={handleOpen}
      >
        <AddIcon />
        Add new Administrator
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2>Add new administrator</h2>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPass(e.target.value)}
              />
              {error !== "" ? <p className="error">{error}</p> : ""}
              <div className={classes.buttonGroup}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={handleAdd}
                >
                  Create
                </Button>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default AddUserModal;
