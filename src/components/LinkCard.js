import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  IconButton,
  Link,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { AddTagComment } from "./index";

import { incrementClickCount } from "../api";

const LinkCard = ({ link }) => {
  // console.log(link);

  const [count, setCount] = useState(link.clickCount);
  const [tagOpen, setTagOpen] = useState(false);
  const [tags, setTags] = useState(link.tags);

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
          Comment: {link.comment}
          <IconButton>
            <AddIcon color="secondary" fontSize="small" />
          </IconButton>
        </Typography>
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
