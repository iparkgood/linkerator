const client = require("./client");

async function getAllLinks() {
  try {
    const { rows } = await client.query(/*sql*/ `
      SELECT * FROM links;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

//I can add tags=[] as a parameter later
async function createLink({ authorId, url }) {
  try {
    const { rows } = await client.query(
      /*sql*/ `
      INSERT INTO links("authorId", url)
      VALUES($1, $2)
      RETURNING *;
    `,
      [authorId, url]
    );

    return rows;
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
  } catch (error) {}
}

async function getLinkByTagName(tagName) {
  try {
  } catch (error) {}
}

module.exports = {
  getAllLinks,
  createLink,
};
