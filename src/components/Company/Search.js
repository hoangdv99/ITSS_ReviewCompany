import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  search: {
    width: "80%",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
  searchBar: {
    width: "40%",
  },
  searchButton: {
    height: "fit-content",
  },
  formControl: {
    width: "10%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Search(props) {
  const classes = useStyles();
  const { search, sort } = props;
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("");

  function handleChange(e) {
    setSortValue(e.target.value);
    sort(e.target.value);
  }
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.search}>
        <TextField
          id="outlined-search"
          className={classes.searchBar}
          label="企業名"
          type="search"
          variant="outlined"
          size="small"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button
          variant="contained"
          className={classes.searchButton}
          color="primary"
          onClick={() => search(searchValue)}
        >
          検索
        </Button>
      </div>
      <FormControl
        variant="outlined"
        className={classes.formControl}
        size="small"
      >
        <InputLabel id="demo-simple-select-outlined-label">評価</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={sortValue}
          onChange={handleChange}
          label="評価"
        >
          <MenuItem value={"asc"}>高い</MenuItem>
          <MenuItem value={"desc"}>低い</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
}

export default Search;