const linksRouter = require("express").Router();

const { getAllLinks } = require("../db");

linksRouter.get("/", async (req, res) => {
  const allLinks = await getAllLinks();

  res.send({ allLinks });
});

module.exports = linksRouter;
