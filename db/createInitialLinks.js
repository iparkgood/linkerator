const client = require("./client");

const { createLink } = require("./index");

const createInitialLinks = async () => {
  try {
    console.log("Creating Links");
    await createLink("https://github.com/")
    await createLink("https://www.google.com/")
    const link = await createLink("https://slack.com/")
    console.log("link", link)

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
