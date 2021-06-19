import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  IconButton,
  Link,
  TextField
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { incrementClickCount, createNewTag, createComment } from "../api";
import { LinkSharp } from "@material-ui/icons";

const LinkCard = ({ link, setLinks }) => {
  console.log(link.comment);

  const [count, setCount] = useState(link.clickCount);
  const [addCommentBool, setAddCommentBool] = useState(false)
  const [comment, setComment] = useState('')

  const openCommentField = () => setAddCommentBool(true)
  const closeCommentField = () => {
    setComment('')
    setAddCommentBool(false)
  }
  const handleCommentChange = (e) => setComment(e.target.value)
  const submitComment = async (e) => {
    try {
      await createComment(link.id, comment)
      setLinks((links) => {
        return links.map(el => {
          return (el.id === link.id) ? ({...el, comments: [...el.comments, {comment: comment}]}) : el
        })
      })
      setComment('')
      setAddCommentBool(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleCount = async () => {
    const result = await incrementClickCount(link.id);

    setCount(result.clickCount);
  };

  return (
    <Card elevation={2}>
      <CardContent key={link.id}>
        <Link
          href={link.url}
          target="_blank"
          onClick={handleCount}
          rel="noopener noreferrer"
          variant="h4"
        >
          {link.url}
        </Link>

        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {count} clicks since {link.sharedDate}
        </Typography>

        <Typography component="div">
          Tags:
          {link.tags.map((tag) => (
            <Button>{tag}</Button>
          ))}
          <IconButton>
            <AddIcon color="secondary" fontSize="small" />
          </IconButton>
        </Typography>

        <Typography component="div">
          Comment: 
          <IconButton onClick={openCommentField}>
            <AddIcon color="secondary" fontSize="small" />
          </IconButton>
        </Typography>
        {(addCommentBool) && 
          <>
            <TextField onChange={handleCommentChange} placeholder="Add comment here ..." />
            <Button onClick={closeCommentField}>X</Button>
            <Button onClick={submitComment}>SEND</Button>
          </>
        }
        <ul>
            {(link.comments.length > 0) && link.comments.map(com => {
              return (
                <li>{com.comment}</li>
              )
            })}
          </ul>
      </CardContent>

      <CardActions>
        <Button variant="outlined" color="secondary" size="small">
          Edit
        </Button>
        <Button variant="outlined" color="secondary" size="small">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default LinkCard;
