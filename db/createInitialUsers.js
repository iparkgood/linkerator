const client = require('./client')

const createInitialUsers = async () => {
  try {
    console.log("Creating Users")
    await client.query(`
      INSERT INTO users(username, password)
      VALUES ($1, $2);
    `, ['knj11', 'boblovesburgers'])
    await client.query(`
      INSERT INTO users(username, password)
      VALUES ($1, $2);
    `, ['joe23', 'passwords!'])
    await client.query(`
      INSERT INTO users(username, password)
      VALUES ($1, $2);
    `, ['leo123', 'catsanddogs'])
    console.log("Finished creating users")
  } catch (error) {
    console.log("Trouble creating new users")
    console.dir(error)
  }
}

module.exports = { createInitialUsers }