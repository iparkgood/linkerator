import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core'

import {
  getAllLinks
} from '../api';

import { NavBar, LinkCard } from "./index"

const addingTheHiddenField = (links) => links.map(link => ({...link, isHidden: false}))


const App = () => {
  const [message, setMessage] = useState('');
  const [links, setLinks] = useState(false)

  useEffect(() => {
    getAllLinks()
      .then(response => {
        return addingTheHiddenField(response)
      })
      .then(newObject => {
        setLinks(newObject);
      })
      .catch(error => {
        setMessage(error.message);
      });
  }, []);

  return (
    <div className="App">
      <NavBar setLinks={setLinks} />
      <Grid style={{'margin-top': "8px"}} container spacing={3}>
        {(links) && links.map(link => {
          return (link.isHidden) ? "" :
          (
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