const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const adminRoutes = require("./adminRoutes");

// Health check
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is running",
  });
});
// Mount routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
