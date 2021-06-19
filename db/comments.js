const client = require("./client");

async function getAllComments() {
  try {
    const { rows: comments } = await client.query(`
      SELECT * FROM comments;
    `)
    return comments
  } catch (error) {
    console.log("Error from getAllComments")
    console.dir(error)
  }
}

async function createComment(comment, linkId) {
  try {
    const { rows: newComment } = await client.query(`
      INSERT INTO comments(comment, "linkId")
      VALUES ($1, $2)
      RETURNING *;
    `, [comment, linkId])
    return newComment
  } catch (error) {
    console.log("Error from createComment")
    console.dir(error)
  }
}

async function getCommentsByLinkId(linkId) {
  try {
    const { rows: comments } = await client.query(`
      SELECT * FROM comments
      WHERE "linkId"=$1;
    `, [linkId])
    return comments
  } catch (error) {
    console.log("Error from getCommentsByLinkId")
    console.dir(error)
  }
}

module.exports = {
  getAllComments,
  createComment,
  getCommentsByLinkId
};
