const express = require("express");
const registrationController = require("../controllers/registration.controller");
const router = express.Router();

router.post("/", registrationController.createUser);

module.exports = router;
