const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
require("dotenv").config();

const app = express();
const port = 5000;

const pool = new Pool({
  user: "sh",
  host: "db",
  database: "mydb",
  password: "1234",
  port: 5432,
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/comments", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, comment, created_at FROM comments ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving comment");
  }
});

app.post("/comments", async (req, res) => {
  const { name, password, comment } = req.body;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const result = await pool.query(
      "INSERT INTO comments (name, password, comment) VALUES ($1, $2, $3) RETURNING *",
      [name, encryptedPassword, comment]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding comment");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.delete("/comments/:id", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const supervisor = process.env.ADMIN_PASSWORD;
  try {
    const result = await pool.query("SELECT * FROM comments WHERE id = $1", [
      id,
    ]);
    if (
      (await bcrypt.compare(password, result.rows[0].password)) ||
      password === supervisor
    ) {
      await pool.query("DELETE FROM comments WHERE id = $1", [id]);
      res.status(204).send();
    } else {
      res.status(401).send("Password incorrect");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting comment");
  }
});
