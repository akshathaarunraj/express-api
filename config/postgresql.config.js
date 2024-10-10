// db.js
const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres", // replace with your PostgreSQL username
  password: "postgres", // replace with your PostgreSQL password
  database: "movies_db", // your database name
  port: 5432, // default PostgreSQL port
});

module.exports = pool;