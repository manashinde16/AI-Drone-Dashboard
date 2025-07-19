const db = require("../config/db");

exports.getFilteredViolations = async (req, res) => {
  try {
    const { drone_id, date, type } = req.query;
    const conditions = [];
    const values = [];

    if (drone_id) {
      conditions.push(`drone_id = $${values.length + 1}`);
      values.push(drone_id);
    }

    if (date) {
      conditions.push(`date = $${values.length + 1}`);
      values.push(date);
    }

    if (type) {
      conditions.push(`type = $${values.length + 1}`);
      values.push(type);
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "";
    const query = `SELECT * FROM violations ${whereClause} ORDER BY timestamp ASC`;

    const result = await db.query(query, values);
    res.json({ violations: result.rows });
  } catch (err) {
    console.error("Violation filter error:", err);
    res.status(500).json({ error: "Failed to fetch violations" });
  }
};
