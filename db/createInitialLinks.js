const client = require("./client");

const { getAllUsers } = require("./index");
const { createLink } = require("./links");

const createInitialLinks = async () => {
  try {
    const users = await getAllUsers();
    console.log("Creating Links");
    await client.query(
      `
      INSERT INTO links("authorId", url)
      VALUES ($1, $2);
    `,
      [users[0].id, "https://github.com/"]
    );
    await client.query(
      `
      INSERT INTO links("authorId", url)
      VALUES ($1, $2);
    `,
      [users[1].id, "https://www.google.com/"]
    );
    await client.query(
      `
      INSERT INTO links("authorId", url)
      VALUES ($1, $2);
    `,
      [users[2].id, "https://slack.com/"]
    );

    //createLink({ authorId, url, tags=[], comments=[] })
    // await createLink({
    //   authorId: users[0].id,
    //   url: "https://github.com/",
    //   tags: ["#javascript", "#developer"]
    // });

    // await createLink({
    //   authorId: users[1].id,
    //   url: "https://www.google.com/",
    //   tags: ["#search", "#google"]
    // });

    // await createLink({
    //   authorId: users[2].id,
    //   url: "https://slack.com/",
    //   tags: ["#developer", "#communication"]
    // });

    console.log("Finished creating links");
  } catch (error) {
    console.log("Trouble creating new Links");
    console.dir(error);
  }
};

module.exports = { createInitialLinks };
