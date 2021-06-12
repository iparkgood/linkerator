const client = require('./client')

const { getAllUsers } = require("./index")

const createInitialLinks = async () => {
  try {
    const users = await getAllUsers()
    console.log("Creating Links")
    await client.query(`
      INSERT INTO links("authorId", url)
      VALUES ($1, $2);
    `, [users[0].id, 'https://github.com/'])
    await client.query(`
      INSERT INTO links("authorId", url)
      VALUES ($1, $2);
    `, [users[1].id, 'https://www.google.com/'])
    await client.query(`
      INSERT INTO links("authorId", url)
      VALUES ($1, $2);
    `, [users[2].id, 'https://slack.com/'])
    
    console.log("Finished creating links")
  } catch (error) {
    console.log("Trouble creating new Links")
    console.dir(error)
  }
}

module.exports = { createInitialLinks }