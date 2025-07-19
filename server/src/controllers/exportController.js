const db = require("../config/db");
const { format } = require("@fast-csv/format");
const PDFDocument = require("pdfkit");

exports.exportCSV = async (req, res) => {
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

    // Set headers for file download
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=violations.csv");

    // Stream CSV
    const csvStream = format({ headers: true });
    csvStream.pipe(res);
    result.rows.forEach((row) => csvStream.write(row));
    csvStream.end();
  } catch (err) {
    console.error("CSV export error:", err);
    res.status(500).json({ error: "Failed to export CSV" });
  }
};

exports.exportPDF = async (req, res) => {
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

    // Create PDF
    const doc = new PDFDocument({ margin: 30 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=violations.pdf");

    doc.pipe(res);
    doc.fontSize(16).text("Drone Violations Report", { align: "center" });
    doc.moveDown();

    result.rows.forEach((v, index) => {
      doc
        .fontSize(10)
        .text(`Violation ${index + 1}`)
        .text(`ID: ${v.id}`)
        .text(`Type: ${v.type}`)
        .text(`Time: ${v.timestamp}`)
        .text(`Lat/Lng: ${v.latitude}, ${v.longitude}`)
        .text(`Image URL: ${v.image_url}`)
        .text(`Date: ${v.date}`)
        .text(`Drone: ${v.drone_id}`)
        .text(`Location: ${v.location}`)
        .moveDown();
    });

    doc.end();
  } catch (err) {
    console.error("PDF export error:", err);
    res.status(500).json({ error: "Failed to export PDF" });
  }
};
