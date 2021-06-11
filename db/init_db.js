// code to build and initialize DB goes here
const {
  client,
  // other db methods
} = require("./index");

const createInitialUsers = require('./createInitialUsers')

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    await client.query(`
      DROP TABLE IF EXISTS link_tags;
      DROP TABLE IF EXISTS tags;
      DROP TABLE IF EXISTS links;
      DROP TABLE IF EXISTS users;
    `);

    // build tables in correct order
    await client.query(`
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
        comment TEXT NOT NULL,
        "clickCount" INTEGER DEFAULT 0,
        "shareDate" DATE NOT NULL, 
        active boolean DEFAULT true,
        "commentId "INTEGER REFERENCES users(id)
      );
      CREATE TABLE tags(
        id SERIAL PRIMARY KEY,
        tag varchar(255) UNIQUE NOT NULL
      );
      CREATE TABLE link_tags(
        "linkId" INTEGER REFERENCES link(id),
        "tagId" INTEGER REFERENCES tags(id),
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
    await createInitialUsers()


  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
