const client = require("./client");

async function getAllLinks() {
  try {
    const { rows: links } = await client.query(/*sql*/ `
      SELECT * FROM links;
    `);

    //I will change to only retrieve linkIds
    //map over to linkIds and use getLinkById to return links
    //including tags, and comments

    return links;
  } catch (error) {
    console.log("Error in getAllLinks");
    console.error(error);
  }
}

//I can add tags=[] as a parameter later
async function createLink(url) {
  try {
    const {
      rows: [link],
    } = await client.query(/*sql*/ `
      INSERT INTO links(url)
      VALUES($1)
      RETURNING *;
    `,
      [url]
    );

    //tags = createTags
    //addTagsToLink --> instead tags.map((tag) => createLinkTag(link.id, tag.id))

    //return await getLinkbyId(link.id)

    return link;
  } catch (error) {
    console.log("Error in createLink");
    console.error(error);
  }
}

async function updateLink(linkId, fields = {}) {
  try {
  } catch (error) {
    console.log("Error in updateLink");
    console.error(error);
  }
}

async function getLinksByUser(userId) {
  try {
    const { rows: links } = await client.query(
      /*sql*/ `
      SELECT * FROM links WHERE "authorId"=$1
    `,
      [userId]
    );

    //I will change to only retrieve linkIds
    //map over to linkIds and use getLinkById to return links
    //including tags, and comments

    return links;
  } catch (error) {
    console.log("Error in getLinksByUser");
    console.error(error);
  }
}

async function getLinkById(linkId) {
  try {
    const {
      rows: [link],
    } = await client.query(
      /*sql*/ `
      SELECT * FROM links WHERE id=$1;
    `,
      [linkId]
    );

    if (!link) {
      throw Error(`Link is not found with the ${linkId}`);
    }

    const { rows: tags } = await client.query(
      /*sql*/ `
      SELECT t.* FROM tags AS t 
      JOIN link_tags AS lt 
      ON lt.tagId = t.id 
      WHERE lt.linkId=$1;
    `,
      [linkId]
    );

    // const { rows: comments } = await getCommentsByLinkId(linkId)

    const {
      rows: [author],
    } = await client.query(/*sql*/ `
      SELECT * FROM users WHERE id=link.authorId;
    `);

    link.tags = tags;
    link.author = author;
    // link.comments = comments;

    delete link.authorId;

    return link;
  } catch (error) {
    console.log("Error in getLinkById");
    console.error(error);
  }
}

async function getLinkByTag(tag) {
  try {
  } catch (error) {
    console.log("Error in getLinkByTag");
    console.error(error);
  }
}

module.exports = {
  getAllLinks,
  createLink,
  getLinkById,
};
