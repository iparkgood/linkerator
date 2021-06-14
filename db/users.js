const client = require("./client");

const _getSetString = (fields) => {
  return Object.keys(fields).map(
    (key, index) => `"${key}"=$${index + 1}`
  ).join(', ');
}

async function getAllUsers() {
  try {
    const { rows: users } = await client.query(`
      SELECT * FROM users;
    `)
    
    return users
  } catch (error) {
    console.log("Error in getAllUsers")
    console.log(error)
  }
}

async function createUser({ username, password }) {
  try {
    const { rows: user } = await client.query(`
    INSERT INTO users(username, password)
    VALUES ($1, $2)
    RETURNING (id, username, active);
    `, [username, password])
    return user
  } catch (error) {
    console.log("Error in createUser")
    console.log(error)
  }
}

async function updateUser(userId, fields = {}) {
  const setString = _getSetString(fields)

  try {
    const { rows: updateUser } = await client.query(`
      UPDATE users
      SET ${setString}
      WHERE id=${userId}
      RETURNING (id, username, active);
    `, Object.values(fields))
    return updateUser
  } catch (error) {
    console.log("Error in updateUser")
    console.log(error)
  }
}

async function getUserById(userId) {
  try {
    const { rows: user } = await client.query(`
      SELECT id, username, active
      FROM users
      WHERE id=${userId};
    `)
    return user
  } catch (error) {
    console.log("Error in getUserById")
    console.log(error)
  }
}

async function getUserByUsername(username) {
  try {
    const { rows: user } = await client.query(`
      SELECT id, username, active
      FROM users
      WHERE username=${username};
    `)
    return user
  } catch (error) {
    console.log("Error in getUserByUsername")
    console.log(error)
  }
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  getUserById,
  getUserByUsername
};
