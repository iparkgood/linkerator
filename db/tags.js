const client = require("./client");

async function getAllTags() {
  try {
    const { rows: tags } = client.query(/*sql*/ `
      SELECT * FROM tags;
    `);

    return tags;
  } catch (error) {
    console.log("Error in getAllTags");
    console.error(error);
  }
}

async function createTag(linkId, tag) {
  try {
    await client.query(/*sql*/ `
      INSERT INTO tags(tag)
      VALUES ($1) 
      ON CONFLICT (tag) DO NOTHING;
    `,
      [tag]
    ); //create a new tag in tags table

    const { rows: newTag } = await client.query(
      /*sql*/ `
      SELECT * FROM tags
      WHERE tag
      IN ($1);
    `,
      [tag]
    ); //select all from tags about the new tag

    await createLinkTag(linkId, newTag.id);
    //create a new row in link_tags table

    return newTag;
  } catch (error) {
    console.log("Error in createTags");
    console.error(error);
  }
}

async function createLinkTag(linkId, tagId) {
  try {
    await client.query(
      /*sql*/ `
      INSERT INTO link_tags("linkId", "tagId")
      VALUES ($1, $2)
      ON CONFLICT ("linkId", "tagId") DO NOTHING;
    `,
      [linkId, tagId]
    );
  } catch (error) {
    console.log("Error in createLinkTag");
    console.error(error);
  }
}

async function getTagsByLinkId(linkId) {
  try {
    const { rows: tags } = await client.query(
      /*sql*/ `
      SELECT tags.* FROM tags 
      JOIN link_tags ON link_tags."tagId"=tags.id 
      WHERE link_tags."linkId"=$1; 
    `,
      [linkId]
    );

    return tags;
  } catch (error) {
    console.log("Error in getTagsByLinkId");
    console.error(error);
  }
}

module.exports = {
  getAllTags,
  createTag,
  createLinkTag,
  getTagsByLinkId
};
