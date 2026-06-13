const pool = require("./config/database");

async function testConnection() {
  try {
    const connection =
      await pool.getConnection();

    console.log(
      "MySQL Connected Successfully"
    );

    connection.release();
  } catch (error) {
    console.error(error);
  }
}

testConnection();