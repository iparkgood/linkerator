import React, { useState } from "react";

import { TextField, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

import { createNewTag } from "../api";

const AddTag = ({ setTags, linkId, setTagOpen }) => {
  const [newTag, setNewTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCreateNewTag = async () => {
    const result = await createNewTag(linkId, newTag);

    setTags((currentTags) => [...currentTags, result]);
    setTagOpen((currentOpen) => !currentOpen);
    setNewTag("");
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        label="Add Tag"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
      />
      <IconButton color="secondary" onClick={handleCreateNewTag}>
        <SendIcon />
      </IconButton>
    </form>
  );
};

export default AddTag;
