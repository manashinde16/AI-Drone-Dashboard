const db = require("../config/db");

exports.getDashboardData = async (req, res) => {
  try {
    const totalViolations = await db.query("SELECT COUNT(*) FROM violations");
    const violationsByType = await db.query(
      "SELECT type, COUNT(*) FROM violations GROUP BY type"
    );
    const droneCount = await db.query(
      "SELECT COUNT(DISTINCT drone_id) FROM drones"
    );
    const locationCount = await db.query(
      "SELECT COUNT(DISTINCT location) FROM drones"
    );
    const timeSeries = await db.query(
      "SELECT date, COUNT(*) FROM violations GROUP BY date ORDER BY date"
    );

    res.json({
      totalViolations: parseInt(totalViolations.rows[0].count),
      violationsByType: violationsByType.rows,
      droneCount: parseInt(droneCount.rows[0].count),
      locationCount: parseInt(locationCount.rows[0].count),
      timeSeries: timeSeries.rows,
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
};

exports.getKPIData = async (req, res) => {
  try {
    const [totalViolations] = await db.query(
      "SELECT COUNT(*) AS count FROM violations"
    );
    const [uniqueDroneIds] = await db.query(
      "SELECT COUNT(DISTINCT drone_id) AS count FROM violations"
    );
    const [violationTypes] = await db.query(
      "SELECT COUNT(DISTINCT type) AS count FROM violations"
    );
    const [uniqueLocations] = await db.query(
      "SELECT COUNT(DISTINCT location) AS count FROM violations"
    );

    res.json({
      totalViolations: totalViolations[0].count,
      uniqueDroneIds: uniqueDroneIds[0].count,
      violationTypes: violationTypes[0].count,
      uniqueLocations: uniqueLocations[0].count,
    });
  } catch (err) {
    console.error("KPI Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getChartData = async (req, res) => {
  try {
    const [violationTypeData] = await db.query(`
      SELECT type AS type, COUNT(*) AS count 
      FROM violations 
      GROUP BY type
    `);

    const [violationTimeData] = await db.query(`
      SELECT DATE_FORMAT(timestamp, '%Y-%m-%d') AS date, COUNT(*) AS count 
      FROM violations 
      GROUP BY DATE_FORMAT(timestamp, '%Y-%m-%d')
      ORDER BY date ASC
    `);

    res.json({
      violationTypeData,
      violationTimeData,
    });
  } catch (err) {
    console.error("Chart Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
