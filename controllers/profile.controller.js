const jwt = require("jsonwebtoken");

const models = require("../models");

const SECRET_KEY = "my_super_secret_key";

async function getProfile(req, res) {
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

    const decoded = jwt.verify(token, SECRET_KEY);

    const user = await models.userRegistration.findOne({
      where: { id: decoded.id },
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      console.log("User not found for ID:", decoded.id);
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile fetched successfully",
      user: user,
    });
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired token",
      error: error.message,
    });
  }
}

module.exports = {
  getProfile,
};
