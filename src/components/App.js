import React, { useState, useEffect } from "react";
import { Grid, Container } from "@material-ui/core";

import { getAllLinks } from "../api";

import { NavBar, LinkCard, AddURL } from "./index";

const App = () => {
  // const [message, setMessage] = useState("");
  const [links, setLinks] = useState(false);

  useEffect(() => {
    getAllLinks()
      .then((response) => {
        setLinks(response);
      })
      .catch((error) => {
        // setMessage(error.message);
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Container>
        <AddURL {...{setLinks}}/>
        <Grid style={{ marginTop: "8px" }} container spacing={3}>
          {links &&
            links.map((link) => {
              return (
                <Grid item xs={12} md={6} key={link.id}>
                  <LinkCard link={link} />
                </Grid>
              );
            })}
        </Grid>
      </Container>
      {/* <h2>{message}</h2> */}
    </div>
  );
};

export default App;
