import React, { useState, useEffect } from "react";
import { Grid, Container } from "@material-ui/core";

import { getAllLinks } from "../api";
import { NavBar, LinkCard, AddURL } from "./index";

const addingTheHiddenField = (links) => links.map(link => ({ ...link, isHidden: false }))


const App = () => {
  const [links, setLinks] = useState(false);

  useEffect(() => {
    getAllLinks()
      .then(response => {
        return addingTheHiddenField(response)
      })
      .then(newObject => {
        setLinks(newObject);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
      <NavBar setLinks={setLinks} />
      <Container>
        <AddURL {...{ setLinks }} />
        <Grid style={{ marginTop: "8px" }} container spacing={3}>
          {(links) && links.map(link => {
            return (link.isHidden) ? "" :
              ( //xs={12} md={6} when the screen size is x-small
                //each grid item will take all the 12 columns of Grid container which will be shown as one column
                //when the screen size is over medium
                //each grid item will take 6 columns which will be shown as two columns
                <Grid item xs={12} md={6} key={link.id}>
                  <LinkCard link={link} setLinks={setLinks} />
                </Grid>
              )
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default App;
