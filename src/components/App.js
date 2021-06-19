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
              (
                <Grid item xs={6}>
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
