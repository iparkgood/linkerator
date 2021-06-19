const commentRouter = require("express").Router();

const { createComment } = require("../db")

commentRouter.post('/', async (req, res, next) => {
  try {
    const {linkId, comment} = req.body
    const dbResponse = await createComment(comment, linkId)
    res.send(dbResponse)
  } catch (error) {
    console.log(error)
    next(error)
  }
})



module.exports = commentRouter;