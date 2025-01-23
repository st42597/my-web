const express = require("express");
const { Pool } = require("pg");

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
  pool.query(
    "CREATE TABLE IF NOT EXISTS comments (id SERIAL PRIMARY KEY, name VARCHAR(50) NOT NULL, password VARCHAR(50) NOT NULL, comment TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
  );
  const { name, password, comment } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO comments (name, password, comment) VALUES ($1, $2, $3) RETURNING *",
      [name, password, comment]
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
  try {
    const result = await pool.query("SELECT * FROM comments WHERE id = $1", [
      id,
    ]);
    if (result.rows[0].password === password) {
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
