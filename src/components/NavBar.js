import React from 'react';
import { AppBar, Toolbar, InputBase, Button } from '@material-ui/core';
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
    const searchTerm = e.target.value.trim().toLowerCase()
    if (searchTerm === '') {
      setLinks((links) => links.map(link => ({ ...link, isHidden: false })))
    } else {
      setLinks((links) => {
        return links.map(link => {
          //substring(8) is to remove the https://
          const domain = link.url.substring(8).toLowerCase()
          return (domain.startsWith(searchTerm)) ? { ...link, isHidden: false } : { ...link, isHidden: true }
        })
      })
    }
  }

  const handleTagSearch = (e) => {
    const searchTerm = e.target.value.trim().toLowerCase()
    if (searchTerm === '') {
      setLinks((links) => links.map(link => ({ ...link, isHidden: false })))
    } else {
      setLinks((links) => {
        return links.map(link => {
          const { tags } = link
          let tagBool = false
          for (let i = 0; i < tags.length; i++) {
            const tagLowerCase = tags[i].tag.toLowerCase()
            if (tagLowerCase.startsWith(searchTerm)) {
              tagBool = true
              break
            }
          }
          return (tagBool) ? { ...link, isHidden: false } : { ...link, isHidden: true }
        })
      })
    }
  }

  const sortByClicks = (e) => {
    setLinks((links) => {
      const sortedLinksArray = [...links].sort((a, b) => b.clickCount - a.clickCount)
      return sortedLinksArray
    })
  }

  const clearFilters = (e) => {
    setLinks((links) => links.map(link => ({ ...link, isHidden: false })))
  }

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.flex}>
        <h1>The Great Linkerator</h1>
        <div className={classes.searchBar}>
          <InputBase onChange={handleSearch} className={classes.searchInput} placeholder="Search URL ..." />
        </div>
        <div className={classes.searchBar}>
          <InputBase onChange={handleTagSearch} className={classes.searchInput} placeholder="Search Tags ..." />
        </div>
        <Button style={{"color": "inherit"}} onClick={sortByClicks}>Sort by Clicks</Button>
        <Button style={{"color": "inherit"}} onClick={clearFilters}>Clear Filters</Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar