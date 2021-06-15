const linksRouter = require("express").Router();

const { getAllLinks, createLink, updateLink, getLinkById } = require("../db");

linksRouter.get("/", async (req, res) => {
  const allLinks = await getAllLinks();

  res.send({ allLinks });
});

//post
linksRouter.post("/", async (req, res) => {
  const { url, tags = "" } = req.body;

  const tagArr = tags.trim().split(/\s+/);
  const linkObj = {};

  if (tagArr.length) {
    linkObj.tags = tagArr;
  }

  try {
    linkObj.url = url;

    const link = await createLink(linkObj);

    res.send({ link });
  } catch (error) {
    console.error(error);
  }
});

//patch
linksRouter.patch("/:linkId", async (req, res) => {
  const { linkId } = req.params;
  const { url, tags } = req.body;

  const updateFields = {};

  if (tags && tags.length > 0) {
    updateFields.tags = tags.trim().split(/\s+/);
  }

  if (url) {
    updateFields.url = url;
  }

  try {
    const updatedLink = await updateLink(linkId, updateFields);

    res.send({ link: updatedLink });
  } catch (error) {
    console.error(error);
  }
});

//delete
linksRouter.delete("/:linkId", async (req, res) => {
  const { linkId } = req.params;

  const deletedLink = await updateLink(linkId, { active: false });

  res.send({ link: deletedLink });
});

module.exports = linksRouter;
