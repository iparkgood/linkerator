const linksRouter = require("express").Router();

const { getAllLinks } = require("../db");

linksRouter.get("/", async (req, res, next) => {
  try {
    const allLinks = await getAllLinks();

    res.send({ allLinks });
  } catch (error) {
    console.log("Issues sending all links")
    next(error)
  }
});

module.exports = linksRouter;
