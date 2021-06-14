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

async function createComment({ comment, authorId, linkId }) {
  try {
    //Do we need to also add a row to parent_child_comments or will that 
    //get updated automaticly on row insertion here?

    const { rows: newComment } = await client.query(`
      INSERT INTO comments(comment, "authorId", "linkId")
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [comment, authorId, linkId])
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

async function createParentChildComment(parentId, childId) {
  try {
    //Might need to consider a check to see if this is a new comment thread
    //If it is its the parent otherwise its the child
    
  } catch (error) {
    console.log("Error from createParentChildComment")
    console.dir(error)
  }
}

async function addChildToParent(parentId, childComments) {
  try {

  } catch (error) {
    console.log("Error from addChildToParent")
    console.dir(error)
  }
}

module.exports = {
  getAllComments,
  createComment,
  getCommentsByLinkId,
  createParentChildComment,
  addChildToParent
};
