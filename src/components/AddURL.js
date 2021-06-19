import React, { useState } from "react";

import { TextField, makeStyles, IconButton } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { createNewLink } from "../api";

const useStyles = makeStyles({
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "24px",
  },
  field: {
    flexGrow: 1,
  },
});

const AddURL = ({ setLinks }) => {
  const classes = useStyles();
  const [newURL, setNewURL] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCreateNewLink = async () => {
    const result = await createNewLink(newURL);

    setLinks((currentLinks) => [...currentLinks, result]);

    setNewURL("");
  };

  return (
    <form
      className={classes.flex}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        className={classes.field}
        label="Add URL"
        variant="outlined"
        value={newURL}
        onChange={(e) => setNewURL(e.target.value)}
      />
      <IconButton color="secondary" onClick={handleCreateNewLink}>
        <AddCircleIcon color="secondary" fontSize="large" />
      </IconButton>
    </form>
  );
};

export default AddURL;
