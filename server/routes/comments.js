const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
require("dotenv").config();

router.get("/", async (req, res) => {
  const { currentPage, itemsPerPage } = req.query;
  try {
    const result = await db.query(
      "SELECT id, name, comment, created_at FROM comments ORDER BY id DESC"
    );
    const totalPages = Math.ceil(result.rows.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = result.rows.slice(startIndex, endIndex);

    const data = {
      totalPages: totalPages,
      currentItems: currentItems,
    };

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving comment");
  }
});

router.post("/", async (req, res) => {
  const { name, password, comment } = req.body;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const result = await db.query(
      "INSERT INTO comments (name, password, comment) VALUES ($1, $2, $3) RETURNING *",
      [name, encryptedPassword, comment]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding comment");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const supervisor = process.env.ADMIN_PASSWORD;
  try {
    const result = await db.query("SELECT * FROM comments WHERE id = $1", [id]);
    if (
      (await bcrypt.compare(password, result.rows[0].password)) ||
      password === supervisor
    ) {
      await db.query("DELETE FROM comments WHERE id = $1", [id]);
      res.status(204).send();
    } else {
      res.status(401).send("Password incorrect");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting comment");
  }
});

module.exports = router;
