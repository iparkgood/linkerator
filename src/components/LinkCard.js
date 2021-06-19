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
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { AddTagComment, ModalForm } from "./index";

import { incrementClickCount } from "../api";
import { incrementClickCount, createComment } from "../api";

const LinkCard = ({ link, setLinks }) => {
  console.log(link.comment);

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
      setAddCommentBool(false);
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
            <Button key={tag.id}>{tag.tag}</Button>
          ))}
          <IconButton onClick={handleTagOpen}>
            <AddIcon color="secondary" fontSize="small" />
          </IconButton>
        </Typography>
        {tagOpen && (
          <AddTagComment
            setTags={setTags}
            linkId={link.id}
            setTagOpen={setTagOpen}
          />
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
              placeholder="Add comment here ..."
            />
            <Button onClick={closeCommentField}>X</Button>
            <Button onClick={submitComment}>SEND</Button>
          </>
        )}
        <ul>
          {link.comments.length > 0 &&
            link.comments.map((com) => {
              return <li>{com.comment}</li>;
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
        <Button variant="outlined" color="secondary" size="small">
          Delete
        </Button>
      </CardActions>

      <ModalForm {...{ modalOpen, setModalOpen, link }} />
    </Card>
  );
};

export default LinkCard;
