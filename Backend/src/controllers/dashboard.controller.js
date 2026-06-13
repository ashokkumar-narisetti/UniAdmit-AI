const dashboardService = require(
  "../services/dashboard.service"
);

const getDashboardStats =
async (req, res) => {

  try {

    const stats =
      await dashboardService
        .getDashboardStats();

    res.status(200).json({
      success: true,
      data: stats,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getDashboardStats,
};