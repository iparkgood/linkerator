const apiRouter = require("express").Router();

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

apiRouter.use("/links", require("./links"));
apiRouter.use("/tags", require("./tags"));
apiRouter.use("/comments", require("./comments"));

module.exports = apiRouter;
