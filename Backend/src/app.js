// src/app.js
const dashboardRoutes =
require("./routes/dashboard.routes");
const express = require("express");
const cors = require("cors");
const applicationRoutes = require("./routes/application.routes");
const adminRoutes = require("./routes/admin.routes");
const documentRoutes =
  require("./routes/document.routes");
const app = express();
const path = require("path");
app.use(cors());
app.use(express.json());
app.use(
  "/api/documents",
  documentRoutes
);
app.use(
  "/api/dashboard",
  dashboardRoutes
);
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Admission Management API Running"
    });
});

app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);
app.use(
  "/api/documents",
  documentRoutes
);
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "../uploads")
  )
);
module.exports = app;