const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  const createCommentsTable = `
CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

  const createPostViewsTable = `
CREATE TABLE IF NOT EXISTS post_views (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) NOT NULL,
  ip_address VARCHAR(45) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

  const createUniqueIndex = `
CREATE UNIQUE INDEX IF NOT EXISTS unique_slug_ip ON post_views (slug, ip_address);
`;

  async function initializeDatabase() {
    try {
      console.log("Checking and creating tables if they do not exist...");

      await db.query(createCommentsTable);
      console.log("comments table is ready.");

      await db.query(createPostViewsTable);
      console.log("post_views table is ready.");

      await db.query(createUniqueIndex);
      console.log("Unique index on post_views is ready.");

      res.status(200).send("Database initialized successfully.");
    } catch (error) {
      console.error("Error initializing database:", error);
    }
  }
  initializeDatabase();
});

module.exports = router;
