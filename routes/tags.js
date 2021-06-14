const tagsRouter = require("express").Router();
const { getAllTags } = require("../db");

tagsRouter.get("/", async (req, res) => {
  const allTags = await getAllTags();

  res.send({ allTags });
});

module.exports = tagsRouter;
