const express = require("express");

const updateProfileController = require("../controllers/update_profile.controller");

const router = express.Router();

router.patch("/", updateProfileController.updateProfile);

module.exports = router;
