const dashboardRepository = require(
  "../repositories/dashboard.repository"
);

const getDashboardStats =
async () => {

  return await dashboardRepository
    .getDashboardStats();
};

module.exports = {
  getDashboardStats,
};