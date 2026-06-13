require("dotenv").config();
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first'); // Fixes "fetch failed" in @google/generative-ai on Windows Node 18+

const app = require("./app");
const pool = require("./config/database");

const PORT = process.env.PORT || 4003;

(async () => {
  try {
    const connection = await pool.getConnection();

    console.log("MySQL Connected Successfully");

    connection.release();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Database Error:", error);
  }
})();