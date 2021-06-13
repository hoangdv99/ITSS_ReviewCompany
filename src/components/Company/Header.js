import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import ModalCompany from "../Admin/ModalCompany";
import useCoStorage from "../../hooks/coStorage";
import ModalRequestNewCompany from "./ModalRequestNewCompany";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { sections, title } = props;
  const history = useHistory();
  const [companies, addCompany, updateCompany, removeCompany] = useCoStorage();
  function handleSignIn() {
    history.push("/signin");
  }

  const company = {
    name: "",
    address: "",
    site: "",
    type: "",
    rating: 0,
    totalReview: 0,
    logo: "",
    is_active: 0,
  };

  const handleAdd = (item) => {
    addCompany(item);
  };
  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Button size="small"></Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        {/* <IconButton>
                    <SearchIcon />
                </IconButton> */}
        <ModalRequestNewCompany
          company={company}
          title="New"
          onAddSubmit={handleAdd}
        />
        <Button variant="outlined" size="small" onClick={handleSignIn}>
          Sign in
        </Button>
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
