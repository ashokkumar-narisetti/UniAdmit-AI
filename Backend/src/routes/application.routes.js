const express = require("express");
const verifyToken =
  require(
    "../middleware/auth.middleware"
  );
const router = express.Router();

const {
  getFullApplicationById,
  updateApplicationStatus,
  submitApplication,
  getAllApplications,
  getApplicationById,
  trackApplication,
  getApplicationPrediction,
} = require(
  "../controllers/application.controller"
);
router.patch("/:id/status",verifyToken,updateApplicationStatus);
router.get("/", getAllApplications);
router.post("/", submitApplication);
router.get("/:id", getApplicationById);
router.get(
  "/:id/details",
  verifyToken,
  getFullApplicationById
);
router.get("/:id/predict", verifyToken, getApplicationPrediction);
router.post("/track", trackApplication);
module.exports = router;