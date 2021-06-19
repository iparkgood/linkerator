import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";

import { incrementClickCount } from "../api";

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
        <Typography variant="h4">
          <a
            href={link.url}
            target="_blank"
            onClick={handleCount}
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            {link.url}
          </a>
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {count} clicks since {link.sharedDate}
        </Typography>
        <Typography component="div">
          Tags:
          {link.tags.map((tag) => (
            <Button>{tag}</Button>
          ))}
        </Typography>
        <Typography component="div">Comment: {link.comment}</Typography>
        {/* <div>
          Comments:
          {link.comments.map((com) => (
            <p>{com.comment}</p>
          ))}
        </div> */}
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
