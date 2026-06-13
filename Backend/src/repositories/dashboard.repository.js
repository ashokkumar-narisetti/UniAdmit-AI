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

  const [trendRows] = await pool.execute(`
    SELECT 
      DATE_FORMAT(created_at, '%b') as month,
      MONTH(created_at) as month_num,
      COUNT(*) as new_applications,
      SUM(status='APPROVED') as admissions
    FROM applications
    WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
    GROUP BY month, month_num
    ORDER BY month_num
  `);

  const [courseRows] = await pool.execute(`
    SELECT 
      course as course,
      COUNT(*) as count
    FROM applications
    WHERE course IS NOT NULL AND course != ''
    GROUP BY course
    ORDER BY count DESC
    LIMIT 5
  `);

  const stats = rows[0];
  stats.trends = trendRows;
  stats.courses = courseRows;

  return stats;
};

module.exports = {
  getDashboardStats,
};