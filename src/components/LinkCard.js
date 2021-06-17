import React, { useState, useEffect } from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';

const LinkCard = ({ link }) => {
  console.log(link)
  return (
    <Card>
      <CardContent key={link.id}>
        <Typography variant='h3'>
          {link.url}
        </Typography>
        <Typography variant='subtitle1'>
          Date Shared: {link.sharedDate}
        </Typography>
        <p>Click Count: {link.clickCount}</p>
        <div>Comments:
          {link.comments.map(com => <p>{com.comment}</p>)}
        </div>
      </CardContent>
      <CardActions>
        <Button>Delete</Button>
      </CardActions>
    </Card>
  )
}

export default LinkCard;