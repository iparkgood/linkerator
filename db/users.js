<<<<<<< HEAD
const client = require("./client");

async function getAllUsers() {
  try {
  } catch (error) {}
}

async function createUser({ username, password }) {
  try {
  } catch (error) {}
}

async function updateUser(userId, fields = {}) {
  try {
  } catch (error) {}
}

async function getUserById(userId) {
  try {
  } catch (error) {}
}

async function getUserByUsername(username) {
  try {
  } catch (error) {}
}

module.exports = {};
=======
const client = require("./client");

async function getAllUsers() {
  try {
    const { rows: users } = await client.query(`
      SELECT * FROM users;
    `)
    console.log('users', users)
    return users
  } catch (error) { }
}

async function createUser({ username, password }) {
  try {
  } catch (error) { }
}

async function updateUser(userId, fields = {}) {
  try {
  } catch (error) { }
}

async function getUserById(userId) {
  try {
  } catch (error) { }
}

async function getUserByUsername(username) {
  try {
  } catch (error) { }
}

module.exports = {
  getAllUsers
};
>>>>>>> master
