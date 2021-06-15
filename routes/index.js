const apiRouter = require("express").Router();

const linksRouter = require("./links")

apiRouter.use("/links", linksRouter)

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

apiRouter.use("/links", require("./links"));
apiRouter.use("/tags", require("./tags"));

module.exports = apiRouter;
