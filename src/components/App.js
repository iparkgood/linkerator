import React, { useState, useEffect } from 'react';

import {
  getAllLinks
} from '../api';

import NavBar from "./NavBar"


const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    getAllLinks()
    // .then(response => {
    //   setMessage(response.message);
    // })
    // .catch(error => {
    //   setMessage(error.message);
    // });
  });

  return (
    <div className="App">
      <NavBar />
      <h2>{message}</h2>
    </div>
  );
}

export default App;