const models = require("../models");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "my_super_secret_key";

async function createPost(req, res) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "The authorization is missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(402).json({ message: "Token is missing!" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;
    const userName = decoded.name || decoded.email || "Anonymous";

    const { postTitle, postDescription, postImage } = req.body;

    if (!postTitle) {
      return res.status(410).json({ message: "Post title required" });
    }

    const newPost = await models.post.create({
      userId,
      userName,
      postTitle,
      postDescription,
      postImage,
    });

    res.status(201).json({
      message: "Post added successfully!",
      body: newPost,
    });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong!",
      body: e.message,
    });
  }
}

async function getUserPost(req, res) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Missing authorization token",
      });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;

    const post = await models.post.findAll({
      where: { userId: userId },
    });

    res.status(200).json({
      message: "The posts fetched successfully!",
      body: post,
    });
  } catch (e) {
    res.status(500).json({
      message: "Someting is wrong!",
      body: e.message,
    });
  }
}

async function getAllPost(req, res) {
  try {
    const post = await models.post.findAll();

    res.status(200).json({
      message: "All post fetched successfully",
      body: post,
    });
  } catch (e) {
    res.status(500).json({
      message: "Something is wrong!",
      body: e.message,
    });
  }
}

module.exports = {
  createPost,
  getUserPost,
  getAllPost,
};
