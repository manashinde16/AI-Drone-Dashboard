const db = require("../config/db");

exports.searchViolations = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Search query missing" });
    }

    const result = await db.query(
      `SELECT * FROM violations WHERE id ILIKE $1 OR timestamp ILIKE $1`,
      [`%${q}%`]
    );

    res.json({ results: result.rows });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
};
