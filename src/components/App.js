import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core'

import {
  getAllLinks
} from '../api';

import { NavBar, LinkCard } from "./index"


const App = () => {
  const [message, setMessage] = useState('');
  const [links, setLinks] = useState(false)

  useEffect(() => {
    getAllLinks()
      .then(response => {
        setLinks(response);
      })
      .catch(error => {
        setMessage(error.message);
      });
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Grid style={{'margin-top': "8px"}} container spacing={3}>
        {(links) && links.map(link => {
          return (
            <Grid item xs={6}>
              <LinkCard link={link} />
            </Grid>
          )
        })}
      </Grid>
      <h2>{message}</h2>
    </div>
  );
}

export default App;