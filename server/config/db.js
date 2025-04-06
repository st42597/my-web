const { Pool } = require("pg");

const pool = new Pool({
  user: "sh",
  host: "db",
  database: "mydb",
  password: "1234",
  port: 5432,
});

module.exports = pool;
