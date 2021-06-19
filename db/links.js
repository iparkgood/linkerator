const client = require("./client");
const { getTagsByLinkId } = require("./tags");
const { getCommentsByLinkId } = require("./comments");

async function getAllLinks() {
  try {
    const { rows: linkIds } = await client.query(/*sql*/ `
      SELECT id FROM links;
    `);

    const links = await Promise.all(
      linkIds.map((link) => getLinkById(link.id))
    ); //[{"id":1}, {"id":2}, {"id":3}]

    return links;
  } catch (error) {
    console.log("Error in getAllLinks");
    console.error(error);
  }
}

async function createLink({ url }) {
  try {
    const {
      rows: [link],
    } = await client.query(
      /*sql*/ `
      INSERT INTO links (url)
      VALUES($1)
      RETURNING *;
    `,
      [url]
    );

    return await getLinkById(link.id);
  } catch (error) {
    console.log("Error in createLink");
    console.error(error);
  }
}

async function updateLink(linkId, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, idx) => `"${key}"=$${idx + 1}`)
    .join(", ");

  try {
    await client.query(
      /*sql*/ `
        UPDATE links
        SET ${setString}, "sharedDate"=CURRENT_TIMESTAMP
        WHERE id=${linkId}
        RETURNING *;
      `,
      Object.values(fields)
    );

    await client.query(
      /*sql*/ `
        UPDATE links
        SET "clickCount"=0
        WHERE id=${linkId}
        RETURNING *;
      `,
      Object.values(fields)
    );

    return await getLinkById(linkId);
  } catch (error) {
    console.log("Error in updateLink");
    console.error(error);
  }
}

async function getLinkById(linkId) {
  try {
    const { rows } = await client.query(/*sql*/ `
      SELECT * FROM links WHERE id=${linkId};
    `);

    const link = rows[0];

    if (!link) {
      throw Error(`Link is not found with the ${linkId}`);
    }

    const tags = await getTagsByLinkId(linkId);

    // const comments = await getCommentsByLinkId(linkId);

    if (tags) {
      link.tags = tags;
    }
    // if (comments) {
    //   link.comments = comments;
    // }

    return link;
  } catch (error) {
    console.log("Error in getLinkById");
    console.error(error);
  }
}

async function getLinksByTag(tag) {
  try {
    const { rows: linkIds } = await client.query(
      /*sql*/ `
      SELECT links.id
      FROM links
      JOIN link_tags ON links.id=link_tags."linkId"
      JOIN tags ON tags.id=link_tags."tagId"
      WHERE tags.tag=$1;
    `,
      [tag]
    );

    return await Promise.all(linkIds.map((link) => getLinkById(link.id)));
  } catch (error) {
    console.log("Error in getLinkByTag");
    console.error(error);
  }
}

async function updateClickCount(linkId) {
  const { rows } = await client.query(
    /*sql*/ `
    UPDATE links SET "clickCount"="clickCount"+1
    WHERE id=$1
    RETURNING *;
  `,
    [linkId]
  );

  const result = rows[0];

  return result;
}

module.exports = {
  getAllLinks,
  createLink,
  getLinkById,
  updateClickCount,
  getLinksByTag,
  updateLink,
  updateClickCount,
};
