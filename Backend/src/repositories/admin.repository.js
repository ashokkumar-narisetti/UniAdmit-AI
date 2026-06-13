const pool = require("../config/database");

const findAdminByEmail = async (email) => {

  const [rows] = await pool.execute(
    `
    SELECT *
    FROM admins
    WHERE email = ?
    `,
    [email]
  );

  return rows[0] || null;
};

module.exports = {
  findAdminByEmail,
};