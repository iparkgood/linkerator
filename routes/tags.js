const tagsRouter = require("express").Router();
const {
  getAllTags,
  getTagsByLinkId,
  createTag,
  getLinksByTag,
} = require("../db");

//get all tags
// tagsRouter.get("/", async (req, res) => {
//   const allTags = await getAllTags();

//   res.send(allTags);
// });

//get tags by LinkId
// tagsRouter.get("/:linkId", async (req, res) => {
//   const { linkId } = req.params;
//   const allTags = await getTagsByLinkId(linkId);

//   res.send(allTags);
// });

//get links by tag
// tagsRouter.get("/:tag/links", async (req, res) => {
//   const { tag } = req.params;
//   const links = await getLinksByTag(tag);

//   res.send(links);
// });

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
