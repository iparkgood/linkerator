const client = require("./client");
const { createTags, createLinkTag } = require("./tags");

async function getAllLinks() {
  try {
    const { rows: linkIds } = await client.query(/*sql*/ `
      SELECT id FROM links;
    `);

    const links = await Promise.all(
      linkIds.map((linkId) => getLinkById(linkId))
    );

    return links;
  } catch (error) {
    console.log("Error in getAllLinks");
    console.error(error);
  }
}

async function createLink({ url, tags = [] }) {
  try {
    const {
      rows: [link],
    } = await client.query(
      /*sql*/ `
      INSERT INTO links(url)
      VALUES($1)
      RETURNING *;
    `,
      [url]
    );

    const tagList = await createTags(tags);
    tagList.map((tag) => await createLinkTag(linkId, tag.id));

    return await getLinkbyId(link.id);
  } catch (error) {
    console.log("Error in createLink");
    console.error(error);
  }
}

async function updateLink(linkId, fields = {}) {
  const { tags } = fields;
  delete fields.tags;

  const setString = Object.keys(fields)
    .map((key, idx) => `"${key}"=$${idx + 1}`)
    .join(", ");
  //"key"=$1

  try {
    if (setString.length > 0) {
      await client.query(
        /*sql*/ `
        UPDATE links
        SET ${setString}
        WHERE id=${linkId}
        RETURNING *;
      `,
        Object.values(fields)
      );
    }

    if (tags === undefined) {
      return await getLinkById(linkId);
    }

    const tagList = await createTags(tags);
    const tagListIdString = tagList.map((tag) => `${tag.id}`).join(", ");

    await client.query(
      /*sql*/ `
      DELETE FROM link_tags
      WHERE "tagId"
      NOT IN (${tagListIdString})
      AND "linkId"=$1;
    `,
      [linkId]
    );

    tagList.map((tag) => await createLinkTag(linkId, tag.id));

    return await getLinkById(linkId);
  } catch (error) {
    console.log("Error in updateLink");
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

    link.tags = tags;
    // link.comments = comments;

    return link;
  } catch (error) {
    console.log("Error in getLinkById");
    console.error(error);
  }
}

async function getLinkByTag(tag) {
  try {
    const { rows: linkIds } = await client.query(
      /*sql*/ `
      SELECT links.id
      FROM links
      JOIN link_tags ON links.id=links_tags."linkId"
      jOIN tags ON tags.id=link_tags."tagId"
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
  await client.query(
    /*sql*/ `
    UPDATE links SET "clickCount"="clickCount"+1
    WHERE id=$1
    RETURNING *;
  `,
    [linkId]
  );
}

module.exports = {
  getAllLinks,
  createLink,
  getLinkById,
  updateClickCount,
  getLinkByTag,
  updateLink,
};
