const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminRepository = require(
  "../repositories/admin.repository"
);

const login = async (
  email,
  password
) => {

  const admin =
    await adminRepository.findAdminByEmail(
      email
    );

  if (!admin) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const passwordMatch =
    await bcrypt.compare(
      password,
      admin.password_hash
    );

  if (!passwordMatch) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const token = jwt.sign(
    {
      adminId: admin.id,
      email: admin.email,
      role: admin.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return {
    token,
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  };
};

module.exports = {
  login,
};