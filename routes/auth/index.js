const path = require("path");
const router = require("express").Router();
const userRoutes = require("./userRoutes");

// API Routes
router.use("/userRoutes", userRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
