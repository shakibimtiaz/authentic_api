const express = require("express");

const postController = require("../controllers/post.controller");

const router = express.Router();

router.post("/createPost", postController.createPost);
router.get("/getUserPost", postController.getUserPost);
router.get("/getAllPost", postController.getAllPost);

module.exports = router;
