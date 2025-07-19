const db = require("../config/db");

exports.uploadJson = async (req, res) => {
  try {
    const data = req.body;
    const io = req.app.get("io");

    io.emit("data_updated"); // broadcast to all connected clients

    // Validate top-level fields
    const { drone_id, date, location, violations } = data;
    if (!drone_id || !date || !location || !Array.isArray(violations)) {
      return res.status(400).json({ error: "Invalid JSON structure" });
    }

    // Insert into drones table
    await db.query(
      "INSERT INTO drones (drone_id, date, location) VALUES ($1, $2, $3)",
      [drone_id, date, location]
    );

    // Insert each violation
    for (const violation of violations) {
      const { id, type, timestamp, latitude, longitude, image_url } = violation;
      await db.query(
        "INSERT INTO violations (id, type, timestamp, latitude, longitude, image_url, date, drone_id, location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        [
          id,
          type,
          timestamp,
          latitude,
          longitude,
          image_url,
          date,
          drone_id,
          location,
        ]
      );
    }

    res.status(200).json({ message: "Upload successful" });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
};
