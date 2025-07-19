const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

router.get("/", dashboardController.getDashboardData);
router.get("/kpi", dashboardController.getKPIData);
router.get("/chart", dashboardController.getChartData);

module.exports = router;
