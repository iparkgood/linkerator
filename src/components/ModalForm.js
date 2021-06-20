import React, { useState } from "react";
import Modal from "react-modal";

import { TextField, ButtonGroup, makeStyles, Button } from "@material-ui/core";

import { patchLink } from "../api";

const useStyles = makeStyles({
  flex: {
    display: "flex",
    flexDirection: "column",
  },
});

Modal.setAppElement("#root");

const ModalForm = ({ modalOpen, setModalOpen, link, setLinks, setCount }) => {
  const classes = useStyles();

  const [updateURL, setURL] = useState(link.url);

  const handleUpdate = async () => {
    const result = await patchLink(link.id, updateURL);

    setModalOpen(false);

    setLinks((currentLinks) => {
      const nonupdatedLinks = currentLinks.filter((cl) => cl.id !== result.id);

      return [...nonupdatedLinks, result];
    });

    setCount(result.clickCount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Modal
      isOpen={modalOpen}
      style={{
        overlay: {
          backdropFilter: "blur(6px)",
        },
        content: {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "480px",
          height: "fit-content",
        },
      }}
    >
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        className={classes.flex}
      >
        <TextField
          label="Enter URL"
          value={updateURL}
          onChange={(e) => setURL(e.target.value)}
          fullWidth
        />

        <ButtonGroup
          variant="contained"
          color="secondary"
          style={{ marginTop: "24px" }}
          fullWidth
        >
          <Button onClick={handleUpdate}>Update</Button>
          <Button onClick={() => setModalOpen(false)}>Close</Button>
        </ButtonGroup>
      </form>
    </Modal>
  );
};

export default ModalForm;
