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

import { incrementClickCount, createNewTag } from "../api";

const LinkCard = ({ link }) => {
  // console.log(link);

  const [count, setCount] = useState(link.clickCount);

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
