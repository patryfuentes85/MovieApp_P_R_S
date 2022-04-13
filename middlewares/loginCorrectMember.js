const express = require("express");
const jwt = require("jsonwebtoken");
const user = require("../models/models_users");
const jwt_secret = "youraccesstokensecret";

const protectedRoutesMember = express.Router();

protectedRoutesMember.use(async (req, res, next) => {
  const token = req.headers.cookie;
  try {
    if (token) {
      jwt.verify(token.substring(12), jwt_secret, async (err, decoded) => {
        let rol = await user.getRol(decoded.email);
        if (rol[0].rol == "admin") {
          next();
        } else if (rol[0].rol == "member") {
          next();
        }
      });
    }
  } catch (err) {
    return res.json({ msg: "Logeate para seguir navegando" });
  }
});

module.exports = protectedRoutesMember;
