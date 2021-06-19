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

const NavBar = ({ setLinks }) => {
  const classes = useStyles()

  const handleSearch = (e) => {
    const searchTerm = e.target.value.trim()
    if (searchTerm === '') {
      setLinks((links) => links.map(link => ({...link, isHidden: false})))
    } else {
      setLinks((links) => {
        return links.map(link => {
          //substring(8) is to remove the https://
          const domain = link.url.substring(8)
          return (domain.startsWith(searchTerm)) ? {...link, isHidden: false} : {...link, isHidden: true}
        })
      })
    }
      

  }

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.flex}>
        <h1>The Great Linkerator</h1>
        <div className={classes.searchBar}>
          <InputBase onChange={handleSearch} className={classes.searchInput} placeholder="Search URL ..." />
        </div>
        <div className={classes.searchBar}>
          <InputBase className={classes.searchInput} placeholder="Search Tags ..." />
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar