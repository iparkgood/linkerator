const client = require("./client");

const { createLink } = require("./index");

const createInitialLinks = async () => {
  try {
    console.log("Creating Links");

    await createLink({ url: "https://github.com/" });
    await createLink({ url: "https://www.google.com/" });
    await createLink({ url: "https://slack.com/" });

    console.log("Finished creating links");
  } catch (error) {
    console.log("Trouble creating new Links");
    console.dir(error);
  }
};

module.exports = { createInitialLinks };
