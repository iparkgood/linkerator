import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, InputBase } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';

// import {
//   getSomething
// } from '../api';

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    justifyContent: "space-between"
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


const App = () => {
  const classes = useStyles()
  const [message, setMessage] = useState('');

  // useEffect(() => {
  //   getSomething()
  //     .then(response => {
  //       setMessage(response.message);
  //     })
  //     .catch(error => {
  //       setMessage(error.message);
  //     });
  // });

  return (
    <div className="App">
      <AppBar>
        <Toolbar className={classes.flex}>
          <h1>The Great Linkerator</h1>
          <div className={classes.searchBar}>
            <InputBase className={classes.searchInput} placeholder="Search..." />
          </div>
        </Toolbar>
      </AppBar>
      <h2>{message}</h2>
    </div>
  );
}

export default App;