const express = require("express");

const router = express.Router();

const upload = require(
  "../middleware/upload.middleware"
);

const {
  uploadDocument,
} = require(
  "../controllers/document.controller"
);

router.post(
  "/upload",
  upload.single("document"),
  uploadDocument
);

module.exports = router;