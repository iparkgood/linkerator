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
    <Card>
      <CardContent key={link.id}>
        <Typography variant="h3">
          <a
            href={link.url}
            target="_blank"
            onClick={handleCount}
            rel="noopener noreferrer"
          >
            {link.url}
          </a>
        </Typography>
        <Typography variant="subtitle1">
          Date Shared: {link.sharedDate}
        </Typography>
        <p>Click Count: {count}</p>
        <p>Comment: {link.comment}</p>
        {/* <div>
          Comments:
          {link.comments.map((com) => (
            <p>{com.comment}</p>
          ))}
        </div> */}
      </CardContent>
      <CardActions>
        <Button>Delete</Button>
      </CardActions>
    </Card>
  );
};

export default LinkCard;
