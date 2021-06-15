const linksRouter = require("express").Router();

const { getAllLinks, createLink, updateLink } = require("../db");

linksRouter.get("/", async (req, res, next) => {
  try {
    const allLinks = await getAllLinks();

  res.send(allLinks);
});

//post
linksRouter.post("/", async (req, res) => {
  const { url } = req.body;

  try {
    const newLink = await createLink({ url });

    res.send(newLink);
  } catch (error) {
    console.error(error);
  }
});

//patch
linksRouter.patch("/:linkId", async (req, res) => {
  const { linkId } = req.params;
  const { url } = req.body;

  try {
    const updatedLink = await updateLink(linkId, { url: url });

    res.send(updatedLink);
  } catch (error) {
    console.error(error);
  }
});

//delete
linksRouter.delete("/:linkId", async (req, res) => {
  const { linkId } = req.params;

  const deletedLink = await updateLink(linkId, { active: false });

  res.send(deletedLink);
});

module.exports = linksRouter;
