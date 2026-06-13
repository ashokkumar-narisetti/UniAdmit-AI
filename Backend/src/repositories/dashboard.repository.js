const pool = require(
  "../config/database"
);

const getDashboardStats =
async () => {

  const [rows] =
    await pool.execute(
      `
      SELECT

      COUNT(*) AS totalApplications,

      SUM(status='APPROVED')
      AS approved,

      SUM(status='REJECTED')
      AS rejected,

      SUM(status='UNDER_REVIEW')
      AS underReview,

      SUM(status='SUBMITTED')
      AS submitted

      FROM applications
      `
    );

  return rows[0];
};

module.exports = {
  getDashboardStats,
};