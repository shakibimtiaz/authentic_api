const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const userRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const profileRoute = require("./routes/profile");
const updateProfile = require("./routes/profile_update");
const createPost = require("./routes/post");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/createUser", userRoute);
app.use("/userLogin", loginRoute);
app.use("/getUserProfile", profileRoute);
app.use("/updateProfile", updateProfile);
app.use("/post", createPost);

module.exports = app;
