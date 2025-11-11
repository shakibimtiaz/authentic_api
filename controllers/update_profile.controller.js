const jwt = require("jsonwebtoken");
const models = require("../models");

const SECRET_KEY = "my_super_secret_key";

async function updateProfile(req, res) {
  try {
    let token =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1];

    if (!token && req.body.token) {
      token = req.body.token;
    }

    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    // Verify token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Find user by ID
    const user = await models.userRegistration.findOne({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract fields to update from request body
    const { name, email, phone, address } = req.body;

    // Update user fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    // Save changes
    await user.save();

    // Return updated user (excluding password)
    const updatedUser = await models.userRegistration.findOne({
      where: { id: decoded.id },
      attributes: { exclude: ["password"] },
    });

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (e) {
    console.error("Error updating profile:", e);
    res.status(400).json({
      message: "Failed to update profile",
      error: e.message,
    });
  }
}

module.exports = {
  updateProfile,
};
