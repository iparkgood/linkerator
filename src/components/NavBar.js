import React from 'react';
import { AppBar, Toolbar, InputBase } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    justifyContent: "space-between",
  },
  searchBar: {
    position: "relative",
    borderRadius: "5px",
    backgroundColor: fade("rgb(0,0,0)", 0.15),
    paddingLeft: "8px",
  },
  searchInput: {
    color: "inherit"
  },
}))

const NavBar = () => {
  const classes = useStyles()

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.flex}>
        <h1>The Great Linkerator</h1>
        <div className={classes.searchBar}>
          <InputBase className={classes.searchInput} placeholder="Search..." />
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar