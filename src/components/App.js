import React, { useState, useEffect } from 'react';

import {
  getAllLinks
} from '../api';

import NavBar from "./NavBar"


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
  });

  return (
    <div className="App">
      <NavBar />
      <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between"}}>
        {(links) && links.map(link => {
          return (
            <div key={link.id} style={{flexBasis: "250px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
              <h2>{link.url}</h2>
              <p>Click Count: {link.clickCount}</p>
              <p>Date Shared: {link.sharedDate}</p>
              <div>Tags:
                {/* {link.tags.map(tag => <p>{tag}</p>)} */}
              </div>
              <div>Comments:
                {link.comments.map(com => <p>{com.comment}</p>)}
              </div>
            </div>
          )
        })}
      </div>
      <h2>{message}</h2>
    </div>
  );
}

export default App;