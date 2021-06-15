const linksRouter = require("express").Router();

const { getAllLinks, createLink } = require("../db");

linksRouter.get("/", async (req, res) => {
  const allLinks = await getAllLinks();

  res.send({ allLinks });
});

//post
linksRouter.post("/", async (req, res) => {
  const {} = req.body;

  const updatedLink = await createLink({})
})

//patch

//delete

module.exports = linksRouter;
