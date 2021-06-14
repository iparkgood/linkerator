const client = require("./client");

// const { getLinkById } = require("./links");

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

async function createTags(tagList) {
  if (tagList.length === 0) {
    return;
  }

  const insertValues = tagList.map((_, index) => `$${index + 1}`).join("), (");
  const selectValues = tagList.map((_, index) => `$${index + 1}`).join(", ");

  try {
    await client.query(
      /*sql*/ `
      INSERT INTO tags(tag)
      VALUES (${insertValues}) 
      ON CONFLICT (tag) DO NOTHING;
    `,
      tagList
    );

    const { rows: tags } = await client.query(
      /*sql*/ `
      SELECT * FROM tags
      WHERE tag
      IN (${selectValues});
    `,
      tagList
    );

    return tags;
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

// async function addTagToLink(linkId, tagList) {
//   try {
//     const createPostTagPromises = tagList.map((tag) =>
//       createLinkTag(linkId, tag.id)
//     );

//     await Promise.all(createPostTagPromises);

//     return await getLinkById(linkId);
//   } catch (error) {
//     console.log("Error in addTagToLink");
//     console.error(error);
//   }
// }

module.exports = {
  getAllTags,
  createTags,
  createLinkTag,
  addTagToLink,
};
