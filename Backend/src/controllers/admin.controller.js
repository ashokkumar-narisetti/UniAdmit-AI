const adminService = require(
  "../services/admin.service"
);

const login = async (
  req,
  res
) => {

  try {

    const { email, password } =
      req.body;

    const result =
      await adminService.login(
        email,
        password
      );

    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {

    res.status(401).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  login,
};