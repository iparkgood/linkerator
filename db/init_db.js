// code to build and initialize DB goes here
const client = require("./client");
const { createInitialLinks } = require("./createInitialLinks");

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    // drop the most specific table first
    await client.query(/*sql*/ `
      DROP TABLE IF EXISTS link_tags;
      DROP TABLE IF EXISTS tags;
      DROP TABLE IF EXISTS comments;
      DROP TABLE IF EXISTS links;
    `);

    // build tables in correct order
    // create the least specific table first
    console.log("createing tables");
    await client.query(/*sql*/ `
      CREATE TABLE links (
        id SERIAL PRIMARY KEY,
        url varchar(255) UNIQUE NOT NULL,
        "clickCount" INTEGER DEFAULT 0,
        "sharedDate" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE tags(
        id SERIAL PRIMARY KEY,
        tag varchar(255) UNIQUE NOT NULL
      );
      CREATE TABLE link_tags(
        "linkId" INTEGER REFERENCES links(id),
        "tagId" INTEGER REFERENCES tags(id),
        UNIQUE ("linkId", "tagId")
      );
      CREATE TABLE comments(
        id SERIAL PRIMARY KEY,
        comment TEXT,
        "createdDate" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        "linkId" INTEGER REFERENCES links(id)
      );
    `);
  } catch (error) {
    console.log("error creating tables");
    throw error;
  }
}

async function populateInitialData() {
  try {
    await createInitialLinks();
  
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
