const models = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "my_super_secret_key";

async function createUser(req, res) {
  try {
    console.log("Request Body:", req.body);
    if (!req.body.email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existingUser = await models.userRegistration.findOne({
      where: { email: req.body.email },
    });

    if (existingUser) {
      return res.status(300).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await models.userRegistration.create({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: hashedPassword,
      imageUrl: req.body.imageUrl,
    });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User registered successfully",
      token: token,
      body: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      body: error.message,
    });
  }
}

module.exports = {
  createUser,
};
