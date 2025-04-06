const express = require("express");
const router = express.Router();
const db = require("../config/db");
const requestIp = require("request-ip");

router.use(requestIp.mw());

router.post("/:slug/views", async (req, res) => {
  const { slug } = req.params;
  const ipAddress = req.clientIp;
  console.log(slug, ipAddress);

  if (!slug || !ipAddress) {
    return res.status(400).json({ error: "Slug and IP address are required" });
  }

  try {
    const query = `
      INSERT INTO post_views (slug, ip_address)
      VALUES ($1, $2)
      ON CONFLICT (slug, ip_address) DO NOTHING;
    `;
    await db.query(query, [slug, ipAddress]);

    const countQuery = `
      SELECT COUNT(*) AS view_count
      FROM post_views
      WHERE slug = $1;
    `;
    const result = await db.query(countQuery, [slug]);

    res.status(200).json({ slug, viewCount: result.rows[0].view_count });
  } catch (error) {
    console.error("Error updating view count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
