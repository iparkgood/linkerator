// Connect to DB
const { Client } = require('pg');
const DB_CLIENT_STRING = 'linkerator-dev'
const DB_URL = process.env.DATABASE_URL || `postgres://${ DB_CLIENT_STRING }`;
const client = new Client(DB_URL);

// database methods

// export
module.exports = {
  client,
  // db methods
}