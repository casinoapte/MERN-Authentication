const path = require("path");
const router = require("express").Router();
// const apiRoutes = require("./api");
const authRoutes = require("./auth");


// Routes // 

// router.use("/api", apiRoutes);
router.use("/auth", authRoutes);


// If No API Routes Are Hit, Send The React App // 

router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
