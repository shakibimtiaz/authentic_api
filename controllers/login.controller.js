const modules = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "my_super_secret_key";

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await modules.userRegistration.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect Password!" });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "7d",
    });
    res.status(200).json({
      message: "User logged in successfully",
      token: token,
      body: user,
    });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong!",
      body: e.message,
    });
  }
}

module.exports = {
  login,
};
