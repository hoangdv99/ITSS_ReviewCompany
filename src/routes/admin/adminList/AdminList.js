import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import AddUserModal from "../../../components/AddUserModal/AddUserModal";
import ListTable from "../../../components/Admin/adminList/ListTable";
import Header from "../../../components/Admin/Header";
import { useAuth } from "../../../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  oneRow: {
    marginTop: theme.spacing(2),
  },
  addBtn: {
    textAlign: "right",
  },
  mainPage: {
    maxWidth: "lg",
    minHeight: 600,
  },
}));

export default function AdminList() {
  const classes = useStyles();

  const { currentUser } = useAuth();

  const handleClick = (event) => {
    // chuyen huong trang chinh cua admin /admin
  };

  const handleAdd = (event) => {
    // link to create admin modal here
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.mainPage}>
        <Header title="ADMIN LIST" username="{currentUser.email}" />{" "}
        {/*Can fix currentUser khi refresh */}
        <Grid container className={classes.oneRow}>
          <Grid item xs={8}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" href="/admin" onClick={handleClick}>
                admin
              </Link>
              <Typography color="textPrimary">admins</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item xs={4} className={classes.addBtn}>
            <AddUserModal />
          </Grid>
        </Grid>
        <Grid container className={classes.oneRow}>
          <ListTable></ListTable>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
