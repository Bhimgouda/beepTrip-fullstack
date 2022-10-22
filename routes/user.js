const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/user");
const catchAsync = require("../utils/catchAsync");
const Router = express.Router();

// REGISTER ROUTE
Router.post("/register", catchAsync(registerUser));

// LOGIN ROUTE
Router.post("/login", catchAsync(loginUser));

// LOGOUT ROUTE
Router.get("/logout", catchAsync(logoutUser));

module.exports = Router;
