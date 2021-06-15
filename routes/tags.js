const tagsRouter = require("express").Router();
const { getAllTags } = require("../db");
const { getTagsByLinkId, createTag } = require("../db/tags");

//get
tagsRouter.get("/", async (req, res) => {
  const allTags = await getAllTags();

  res.send(allTags);
});

tagsRouter.get("/:linkId", async (req, res) => {
  const { linkId } = req.params;
  const allTags = await getTagsByLinkId(linkId);

  res.send(allTags);
});

tagsRouter.get("/:tag/links", async (req, res) => {
  
});

//post
tagsRouter.post("/:linkId", async (req, res) => {
  const { linkId } = req.params;
  const { tag } = req.body;
  const newTag = await createTag(linkId, tag);

  res.send(newTag);
});

//delete
tagsRouter.delete("/:linkId", async (req, res) => {});

module.exports = tagsRouter;
