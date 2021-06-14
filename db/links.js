const client = require("./client");

async function getAllLinks() {
  try {
    const { rows: links } = await client.query(/*sql*/ `
      SELECT * FROM links;
    `);

    return links;
  } catch (error) {
    throw error;
  }
}

//I can add tags=[] as a parameter later
async function createLink({ authorId, url, description, tags=[], comments=[] }) {
  try {
    const {
      rows: [link],
    } = await client.query(
      /*sql*/ `
      INSERT INTO links("authorId", url, description)
      VALUES($1, $2)
      RETURNING *;
    `,
      [authorId, url]
    );

    return link;
  } catch (error) {
    throw error;
  }
}

async function updateLink(linkId, fields = {}) {
  try {
  } catch (error) {}
}

async function getLinkByUser(userId) {
  try {
  } catch (error) {}
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

  } catch (error) {
    throw error;
  }
}

async function getLinkByTagName(tagName) {
  try {
  } catch (error) {}
}

module.exports = {
  getAllLinks,
  createLink,
  getLinkById,
};
