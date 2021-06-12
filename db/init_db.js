// code to build and initialize DB goes here
const client = require("./client");

const {
  // other db methods
} = require("./index");

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    // drop the most specific table first
    await client.query(/*sql*/ `
      DROP TABLE IF EXISTS link_tags;
      DROP TABLE IF EXISTS tags;
      DROP TABLE IF EXISTS parent_child_comments;
      DROP TABLE IF EXISTS comments;
      DROP TABLE IF EXISTS links;
      DROP TABLE IF EXISTS users;
    `);

    // build tables in correct order
    // create the least specific table first
    await client.query(/*sql*/ `
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL,
        active boolean DEFAULT true
      );
      CREATE TABLE links (
        id SERIAL PRIMARY KEY,
        "authorId" INTEGER REFERENCES users(id),
        url varchar(255) UNIQUE NOT NULL,
        "clickCount" INTEGER DEFAULT 0,
        "sharedDate" DATE NOT NULL, 
        active boolean DEFAULT true,
      );
      CREATE TABLE tags(
        id SERIAL PRIMARY KEY,
        tag varchar(255) UNIQUE NOT NULL
      );
      CREATE TABLE link_tags(
        "linkId" INTEGER REFERENCES links(id),
        "tagId" INTEGER REFERENCES tags(id),
        UNIQUE ("postId", "tagId")
      );
      CREATE TABLE comments(
        id SERIAL PRIMARY KEY,
        comment TEXT,
        "createdDate" DATE NOT NULL,
        "authorId" INTEGER REFERENCES users(id),
        "linkId" INTEGER REFERENCES links(id),
      );
      CREATE TABLE parent_child_comments(
        "parentId" INTEGER REFERENCES comments(id),
        "childId" INTEGER REFERENCES comments(id),
        UNIQUE ("postId", "tagId")
      );
    `);
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());