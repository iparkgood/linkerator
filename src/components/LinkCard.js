import React, { useState } from "react";

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  IconButton,
  Link,
  TextField,
  makeStyles,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SendIcon from "@material-ui/icons/Send";

import { AddTag, ModalForm } from "./index";

import { incrementClickCount, createComment, destroyLink } from "../api";

const useStyles = makeStyles({
  tagButton: {
    marginLeft: "6px",
    marginRight: "6px",
    padding: 0,
    borderRadius: "12px",
  },
});

const LinkCard = ({ link, setLinks }) => {
  // console.log(link.comment);
  const classes = useStyles();

  const [count, setCount] = useState(link.clickCount);
  const [tagOpen, setTagOpen] = useState(false);
  const [tags, setTags] = useState(link.tags);
  const [modalOpen, setModalOpen] = useState(false);

  const [addCommentBool, setAddCommentBool] = useState(false);
  const [comment, setComment] = useState("");

  const openCommentField = () => setAddCommentBool(true);

  const closeCommentField = () => {
    setComment("");
    setAddCommentBool(false);
  };

  const handleCommentChange = (e) => setComment(e.target.value);

  const submitComment = async (e) => {
    try {
      await createComment(link.id, comment);

      setLinks((links) => {
        return links.map((el) => {
          return el.id === link.id
            ? { ...el, comments: [...el.comments, { comment: comment }] }
            : el;
        });
      });
      setComment("");
      setAddCommentBool();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCount = async () => {
    const result = await incrementClickCount(link.id);

    setCount(result.clickCount);
  };

  const handleTagOpen = () => {
    setTagOpen(!tagOpen);
  };

  const handleDelete = async () => {
    const result = await destroyLink(link.id);

    setLinks((currentLinks) => {
      return currentLinks.filter((cl) => result.id !== cl.id);
    });
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
          {tags.map((tag) => (
            <Button variant="contained" key={tag.id} className={classes.tagButton}>
              {tag.tag}
            </Button>
          ))}
          <IconButton onClick={handleTagOpen}>
            <AddIcon color="secondary" fontSize="small" />
          </IconButton>
        </Typography>
        {tagOpen && (
          <AddTag setTags={setTags} linkId={link.id} setTagOpen={setTagOpen} />
        )}

        <Typography component="div">
          Comment:
          <IconButton onClick={openCommentField}>
            <AddIcon color="secondary" fontSize="small" />
          </IconButton>
        </Typography>
        {addCommentBool && (
          <>
            <TextField
              onChange={handleCommentChange}
              placeholder="Add Comment"
            />
            <Button onClick={closeCommentField}>X</Button>
            <Button color="secondary" onClick={submitComment}>
              <SendIcon />
            </Button>
          </>
        )}
        <ul style={{ listStylePosition: "inside" }}>
          {link.comments.length > 0 &&
            link.comments.map((com) => {
              return <li key={com.id}>{com.comment}</li>;
            })}
        </ul>
      </CardContent>

      <CardActions>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => setModalOpen(true)}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </CardActions>

      <ModalForm {...{ modalOpen, setModalOpen, link }} />
    </Card>
  );
};

export default LinkCard;
